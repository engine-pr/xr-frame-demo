Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    a: Number,
  },
  data: {
    loaded: false
  },
  lifetimes: {
    attached() {
      console.log('data.a', this.data.a) // expected 123
    }
  },
  methods: {
    handleReady: function({detail}) {
      this.scene = detail.value;
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
						'type':`env-data`,
						'asset-id':`env1`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-test.bin`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-damageHelmet`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/damage-helmet/index.gltf`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'env-data':`env1`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`camera-target`,
						'position':`0 0 0`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'node-id':`gltf-damageHelmet`,
						'position':`0 0 0`,
						'rotation':`0 0 0`,
						'scale':`1.2 1.2 1.2`,
						'model':`gltf-damageHelmet`,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 0 3`,
						'clear-color':`0.925 0.925 0.925 1`,
						'near':`0.1`,
						'far':`2000`,
						'target':`camera-target`,
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
						'intensity':`0.3`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 180 0`,
						'color':`1 1 1`,
						'intensity':`2`,
					});
					shadow_3.addChild(shadow_3_1);
				}
			}
      console.log('scene', detail.value);
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    },
    handleRaf: function({detail}) {
      console.log('raf', detail.value);
    }
  }
})
