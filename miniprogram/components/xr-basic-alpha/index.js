Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    cubeAlpha: {
      type: Number,
      value: 1
    },
    sphereAlpha: {
      type: Number,
      value: 1
    },
    clearColor: {
      type: String,
      value: '0 0 0 0'
    }
  },
  lifetimes: {},
  methods: {
    handleReady({detail}) {
      const xrScene = this.scene = detail.value;
      const xrFrameSystem = wx.getXrFrameSystem();
      const shadow = this.scene.getElementById('shadow');
			{
				const shadow_0 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_0);
				{
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'id':`cube`,
						'node-id':`mesh-cube`,
						'position':`-0.5 0 0`,
						'geometry':`cube`,
						'uniforms':`u_baseColorFactor:0.298 0.764 0.85 ${this.data.cubeAlpha}`,
						'states':`alphaMode:BLEND`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-sphere`,
						'position':`0.5 0 0`,
						'geometry':`sphere`,
						'uniforms':`u_baseColorFactor:0.937 0.176 0.368 ${this.data.sphereAlpha}`,
						'states':`alphaMode:BLEND`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`target`,
						'position':`0 0 0`,
					});
					shadow_0.addChild(shadow_0_2);
				}
				{
					const shadow_0_3 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 2 2`,
						'clear-color':`${this.data.clearColor}`,
						'target':`target`,
						'camera-orbit-control':``,
					});
					shadow_0.addChild(shadow_0_3);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`lights`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`ambient`,
						'color':`1 1 1`,
						'intensity':`1`,
					});
					shadow_1.addChild(shadow_1_0);
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 170 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_1.addChild(shadow_1_1);
				}
			}
      console.log('xr-scene', xrScene);
    }
  }
})
