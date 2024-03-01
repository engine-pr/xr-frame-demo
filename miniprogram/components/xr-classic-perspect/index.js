Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
  },
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
    handleReady({
      detail
    }) {
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
						'asset-id':`env1`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-test.bin`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-fiesta_tea`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/fiesta_tea/scene.gltf`,
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
					'env-data':`env1`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.loaded}`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Marker`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/portalImage.jpg`,
					});
					shadow_2.addChild(shadow_2_0);
					{
						const shadow_2_0_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'scale':`1 1 1`,
						});
						shadow_2_0.addChild(shadow_2_0_0);
						{
							const shadow_2_0_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
								'node-id':`mesh-gltf-fiesta_tea`,
								'position':`0 -1.6 1`,
								'rotation':`-90 0 0`,
								'scale':`0.6 0.6 0.6`,
								'model':`gltf-fiesta_tea`,
								'states':`stencilTestOn: true, stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
							});
							shadow_2_0_0.addChild(shadow_2_0_0_0);
						}
						{
							const shadow_2_0_0_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`plane-cull`,
								'position':`0 0 0`,
								'rotation':`0 0 0`,
								'scale':`1 0.1 0.9`,
								'geometry':`plane`,
								'states':`renderQueue: 1, stencilTestOn: true, stencilComp: 7, stencilRef: 1, stencilReadMask: 1, stencilWriteMask: 1, stencilPass: 1, stencilFail: 2, stencilZFail: 2`,
							});
							shadow_2_0_0.addChild(shadow_2_0_0_1);
						}
					}
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`2 0.4 0`,
						'clear-color':`0.925 0.925 0.925 1`,
						'background':`ar`,
						'is-ar-camera':``,
					});
					shadow_2.addChild(shadow_2_1);
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
						'rotation':`30 60 0`,
						'color':`1 1 1`,
						'intensity':`1`,
					});
					shadow_3.addChild(shadow_3_1);
				}
			}
      console.log('xr-scene', xrScene);


    },
    handleAssetsProgress: function ({
      detail
    }) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function ({
      detail
    }) {
      console.log('assets loaded', detail.value);
      this.setData({
        loaded: true
      });
    }

  }
})
