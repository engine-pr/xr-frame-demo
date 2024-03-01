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
						'type':`env-data`,
						'asset-id':`sunSet`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-test.bin`,
					});
					shadow_0.addChild(shadow_0_0);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'env-data':`xr-frame-team-workspace-day`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.loaded}`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`center`,
						'position':`0 0 0`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`basic-roughness`,
						'position':`-1.1 0 -1.1`,
						'geometry':`sphere`,
						'uniforms':`u_metallicRoughnessValues: 0 0`,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`basic-metal`,
						'position':`1.1 0 -1.1`,
						'geometry':`sphere`,
						'uniforms':`u_metallicRoughnessValues: 1 0`,
					});
					shadow_2.addChild(shadow_2_2);
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`sunSet-roughness`,
						'env-data':`sunSet`,
						'position':`-1.1 0 1.1`,
						'scale':`1 1 1`,
						'geometry':`sphere`,
						'uniforms':`u_metallicRoughnessValues: 0 0`,
					});
					shadow_2.addChild(shadow_2_3);
				}
				{
					const shadow_2_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`sunSet-metal`,
						'env-data':`sunSet`,
						'position':`1.1 0 1.1`,
						'scale':`1 1 1`,
						'geometry':`sphere`,
						'uniforms':`u_metallicRoughnessValues: 1 0`,
					});
					shadow_2.addChild(shadow_2_4);
				}
				{
					const shadow_2_5 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`4 4 4`,
						'clear-color':`0.1 0.1 0.1 1`,
						'target':`center`,
						'near':`0.1`,
						'far':`2000`,
						'background':`skybox`,
						'camera-orbit-control':``,
					});
					shadow_2.addChild(shadow_2_5);
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
						'rotation':`20 120 0`,
						'color':`1 1 1`,
						'intensity':`1`,
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
    }
  }
})
