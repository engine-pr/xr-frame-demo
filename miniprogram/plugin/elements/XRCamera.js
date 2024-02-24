import Element from "./Element";
//import CameraDataMapping from "../dataMappings/CameraDataMapping";
//import CameraDefaultComponents from "../defaultComponents/CameraDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRCamera extends Element {
	
  get defaultComponents(){
    return xrFrameSystem.CameraDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.CameraDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}
