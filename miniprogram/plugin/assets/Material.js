import * as THREE from "../three/Three"
export default class Material {
	constructor(_scene) {
		this._scene = _scene
  }
  get effect(){
    return this._effect
  }
	set alphaCutOff(alphaCutOff) {
		this._alphaCutOff = alphaCutOff
	}
	get alphaCutOff() {
		return this._alphaCutOff
	}
	set alphaMode(alphaMode) {
		this._alphaMode = alphaMode
	}
	get alphaMode() {
		return this._alphaMode
  }
  set renderQueue(renderQueue) {
		this._renderQueue = renderQueue
	}
	get renderQueue() {
		return this._renderQueue
  }
  //////////////
  clearRenderState(){
    
  }
  clone(){

  }
  initByEffect(effect,defaultUniforms){
    effect.warmUp()
    //console.error("----------------",effect,defaultUniforms)
    switch (effect._description.name) {
      case "simple":
        this.three_material = new THREE.MeshBasicMaterial()
        break;
      case "standard":
        this.three_material = new THREE.MeshPhysicalMaterial()
        break;
      default:
        console.error(effect._description.nam)
        throw new Error()
    }
  }
}
