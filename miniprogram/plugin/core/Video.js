export default class Video {
	constructor(src) {
    this.src = src
		this.HAVE_NOTHING = 0
		this.HAVE_METADATA = 1
		this.HAVE_CURRENT_DATA = 2
		this.HAVE_FUTURE_DATA = 3
		this.HAVE_ENOUGH_DATA = 4
		this.decoder = wx.createVideoDecoder()
		const animate = () => {
			const frameData = this.decoder.getFrameData()
			if (frameData == null) {
				return
			}
			const {
				data,
				width,
				height
			} = frameData
			this._width = width
			this._height = height
			const typedArray = new Uint8Array(data)
			this.frameData = {
				width,
				height,
				data: typedArray
			};
			this._requestVideoFrameCallback()

		}
		var timer
		this.decoder.on("ended", async () => {
			this.decoder.seek(0)
		})
		this.decoder.on("stop", async () => {
			clearInterval(timer)
		})
		this.decoder.on("start", async () => {
			this._readyState = this.HAVE_CURRENT_DATA
			animate()
			timer = setInterval(() => {
				animate()
			}, 20)
		})
	}
	get width() {
		return this._width
	}
	get height() {
		return this._height
	}
	get readyState() {
		return this._readyState
	}
	get isHTMLVideoElement() {
		return true
  }
  seek(pos){
    return this.decoder.seek(pos)
  }
	play() {
		this._readyState = this.HAVE_NOTHING
		this.decoder.start({
			mode: 1,
			abortAudio: true,
			source: this.src
		})
  }
  pause(){
    this.decoder.stop()
  }
	stop() {
		this.decoder.stop()
		this.decoder.remove()
	}
	requestVideoFrameCallback(requestVideoFrameCallback) {
		this._requestVideoFrameCallback = requestVideoFrameCallback
	}
}
