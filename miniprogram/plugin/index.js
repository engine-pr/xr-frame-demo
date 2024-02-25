import element2component from "./element2component"
const xrFrameSystem = wx.getXrFrameSystem()
// Class
import Vector3 from "./classes/Vector3"
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
  Vector3,
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
  registerComponent(type, clz) {
    onekit.Component[type] = clz
  },
  registerDataValue(type, handler) {
    onekit.DataView[type] = handler
  },
  registerEffect(id, factory) {
    onekit.Effect[id] = factory
  },
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
  getRegisterDataValue(type) {
    return onekit.DataView[type]
  },
  element2component(clz) {
    return element2component(xrFrameSystem2, clz)
  }
}
/////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////
wx.getXrFrameSystem2 = function () {
  return xrFrameSystem2
}