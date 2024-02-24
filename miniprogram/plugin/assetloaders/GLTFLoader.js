import AssetLoader from "./AssetLoader";
import GLTFModel from '../assets/GLTFModel';
import {
	DRACOLoader
} from '../three/addons/loaders/DRACOLoader.js';
import {
	GLTFLoader
} from '../three/addons/loaders/GLTFLoader.js';

export default class extends AssetLoader {
	constructor(_scene, type) {
		super(_scene, type)
	}
	async load(params, callbacks) {
		const dracoLoader = this.dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');
		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);
		try {
			loader.load(params.src, (gltf_scene) => {
				const gLTFModel = new GLTFModel(this._scene, gltf_scene.scene)
				return callbacks.onLoaded(
					gLTFModel
				)
			}, null, (e) => {
				throw e
			})
		} catch (e) {
			return callbacks.onError(e)
		}
	}
}
