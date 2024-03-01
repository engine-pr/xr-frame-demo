Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    markerImg: {
      type: String
    },
  },
  data: {
    loaded: false,
    arReady: false,
  },
  lifetimes: {
    attached() {
      console.log('data', this.data)
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
						'type':`gltf`,
						'asset-id':`gltf`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/butterfly/index.glb`,
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
					'wx:if':`${this.data.arReady}`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Marker`,
						'src':`${this.data.markerImg}`,
					});
					shadow_2.addChild(shadow_2_0);
					{
						const shadow_2_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`gltf`,
							'anim-autoplay':``,
							'position':`0.2 0 -0.2`,
							'scale':`0.6 0.6 0.6`,
							'rotation':`0 -50 0`,
						});
						shadow_2_0.addChild(shadow_2_0_0);
					}
					{
						const shadow_2_0_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`gltf`,
							'anim-autoplay':``,
							'position':`0.4 0 0.3`,
							'scale':`0.5 0.5 0.5`,
							'rotation':`0 -50 0`,
						});
						shadow_2_0.addChild(shadow_2_0_1);
					}
					{
						const shadow_2_0_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`gltf`,
							'anim-autoplay':``,
							'position':`-0.3 0 0.3`,
							'scale':`0.4 0.4 0.4`,
							'rotation':`0 -50 0`,
						});
						shadow_2_0.addChild(shadow_2_0_2);
					}
					{
						const shadow_2_0_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-x`,
							'position':`1 0 0`,
							'scale':`2 0.02 0.02`,
							'geometry':`cube`,
							'uniforms':`u_baseColorFactor:0.7 0.3 0.3 1`,
						});
						shadow_2_0.addChild(shadow_2_0_3);
					}
					{
						const shadow_2_0_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-y`,
							'position':`0 1 0`,
							'scale':`0.02 2 0.02`,
							'geometry':`cube`,
							'uniforms':`u_baseColorFactor:0.3 0.7 0.3 1`,
						});
						shadow_2_0.addChild(shadow_2_0_4);
					}
					{
						const shadow_2_0_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-z`,
							'position':`0 0 1`,
							'scale':`0.02 0.02 2`,
							'geometry':`cube`,
							'uniforms':`u_baseColorFactor:0.3 0.3 0.7 1`,
						});
						shadow_2_0.addChild(shadow_2_0_5);
					}
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0.8 2.2 -5`,
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
						'intensity':`1`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`180 0 0`,
						'color':`1 1 1`,
						'intensity':`3`,
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
    },
    handleARReady: function ({
      detail
    }) {
      console.log('arReady');
      this.setData({
        arReady: true
      })
    }
  }
})
