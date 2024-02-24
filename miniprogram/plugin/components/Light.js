import LightSchema from "../schemas/LightSchema"
import Component from "./Component"
import * as THREE from "../three/Three"

export default class Light extends Component {

	get schema() {
		return LightSchema
	}
	setDataOne(key, value) {
		const xrFrameSystem = wx.getXrFrameSystem()
		var three_light
		if (key == "type") {
			if (!three_light && this._data.type != value) {

				switch (value) {
					case "ambient":
						three_light = new THREE.AmbientLight()
						break;
					case "directional":
						three_light = new THREE.DirectionalLight()
						break;
					case "point":
						three_light = new THREE.PointLight()
						break;
					case "spot":
						three_light = new THREE.SpotLight()
						break;
					default:
						console.error(key, value)
						throw new Error()
				}
				this.el.three_light = three_light
				this.el.addMesh(three_light)
				for (const k of Object.keys(this._data)) {
					if (k == "type") {
						continue
					}
					const v = this._data[k]
					this.setDataOne(k, v)
				}
			
				
			}
			return
		}
		three_light = this.el.three_light
		if (!three_light) {
			return
		}
		switch (key) {
			case "color":
				three_light.color = value
				break;
			case "intensity":
				three_light.intensity = value
				break;
			case "castShadow":
				three_light.castShadow = value
				break
			case "innerConeAngle":
			case "outerConeAngle":
			case "range":
				three_light.distance = value
			case "shadowBias":
			case "shadowDistance":
			case "shadowStrength":
				break
			default:
				console.error(key, value)
				throw new Error()
		}
	}
}
