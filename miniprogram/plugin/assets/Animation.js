export default class Animation {
	constructor(_scene) {
    this._scene=_scene
	}
	onInit(data) {
    this._data = data
    this._clipNames = []
	}
	onPause(el) {

	}
	onPlay(el, clipName, options) {

	}
	onResume(el) {

	}
	onStop(el) {

	}
	onUpdate(el, progress, reverse) {

	}
	scene() {
		return this._scene
	}
}
