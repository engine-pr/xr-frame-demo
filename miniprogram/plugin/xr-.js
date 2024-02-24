import {
  core
} from "dhtml-weixin"
const xrFrameSystem = wx.getXrFrameSystem()
const properties = {

}
const observers = {}
module.exports = Behavior({
  behaviors: [require("xr")],
  properties,
  observers,
  lifetimes: {
    attached() {
      const page = core.Page.current
      const xrFrameSystem2 = wx.getXrFrameSystem2()
      const timer = setInterval(() => {
        const scene = page.onekit_scene
        if (!scene) {
          return
        }
        clearInterval(timer)
        const elementClass = xrFrameSystem[this.properties.CLASS_NAME]
        const attributes = {}
        Object.keys(this.properties).forEach(key_caml => {
          const key_no_caml = core.String.fromHump(key_caml)
          if (["TYPE", "CLASS_NAME", "effect", "assetId"].includes(key_caml)) {
            return
          }
          var value = this.properties[key_caml]
          if (value == null) {
            return
          }
          if (value == "") {
            if (!["camera-orbit-control"].includes(key_no_caml)) {
              return
            } else {
              value = "true"
            }
          }   
          attributes[key_no_caml] = value
        })
        switch (this.properties.CLASS_NAME) {
          case "XRMaterial":{
            const {  assetId, effect } = this.properties
            const mat = scene.createMaterial(scene.assets.getAsset("effect", effect));
            scene.assets.addAsset("material", assetId, mat)
            break}
            case "XRAssetLoad":{
              const { type, assetId, src } = this.properties
              page.onekit_assets[assetId] = null
              scene.assets.loadAsset({ type, assetId,  src }).then(data=>{
                const {type,assetId} = data.__params
                page.onekit_assets[assetId] = scene.assets.getAsset(type,assetId)
              });
              break}
            case "XRAssetRenderTexture":{
              const { width,height, assetId } = this.properties
              page.onekit_assets.push(assetId)
              const rt = scene.createRenderTexture({width, height});
              scene.assets.addAsset("render-texture", assetId, rt)
              break}
              case "XRAssetPostProcess":{
                const { type,isHdr, data,assetId } = this.properties
                const dataView = xrFrameSystem2.getRegisterDataValue("dict")
                const dict = data ? dataView.create(data,"", scene) : {}
                const pp = scene.createPostProcess({
                  type,
                  isHDR: isHdr,
                  data:dict
                });
                scene.assets.addAsset('post-process', assetId, pp);
                break}
          default:{
            // console.error(this.properties.CLASS_NAME )
            this._element = scene.createElement(elementClass, attributes)
            if(this.properties.id){
              page.onekit_elements[this.properties.id] = this._element
            }
            this.triggerEvent("onekit_add", {
              ui: this
            }, {
              bubbles: true,
              composed: true
            })
            break}
        }
      }, 500)
    }
  }
})