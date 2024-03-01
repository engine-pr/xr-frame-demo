Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    captureState: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === 1) {
            this.capture();
          }
        }
      },
    },
    recordState: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === 0) {
            this.recordEnd();
          } else {
            this.recordStart();
          }
        }
      }
    },
    captureQuality: {
      type: Number,
      value: 0.8,
    },
    captureType: {
      type: String,
      value: 'jpg',
    },
    recordFPS: {
      type: Number,
      value: 30,
    },
    recordWidth: {
      type: Number,
      value: undefined,
    },
    recordHeight: {
      type: Number,
      value: undefined,
    },
    recordBPS: {
      type: Number,
      value: 1000,
    },
  },
  data: {
    loaded: false
  },
  lifetimes: {},
  methods: {
    handleReady({detail}) {
      const scene = this.scene = detail.value;
      const xrFrameSystem = wx.getXrFrameSystem();
      const shadow = this.scene.getElementById('shadow');
			{
				const shadow_0 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
					'type':`gltf`,
					'asset-id':`clock`,
					'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/clock/scene.gltf`,
				});
				shadow.addChild(shadow_0);
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRLight,{
					'type':`ambient`,
					'color':`1 1 1`,
					'intensity':`1`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRLight,{
					'type':`directional`,
					'rotation':`40 70 0`,
					'color':`1 1 1`,
					'intensity':`3`,
					'cast-shadow':``,
				});
				shadow.addChild(shadow_2);
			}
			{
				const shadow_4 = this.scene.createElement(xrFrameSystem.XRGLTF,{
					'model':`clock`,
					'scale':`0.1 0.1 0.1`,
					'rotation':`90 0 0`,
					'anim-autoplay':``,
				});
				shadow.addChild(shadow_4);
			}
			{
				const shadow_5 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`target`,
				});
				shadow.addChild(shadow_5);
			}
			{
				const shadow_6 = this.scene.createElement(xrFrameSystem.XRCamera,{
					'node-id':`camera`,
					'clear-color':`0.4 0.8 0.6 1`,
					'position':`0 0 4`,
					'target':`target`,
					'camera-orbit-control':``,
				});
				shadow.addChild(shadow_6);
			}
      const appHide = () => this.scene.share.recordPause();
      const appShow = () => this.scene.share.recordResume();
      wx.onAppHide(appHide);
      wx.onAppShow(appShow);
      wx.offAppHide(appHide);
      wx.offAppShow(appShow);
      
      this.triggerEvent('sceneReady', {width: scene.width, height: scene.height});
    },
    capture() {
      this.scene.share.captureToFriends({
        fileType: this.data.captureType,
        quality: this.data.captureQuality
      });
    },
    recordStart() {
      console.log('recordStart')
      this.scene.share.recordStart({
        fps: this.data.recordFPS,
        videoBitsPerSecond: this.data.recordBPS,
        width: this.data.recordWidth,
        height: this.data.recordHeight
      });
    },
    recordEnd() {
      console.log('recordEnd')
      this.scene.share.recordFinishToAlbum();
    }
  }
})
