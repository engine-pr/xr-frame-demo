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
						'asset-id':`basic-anim`,
						'type':`keyframe`,
						'src':`/assets/animation/basic-animation.json`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`waifu`,
						'src':`/assets/waifu.png`,
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
						'node-id':`mesh-plane`,
						'position':`0 -0.8 0`,
						'rotation':`0 0 0`,
						'scale':`10 1 8`,
						'geometry':`plane`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.48 0.78 0.64 1`,
						'states':`cullOn: false`,
						'anim-keyframe':`basic-anim`,
						'anim-autoplay':`clip:plane, speed:4`,
						'receive-shadow':``,
					});
					shadow_1.addChild(shadow_1_1);
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cube`,
						'position':`-3 0 2`,
						'scale':`1 1 1`,
						'rotation':`0 0 0`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.298 0.764 0.85 1`,
						'anim-keyframe':`basic-anim`,
						'anim-clipmap':`default:cube`,
						'anim-autoplay':`clip:cube, speed:2`,
						'cast-shadow':``,
					});
					shadow_1.addChild(shadow_1_2);
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-sphere`,
						'position':`-3 0 0`,
						'scale':`0.8 0.8 0.8`,
						'geometry':`sphere`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.937 0.176 0.368 1`,
						'anim-keyframe':`basic-anim`,
						'anim-autoplay':`clip:sphere, speed:2`,
						'cast-shadow':``,
					});
					shadow_1.addChild(shadow_1_3);
				}
				{
					const shadow_1_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-cylinder`,
						'position':`-3 0 -2`,
						'scale':`1 0.6 1`,
						'geometry':`cylinder`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:1 0.776 0.364 1`,
						'anim-keyframe':`basic-anim`,
						'anim-autoplay':`clip:cylinder, speed:2`,
						'cast-shadow':``,
					});
					shadow_1.addChild(shadow_1_4);
				}
				{
					const shadow_1_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-light-cube`,
						'position':`-5 1 0`,
						'scale':`0.5 10 10`,
						'rotation':`0 0 0`,
						'geometry':`cube`,
						'material':`standard-mat`,
						'uniforms':`u_baseColorFactor:0.3 0.3 0.3 1, u_baseColorMap: waifu`,
					});
					shadow_1.addChild(shadow_1_5);
				}
				{
					const shadow_1_6 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`5 3 0`,
						'clear-color':`0.925 0.925 0.925 1`,
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
						'intensity':`1`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`30 230 0`,
						'color':`1 1 1`,
						'intensity':`3`,
						'cast-shadow':``,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`spot`,
						'position':`-4 1 0`,
						'rotation':`0 -90 0`,
						'color':`0 1 0`,
						'range':`20`,
						'intensity':`100`,
						'inner-cone-angle':`20`,
						'outer-cone-angle':`60`,
						'anim-keyframe':`basic-anim`,
						'anim-autoplay':`clip:spotLight, speed:2`,
					});
					shadow_2.addChild(shadow_2_2);
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
