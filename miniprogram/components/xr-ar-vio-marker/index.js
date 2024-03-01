Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    a: Number,
  },
  data: {
    loaded: false,
    arReady: false,
  },
  lifetimes: {
    async attached() {
      console.log('data', this.data)
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
						'asset-id':`anchor`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/ar-plane-marker.glb`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-item`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/just_a_girl/index.glb`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`butterfly`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/butterfly/index.glb`,
					});
					shadow_0.addChild(shadow_0_2);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Marker`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/marker/2dmarker-test.jpg`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`butterfly`,
							'anim-autoplay':``,
							'position':`0.2 0 -0.2`,
							'scale':`0.6 0.6 0.6`,
							'rotation':`0 -50 0`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
					}
					{
						const shadow_1_0_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`butterfly`,
							'anim-autoplay':``,
							'position':`0.4 0 0.3`,
							'scale':`0.5 0.5 0.5`,
							'rotation':`0 -50 0`,
						});
						shadow_1_0.addChild(shadow_1_0_1);
					}
					{
						const shadow_1_0_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`butterfly`,
							'anim-autoplay':``,
							'position':`-0.3 0 0.3`,
							'scale':`0.4 0.4 0.4`,
							'rotation':`0 -50 0`,
						});
						shadow_1_0.addChild(shadow_1_0_2);
					}
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Plane`,
					});
					shadow_1.addChild(shadow_1_1);
					{
						const shadow_1_1_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`anchor`,
						});
						shadow_1_1.addChild(shadow_1_1_0);
					}
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`setitem`,
						'visible':`false`,
					});
					shadow_1.addChild(shadow_1_2);
					{
						const shadow_1_2_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`gltf-item`,
							'scale':`0.006 0.006 0.006`,
						});
						shadow_1_2.addChild(shadow_1_2_0);
					}
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'clear-color':`0.925 0.925 0.925 1`,
						'background':`ar`,
						'is-ar-camera':``,
					});
					shadow_1.addChild(shadow_1_3);
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
						'rotation':`180 0 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_2.addChild(shadow_2_1);
				}
			}
      this.mat = new (wx.getXrFrameSystem().Matrix4)();
      console.log('xr-scene', xrScene);
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      // this.setData({loaded: true});
      this.scene.event.addOnce('touchstart', this.placeNode.bind(this));
    },
    handleARReady: function({detail}) {
      console.log('arReady', this.scene.ar.arVersion);
    },
    placeNode(event) {
      const {clientX, clientY} = event.touches[0];
      const {frameWidth: width, frameHeight: height} = this.scene;

      if (clientY / height > 0.8 && clientX / width < 0.2) {
        this.scene.getNodeById('setitem').visible = false;
        this.scene.ar.resetPlane();
      } else {
        this.scene.ar.placeHere('setitem', true);
      }

      this.scene.event.addOnce('touchstart', this.placeNode.bind(this));
    }
  }
})
