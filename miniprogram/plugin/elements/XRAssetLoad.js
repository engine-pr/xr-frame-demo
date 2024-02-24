//import AssetLoadDataMapping from "../dataMappings/AssetLoadDataMapping";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRAssetLoad extends Element{
  get defaultComponents(){
    return {}
  }
  set defaultComponents(defaultComponents){
  }
  get dataMapping(){
    return xrFrameSystem.AssetLoadDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}