import AssetLoader from "./AssetLoader";
import Texture from '../assets/Texture';
import {
	core
} from "dhtml-weixin"
import {
	Kanata
} from '../ext';
import * as THREE from '../three/Three';


export default class TextureLoader extends AssetLoader {
	_load(params, callbacks, success, fail) {
		try {
		//	console.error("111111111111111")
			this._scene.assets.addAsset("texture", params.assetId, null)
			var src
			if (!params.src.startsWith("https://")) {
				const fs = wx.getFileSystemManager()
				src = fs.readFileSync(params.src)
			} else {
				src = params.src
			}
			this._loadImg(src).then(img => {
       // console.error("222222222222222222")
				const texture = this.scene.createTexture({
					type: Kanata.ETextureType.D2,
					source: [img],
					width: img.width,
					height: img.height,
					magFilter: Kanata.EFilterMode.LINEAR,
					minFilter: Kanata.EFilterMode.LINEAR,
					wrapU: Kanata.EWrapMode.CLAMP_TO_EDGE,
					wrapV: Kanata.EWrapMode.CLAMP_TO_EDGE,
					anisoLevel: 1
				});
				success(callbacks.onLoaded(
					texture
				))
			})
		} catch (ex) {
			fail(ex)
		}
	}
	load(params, callbacks) {
		return new Promise((resolve, reject) => {
			const page = core.Page.current
			var timer = setInterval(() => {
				if (page.canvas) {
					clearInterval(timer)
					this._load(params, callbacks, resolve, reject)
				}
			}, 100)
		})
	}
	_loadImg(src) {
		const img = this.scene.createImage();

		return new Promise((resolve, reject) => {
			img.onload = () => {
				resolve(img);
			}

			img.onerror = (error) => {
				reject(error);
			}

			img.src = src;
		})
	}
	getBuiltin() {
		return [];
	}

	release(params, value) {
		value.destroy();
	}
}
