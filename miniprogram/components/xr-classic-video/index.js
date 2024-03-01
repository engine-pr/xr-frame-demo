Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {},
  data: {
    loaded: false,
    arReady: false,
  },
  lifetimes: {
    async attached() {
      console.log('data', this.data);
    }
  },
  methods: {
    handleReady: function ({detail}) {
      const xrScene = this.scene = detail.value;
      const xrFrameSystem = wx.getXrFrameSystem();
      const shadow = this.scene.getElementById('shadow');
			{
				const shadow_0 = this.scene.createElement(xrFrameSystem.XRAssets,{
				});
				shadow_0.event.add('progress',(e)=>{
					this.handleAssetsProgress({detail:{value:e}});
				});
				shadow_0.event.add('loaded',(e)=>{
					this.handleAssetsLoaded({detail:{value:e}});
				});
				shadow.addChild(shadow_0);
				{
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`video-texture`,
						'asset-id':`hikari`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/2dmarker/hikari-v.mp4`,
						'options':`loop:true`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`mat`,
						'effect':`simple`,
						'uniforms':`u_baseColorMap: video-hikari`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.loaded}`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Marker`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/2dmarker/hikari.jpg`,
					});
					shadow_1_0.event.add('ar-tracker-switch',(e)=>{
						this.handleTrackerSwitch({detail:{value:e}});
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-plane`,
							'geometry':`plane`,
							'material':`mat`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
					}
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`1 1 1`,
						'clear-color':`0.925 0.925 0.925 1`,
						'background':`ar`,
						'is-ar-camera':``,
					});
					shadow_1.addChild(shadow_1_1);
				}
			}
      console.log('xr-scene', xrScene);
    },
    handleAssetsProgress: function ({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function ({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({
        loaded: true
      });
    },
    handleTrackerSwitch: function ({detail}) {
      const active = detail.value;
      console.log('handleTrackerSwitch', detail);
      const video = this.scene.assets.getAsset('video-texture', 'hikari');
      if (active) {
        video.play();
      } else {
        video.stop();
      }
    }
  }
})
