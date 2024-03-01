Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {},
  data: {
    loaded: false
  },
  lifetimes: {},
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
						'type':`env-data`,
						'asset-id':`env1`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-test.bin`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-damageHelmet`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/damage-helmet/index.glb`,
					});
					shadow_0.addChild(shadow_0_1);
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
					'node-id':`target`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'model':`gltf-damageHelmet`,
						'position':`2 0 0`,
						'auto-rotate':`speed:2 1 3`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRAutoRotateTouchableGltf,{
						'id':`artg`,
						'position':`-2 0 0`,
						'model':`gltf-damageHelmet`,
						'speed':`1 0 0`,
					});
					shadow_2_1.event.add('drag-shape',(e)=>{
						this.handleDrag({detail:{value:e}});
					});
					shadow_2_1.event.add('touch-shape',(e)=>{
						this.handleTouchStart({detail:{value:e}});
					});
					shadow_2_1.event.add('untouch-shape',(e)=>{
						this.handleTouchEnd({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 0 8`,
						'clear-color':`0.925 0.925 0.925 1`,
						'background':`skybox`,
						'target':`target`,
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
						'intensity':`1`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 170 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_3.addChild(shadow_3_1);
				}
			}
      this.rotSpeed = 1;
      this.rotAxis = 0;
    },
    handleTouchStart: function({detail}) {
      console.log('touch start', detail.value);
    },
    handleTouchEnd: function({detail}) {
      console.log('touch end', detail.value);
      this.rotAxis += 1;
      if (this.rotAxis >= 3) {
        this.rotAxis = 0;
      }

      this.changeSpeed();
    },
    handleDrag: function({detail}) {
      const info = detail.value;
      console.log('drag', info);
      this.rotSpeed += info.deltaX / this.scene.width;
      this.changeSpeed();
    },
    changeSpeed() {
      const xrSystem = wx.getXrFrameSystem();
      const el = this.scene.getElementById('artg');
      const comp = el.getComponent('auto-rotate');
      
      if (comp) {
        comp.setData({speed: [0, 0, 0].map((_, i) => i === this.rotAxis ? this.rotSpeed : 0)});
      }
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    },
    handleLog: function({detail}) {
      console.log('log', detail.value);
    }
  }
})
