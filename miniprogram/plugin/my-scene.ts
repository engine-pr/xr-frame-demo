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
      scene.ui = this
      page.onekit_scene = scene
      page.onekit_assets = {}
      console.log('xr-scene', scene);
      this.shadowRoot = scene.getElementById('shadow-root');
      this._element = this.shadowRoot   
      ////////////////////////////////////////
      this.triggerEvent("ready",{
        value:scene
      })
    },
    onekit_handleTick:function(){

    }
  }
})