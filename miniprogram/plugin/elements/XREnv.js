import Element from "./Element";
//import EnvDataMapping from "../dataMappings/EnvDataMapping";
//import EnvDefaultComponents from "../defaultComponents/EnvDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XREnv extends Element{

  get defaultComponents(){
    return xrFrameSystem.EnvDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.EnvDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}