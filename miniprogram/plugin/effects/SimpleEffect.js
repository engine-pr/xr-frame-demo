export default function (scene) {
	const xrFrameSystem = wx.getXrFrameSystem()
	return scene.createEffect({
		name: "simple",
		defaultRenderQueue: 2000,
		properties: [{
				key: 'u_baseColorMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
			},
			{
				key: 'u_baseColorFactor',
				type: xrFrameSystem.EUniformType.FLOAT4,
				default: [1, 1, 1, 1]
			}
		],
		images: [],
		shaders: []
	})
}
