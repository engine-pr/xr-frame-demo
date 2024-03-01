Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    envIndex: {
      type: Number,
      value: 0
    }
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
						'asset-id':`env0`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-scan-test/dayb4.bin`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`env-data`,
						'asset-id':`env1`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-scan-test/nightb1.bin`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`env-data`,
						'asset-id':`env2`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-test.bin`,
					});
					shadow_0.addChild(shadow_0_2);
				}
				{
					const shadow_0_3 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-wxdog`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/model-scan-test/wxdog/index.gltf`,
					});
					shadow_0.addChild(shadow_0_3);
				}
				{
					const shadow_0_4 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-wxmail`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/model-scan-test/wxmail/index.gltf`,
					});
					shadow_0.addChild(shadow_0_4);
				}
				{
					const shadow_0_5 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`standard-mat`,
						'effect':`standard`,
					});
					shadow_0.addChild(shadow_0_5);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'env-data':`env${this.data.envIndex}`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`id2`,
						'position':`0 0 0`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'node-id':`mesh-gltf-wxdog`,
						'position':`-0.4 0 -1`,
						'rotation':`0 55 0`,
						'scale':`0.7 0.7 0.7`,
						'model':`gltf-wxdog`,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'node-id':`mesh-gltf-wxmail`,
						'position':`1 0 1`,
						'rotation':`0 -10 0`,
						'scale':`0.7 0.7 0.7`,
						'model':`gltf-wxmail`,
					});
					shadow_2.addChild(shadow_2_2);
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-floor-wxdog`,
						'position':`-0.35 -0.62 -1`,
						'rotation':`-3 80 -2`,
						'scale':`1 0.02 1.8`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor: 0.32 0.32 0.36 1, u_metallicRoughnessValues: 0 0.1`,
					});
					shadow_2.addChild(shadow_2_3);
				}
				{
					const shadow_2_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-floor-wxmail`,
						'position':`0.95 -0.63 0.9`,
						'rotation':`5 -10 -2`,
						'scale':`0.9 0.02 1.7`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor: 0.32 0.32 0.36 1, u_metallicRoughnessValues: 0 0.1`,
					});
					shadow_2.addChild(shadow_2_4);
				}
				{
					const shadow_2_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-floor-roughmetal`,
						'position':`-0.6 -0.6 0.6`,
						'rotation':`0 -10 0`,
						'scale':`1.6 0.02 1.6`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor: 0.28 0.51 0.34 1, u_metallicRoughnessValues: 0.6 0.1`,
					});
					shadow_2.addChild(shadow_2_5);
				}
				{
					const shadow_2_6 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`-1.4 1.4 1.4`,
						'clear-color':`0.8 0.8 0.8 1`,
						'target':`id2`,
						'far':`2000`,
						'background':`skybox`,
						'camera-orbit-control':``,
					});
					shadow_2.addChild(shadow_2_6);
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
