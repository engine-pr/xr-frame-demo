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
						'mode':`Hand`,
						'auto-sync':`-1 0 9 4 8 12 16 20`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`hand`,
							'geometry':`cube`,
							'scale':`0.7 0.8 0.1`,
							'uniforms':`u_baseColorFactor:1 1 1 0.5`,
							'states':`renderQueue:2500,alphaMode:BLEND`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
					}
					{
						const shadow_1_0_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`wrist`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:1 0 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_1);
					}
					{
						const shadow_1_0_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`joint`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 1 0 1`,
						});
						shadow_1_0.addChild(shadow_1_0_2);
					}
					{
						const shadow_1_0_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`thumb`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_3);
					}
					{
						const shadow_1_0_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`index`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_4);
					}
					{
						const shadow_1_0_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`middle`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_5);
					}
					{
						const shadow_1_0_6 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`ring`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_6);
					}
					{
						const shadow_1_0_7 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'name':`little`,
							'geometry':`sphere`,
							'scale':`0.05 0.05 0.05`,
							'uniforms':`u_baseColorFactor:0 0 1 1`,
						});
						shadow_1_0.addChild(shadow_1_0_7);
					}
					{
						const shadow_1_0_8 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-x`,
							'position':`1 0 0`,
							'scale':`2 0.02 0.02`,
							'geometry':`cube`,
							'uniforms':`u_baseColorFactor:0.7 0.3 0.3 1`,
						});
						shadow_1_0.addChild(shadow_1_0_8);
					}
					{
						const shadow_1_0_9 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-y`,
							'position':`0 1 0`,
							'scale':`0.02 2 0.02`,
							'geometry':`cube`,
							'uniforms':`u_baseColorFactor:0.3 0.7 0.3 1`,
						});
						shadow_1_0.addChild(shadow_1_0_9);
					}
					{
						const shadow_1_0_10 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-z`,
							'position':`0 0 1`,
							'scale':`0.02 0.02 2`,
							'geometry':`cube`,
							'uniforms':`u_baseColorFactor:0.3 0.3 0.7 1`,
						});
						shadow_1_0.addChild(shadow_1_0_10);
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
      // 获取手势姿态，详见官网
      const gesture = tracker.gesture;
      // 获取总体置信度
      const score = tracker.score;

      this.triggerEvent('info', {gesture, score});
    }
  }
})
