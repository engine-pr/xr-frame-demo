//import TextDataMapping from "../dataMappings/TextDataMapping";
//import TextDefaultComponents from "../defaultComponents/TextDefaultComponents";
import Element from "./Element";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRText extends Element{
  get defaultComponents(){
    return xrFrameSystem.TextDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.TextDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}