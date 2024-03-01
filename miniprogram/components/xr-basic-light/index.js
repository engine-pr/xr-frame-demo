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
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`standard-mat`,
						'effect':`standard`,
					});
					shadow_0.addChild(shadow_0_0);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`camera-target`,
						'position':`0 0 0`,
					});
					shadow_1.addChild(shadow_1_0);
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cube-floor`,
						'position':`2 -1.01 0`,
						'rotation':`0 0 0`,
						'scale':`10 1 10`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.2 0.2 0.2 1`,
						'states':`cullOn: false`,
					});
					shadow_1.addChild(shadow_1_1);
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cube`,
						'position':`0.6 -0.25 0.8`,
						'rotation':`0 30 0`,
						'scale':`0.5 0.5 0.5`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:1 1 1 1`,
					});
					shadow_1.addChild(shadow_1_2);
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-sphere`,
						'position':`2 -0.15 -1`,
						'scale':`0.4 0.4 0.4`,
						'geometry':`sphere`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:1 1 1 1`,
					});
					shadow_1.addChild(shadow_1_3);
				}
				{
					const shadow_1_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cylinder`,
						'position':`-0.2 -0.2 -0.8`,
						'scale':`0.5 0.4 0.5`,
						'geometry':`cylinder`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:1 1 1 1`,
					});
					shadow_1.addChild(shadow_1_4);
				}
				{
					const shadow_1_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cube-far`,
						'position':`3 -0.25 1`,
						'rotation':`0 -30 0`,
						'scale':`0.5 0.5 0.5`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:1 1 1 1`,
					});
					shadow_1.addChild(shadow_1_5);
				}
				{
					const shadow_1_6 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`-2 1 0`,
						'clear-color':`0 0 0 1`,
						'target':`camera-target`,
						'camera-orbit-control':``,
					});
					shadow_1.addChild(shadow_1_6);
				}
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`lights`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`ambient`,
						'color':`1 1 1`,
						'intensity':`0.1`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 170 0`,
						'color':`1 1 1`,
						'intensity':`0.2`,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`point`,
						'position':`0 0 0`,
						'color':`1 0 0`,
						'range':`3`,
						'intensity':`3`,
					});
					shadow_2.addChild(shadow_2_2);
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`point`,
						'position':`2 0 1`,
						'color':`0 1 0`,
						'range':`3`,
						'intensity':`3`,
					});
					shadow_2.addChild(shadow_2_3);
				}
				{
					const shadow_2_4 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`spot`,
						'position':`0 0 0`,
						'color':`0 0 1`,
						'range':`12`,
						'intensity':`12`,
						'rotation':`0 120 0`,
						'inner-cone-angle':`30`,
						'outer-cone-angle':`35`,
					});
					shadow_2.addChild(shadow_2_4);
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
    handleRaf: function({detail}) {
      console.log('raf', detail.value);
    }
  }
})
