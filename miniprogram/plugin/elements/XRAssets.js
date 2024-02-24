//import AssetsDataMapping from "../dataMappings/AssetsDataMapping";
//import AssetsDefaultComponents from "../defaultComponents/AssetsDefaultComponents";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRAssets extends Element{
  get defaultComponents(){
    return xrFrameSystem.AssetsDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return {}
  }
  set dataMapping(dataMapping){
    
  }
}