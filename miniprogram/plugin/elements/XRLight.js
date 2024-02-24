import Element from "./Element";
//import LightDataMapping from "../dataMappings/LightDataMapping";
//import LightDefaultComponents from "../defaultComponents/LightDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRLight extends Element{

  get defaultComponents(){
    return xrFrameSystem.LightDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.LightDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}