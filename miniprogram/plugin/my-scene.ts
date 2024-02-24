import {core} from "dhtml-weixin"
Component({
  behaviors: [
    require('../components/common/share-behavior').default,
    require("xr")
  ],
  properties: {
		CLASS_NAME: {
			type: String,
			value: "Scene"
    },
    TYPE: {
			type: String,
			value: "scene"
		}
  },
  data: {
    loaded: false
  },
  lifetimes: {},
  methods: {
    async onekit_handleReady({detail}) {
      const page = core.Page.current
      const scene = detail.value;
      page.onekit_scene = scene
      page.onekit_elements = {}
      page.onekit_assets = {}
      this._element = scene.getElementById('onekit-root');
      scene.getElementById = function(id){
        const element = page.onekit_elements[id]
        return element
      }
      ////////////////////////////////////////

      this.triggerEvent("ready",{
        value:scene
      })
      
    },
    onekit_handleTick:function(){

    }
  }
})