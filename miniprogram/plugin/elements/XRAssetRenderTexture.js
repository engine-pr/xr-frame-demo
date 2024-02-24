//import AssetRenderTextureDataMapping from "../dataMappings/AssetRenderTextureDataMapping";
//import AssetRenderTextureDefaultComponents from "../defaultComponents/AssetRenderTextureDefaultComponents";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRAssetRenderTexture extends Element{
  get defaultComponents(){
    return xrFrameSystem.AssetRenderTextureDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.AssetRenderTextureDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}