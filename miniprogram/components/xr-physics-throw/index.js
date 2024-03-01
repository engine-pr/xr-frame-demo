Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    throwing: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal) this.startThrowing();
          else this.endThrowing();
        }
      }
    }
  },
  data: {
    showTarget: false
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
						'type':`gltf`,
						'asset-id':`anchor`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/ar-plane-marker.glb`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`basket`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/laundry_basket/scene.gltf`,
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
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRPhysics,{
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Plane`,
					});
					shadow_2_0.event.add('ar-tracker-state',(e)=>{
						this.handleARTrackerState({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_0);
					{
						const shadow_2_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'model':`anchor`,
							'wx:if':`${this.data.!showTarget}`,
						});
						shadow_2_0.addChild(shadow_2_0_0);
					}
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`targetTransform`,
					});
					shadow_2.addChild(shadow_2_1);
					{
						const shadow_2_1_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`targetRoot`,
							'wx:if':`${this.data.showTarget}`,
						});
						shadow_2_1.addChild(shadow_2_1_0);
						{
							const shadow_2_1_0_0 = this.scene.createElement(xrFrameSystem.XRNode,{
								'scale':`0.2 0.2 0.2`,
								'position':`0 -0.3 0`,
							});
							shadow_2_1_0.addChild(shadow_2_1_0_0);
							{
								const shadow_2_1_0_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
									'model':`basket`,
								});
								shadow_2_1_0_0.addChild(shadow_2_1_0_0_0);
							}
							{
								const shadow_2_1_0_0_1 = this.scene.createElement(xrFrameSystem.XRNode,{
									'cube-shape':`size: 0.01 3 2`,
									'position':`-1.3 0 0`,
									'shape-interact':`collide: true`,
								});
								shadow_2_1_0_0.addChild(shadow_2_1_0_0_1);
							}
							{
								const shadow_2_1_0_0_2 = this.scene.createElement(xrFrameSystem.XRNode,{
									'cube-shape':`size: 0.01 3 2`,
									'position':`1.3 0 0`,
									'shape-interact':`collide: true`,
								});
								shadow_2_1_0_0.addChild(shadow_2_1_0_0_2);
							}
							{
								const shadow_2_1_0_0_3 = this.scene.createElement(xrFrameSystem.XRNode,{
									'cube-shape':`size: 2.3 3 0.01`,
									'position':`0 0 -1`,
									'shape-interact':`collide: true`,
								});
								shadow_2_1_0_0.addChild(shadow_2_1_0_0_3);
							}
							{
								const shadow_2_1_0_0_4 = this.scene.createElement(xrFrameSystem.XRNode,{
									'cube-shape':`size: 2.3 3 0.01`,
									'position':`0 0 1`,
									'shape-interact':`collide: true`,
								});
								shadow_2_1_0_0.addChild(shadow_2_1_0_0_4);
							}
						}
						{
							const shadow_2_1_0_1 = this.scene.createElement(xrFrameSystem.XRNode,{
								'cube-shape':`size: 10 0.001 10`,
								'position':`0 -0.3 0`,
								'shape-interact':`collide: true`,
							});
							shadow_2_1_0.addChild(shadow_2_1_0_1);
						}
					}
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'clear-color':`0.925 0.925 0.925 1`,
						'position':`0 0 50`,
						'background':`ar`,
						'is-ar-camera':``,
					});
					shadow_2.addChild(shadow_2_2);
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRShadow,{
						'id':`ballRoot`,
						'node-id':`ballRoot`,
					});
					shadow_2.addChild(shadow_2_3);
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

      this.vQueueLength = 5;
      this.vQueue = [];
      this.vQueueHead = 0;
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    },
    handleARTrackerState({detail}) {
      // 事件的值即为`ARTracker`实例
      const tracker = detail.value;
      // 获取当前状态和错误信息
      const {state, errorMessage} = tracker;
      if (state == 2) {
        this.handleARDetected();
      }
    },
    handleARDetected() {
      this.scene.event.addOnce('touchstart', this.placeTarget.bind(this));
    },
    placeTarget() {
      this.scene.ar.placeHere("targetTransform");
      this.setData({
        showTarget: true
      });
      this.triggerEvent("ar_detected");
    },
    startThrowing() {
      if (!this.data.showTarget) return;
      this.makeBall();
    },
    endThrowing() {
      this.releaseBall();
    },
    makeBall() {
      const xr = wx.getXrFrameSystem();
      const el = this.scene.createElement(xr.XRMesh, {
        geometry: "sphere",
        scale: "0.1 0.1 0.1",
        "sphere-shape": "autoFit: true",
        rigidbody: "disabled: true",
        "shape-interact": "collide: true; bounciness: 0.5;"
      });
      const root = this.scene.getElementById("ballRoot");
      root.addChild(el);
      this.placeBall(el.getComponent("transform"));
      this.currentBall = el;
    },
    placeBall(transform) {
      const camera = this.scene.getElementById("camera");
      const cam_trans = camera.getComponent("transform");
      transform.position.set(cam_trans.position.add(cam_trans.worldForward.scale(-1)));
    },
    handleTick: function({detail}) {
      if (this.currentBall) {
        this.placeBall(this.currentBall.getComponent("transform"));
        this.recordPosition(detail);
      }
    },
    releaseBall() {
      if (!this.currentBall) return;
      this.currentBall.getComponent("rigidbody").setData({
        disabled: false
      });
      const r1 = this.vQueue[(this.vQueueHead - 1 + this.vQueueLength) % this.vQueueLength];
      const r2 = this.vQueue[this.vQueueHead];
      if (r1 && r2) {
        const vscale = 1.3; // 初始速度调节
        const v = r1[0].sub(r2[0]).scale(vscale * 1000 / (r1[1] - r2[1]));
        this.currentBall.getComponent("rigidbody").velocity = v;
      }

      this.currentBall = undefined;
      this.vQueue = [];
      this.vQueueHead = 0;
    },
    recordPosition() {
      const transform = this.currentBall.getComponent("transform");
      this.vQueue[this.vQueueHead] = [transform.position.clone(), Date.now()];
      this.vQueueHead = (this.vQueueHead + 1) % this.vQueueLength;
    }
  }
})
