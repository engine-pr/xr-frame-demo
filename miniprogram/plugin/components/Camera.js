import Component from "./Component"
import * as THREE from "../three/Three"
import CameraSchema from "../schemas/CameraSchema"
export default class Camera extends Component {
	get schema() {
		return CameraSchema
	}
	constructor() {
		super()
	}
	setDataOne(key, value) {
		const xrFrameSystem = wx.getXrFrameSystem()
		if (!this.el.three_camera) {
			const three_camera = new THREE.PerspectiveCamera(45, xrFrameSystem.window_innerWidth / xrFrameSystem.window_innerHeight, 0.1, 1000);
			this.el.three_camera = three_camera
			this.el.scene.three_camera = three_camera
			three_camera.position.copy(this.el.three_node.position)
			three_camera.rotation.copy(this.el.three_node.rotation)
			three_camera.scale.copy(this.el.three_node.scale)
			this.el.three_node = three_camera
			for (const k of Object.keys(this._data)) {
				const v = this._data[k]
				this.setDataOne(k, v)
			}
		}
		if (!this.el.three_camera) {
			return
		}
		if (!value) {
			return
		}
		const three_camera = this.el.scene.three_camera
		switch (key) {
			case "clearColor":
				if (this.el.scene.three_renderer) {
					this.el.scene.three_renderer.setClearColor(value, 0)
					this.el.scene.three_renderer.setClearAlpha(value.a)
				} else {
					this.el.scene.temp_clearColor = value
				}
				break
			case "depth":
			case "cullMask":
				break
			case "clearStencil":
				break
			case "target":
				three_camera.lookAt(value.position)
				break
			case "allowFeatures":
				break
			case "clearDepth":
			case "fov":
				three_camera.fov = value
				break
			case "far":
				three_camera.far = value
				break
			case "near":
				three_camera.near = value
				break
			case 'isClearDepth':
			case "isClearStencil":
			case "postProcess":
			case "isPerspective":
			case "renderTarget":
			case "orthSize":
				break
			case "isArCamera":
			case "isClearColor":
			case "background":
				const envData = this.el.scene.render.getData("envData")
				if (envData) {
					envData.then(
						value => {
                const texture = value.skyboxMap.three_texture;
								texture.colorSpace = THREE.SRGBColorSpace;
								texture.mapping = THREE.EquirectangularReflectionMapping;
								this.el.scene.three_node.background = texture
						})
				}
				break
			default:
				console.error(key)
				throw new Error()
		}
	}
}
