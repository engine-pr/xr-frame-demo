import { core } from "dhtml-weixin"
Component({
  behaviors: [
    require('./share-behavior').default,
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
    },
    renderSystem:{type:String,value:"alpha:true"}
  },
  data: {
    loaded: false
  },
  methods: {
    async onekit_handleReady({ detail }) {
      const page = core.Page.current
      const scene = detail.value;
      page.onekit_scene = scene
      page.onekit_uis = {}
      page.onekit_assets = {}
      page.onekit_users = {}
      this.onekit_count0 = 0
      this.onekit_count = 0
      this._element = scene.getElementById('onekit-root');
      scene.getElementById = function (id) {
        const ui = page.onekit_uis[id]
        return ui._element
      }
      ////////////////////////////////////////
      const timer = setInterval(() => {
        if (this.onekit_count0 != this.onekit_count) {
          this.onekit_count0 = this.onekit_count
          return
        }
        if (this.onekit_count == 0) {
          return
        }
        clearInterval(timer)       
        this.done = true 
        console.error("============= ready")
        this.triggerEvent("ready", {
          value: scene
        })
      }, 2000)

    },
    onekit_handleTick: function ({detail}) {
      if(!this.done){
        return
      }
      this.triggerEvent("tick",detail)
    }
  }
})