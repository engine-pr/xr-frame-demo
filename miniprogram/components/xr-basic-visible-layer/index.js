Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    visibleIndex: {
      type: Number,
      value: 1,
      observer: function (newVal, oldVal) {
        
      }
    },
    cullMask: {
      type: Number,
      value: 0b001,
      observer: function (newVal, oldVal) {
        
      }
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
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`standard-mat`,
						'effect':`standard`,
					});
					shadow_0.addChild(shadow_0_0);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`camera-target`,
					'position':`0 1.25 -5`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
					'visible':`${this.data.visibleIndex === 1}`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-plane`,
						'position':`0 -0.05 -4`,
						'rotation':`0 0 0`,
						'scale':`5 1 5`,
						'geometry':`plane`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.48 0.78 0.64 1`,
					});
					shadow_2.addChild(shadow_2_0);
				}
			}
			{
				const shadow_3 = this.scene.createElement(xrFrameSystem.XRNode,{
					'visible':`${this.data.visibleIndex === 2}`,
				});
				shadow.addChild(shadow_3);
				{
					const shadow_3_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'id':`cube`,
						'node-id':`mesh-cube`,
						'position':`-1 0.5 -3.5`,
						'scale':`1 1 1`,
						'rotation':`0 45 0`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.298 0.764 0.85 1`,
					});
					shadow_3.addChild(shadow_3_0);
				}
			}
			{
				const shadow_4 = this.scene.createElement(xrFrameSystem.XRNode,{
					'layer':`1`,
				});
				shadow.addChild(shadow_4);
				{
					const shadow_4_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-sphere`,
						'position':`0 1.25 -5`,
						'scale':`1.25 1.25 1.25`,
						'geometry':`sphere`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.937 0.176 0.368 1`,
					});
					shadow_4.addChild(shadow_4_0);
				}
				{
					const shadow_4_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'layer':`2`,
					});
					shadow_4.addChild(shadow_4_1);
					{
						const shadow_4_1_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-cylinder`,
							'position':`1 0.7 -3.5`,
							'scale':`1 0.7 1`,
							'geometry':`cylinder`,
							'material':`standard-mat`,
							'uniforms':`u_baseColorFactor:1 0.776 0.364 1`,
						});
						shadow_4_1.addChild(shadow_4_1_0);
					}
				}
			}
			{
				const shadow_5 = this.scene.createElement(xrFrameSystem.XRCamera,{
					'id':`camera`,
					'node-id':`camera`,
					'position':`0 1.6 0`,
					'clear-color':`0.925 0.925 0.925 1`,
					'target':`camera-target`,
					'cull-mask':`${this.data.cullMask}`,
					'camera-orbit-control':``,
				});
				shadow.addChild(shadow_5);
			}
			{
				const shadow_6 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`lights`,
				});
				shadow.addChild(shadow_6);
				{
					const shadow_6_0 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`ambient`,
						'color':`1 1 1`,
						'intensity':`1`,
					});
					shadow_6.addChild(shadow_6_0);
				}
				{
					const shadow_6_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 170 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_6.addChild(shadow_6_1);
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
