//import ARTrackerDataMapping from "../dataMappings/ARTrackerDataMapping";
//import ARTrackerDefaultComponents from "../defaultComponents/ARTrackerDefaultComponents";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRARTracker extends Element {
  get defaultComponents(){
    return xrFrameSystem.XRARTrackerDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.ARTrackerDataMapping;
  }
  set dataMapping(dataMapping){
    
  }
}
