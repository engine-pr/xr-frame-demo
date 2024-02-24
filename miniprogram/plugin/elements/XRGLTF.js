//import GLTFDataMapping from "../dataMappings/GLTFDataMapping";
//import GLTFDefaultComponents from "../defaultComponents/GLTFDefaultComponents";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRGLTF extends Element{

  get defaultComponents(){
    return xrFrameSystem.GLTFDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.GLTFDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}