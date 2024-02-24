import element2component from "./element2component"
import {
  Kanata
} from "./ext"
const xrFrameSystem = wx.getXrFrameSystem()
// Class
import Vector3 from "./classes/Vector3"
// Effect
/*
import SimpleEffect from "./effects/SimpleEffect"
import StandardEffect from "./effects/StandardEffect"
// Geometry
import CubeGeometry from "./geometries/CubeGeometry"
import CylinderGeometry from "./geometries/CylinderGeometry"
import PlaneGeometry from "./geometries/PlaneGeometry"
import SphereGeometry from "./geometries/SphereGeometry"
// Asset
import Animation from "./assets/Animation"
import Atlas from "./assets/Atlas"
import CubeTexture from "./assets/CubeTexture"
import Effect from "./assets/Effect"
import EnvData from "./assets/EnvData"
import GLTFModel from "./assets/GLTFModel"
import Image from "./assets/Image"
import KeyframeAnimation from "./assets/KeyframeAnimation"
import Material from "./assets/Material"
import Texture from "./assets/Texture"
import VideoTexture from "./assets/VideoTexture"
*/
// Components
/*
import Animator from "./components/Animator"
import ARTracker from "./components/ARTracker"
import AssetLoad from "./components/AssetLoad"
import AssetMaterial from "./components/AssetMaterial"
import AssetPostProcess from "./components/AssetPostProcess"
import AssetRenderTexture from "./components/AssetRenderTexture"
import Assets from "./components/Assets"
import Camera from "./components/Camera"
import CameraOrbitControl from "./components/CameraOrbitControl"
import Component from "./components/Component"
import Env from "./components/Env"
import GLTF from "./components/GLTF"
import Light from "./components/Light"
import Mesh from "./components/Mesh"
import Rigidbody from "./components/Rigidbody"
import ShapeGizmos from "./components/ShapeGizmos"
import ShapeInteract from "./components/ShapeInteract"
import Text from "./components/Text"
import Transform from "./components/Transform"*/
// Elements
import Element from "./elements/Element"
import XRARTracker from "./elements/XRARTracker"
import XRAssetLoad from "./elements/XRAssetLoad"
import XRAssetPostProcess from "./elements/XRAssetPostProcess"
import XRAssetRenderTexture from "./elements/XRAssetRenderTexture"
import XRAssets from "./elements/XRAssets"
import XRCamera from "./elements/XRCamera"
import XREnv from "./elements/XREnv"
import XRGLTF from "./elements/XRGLTF"
import XRLight from "./elements/XRLight"
import XRMaterial from "./elements/XRMaterial"
import XRMesh from "./elements/XRMesh"
import XRNode from "./elements/XRNode"
import XRParticle from "./elements/XRParticle"
import XRShadow from "./elements/XRShadow"
import XRText from "./elements/XRText"
import { getFunctionName } from "./core/strict"
// Schemas
/*
import ARSystemSchema from "./schemas/ARSystemSchema"
import ARTrackSchema from "./schemas/ARTrackerSchema"
import AssetLoadSchema from "./schemas/AssetLoadSchema"
import AssetMaterialSchema from "./schemas/AssetMaterialSchema"
import AssetRenderTextureSchema from "./schemas/AssetRenderTextureSchema"
import AssetsSchema from "./schemas/AssetsSchema"
import CameraOrbitControlSchema from "./schemas/CameraOrbitControlSchema"
import CameraSchema from "./schemas/CameraSchema"
import CapsuleShapeSchema from "./schemas/CapsuleShapeSchema"
import CubeShapeSchema from "./schemas/CubeShapeSchema"
import EnvSchema from "./schemas/EnvSchema"
import GLTFSchema from "./schemas/GLTFSchema"
import LightSchema from "./schemas/LightSchema"
import MeshSchema from "./schemas/MeshSchema"
import MeshShapeSchema from "./schemas/MeshShapeSchema"
import ParticleSchema from "./schemas/ParticleSchema"
import RenderSystemSchema from "./schemas/RenderSystemSchema"
import RigidbodySchema from "./schemas/RigidbodySchema"
import ShapeInteractSchema from "./schemas/ShapeInteractSchema"
import SphereShapeSchema from "./schemas/SphereShapeSchema"
import TextSchema from "./schemas/TextSchema"
import TransformSchema from "./schemas/TransformSchema"
// DataMappings
import ARTrackerDataMapping from "./dataMappings/ARTrackerDataMapping"
import AssetLoadDataMapping from "./dataMappings/AssetLoadDataMapping"
import AssetMaterialDataMapping from "./dataMappings/AssetMaterialDataMapping"
import AssetPostProcessDataMapping from "./dataMappings/AssetPostProcessDataMapping"
import AssetRenderTextureDataMapping from "./dataMappings/AssetRenderTextureDataMapping"
import BasicDataMapping from "./dataMappings/BasicDataMapping"
import CameraDataMapping from "./dataMappings/CameraDataMapping"
import EnvDataMapping from "./dataMappings/EnvDataMapping"
import GLTFDataMapping from "./dataMappings/GLTFDataMapping"
import LightDataMapping from "./dataMappings/LightDataMapping"
import MeshDataMapping from "./dataMappings/MeshDataMapping"
import NodeDataMapping from "./dataMappings/NodeDataMapping"
import ParticleDataMapping from "./dataMappings/ParticleDataMapping"
import SceneDataMapping from "./dataMappings/SceneDataMapping"
import ShadowDataMapping from "./dataMappings/ShadowDataMapping"
import TextDataMapping from "./dataMappings/TextDataMapping"
// DefaultComponents
import ARTrackerDefaultComponents from "./defaultComponents/ARTrackerDefaultComponents"
import AssetMaterialDefaultComponents from "./defaultComponents/AssetMaterialDefaultComponents"
import AssetPostProcessDefaultComponents from "./defaultComponents/AssetPostProcessDefaultComponents"
import AssetRenderTextureDefaultComponents from "./defaultComponents/AssetRenderTextureDefaultComponents"
import AssetsDefaultComponents from "./defaultComponents/AssetsDefaultComponents"
import BasicDefaultComponents from "./defaultComponents/BasicDefaultComponents"
import CameraDefaultComponents from "./defaultComponents/CameraDefaultComponents"
import EnvDefaultComponents from "./defaultComponents/EnvDefaultComponents"
import GLTFDefaultComponents from "./defaultComponents/GLTFDefaultComponents"
import LightDefaultComponents from "./defaultComponents/LightDefaultComponents"
import MeshDefaultComponents from "./defaultComponents/MeshDefaultComponents"
import NodeDefaultComponents from "./defaultComponents/NodeDefaultComponents"
import ParticleDefaultComponents from "./defaultComponents/ParticleDefaultComponents"
import SceneDefaultComponents from "./defaultComponents/SceneDefaultComponents"
import ShadowDefaultComponents from "./defaultComponents/ShadowDefaultComponents"
import TextDefaultComponents from "./defaultComponents/TextDefaultComponents"
*/
// DataLoaders
/*
import AssetLoader from "./assetloaders/AssetLoader"
import AtlasLoader from "./assetloaders/AtlasLoader"
import CubeTextureLoader from "./assetloaders/CubeTextureLoader"
import EnvDataLoader from "./assetloaders/EnvDataLoader"
import GLTFLoader from "./assetloaders/GLTFLoader"
import ImageLoader from "./assetloaders/ImageLoader"
import KeyframeLoader from "./assetloaders/KeyframeLoader"
import RawLoader from "./assetloaders/RawLoader"
import TextureLoader from "./assetloaders/TextureLoader"
import VideoTextureLoader from "./assetloaders/VideoTextureLoader"
//////////////////////////////////////////////////////////////////////////////////
import * as THREE from "./three/Three"
THREE.Vector3.prototype.setValue = function (x, y, z) {
	this.set(x, y, z)
	return this
}
THREE.Vector3.prototype.setArray = function (array) {
	this.x = array[0]
	this.y = array[1]
	this.z = array[2]
	return this
}
THREE.Euler.prototype.setValue = function (x, y, z) {
	this.set(
		new THREE.MathUtils.degToRad(x),
		new THREE.MathUtils.degToRad(y),
		new THREE.MathUtils.degToRad(z))
	return this
}
THREE.Euler.prototype.setArray = function (array) {
	this.x = new THREE.MathUtils.degToRad(array[0])
	this.y = new THREE.MathUtils.degToRad(array[1])
	this.z = new THREE.MathUtils.degToRad(array[2])
	return this
}*/
//////////////////////////////////////////////////////////////////////////////
const onekit = {
  AssetLoader: {},
  Component: {},
  DataView: {},
  Effect: {},
  Element: {},
  Geometry: {},
  Material: {},
  Texture: {},
  UniformDesc: {},
  VertexDataDesc: {},
  VertexLayout: {}
}
const xrFrameSystem2 = {
  // Class
  Vector3,
  // Asset,
  /*
	Animation,
	Atlas,
	CubeTexture,
	Effect,
	EnvData,
	GLTFModel,
	Image,
	KeyframeAnimation,
	Material,
	Texture,
	VideoTexture,*/
  // Components
  /*
  Animator,
  ARTracker,
  AssetLoad,
  AssetMaterial,
  AssetPostProcess,
  AssetRenderTexture,
  Assets,
  Camera,
  CameraOrbitControl,
  Component,
  Env,
  GLTF,
  Light,
  Mesh,
  Rigidbody,
  ShapeGizmos,
  ShapeInteract,
  Text,
  Transform,
  */
  // Elements
  Element,
  XRARTracker,
  XRAssetLoad,
  XRAssetPostProcess,
  XRAssetRenderTexture,
  XRAssets,
  XRCamera,
  XREnv,
  XRGLTF,
  XRLight,
  XRMaterial,
  XRMesh,
  XRNode,
  XRParticle,
  XRShadow,
  XRText,
  /*
	// Schemas
	ARSystemSchema,
	ARTrackSchema,
	AssetLoadSchema,
	AssetMaterialSchema,
	AssetRenderTextureSchema,
	AssetsSchema,
	CameraOrbitControlSchema,
	CameraSchema,
	CapsuleShapeSchema,
	CubeShapeSchema,
	EnvSchema,
	GLTFSchema,
	LightSchema,
	MeshSchema,
	MeshShapeSchema,
	ParticleSchema,
	RenderSystemSchema,
	RigidbodySchema,
	ShapeInteractSchema,
	SphereShapeSchema,
	TextSchema,
	TransformSchema,
	// DataMappings
	ARTrackerDataMapping,
	AssetLoadDataMapping,
	AssetMaterialDataMapping,
	AssetPostProcessDataMapping,
	AssetRenderTextureDataMapping,
	BasicDataMapping,
	CameraDataMapping,
	EnvDataMapping,
	GLTFDataMapping,
	LightDataMapping,
	MeshDataMapping,
	NodeDataMapping,
	ParticleDataMapping,
	SceneDataMapping,
	ShadowDataMapping,
	TextDataMapping,
	// DefaultComponents
	ARTrackerDefaultComponents,
	AssetMaterialDefaultComponents,
	AssetPostProcessDefaultComponents,
	AssetRenderTextureDefaultComponents,
	AssetsDefaultComponents,
	BasicDefaultComponents,
	CameraDefaultComponents,
	EnvDefaultComponents,
	GLTFDefaultComponents,
	LightDefaultComponents,
	MeshDefaultComponents,
	NodeDefaultComponents,
	ParticleDefaultComponents,
	SceneDefaultComponents,
	ShadowDefaultComponents,
	TextDefaultComponents,
	// AssetLoaders
	AssetLoader,
	AtlasLoader,
	CubeTextureLoader,
	EnvDataLoader,
	GLTFLoader,
	ImageLoader,
	KeyframeLoader,
	RawLoader,
	TextureLoader,
	VideoTextureLoader,
	// Methods
	genLspMeta(scene) {

	},
	isTextureWrapper(value) {

	},
	registerAssetLoader(type, clz) {
		onekit.AssetLoader[type] = clz
		///////////////////////////
		xrFrameSystem2.registerDataValue(type, {
			create: (value, defaultValue, scene) => {
				if (!value) {
					return defaultValue
				}
				const asset = scene.assets.getAsset(type, value)
				if (asset && asset.value) {
					return asset.value
				}
        scene.assets.addAsset(type, value, null)
				return scene.assets.getAssetWithState(type, value).then(({
					params,
					value
				}) => {
					const {
						type,
						assetId
          } = params
					scene.assets.getAsset(type, assetId).value = value
					return value
				});
			}
		});
		///////////////////////

  },
  */
  registerComponent(type, clz) {
    onekit.Component[type] = clz
  },
  registerDataValue(type, handler) {
    onekit.DataView[type] = handler
  },
  registerEffect(id, factory) {
    onekit.Effect[id] = factory
  },
  /*
  registerElement(type, clz) {
    clz.TYPE = type
    onekit.Element[type] = clz
  },*/
  registerGeometry(id, factory) {
    onekit.Geometry[id] = factory
  },
  registerMaterial(id, factory) {
    onekit.Material[id] = factory
  },
  registerTexture(id, factory) {
    onekit.Texture[id] = factory
  },
  registerUniformDesc(id, factory) {
    onekit.UniformDesc[id] = factory
  },
  registerVertexDataDesc(id, factory) {
    onekit.VertexDataDesc[id] = factory
  },
  registerVertexLayout(id, factory) {
    onekit.VertexLayout[id] = factory
  },
  useParamsEaseFuncs() {

  },
  noneParamsEaseFuncs() {

  },
  // XrFrame-X
	getRegisterElement(type) {
		return onekit.Element[type]
	}, 
  getRegisterComponent(type) {
    return onekit.Component[type]
  },
  /*
  getAllRegisterComponents() {
    return onekit.Component
  },*/
  getRegisterDataValue(type) {
    return onekit.DataView[type]
  },
  /*
  	getRegisterAssetLoader(type) {
  		return onekit.AssetLoader[type]
  	},
  	getAllRegisterAssetLoader() {
  		return onekit.AssetLoader
  	},
  	getRegisterEffect(type) {
  		return onekit.Effect[type]
  	},
  	getRegisterGeometry(type) {
  		return onekit.Geometry[type]
  	},
  	getRegisterMaterial(type) {
  		return onekit.Material[type]
  	},*/
  element2component(clz) {
    return element2component(xrFrameSystem2, clz)
  }
}
/////////////////////////////////////////////////////////
// Components
/*
xrFrameSystem2.registerComponent('animator', Animator)
xrFrameSystem2.registerComponent('ar-tracker', ARTracker)
xrFrameSystem2.registerComponent('asset-load', AssetLoad)
xrFrameSystem2.registerComponent('asset-material', AssetMaterial)
xrFrameSystem2.registerComponent('assets', Assets)
xrFrameSystem2.registerComponent('camera', Camera)
xrFrameSystem2.registerComponent('camera-orbit-control', CameraOrbitControl)
xrFrameSystem2.registerComponent('env', Env)
xrFrameSystem2.registerComponent('gltf', GLTF)
xrFrameSystem2.registerComponent('light', Light)
xrFrameSystem2.registerComponent('mesh', Mesh)
xrFrameSystem2.registerComponent('rigidbody', Rigidbody)
xrFrameSystem2.registerComponent('shape-gizmos', ShapeGizmos)
xrFrameSystem2.registerComponent('shape-interact', ShapeInteract)
xrFrameSystem2.registerComponent('text', Text)
xrFrameSystem2.registerComponent('transform', Transform)
// Elements
/*
xrFrameSystem2.registerElement('ar-tracker', XRARTracker)
xrFrameSystem2.registerElement('asset-load', XRAssetLoad)
xrFrameSystem2.registerElement('asset-postProcess', XRAssetPostProcess)
xrFrameSystem2.registerElement('asset-render-texture', XRAssetRenderTexture)
xrFrameSystem2.registerElement('assets', XRAssets)
xrFrameSystem2.registerElement('camera', XRCamera)
xrFrameSystem2.registerElement('env', XREnv)
xrFrameSystem2.registerElement('gltf', XRGLTF)
xrFrameSystem2.registerElement('light', XRLight)
xrFrameSystem2.registerElement('asset-material', XRMaterial)
xrFrameSystem2.registerElement('mesh', XRMesh)
xrFrameSystem2.registerElement('node', XRNode)
xrFrameSystem2.registerElement('particle', XRParticle)
xrFrameSystem2.registerElement('shadow', XRShadow)
xrFrameSystem2.registerElement('text', XRText)
*/
// DataViews
xrFrameSystem2.registerDataValue('string', {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return value;
  }
});
xrFrameSystem2.registerDataValue('number', {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return parseFloat(value);
  }
});
xrFrameSystem2.registerDataValue('boolean', {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    if (typeof(value )=="boolean") {
      return value
    }
    return value=="true";
  }
});
xrFrameSystem2.registerDataValue("array", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return value.split(" ");
  }
})
xrFrameSystem2.registerDataValue("number-array", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return value.split(" ").map(v => parseFloat(v));
  }
})

