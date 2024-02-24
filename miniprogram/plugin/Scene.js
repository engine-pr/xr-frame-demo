import AnimationSystem from "./systems/AnimationSystem"
import ARSystem from "./systems/ARSystem"
import AssetsSystem from "./systems/AssetsSystem"
import EventManager from "./managers/EventManager"
import ShareSystem from "./systems/ShareSystem"
import Element from "./elements/Element"
import GizmoSystem from "./systems/GizmoSystem"
import PhysicsSystem from "./systems/PhysicsSystem"
import RenderSystem from "./systems/RenderSystem"
import VideoSystem from "./systems/VideoSystem"
import Image from "./assets/Image"
import Texture from "./assets/Texture"
import  SceneDefaultComponents  from "./defaultComponents/SceneDefaultComponents"
import  SceneDataMapping  from "./dataMappings/SceneDataMapping"
import Effect from "./assets/Effect"
import Material from "./assets/Material"
import * as THREE from "./three/Three"

export default class Scene extends Element {
	///////////////////////////////////////////////
	constructor(_type, triggerEvent) {
		super(_type, triggerEvent)
    this.three_objects = []
    this._scene = this
    //////////////////////
		this._animation = new AnimationSystem();
		this._animation._el = this
		this._ar = new ARSystem();
		this._ar._el = this
		this._assets = new AssetsSystem();
		this._assets._el = this
		this._event = new EventManager();
		this._event._el = this
		this._gizmo = new GizmoSystem();
		this._gizmo._el = this
		this._physics = new PhysicsSystem();
		this._physics._el = this
		this._render = new RenderSystem();
		this._render._el = this
		this._share = new ShareSystem();
		this._share._el = this
		this._video = new VideoSystem();
    this._video._el = this
  }
  get defaultComponents(){
    return {}
  }
  set defaultComponents(defaultComponents){
    return SceneDefaultComponents
  }
  get dataMapping(){
    return SceneDataMapping
  }
  set dataMapping(dataMapping){
    
  }
  
	//
	get animation() {
		return this._animation
	}
	get ar() {
		return this._ar
	}
	get assets() {
		return this._assets
	}
	get event() {
		return this._event
	}
	get frameWidth() {

	}
	get frameHeight() {

	}
	get gizmo() {
		return this._gizmo
	}
	get height() {

	}
	get physics() {
		return _physics
	}
	get ready() {
		return this._ready
	}
	get render() {
		return this._render
	}
	get rootShadow() {

	}
	get share() {
		return this._share
	}
	get video() {
		return this._video
	}
	get width() {
		return this._width
	}
	////////////////////////////////////////////////////////////////////
	getElementById(id, uc) {
		return uc.selectComponent(`#${id}`)
	}
	getNodeById(nodeId) {
    const xrFrameSystem = wx.getXrFrameSystem()
		function find(parent) {
      const transform = parent.getComponent(xrFrameSystem.Transform)
			if (transform && transform.getData("nodeId") == nodeId) {
				return parent
			}
			for (const child of parent._children) {
				const result = find(child)
				if (result) {
					return result
				}
			}
		}
		return find(this).getComponent(xrFrameSystem.Transform)
	}
	createEffect(description) {
      return new Effect(this,description)
  }

	createElement(clz, attributes) {
		const element = new clz(clz.TYPE,attributes)
		element._scene = this
		return element
	}
	createGeometry(vertexLayout, vBuffer, iBuffer, indexType) {}
	createImage(autoRelease) {
		return new Image(autoRelease)
	}
	createMaterial(effect, defaultUniforms) {
    const material = new Material(this)
    material._effect = effect
    material.initByEffect(effect,defaultUniforms)
    return material
	}
	createPostProcess(options) {
		throw new Error("TODO")
	}
	createRenderTexture(options) {
		throw new Error("TODO")
	}
	createTexture(options) {
    const image = options.source[0]
    const img = image.three_img.image
   // console.error("3333333333333333",img.width)
    const texture = new Texture(this, new THREE.TextureLoader().load(img.src))
    return texture
	}
	createUniformBlock(descriptor) {
		throw new Error("TODO")
	}
	createUniformBlockDesc(options) {
		throw new Error("TODO")
	}
	createVertexLayout(options) {
		throw new Error("TODO")
	}
	createVideoTexture(options) {
		throw new Error("TODO")
	}
}
