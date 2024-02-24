import * as THREE from "../three/Three"
export default {
	allowFeatures: {
		type: "array",
		defaultValue: []
	},
	background: {
		type: "string",
		defaultValue: "defualt"
	},
	clearColor: {
		type: "color",
		defaultValue: new THREE.Color(0, 0, 0, 1)
	},
	clearDepth: {
		type: "number",
		defaultValue: 1
	},
	clearStencil: {
		type: "number",
		defaultValue: 0
	},
	cullMask: {
		type: "number"
	},
	depth: {
		type: "number"
	},
	far: {
		type: "number",
		defaultValue: 100
	},
	fov: {
		type: "number",
		defaultValue: 60
	},
	isArCamera: {
		type: "boolean",
		defaultValue: false
	},
	isClearColor: {
		type: "boolean",
		defaultValue: true
	},
	isClearDepth: {
		type: "boolean",
		defaultValue: true
	},
	isClearStencil: {
		type: "boolean",
		defaultValue: true
	},
	isPerspective: {
		type: "boolean"
	},
	near: {
		type: "number",
		defaultValue: 0.1
	},
	orthSize: {
		type: "number",
		defaultValue: 4
	},
	postProcess: {
		type: "array"
	},
	renderTarget: {
		type: "string"
	},
	target: {
		type: "transform"
  }
}
