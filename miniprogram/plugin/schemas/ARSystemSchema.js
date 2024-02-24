export default {
	camera: {
		type: 'string',
		defaultValue: "Back"
	},
	depthDebug: {
		type: 'boolean'
	},
	depthFar: {
		type: 'number',
		defaultValue: 20
	},
	depthMask: {
		type: 'boolean'
	},
	depthNear: {
		type: 'number',
		defaultValue: 0.02
	},
	modes: {
		type: 'array',
		defaultValue: "Plane"
	},
	planeMode: {
		type: 'number',
		defaultValue: 3
	},
	pose3d: {
    type: 'boolean',
    defaultValue:false
	},
}
