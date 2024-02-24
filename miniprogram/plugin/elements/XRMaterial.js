import Element from "./Element";
//import AssetMaterialDataMapping from "../dataMappings/AssetMaterialDataMapping";
//import AssetMaterialDefaultComponents from "../defaultComponents/AssetMaterialDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRMaterial extends Element{

  get defaultComponents(){
    return xrFrameSystem.AssetMaterialDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.AssetMaterialDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}