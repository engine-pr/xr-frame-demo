export default {
  assetId: {
		type: 'string'
  },
effect: {
  type: 'string',defaultValue:"simple"
},
envData: {
  type: 'env-data'
},
renderQueue: {
  type: 'number'
},
states: {
  type: 'dict',
  defaultValue:{}
},
uniforms: {
  type: "dict",defaultValue:{}
},
marcos:{
  type:"dict",
  defaultValue:{}
}
}