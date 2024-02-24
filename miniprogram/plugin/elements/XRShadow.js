import Element from "./Element";
//import ShadowDataMapping from "../dataMappings/ShadowDataMapping";
//import ShadowDefaultComponents from "../defaultComponents/ShadowDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRShadow extends Element{
  
  get defaultComponents(){
    return xrFrameSystem.ShadowDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.ShadowDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}