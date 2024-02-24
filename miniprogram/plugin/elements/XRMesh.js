import Element from "./Element";
//import MeshDefaultComponents from "../defaultComponents/MeshDefaultComponents";
//import MeshDataMapping from "../dataMappings/MeshDataMapping";
const xrFrameSystem = wx.getXrFrameSystem()
export default class XRMesh extends Element{
  
  get defaultComponents(){
    return xrFrameSystem.MeshDefaultComponents
  }
  set defaultComponents(defaultComponents){

  }
  get dataMapping(){
    return xrFrameSystem.MeshDataMapping
  }
  set dataMapping(dataMapping){
    
  }
  get geometry(){
    return this._geometry
  }
  get material(){
    return this._material
  }
}