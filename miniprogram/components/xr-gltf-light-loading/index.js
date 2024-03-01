Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
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
						'asset-id':`gltf-anim`,
						'type':`keyframe`,
						'src':`/assets/animation/gltf-animation.json`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-Sponza`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/Sponza/glTF/Sponza.gltf`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.loaded}`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`camera-target`,
						'position':`0 2 0`,
					});
					shadow_1.addChild(shadow_1_0);
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'node-id':`mesh-gltf-Sponza`,
						'position':`0 -2 0.3`,
						'rotation':`0 0 0`,
						'scale':`2 2 2`,
						'model':`gltf-Sponza`,
					});
					shadow_1.addChild(shadow_1_1);
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`-1 2 0`,
						'clear-color':`0.925 0.925 0.925 1`,
						'draw-sky':``,
						'target':`camera-target`,
						'far':`1000`,
						'camera-orbit-control':``,
					});
					shadow_1.addChild(shadow_1_2);
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
						'intensity':`0.8`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`120 -40 0`,
						'color':`1 1 1`,
						'intensity':`4`,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`point`,
						'position':`10 0 0`,
						'color':`1 1 1`,
						'range':`10`,
						'intensity':`30`,
						'anim-keyframe':`gltf-anim`,
						'anim-autoplay':`clip:pointLight, speed:2`,
					});
					shadow_2.addChild(shadow_2_2);
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`spot`,
						'color':`0.8 0.8 0.2`,
						'position':`10 4 -0.3`,
						'range':`20`,
						'intensity':`100`,
						'rotation':`16 90 0`,
						'inner-cone-angle':`5`,
						'outer-cone-angle':`24`,
					});
					shadow_2.addChild(shadow_2_3);
				}
			}
      console.log('xr-scene', xrScene);
    },
    handleAssetsProgress: function({detail}) {
      this.triggerEvent('assetsProgress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      this.triggerEvent('assetsLoaded', detail.value);
    },
    handleRaf: function({detail}) {
      console.log('raf', detail.value);
    }
  }
})
