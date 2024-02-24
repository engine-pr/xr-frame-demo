import {
	Kanata
} from "../ext"
import Video from "../core/Video"
import * as THREE from "../three/Three"
export default class VideoTexture {
	constructor(_scene, options = {
		abortAudio: true,
		autoPause: true,
		autoPlay: false,
		loop: false,
		placeHolder: null,
		src: src
	}, onReady = () => {}, onEnd = () => {}) {
		this._scene = _scene
		this._options = options
		/////////
		this.video = new Video(options.src)
    this._readyState = Kanata.EVideoState.Idle
    this.video.play()
    this.onEnd = () => {}
    //////////////////////////////////////////
    this.three_texture = new THREE.VideoTexture(	this.video)
    this.three_texture.colorSpace = THREE.SRGBColorSpace;

	}
	get autoPause() {
		return
	}
	get height() {
		return this.video.height
	}
	get state() {
		return this.video.readyState
	}
	get texture() {
		return
	}
	get width() {
		return this.video.width
	}
	pause() {
		this._readyState = Kanata.EVideoState.Paused
		this.video.pause()
	}
	play() {
		this._readyState = Kanata.EVideoState.Playing
		this.video.play()
	}
	release() {
		this._readyState = Kanata.EVideoState.Released
	}
	resume() {
		this.video.play()
		this._readyState = Kanata.EVideoState.Playing
	}
	seek(pos) {
		this.video.seek(pos)
	}
	stop() {
		this.video.stop()
		this._readyState = Kanata.EVideoState.Stop
	}
}
