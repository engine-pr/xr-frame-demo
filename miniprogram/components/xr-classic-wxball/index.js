Component({
  behaviors: [require('../common/share-behavior').default],
  wxball: null,
  wxballTransform: null,
  wxballAnimator: null,
  animationRuning: false,
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
						'asset-id':`gltf-wxball`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/wxball/wxball.gltf`,
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
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`OSD`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/wxball.jpg`,
					});
					shadow_2.addChild(shadow_2_0);
					{
						const shadow_2_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`wxball`,
							'node-id':`mesh-gltf-wxball`,
							'position':`0 -0.1 0`,
							'rotation':`-45 30 0`,
							'scale':`0.16 0.16 0.16`,
							'model':`gltf-wxball`,
							'sphere-shape':`radius: 1.5`,
						});
						shadow_2_0_0.event.add('gltf-loaded',(e)=>{
							this.handleGltfLoaded({detail:{value:e}});
						});
						shadow_2_0_0.event.add('touch-shape',(e)=>{
							this.handleTouchWXball({detail:{value:e}});
						});
						shadow_2_0_0.event.add('anim-stop',(e)=>{
							this.handleAnimationStop({detail:{value:e}});
						});
						shadow_2_0.addChild(shadow_2_0_0);
					}
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`1 1 1`,
						'clear-color':`0.925 0.925 0.925 1`,
						'far':`2000`,
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

      const xrFrameSystem = wx.getXrFrameSystem();

      this.wxball = xrScene.getElementById('wxball');

      this.wxballTransform = this.wxball.getComponent(xrFrameSystem.Transform);
      this.wxballTransform.visible = false;


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
    handleGltfLoaded: function() {
      const xrScene = this.scene;

      const xrFrameSystem = wx.getXrFrameSystem();
      
      this.wxball = xrScene.getElementById('wxball');

      this.wxballAnimator = this.wxball.getComponent(xrFrameSystem.Animator);

      this.wxballAnimator.play('gltfAnimation', {
        loop: 0,
      });

      this.wxballAnimator.play('gltfAnimation#0', {
        loop: 0,
      });

      this.wxballAnimator.pauseToFrame('gltfAnimation', 1);
      this.wxballAnimator.pauseToFrame('gltfAnimation#0', 1);

      this.wxballTransform.visible = true;

    },
    handleTouchWXball: function() {
     
      if (!this.animationRuning) {
        console.log('WXBALL TOUCH');

        this.animationRuning = true;

        this.wxballAnimator.pauseToFrame('gltfAnimation', 1);
        this.wxballAnimator.pauseToFrame('gltfAnimation#0', 1);
        
        this.wxballAnimator.resume('gltfAnimation');
        this.wxballAnimator.resume('gltfAnimation#0');
      }
    },
    handleAnimationStop: function() {
      console.log('animation Stop');
    }
  }
})
