import {
  core
} from "dhtml-weixin"
const xrFrameSystem = wx.getXrFrameSystem()
module.exports = Behavior({
  behaviors: [require("xr")],
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
        const attributes = {
        }
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
          case "XRMaterial": {
            const {
              assetId,
              effect
            } = this.properties
            const mat = scene.createMaterial(scene.assets.getAsset("effect", effect));
            scene.assets.addAsset("material", assetId, mat)
            break
          }
          case "XRAssetLoad": {
            const {
              type,
              assetId,
              src,
              options
            } = this.properties
            page.onekit_assets[assetId] = null
            const args = {
              type,
              assetId,
              src
            }
            if(options){
              const dataValue = xrFrameSystem2.getRegisterDataValue("dict")
              args.options = dataValue.create(options, {}, scene)
            }
            scene.assets.loadAsset(args).then(data => {
              const {
                type,
                assetId
              } = data.__params
              page.onekit_assets[assetId] = scene.assets.getAsset(type, assetId)
              if (page.onekit_users[assetId]) {
                page.onekit_users[assetId].forEach(ui => {
                  switch (ui.properties.CLASS_NAME) {
                    case "XRGLTF":
                      const el = ui._element
                      ui.triggerEvent("gltf-loaded", {el,value:{target:el}})
                      break
                  }
                })
              }
            })
            break
          }
          case "XRAssetRenderTexture": {
            const {
              width,
              height,
              assetId
            } = this.properties
            page.onekit_assets.push(assetId)
            const rt = scene.createRenderTexture({
              width,
              height
            });
            scene.assets.addAsset("render-texture", assetId, rt)
            break
          }
          case "XRAssetPostProcess": {
            const {
              type,
              isHdr,
              data,
              assetId
            } = this.properties
            const dataValue = xrFrameSystem2.getRegisterDataValue("dict")
            const dict = data ? dataValue.create(data, "", scene) : {}
            const pp = scene.createPostProcess({
              type,
              isHDR: isHdr,
              data: dict
            });
            scene.assets.addAsset('post-process', assetId, pp);
            break
          }
          default: {
            this._element = scene.createElement(elementClass, attributes)
            this._element.ui = this
            this._element.setId(this.id)

            function addUser(assetId, ui) {
              if (!page.onekit_users[assetId]) {
                page.onekit_users[assetId] = []
              }
              page.onekit_users[assetId].push(ui)
            }
            var assetId, asset
            switch (this.properties.CLASS_NAME) {
              case "XRGLTF":
                assetId = this.properties.model
                asset = page.onekit_assets[assetId]
                if (asset) {
                  const el = this._element
                  this.triggerEvent("gltf-loaded", {el,value:{target:el}})
                } else {
                  addUser(assetId, this)
                }
                break
            }
            if (this.id) {
              page.onekit_uis[this.id] = this
            }
            this.triggerEvent("onekit_add", {
              ui: this
            }, {
              bubbles: true,
              composed: true
            })
            break
          }
        }
      }, 500)
    }
  }
})