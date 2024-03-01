Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {},
  data: {
    stars: []
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
						'type':`texture`,
						'asset-id':`waifu`,
						'src':`/assets/waifu.png`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`shining-mat`,
						'effect':`shining`,
						'uniforms':`u_color:1 1 0 1`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`target`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'geometry':`star`,
						'material':`shining-mat`,
						'rotation':`90 0 0`,
					});
					shadow_1.addChild(shadow_1_0);
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'wx:for':`${this.data.stars}`,
						'wx:for-item':`star`,
					});
					shadow_1.addChild(shadow_1_1);
					{
						const shadow_1_1_0 = this.scene.createElement(xrFrameSystem.XRShiningStar,{
							'rotation':`90 0 0`,
							'position':`${this.data.star.pos}`,
							'uniforms':`u_color:${this.data.star.color},u_reflection:waifu,u_speed:${this.data.star.speed}`,
						});
						shadow_1_1.addChild(shadow_1_1_0);
					}
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 0 10`,
						'clear-color':`0.4 0.6 0.7 1`,
						'background':`default`,
						'target':`target`,
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
						'color':`${this.data.test}}`,
						'intensity':`1`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 170 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_2.addChild(shadow_2_1);
				}
			}
      const stars = new Array(44).fill(0).map(() => {
        return {
          pos: [
            (Math.random() * 2 - 1) * 4,
            (Math.random() * 2 - 1) * 4,
            (Math.random() * 2 - 1) * 4,
          ].join(' '),
          color: [
            Math.random(),
            Math.random(),
            Math.random(),
            1
          ].join(' '),
          speed: (Math.random() + 0.2) * 3
        };
      });
      console.log(stars)

      this.setData({stars});
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    }
  }
})
