import {
	HTMLImageElement,
	core
} from "dhtml-weixin"
const {
	Base64
} = core

export default class Image {
	constructor(autoRelease) {
		this._autoRelease = autoRelease
		this.three_img = new HTMLImageElement()
		this.three_img.onload = (e) => {
			if (this.onload) {
				this.onload(e)
			}
		}
		this.three_img.onerror = (e) => {
			if (this.onerror) {
				this.onerror(e)
			}
		}
	}

	get autoRelease() {
		return this._autoRelease
	}
	set src(src) {
		if (typeof src != "string") {
			this.three_img.src = "data:image/png;base64," + Base64.arrayBufferToBase64(src)
		} else {
			this.three_img.src = src
		}
		this._src = this.three_img.src
	}
	get src() {
		return this._src
	}
	get data() {
		return this.three_img
	}
	get height() {
		return this.three_img.height
	}
	get localPath() {

	}
	get width() {
		return this.three_img.width
	}
}
