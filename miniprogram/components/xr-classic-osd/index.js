Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    markerImg: {
      type: String
    },
  },
  data: {
    loaded: false,
    arReady: false,
    toyReady: false,
    gzDayReady: false,
    gzNightReady: false,
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
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`simple`,
						'effect':`simple`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`text-simple`,
						'effect':`simple`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`OSD`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/marker/osdmarker-test.jpg`,
					});
					shadow_1_0.event.add('ar-tracker-switch',(e)=>{
						this.handleToySwitch({detail:{value:e}});
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.toyReady}`,
							'rotation':`0 180 0`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
						{
							const shadow_1_0_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`text-wrap`,
								'position':`0.9 0.4 0`,
								'rotation':`90 0 0`,
								'scale':`0.8 1 0.2`,
								'geometry':`plane`,
								'material':`simple`,
								'uniforms':`u_baseColorFactor: 0.2 0.6 0.4 0.95`,
								'states':`alphaMode: BLEND`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_0);
						}
						{
							const shadow_1_0_0_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`text-wrap-sub`,
								'position':`0.9 0.1 0`,
								'rotation':`90 0 0`,
								'scale':`0.8 1 0.4`,
								'geometry':`plane`,
								'material':`simple`,
								'uniforms':`u_baseColorFactor: 0 0 0 0.95`,
								'states':`alphaMode: BLEND`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_1);
						}
						{
							const shadow_1_0_0_2 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.7 0.36 0.01`,
								'scale':`0.1 0.1 1`,
								'material':`text-simple`,
								'value':`牛年公仔`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_2);
						}
						{
							const shadow_1_0_0_3 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.6 0.16 0.01`,
								'scale':`0.06 0.06 1`,
								'material':`text-simple`,
								'value':`牛年发布的奶牛公仔`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_3);
						}
						{
							const shadow_1_0_0_4 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.6 0.06 0.01`,
								'scale':`0.06 0.06 1`,
								'material':`text-simple`,
								'value':`礼盒中还包含玩具盲盒`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_4);
						}
					}
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`OSD`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/gz-tower/day.jpg`,
					});
					shadow_1_1.event.add('ar-tracker-switch',(e)=>{
						this.handleDaySwitch({detail:{value:e}});
					});
					shadow_1.addChild(shadow_1_1);
					{
						const shadow_1_1_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.gzDayReady}`,
							'rotation':`0 180 0`,
						});
						shadow_1_1.addChild(shadow_1_1_0);
						{
							const shadow_1_1_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`text-wrap`,
								'position':`1 0.4 0`,
								'rotation':`90 0 0`,
								'scale':`1 1 0.2`,
								'geometry':`plane`,
								'material':`simple`,
								'uniforms':`u_baseColorFactor: 0.2 0.6 0.4 0.95`,
								'states':`alphaMode: BLEND`,
							});
							shadow_1_1_0.addChild(shadow_1_1_0_0);
						}
						{
							const shadow_1_1_0_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'node-id':`text-wrap-sub`,
								'position':`1 0.1 0`,
								'rotation':`90 0 0`,
								'scale':`1 1 0.4`,
								'geometry':`plane`,
								'material':`simple`,
								'uniforms':`u_baseColorFactor: 0 0 0 0.95`,
								'states':`alphaMode: BLEND`,
							});
							shadow_1_1_0.addChild(shadow_1_1_0_1);
						}
						{
							const shadow_1_1_0_2 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.85 0.36 0.01`,
								'scale':`0.1 0.1 1`,
								'material':`text-simple`,
								'value':`广州塔`,
							});
							shadow_1_1_0.addChild(shadow_1_1_0_2);
						}
						{
							const shadow_1_1_0_3 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.6 0.18 0.01`,
								'scale':`0.05 0.05 1`,
								'material':`text-simple`,
								'value':`广州塔（英语：Canton Tower）`,
							});
							shadow_1_1_0.addChild(shadow_1_1_0_3);
						}
						{
							const shadow_1_1_0_4 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.6 0.08 0.01`,
								'scale':`0.05 0.05 1`,
								'material':`text-simple`,
								'value':`又称广州新电视塔，昵称小蛮腰`,
							});
							shadow_1_1_0.addChild(shadow_1_1_0_4);
						}
						{
							const shadow_1_1_0_5 = this.scene.createElement(xrFrameSystem.XRText,{
								'node-id':`text-name`,
								'position':`0.6 -0.02 0.01`,
								'scale':`0.05 0.05 1`,
								'material':`text-simple`,
								'value':`海拔高程600米，距离珠江南岸125米`,
							});
							shadow_1_1_0.addChild(shadow_1_1_0_5);
						}
					}
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`1 1 1`,
						'clear-color':`0.925 0.925 0.925 1`,
						'far':`2000`,
						'background':`ar`,
						'is-ar-camera':``,
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
						'intensity':`0.3`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`30 60 0`,
						'color':`1 1 1`,
						'intensity':`1`,
					});
					shadow_2.addChild(shadow_2_1);
				}
			}
      console.log('xr-scene', xrScene);

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
    handleToySwitch: function ({detail}) {
      const active = detail.value;
      if (active) {
        this.setData({toyReady: true});
      } else {
        this.setData({toyReady: false});
      }
    },
    handleDaySwitch: function ({detail}) {
      const active = detail.value;
      if (active) {
        this.setData({gzDayReady: true});
      } else {
        this.setData({gzDayReady: false});
      }
    },
    handleNightSwitch: function ({detail}) {
      const active = detail.value;
      if (active) {
        this.setData({gzNightReady: true});
      } else {
        this.setData({gzNightReady: false});
      }
    }
  }
})
