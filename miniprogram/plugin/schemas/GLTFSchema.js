export default {
  model : {
		type: "gltf"
  },
  castShadow :{
    type:"boolean",
    defaultValue:false
  },
  receiveShadow :{
    type:"boolean",
    defaultValue:false
  },
  states: {
		type: "dict",defaultValue:{}
	},
  neverCull :{
    type:"boolean",
    defaultValue:true
  }
}