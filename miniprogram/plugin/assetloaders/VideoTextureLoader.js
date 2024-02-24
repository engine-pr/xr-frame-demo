import AssetLoader from "./AssetLoader";
import VideoTexture from '../assets/VideoTexture';

export default class VideoTextureLoader extends AssetLoader {

	async load(params, callbacks) {
		try {
			return callbacks.onLoaded(
				new VideoTexture(this.scene, {
					abortAudio: true,
					autoPause: true,
					autoPlay: false,
					loop: false,
					placeHolder: null,
					src: params.src
				})
			)

		} catch (e) {
			console.error(e)
			return callbacks.onError(e)
		}
	}
	getBuiltin() {
		return [
      {
        assetId: 'video-skybox',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/videos/office-skybox.mp4',
        options: {}
      }];
	}

	release(params, value) {
		value.destroy();
	}
}
