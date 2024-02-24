//import ParticleDataMapping from "../dataMappings/ParticleDataMapping";
//import ParticleDefaultComponents from "../defaultComponents/ParticleDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
import Element from "./Element";

export default class XRParticle extends Element{
  get defaultComponents(){
    return xrFrameSystem.ParticleDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.ParticleDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}