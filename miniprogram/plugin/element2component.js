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
    switch (k) {
     /* case "marcos":
        //console.error(element)
        //element.setMacros(v)
        return
      case "uniforms":
        return
        if (element.material) {
          element = element.material
        }
        console.error(element)
        v.split(",").forEach(pair => {
          const k_v = pair.split(":")
          const u_k = k_v[0].trim()
          const u_v = k_v[1].trim()
          if (u_k.indexOf("Map") >= 0) {
            element.setTexture(u_k, u_v);
          } else {
            element.setFloat(u_k, u_v);
          }
        })
        return
      case "states":
        return
      case "envData":
        return*/
    }
    
    const caml_k = core.String.toHump(k)
    const schema = component.schema[caml_k]
    const dataType = core.String.fromHump(schema.type)
    console.error(dataType,v,schema.defaultValue)
    const dataView = xrFrameSystem2.getRegisterDataValue(dataType)
    
    const value = dataView.create(v, schema.defaultValue, scene)
    //
    

    switch (k) {
      /*
      case "visible":
        console.error(element,k,v,value)
        const transform = element.getComponent(xrFrameSystem.Transform)
        transform.visible = value
        return*/
      /*case "position":
        case "position":
        component[k].setValue.apply(component[k], value)
        return*/
     /* case "material":
        element.material = value
        break
       */ 
      /*case "geometry":
       // console.error(element,value)
        element.geometry = value
        break*/
      /*case "effect":
        element.initByEffect(value);
        break
        */
       /*
        case "uniforms":
          //component = element.getComponent(xrFrameSystem.Material)
          element = element.material
          console.error(element)
          value.forEach(k_v => {
            const u_k = k_v[0]
            const u_v = k_v[1]
         //   console.error(u_k,u_v)
            if (u_k.indexOf("Map") >= 0) {
              element.setTexture(u_k, u_v);
            } else {
              element.setFloat(u_k, u_v);
            }
          })
          break*/
      default:
        console.error("[2]", element._type, k, dataType, value)
        component.setDataOne(k, value)
        break
    }
    //return value
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
          //return
        }
       // console.error(proName_caml,propValue,component)
        updateComponentData(scene, this._element, componentName_caml, component, componentKey_caml, propValue)
      } else {
        console.error("[??????????????????]", this.properties.TYPE, propName, dataMappingDictKey, this._element.dataMapping)

      }
      /*
      console.error(this.properties.CLASS_NAME,componentName_caml)
      const componentClass = xrFrameSystem[componentName_caml]
      console.error(componentClass)
			const component = this._element.getComponent(componentClass)
      const schema = component.schema
      //
      var data = {}
      const componentPropValue = updateComponentData(scene,component,componentName_caml, propValue || schema.defaultValue)
      //console.error("dataMappings2properties",componentName_caml,propValue,componentPropValue)
      data[componentName_caml] = componentPropValue
      component.setData(data)*/
		}
  }
  //console.error(temp.dataMapping)
  Object.keys(temp.dataMapping).forEach(dataMappings2properties)
  if(CLASS_NAME=="XRCamera"){
    properties.cameraOrbitControl = {
      type: String
    }
  }
  return {
    behaviors: [require('xr-')],
    properties,
    observers,
    methods: {
      /*
      setProperty(scene, propName, propValue) {
        if (propValue == null) {
          return
        }
        const dataMappingDictKey = core.String.fromHump(propName)
        const dataMapping = this._element.dataMapping[dataMappingDictKey]
        if (dataMapping) {
          const [componentName_no_caml, componentKey_caml] = dataMapping
          const componentName_caml = core.String.toHump(componentName_no_caml, true)
          const componentClass = xrFrameSystem[componentName_caml]
          //
          var component = this._element.getComponent(componentClass, {})
          if (!component) {
            component = this._element.addComponent(componentClass)
            //console.error("[!!!!!!!!!!!!!]",this.properties.CLASS_NAME,propName,componentName_caml)
            //return
          }
          updateComponentData(scene, this._element, componentName_caml, component, componentKey_caml, propValue)
        } else {
          console.error("[??????????????????]", this.properties.TYPE, propName, dataMappingDictKey, this._element.dataMapping)

        }
      }*/
    }
  }
}