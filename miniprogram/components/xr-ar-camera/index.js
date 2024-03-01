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
						'type':`gltf`,
						'asset-id':`gltf-table`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/metal_table/scene.gltf`,
					});
					shadow_0.addChild(shadow_0_0);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'env-data':`gz-haixinsha`,
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
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`table-wrap`,
						'position':`0 0 0`,
					});
					shadow_2.addChild(shadow_2_1);
					{
						const shadow_2_1_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'node-id':`mesh-gltf-table`,
							'position':`0 -1 0`,
							'rotation':`0 45 0`,
							'scale':`0.5 0.5 0.5`,
							'model':`gltf-table`,
						});
						shadow_2_1.addChild(shadow_2_1_0);
					}
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'position':`2 1 2`,
						'clear-color':`0.925 0.925 0.925 1`,
						'background':`ar`,
						'target':`camera-target`,
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
						'intensity':`0.2`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`180 0 0`,
						'color':`1 1 1`,
						'intensity':`2`,
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
    handleARReady: function({detail}) {
      console.log('ar-ready', this.scene.ar.arModes, this.scene.ar.arVersion);
    },
    handleARError: function({detail}) {
      console.log('ar-error', detail);
    },
    handleLog: function({detail}) {
      const {el, value} = detail;
      console.log('log', detail.value);
    },
  }
})
