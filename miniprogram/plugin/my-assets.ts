import {core} from "dhtml-weixin"
const xrFrameSystem2 = wx.getXrFrameSystem2()
const options = {
  lifetimes:{
    attached(){
      const page = core.Page.current
      const timer = setInterval(() => {
        for(const assetId of Object.keys(page.onekit_assets)){
          if(page.onekit_assets[assetId]==null){
            return
          }
        }
        clearInterval(timer)
        this.triggerEvent("loaded",{assets:page.onekit_assets})
      },1000)
    }
  }
}
const options2 = xrFrameSystem2.element2component(xrFrameSystem2.XRAssets)

Component({...options,...options2})