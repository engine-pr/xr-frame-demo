export default function (scene) {
	const xrFrameSystem = wx.getXrFrameSystem()
	return scene.createEffect({
		name: "standard",
		defaultRenderQueue: 2000,
		properties: [
      // baseColor
      {
				key: 'u_baseColorMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
			},
			{
				key: 'u_baseColorFactor',
				type: xrFrameSystem.EUniformType.FLOAT4,
				default: [1, 1, 1, 1]
      },
      // metallic rougness
      {
				key: 'u_metallicRoughnessMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default: null
      },
      {
				key: 'u_metallicMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default: null
      },
      {
				key: 'u_roughnessMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
      },
      {
				key: 'u_metallicRoughnessValues',
				type: xrFrameSystem.EUniformType.FLOAT2,
				default: [0, 1]
      },
      {
				key: 'u_ior',
				type: xrFrameSystem.EUniformType.FLOAT,
				default: 1.5
      },
      // Normal
      {
				key: 'u_normalMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
      },
      {
				key: 'u_normalScale',
				type: xrFrameSystem.EUniformType.FLOAT,
				default:1
      },
      // Emissive
      {
				key: 'u_emissiveMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
      },
      {
				key: 'u_emissiveFactor',
				type: xrFrameSystem.EUniformType.FLOAT3,
				default:[0,0,0]
      },
      // Ambient occlusion
      {
				key: 'u_occlusionMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
      },
      {
				key: 'u_occlusionStrength',
				type: xrFrameSystem.EUniformType.FLOAT,
				default:1
      },
      // alphaCutoff
      {
				key: 'u_alphaCutoff',
				type: xrFrameSystem.EUniformType.FLOAT,
				default:0.5
      },
      // clearcoat
      {
				key: 'u_clearcoatFactor',
				type: xrFrameSystem.EUniformType.FLOAT,
				default:0
      },
      {
				key: 'u_clearcoatRoughnessFactor',
				type: xrFrameSystem.EUniformType.FLOAT,
				default:0
      },
      // specularGlossiness
      {
				key: 'u_specularFactor',
				type: xrFrameSystem.EUniformType.FLOAT3,
				default:[1,1,1]
      },
      {
				key: 'u_glossinessFactor',
				type: xrFrameSystem.EUniformType.FLOAT,
				default:1
      },
      {
				key: 'u_specularGlossinessMap',
				type: xrFrameSystem.EUniformType.SAMPLER,
				default:null
      },
		],
		images: [],
		shaders: []
	})
}
