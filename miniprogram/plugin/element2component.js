import {
  core
} from "dhtml-weixin"
import {
  getFunctionName
} from "./core/strict"
const xrFrameSystem = wx.getXrFrameSystem()
export default function element2component(xrFrameSystem2, elementClass) {
  const CLASS_NAME = getFunctionName(elementClass)
  //
  var TYPE = CLASS_NAME
  if (CLASS_NAME.startsWith("XR")) {
    TYPE = TYPE.substr(2)
  }
  TYPE = TYPE.toLowerCase()
  //
  const properties = {
    CLASS_NAME: {
      type: String,
      value: CLASS_NAME
    },
    TYPE: {
      type: String,
      value: TYPE
    }
  }
  const observers = {}
  const temp = elementClass.prototype

  function updateComponentData(scene, element, componentName, component, k, v) {
    const caml_k = core.String.toHump(k)
    const schema = component.schema[caml_k]
    const dataType = core.String.fromHump(schema.type)
    const dataView = xrFrameSystem2.getRegisterDataValue(dataType)
    const value = dataView.create(v, schema.defaultValue, scene)
    switch (k) {
      default:
        //console.error("[2]", element._type, k, dataType, value)
        component.setDataOne(k, value)
        break
    }
  }

  function dataMappings2properties(proName_no_caml) {
    const [componentName_no_caml, componentKey_caml] = temp.dataMapping[proName_no_caml]
    const proName_caml = core.String.toHump(proName_no_caml)
    properties[proName_caml] = {
      type: String
    }
		observers[proName_caml] = function (propValue) {
			if (!this._element) {
				return
      }
      const scene = core.Page.current.onekit_scene
      const dataMapping = this._element.dataMapping[proName_no_caml]
      if (dataMapping) {
        const [componentName_no_caml, componentKey_caml] = dataMapping
        const componentName_caml = core.String.toHump(componentName_no_caml, true)
        const componentClass = xrFrameSystem[componentName_caml]
        //
        var component = this._element.getComponent(componentClass, {})
        if (!component) {
          component = this._element.addComponent(componentClass)
          console.error("[!!!!!!!!!!!!!]",this.properties.CLASS_NAME,propName,componentName_caml)
        }
        updateComponentData(scene, this._element, componentName_caml, component, componentKey_caml, propValue)
      } else {
        console.error("[??????????????????]", this.properties.TYPE, propName, dataMappingDictKey, this._element.dataMapping)
      }
		}
  }
  Object.keys(temp.dataMapping).forEach(dataMappings2properties)
  if(CLASS_NAME=="XRCamera"){
    properties.cameraOrbitControl = {
      type: String
    }
  }
  return {
    behaviors: [require('xr-')],
    properties,
    observers
  }
}