export default class AssetLoader{
  constructor(_scene,type){
    this._scene = _scene
    this._type = type
  }
  get scene(){
    return this._scene
  }

  cancel(params){

  }
  getBuiltin(){
    return []
  }
  load(data, callbacks){
    throw new Error("[TODO]"+this.constructor.name)
  }
  release(params, value){

  }
}