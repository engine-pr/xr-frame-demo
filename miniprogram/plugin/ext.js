const Kanata = {
	EARTrackerState: {
		Detected: 2,
		Detecting: 1,
		Error: 3,
		Init: 0
	},
	EAnimationBlendType: {
		Additive: 1,
		Override: 0
	},
	EBlendEquation: {
		FUNC_REVERSE_SUBTRACT: 2,
		FUNC_SUBTRACT: 1,
		MAX: 4,
		MIN: 3
	},
	EBlendFactor: {
		CONSTANT_COLOR: 11,
		DST_ALPHA: 6,
		DST_COLOR: 8,
		ONE: 1,
		ONE_MINUS_CONSTANT_COLOR: 12,
		ONE_MINUS_DST_ALPHA: 7,
		ONE_MINUS_DST_COLOR: 9,
		ONE_MINUS_SRC_ALPHA: 5,
		ONE_MINUS_SRC_COLOR: 3,
		SRC_ALPHA: 4,
		SRC_ALPHA_SATURATE: 10,
		SRC_COLOR: 2,
		ZERO: 0
	},
	EColorMask: {
		A: 8,
		B: 4,
		G: 2,
		NONE: 16,
		R: 1,
		RGB: 7,
		RGBA: 15
	},
	ECompareFunc: {
		ALWAYS: 8,
		EQUAL: 3,
		GEQUAL: 4,
		GREATER: 5,
		LEQUAL: 2,
		LESS: 1,
		NEVER: 7,
		NOTEQUAL: 6
	},
	ECullMode: {
		BACK: 2,
		FRONT: 1,
		NONE: 0
	},
	EDataModelType: {
		AnimationClip: 1,
		SkeletonBoneInverse: 2
	},
	EEventType: {
		AddChild: 2,
		AddChildAtIndex: 3,
		BindToBone: 6,
		BindToBones: 7,
		DisperseSubTree: 5,
		EntityCommandActive: 10,
		EntityCommandInActive: 11,
		RemoveFromParent: 4,
		SetRootEntity: 1,
		UnBindFromBone: 8,
		UnBindFromBones: 9
	},
	EFaceWinding: {
		CCW: 1,
		CW: 2
	},
	EFilterMode: {
		LINEAR: 2,
		LINEAR_MIPMAP_LINEAR: 6,
		LINEAR_MIPMAP_NEAREST: 5,
		NEAREST: 1,
		NEAREST_MIPMAP_LINEAR: 4,
		NEAREST_MIPMAP_NEAREST: 3
	},
	EIndexType: {
		NONE: 1,
		UINT16: 2,
		UINT32: 3
	},
	ELoadAction: {
		CLEAR: 0,
		DONTCARE: 2,
		LOAD: 1
	},
	EMeshRenderType: {
		Skinned3D: 2,
		Static3D: 1,
		UI: 3,
		UnKnown: 0
	},
	EPixelType: {
		FLOAT: 5126,
		UNSIGNED_BYTE: 5121,
		UNSIGNED_SHORT_4_4_4_4: 32819,
		UNSIGNED_SHORT_5_5_5_1: 32820,
		UNSIGNED_SHORT_5_6_5: 33635
	},
	EPrimitiveType: {
		LINES: 2,
		LINE_STRIP: 3,
		POINTS: 4,
		TRIANGLES: 0,
		TRIANGLE_STRIP: 1,
		ZERO: 5
	},
	EShareRecordState: {
		Idle: 0,
		Paused: 3,
		Recording: 2,
		Waiting: 1
	},
	EShadowFitMode: {
		FitFrustum: 0,
		FitObjects: 1
	},
	EShadowMode: {
		FourCascade_PCF: 4,
		None: 0,
		OneCascade_PCF: 1,
		PCSS: 5,
		TwoCascade_PCF: 2
	},
	EShapeType: {
		Capsule: 3,
		Cube: 1,
		Mesh: 4,
		Sphere: 5
	},
	EStencilOp: {
		DECR: 6,
		DECR_WRAP: 5,
		INCR: 4,
		INCR_WRAP: 3,
		INVERT: 7,
		KEEP: 1,
		REPLACE: 2,
		ZERO: 0
	},
	ETextureFormat: {
		ASTC4x4: 140,
		ASTC5x5: 141,
		ASTC6x6: 142,
		ASTC8x6: 143,
		ASTC8x8: 144,
		DXT1: 150,
		DXT3: 151,
		DXT5: 152,
		Depth_High: 21,
		Depth_Low: 20,
		Depth_Stencil: 22,
		ETC1RGB8: 100,
		ETC2RGB8: 110,
		ETC2RGBA8: 111,
		PVRTC2RGBAV1: 122,
		PVRTC2RGBV1: 120,
		PVRTC4RGBAV1: 123,
		PVRTC4RGBV1: 121,
		R8: 4,
		RG11B10F: 7,
		RG8: 3,
		RGB10A2: 2,
		RGB16F: 9,
		RGB32F: 10,
		RGB565: 24,
		RGB5A1: 25,
		RGB8: 8,
		RGBA16F: 6,
		RGBA32F: 5,
		RGBA4: 23,
		RGBA8: 0,
		SRGBA8: 1
	},
	ETextureType: {
		Cube: 1,
		D2: 0,
		D2Array: 2,
		D3: 3
	},
	EUniformType: {
		FLOAT: 0,
		FLOAT2: 1,
		FLOAT3: 2,
		FLOAT4: 3,
		MAT2: 4,
		MAT3: 5,
		MAT4: 6,
		SAMPLER: 7
	},
	EUseDefaultAddedAction: {
		Ignore: 0,
		Refresh: 1
	},
	EUseDefaultRemovedAction: {
		Clear: 1,
		Keep: 0,
		WriteBack: 2
	},
	EUseDefaultRetainedAction: {
		Keep: 0,
		Refresh: 1,
		WriteBack: 2
	},
	EVertexBatchOperator: {
		MatrixMultiple: 0,
		UVST: 1
	},
	EVertexFormat: {
		BYTE4: 4,
		BYTE4N: 5,
		FLOAT: 0,
		FLOAT2: 1,
		FLOAT3: 2,
		FLOAT4: 3,
		SHORT2: 8,
		SHORT2N: 9,
		SHORT4: 10,
		SHORT4N: 11,
		UBYTE4: 6,
		UBYTE4N: 7,
		UINT10_N2: 12
	},
	EVertexLayoutUsage: {
		BONEINDEX: 9,
		BONEWEIGHT: 10,
		COLOR: 8,
		CUSTOM: 0,
		NORMAL: 2,
		POSITION: 1,
		TANGENT: 3,
		UV0: 4,
		UV1: 5,
		UV2: 6,
		UV3: 7
	},
	EVertexStep: {
		PER_INSTANCE: 1,
		PER_VERTEX: 0
	},
	EVideoState: {
		Idle: 0,
		Paused: 3,
		Playing: 2,
		Released: 4,
		WaitPlay: 1
	},
	EWrapMode: {
		CLAMP_TO_EDGE: 2,
		MIRRORED_REPEAT: 3,
		REPEAT: 1
	},
	ECapsuleShapeDirection: {
		"X-Axis": 0,
		"Y-Axis": 1,
		"Z-Axis": 2
	}
}

module.exports = {
	Kanata
}
