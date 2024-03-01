Component({
  behaviors: [require('../common/share-behavior').default],
  data: {
    loaded: false,
    arReady: false,
    trackerReady: false,
    syncNumber: 0,
    syncStr: '',
    syncList: [],
    syncBoxSize: 0.2
  },
  infoInited: false,
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
						'asset-id':`simple-mat`,
						'effect':`simple`,
					});
					shadow_0.addChild(shadow_0_0);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.arReady}`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'wx:if':`${this.data.trackerReady}`,
						'id':`tracker-1`,
						'mode':`Shoe`,
						'auto-sync':`${this.data.syncStr}`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:for':`${this.data.syncList}`,
							'wx:for-item':`syncColor`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
						{
							const shadow_1_0_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'geometry':`sphere`,
								'scale':`${this.data.syncBoxSize} ${this.data.syncBoxSize} ${this.data.syncBoxSize}`,
								'material':`simple-mat`,
								'uniforms':`u_baseColorFactor: ${this.data.syncColor} 1`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_0);
						}
					}
					{
						const shadow_1_0_1 = this.scene.createElement(xrFrameSystem.XRNode,{
							'scale':`4 4 4`,
						});
						shadow_1_0.addChild(shadow_1_0_1);
						{
							const shadow_1_0_1_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`mesh-x`,
								'position':`1 0 0`,
								'scale':`2 0.02 0.02`,
								'geometry':`cube`,
								'uniforms':`u_baseColorFactor:0.7 0.3 0.3 1`,
							});
							shadow_1_0_1.addChild(shadow_1_0_1_0);
						}
						{
							const shadow_1_0_1_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`mesh-y`,
								'position':`0 1 0`,
								'scale':`0.02 2 0.02`,
								'geometry':`cube`,
								'uniforms':`u_baseColorFactor:0.3 0.7 0.3 1`,
							});
							shadow_1_0_1.addChild(shadow_1_0_1_1);
						}
						{
							const shadow_1_0_1_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`mesh-z`,
								'position':`0 0 1`,
								'scale':`0.02 0.02 2`,
								'geometry':`cube`,
								'uniforms':`u_baseColorFactor:0.3 0.3 0.7 1`,
							});
							shadow_1_0_1.addChild(shadow_1_0_1_2);
						}
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


      // 同步点信息
      const syncNumber = 8;
      
      let syncStr = '';
      const syncList = [];

      for (let i = 0; i < syncNumber; i++) {
        const colorFloat = i / 8;
        const colorR = 1.0 - colorFloat;
        syncStr += ` ${i}`;
        syncList.push(`1.0 ${colorR} ${colorR} 1.0`)
      }

      this.setData({
        trackerReady: true,
        syncNumber: syncNumber,
        syncStr: syncStr,
        syncList: syncList
      })
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
    handleInfoInit() {
      this.infoInited = true;

      console.log('handleInfoInit')

      
    },
    handleTick: function () {
      const xrSystem = wx.getXrFrameSystem();

      if (this.data.arReady && this.data.loaded && this.data.trackerReady && !this.infoInited) {
        this.handleInfoInit();
      }

      const trackerEl = this.scene.getElementById('tracker-1');
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
    }
  }
})