xrFrameSystem2.registerDataValue("color", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return value.split(" ").map(v => parseFloat(v))

  }
})
xrFrameSystem2.registerDataValue("map", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return value.split(",").map(item => item.split(":"))
  }
})
xrFrameSystem2.registerDataValue("dict", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    const dict = {}
    value.split(",").forEach(item => {
      const arr = item.split(":")
      dict[arr[0].trim()] = arr[1].trim()
    })
    return dict
  }
})
/*
xrFrameSystem2.registerDataValue("id", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }
    return scene.getElementById(value);
  }
})*/
xrFrameSystem2.registerDataValue("transform", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }                  
    return scene.getNodeById(value);
  }
})
xrFrameSystem2.registerDataValue("geometry", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return defaultValue
    }                
    const geometry = scene.assets.getAsset("geometry", value)
    return geometry
  }
})
xrFrameSystem2.registerDataValue("effect", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      const effect = scene.assets.getAsset('effect', defaultValue)
      return effect
    }
    const effect = scene.assets.getAsset("effect", value)
    //console.error(value, effect)
    return effect
  }
})
xrFrameSystem2.registerDataValue("material", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      const effect = scene.assets.getAsset('effect', 'standard')
      const material = scene.createMaterial(effect, effect.description.uniforms)
      return material
    }
    const material = scene.assets.getAsset("material", value)
    return material
  }
})
xrFrameSystem2.registerDataValue("gltf", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return null
    }
    const envData = scene.assets.getAsset("gltf", value)
    return envData
  }
})
xrFrameSystem2.registerDataValue("env-data", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      return null
    }
    const envData = scene.assets.getAsset("env-data", value)
    return envData
  }
})
xrFrameSystem2.registerDataValue("render-texture", {
  create: (value, defaultValue, scene) => {
    if (value === undefined) {
      const rt = scene.createRenderTexture({
        width: 2048,
        height: 2048
      });
      return rt
    }
    const rt = scene.createRenderTexture({
      width: 2048,
      height: 2048
    });
    return rt
  }
})
/*
// Effect
xrFrameSystem2.registerEffect("simple", SimpleEffect)
xrFrameSystem2.registerEffect("standard", StandardEffect)
// Geometry
xrFrameSystem2.registerGeometry("cube", CubeGeometry)
xrFrameSystem2.registerGeometry("cylinder", CylinderGeometry)
xrFrameSystem2.registerGeometry("plane", PlaneGeometry)
xrFrameSystem2.registerGeometry("sphere", SphereGeometry)
// AssetLoaders
xrFrameSystem2.registerAssetLoader("atlas", AtlasLoader)
xrFrameSystem2.registerAssetLoader("cube-texture", CubeTextureLoader)
xrFrameSystem2.registerAssetLoader("env-data", EnvDataLoader)
xrFrameSystem2.registerAssetLoader("gltf", GLTFLoader)
xrFrameSystem2.registerAssetLoader("image", ImageLoader)
xrFrameSystem2.registerAssetLoader("keyframe", KeyframeLoader)
xrFrameSystem2.registerAssetLoader("raw", RawLoader)
xrFrameSystem2.registerAssetLoader("texture", TextureLoader)
xrFrameSystem2.registerAssetLoader("video-texture", VideoTextureLoader)
*/
//////////////////////////////////////////////////////////
wx.getXrFrameSystem2 = function () {
  return Object.assign(xrFrameSystem2, Kanata)
}
/////////////////////////////////////////////////////////
export default {

}