import * as THREE from "../three/Three"
export default {
	castShadow: {
		type: "boolean",
		defaultValue: false
	},
	color: {
		type: "color",
		defaultValue: new THREE.Color(1, 1, 1, 1)
	},
	innerConeAngle: {
		type: "number",
		defaultValue: 1
	},
	intensity: {
		type: "number",
		defaultValue: 1
	},
	outerConeAngle: {
		type: "number",
		defaultValue: 1
	},
	range: {
		type: "number",
		defaultValue: 1
	},
	shadowBias: {
		type: "number",
		defaultValue: 0.002
	},
	shadowDistance: {
		type: "number",
		defaultValue: 10
	},
	type: {
		type: "string",
		defaultValue:"directional"
  },
  shadowStrength:{
    type:"number",
    defaultValue:1
  }
}
