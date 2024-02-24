const xrFrameSystem = wx.getXrFrameSystem()
const options = xrFrameSystem.element2component(xrFrameSystem.getRegisterElement("assets"))
options.data = {count:0}
options.methods.onekit_loadasset = function(){
    const count = this.data.count+1
    this.setData({count})
}
options.methods.onekit_loadedasset = function(e){
  const count = this.data.count-1
  this.setData({count})
  if(count<=0){
    const assets = {}
    this.triggerEvent("loaded",{value:{assets}})
  }
}
Component(options)