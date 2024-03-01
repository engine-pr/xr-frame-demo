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
						'asset-id':`anim`,
						'type':`keyframe`,
						'src':`/assets/animation/miku-kawaii-animation.json`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`cloud-station`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/cloud-station/index.glb`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`miku-kawaii`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/shiteyanyo-hatsune-miku/index.glb`,
					});
					shadow_0.addChild(shadow_0_2);
				}
				{
					const shadow_0_3 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`miku`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/miku.glb`,
					});
					shadow_0.addChild(shadow_0_3);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`target`,
						'position':`0 1 0`,
					});
					shadow_1.addChild(shadow_1_0);
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'position':`0 0 0`,
						'scale':`1 1 1`,
						'model':`cloud-station`,
						'anim-autoplay':``,
					});
					shadow_1.addChild(shadow_1_1);
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'position':`1.8 -0.5 1.5`,
						'scale':`0.12 0.12 0.12`,
						'rotation':`0 180 0`,
						'model':`miku`,
						'anim-autoplay':``,
					});
					shadow_1.addChild(shadow_1_2);
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRNode,{
						'anim-keyframe':`anim`,
						'anim-autoplay':`clip:parent`,
					});
					shadow_1.addChild(shadow_1_3);
					{
						const shadow_1_3_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'position':`0 -0.5 3`,
							'rotation':`0 90 0`,
							'anim-keyframe':`anim`,
							'anim-autoplay':`clip:child`,
						});
						shadow_1_3.addChild(shadow_1_3_0);
						{
							const shadow_1_3_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
								'model':`miku-kawaii`,
								'anim-keyframe':`anim`,
								'anim-autoplay':``,
							});
							shadow_1_3_0.addChild(shadow_1_3_0_0);
						}
					}
				}
				{
					const shadow_1_4 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 1 7`,
						'clear-color':`0.925 0.925 0.925 1`,
						'target':`target`,
						'background':`default`,
						'camera-orbit-control':``,
					});
					shadow_1.addChild(shadow_1_4);
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
						'rotation':`40 180 0`,
						'color':`1 1 1`,
						'intensity':`2`,
					});
					shadow_2.addChild(shadow_2_1);
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
