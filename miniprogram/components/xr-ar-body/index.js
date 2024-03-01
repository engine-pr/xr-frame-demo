Component({
  behaviors: [require('../common/share-behavior').default],
  data: {
    loaded: false,
    arReady: false,
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
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.arReady}`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'id':`tracker`,
						'mode':`Body`,
						'auto-sync':`-1 0 5 6 17 18 11 12 13 14 15 16`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`body`,
							'geometry':`cube`,
							'scale':`0.6 1.7 0.1`,
							'uniforms':`u_baseColorFactor:1 1 1 0.5`,
							'states':`renderQueue:2500,alphaMode:BLEND`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
					}
					{
						const shadow_1_0_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`head`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:1 0 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_1);
					}
					{
						const shadow_1_0_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`shoulderL`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_2);
					}
					{
						const shadow_1_0_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`shoulderR`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_3);
					}
					{
						const shadow_1_0_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`HandL`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_4);
					}
					{
						const shadow_1_0_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`HandR`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_5);
					}
					{
						const shadow_1_0_6 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`crotchL`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_6);
					}
					{
						const shadow_1_0_7 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`crotchR`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_7);
					}
					{
						const shadow_1_0_8 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`kneeL`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_8);
					}
					{
						const shadow_1_0_9 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`kneeR`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_9);
					}
					{
						const shadow_1_0_10 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`footL`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_10);
					}
					{
						const shadow_1_0_11 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`footR`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_11);
					}
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'clear-color':`0.925 0.925 0.925 1`,
						'background':`ar`,
						'is-ar-camera':``,
						'near':`0.01`,
					});
					shadow_1.addChild(shadow_1_1);
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
      xrScene.event.add('tick', this.handleTick.bind(this));
      console.log('xr-scene', xrScene);
    },
    handleAssetsProgress: function ({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function ({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    },
    handleARReady: function ({detail}) {
      console.log('arReady');
      this.setData({arReady: true});
    },
    handleTick: function () {
      const xrSystem = wx.getXrFrameSystem();
      const trackerEl = this.scene.getElementById('tracker');
      if (!trackerEl) {
        return;
      }

      const tracker = trackerEl.getComponent(xrSystem.ARTracker);
      if (!tracker.arActive) {
        return
      }

      // 这里只是例子，实际上用的是`ARTracker`的`autoSync`属性。
      // 但也是一个更高自由度的选项。
      // 视情况需要自己同步`tracker`的`scale`和`rotation`特定节点。
      // 第一个参数是特征点编好，第二个是可选的复用结果，第三个是可选的是否相对于`ARTracker`。
      // 为`false`为世界空间的位置，需要配合`scale`自己使用
      const position = tracker.getPosition(98, new xrSystem.Vector3(), false);
      // 获取总体置信度
      const score = tracker.score;

      this.triggerEvent('info', {score});
    }
  }
})
