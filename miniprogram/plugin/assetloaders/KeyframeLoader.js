import AssetLoader from "./AssetLoader";
import {core} from "dhtml-weixin"
import KeyframeAnimation from "../assets/KeyframeAnimation"
export default class KeyframeLoader extends AssetLoader{
    async load(params, callbacks) {
      try {
        if (!params.src.startsWith("https://")) {
            const fs = wx.getFileSystemManager()
            const str = fs.readFileSync(params.src+".jpg","utf-8")
            return callbacks.onLoaded(
              new KeyframeAnimation(this._scene, JSON.parse(str))
            )
        }
        const loader = new THREE.FileLoader();
        loader.load(params.src, (str) => {
          return callbacks.onLoaded(
            new KeyframeAnimation(this._scene, JSON.parse(str))
          )
        }, null, (e) => {
          throw e
        })
      } catch (e) {
        console.error(e)
        return callbacks.onError(e)
      }
    }
    getBuiltin() {
      return [];
    }
  
    release(params, value) {
      value.destroy();
    }
  }
  