//import AssetPostProcessDataMapping from "../dataMappings/AssetPostProcessDataMapping";
//import AssetPostProcessDefaultComponents from "../defaultComponents/AssetPostProcessDefaultComponents";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRAssetPostProcess extends Element{
  get defaultComponents(){
    return xrFrameSystem.AssetPostProcessDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.AssetPostProcessDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}