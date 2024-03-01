Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    a: Number,
  },
  data: {
    loaded: false
  },
  lifetimes: {},
  methods: {
    handleReady({detail}) {
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
						'asset-id':`cat`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/videos/cat.mp4`,
						'options':`autoPlay:true,loop:true,abortAudio:false,placeHolder:https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/videos/cat.jpg`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`video-texture`,
						'asset-id':`skybox`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/videos/office-skybox.mp4`,
						'options':`autoPlay:true,loop:true,placeHolder:https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/videos/office-skybox.jpg`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`standard-mat`,
						'effect':`standard`,
					});
					shadow_0.addChild(shadow_0_2);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'sky-map':`video-skybox`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`target`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cube`,
						'scale':`1.6 0.9 0.9`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorMap:video-cat`,
						'cube-shape':`autoFit:true`,
					});
					shadow_2_1.event.add('touch-shape',(e)=>{
						this.handleTouchCube({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 0 3`,
						'clear-color':`0.925 0.925 0.925 1`,
						'target':`target`,
						'background':`skybox`,
						'camera-orbit-control':``,
					});
					shadow_2.addChild(shadow_2_2);
				}
			}
			{
				const shadow_3 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`lights`,
				});
				shadow.addChild(shadow_3);
				{
					const shadow_3_0 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`ambient`,
						'color':`1 1 1`,
						'intensity':`1`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 0 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_3.addChild(shadow_3_1);
				}
			}
      console.log('xr-scene', xrScene);
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    },
    handleTouchCube: async function() {
      const xrSystem = wx.getXrFrameSystem();
      const video = this.scene.assets.getAsset('video-texture', 'cat');

      if (!video) {
        return;
      }

      if (video.state === xrSystem.EVideoState.Playing) {
        video.pause();
      } else if (video.state === xrSystem.EVideoState.Paused) {
        video.resume();
      }
    }
  }
})
