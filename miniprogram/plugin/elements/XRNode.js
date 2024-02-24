import Element from "./Element";
//import NodeDataMapping from "../dataMappings/NodeDataMapping";
//import NodeDefaultComponents from "../defaultComponents/NodeDefaultComponents";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRNode extends Element{

  get defaultComponents(){
    return xrFrameSystem.NodeDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.NodeDataMapping
  }
  set dataMapping(dataMapping){
    
  }
}