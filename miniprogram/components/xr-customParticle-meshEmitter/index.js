
Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    capacity: {
      type: Number,
      value: 20
    },
    emitRate: {
      type: Number,
      value: 5
    },
    lifeTime:{
      type: Number,
      value: 3
    }
  },
  data: {
    loaded: false
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
				shadow_0.event.add('loaded',(e)=>{
					this.handleAssetsLoaded({detail:{value:e}});
				});
				shadow.addChild(shadow_0);
				{
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`glow_circle`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/particles/glow_circle.png`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-ballon`,
						'src':`https://webar.hereto.cn/asset/fe/ast-show/ballon-anim.glb`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-plane`,
						'position':`0 -1 0`,
						'rotation':`0 0 0`,
						'scale':`5 0.2 5`,
						'geometry':`cube`,
						'material':`blue-mat`,
						'uniforms':`u_baseColorFactor:0.48 0.78 0.64 1`,
					});
					shadow_1.addChild(shadow_1_0);
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XREnv,{
						'sky-map':`sky`,
						'is-sky2d':``,
					});
					shadow_1.addChild(shadow_1_1);
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRCustomParticle,{
						'id':`magicField`,
						'position':`0 0 0`,
						'rotation':`0 0 0`,
						'capacity':`10`,
						'speed':`0.1`,
						'size':`0.02`,
						'emit-rate':`6`,
						'life-time':`0.5`,
						'angle':`0`,
						'texture':`glow_circle`,
						'angular-speed':`0`,
						'render-model':`gltf-ballon`,
					});
					shadow_1.addChild(shadow_1_2);
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'id':`ballon`,
						'node-id':`gltf-ballon`,
						'position':`0.8 0 0`,
						'rotation':`0 0 0`,
						'scale':`1.2 1.2 1.2`,
						'model':`gltf-ballon`,
					});
					shadow_1.addChild(shadow_1_3);
				}
				{
					const shadow_1_4 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 6 -6`,
						'clear-color':`0.1 0.1 0.1 1`,
						'target':`mesh-plane`,
						'background':`skybox`,
						'camera-orbit-control':``,
					});
					shadow_1.addChild(shadow_1_4);
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
						'rotation':`90 0 0`,
						'color':`1 1 1`,
						'intensity':`2.5`,
					});
					shadow_2.addChild(shadow_2_1);
				}
			}
        console.log('xr-scene', xrScene);
    },

    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
      
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
      this.setMeshRender();
    },
    async setMeshRender(){
        const xrFrameSystem = wx.getXrFrameSystem()
        const magicField = this.scene.getElementById("magicField");
        const tempSystem = magicField.getComponent("custom-particle")
  
        tempSystem.addSizeGradient(0,0.7);
        tempSystem.addSizeGradient(0.5,1.0);
        tempSystem.addColorGradient(0, xrFrameSystem.Vector4.createFromNumber(1,0.89,0.27,1));
        tempSystem.addColorGradient(1, xrFrameSystem.Vector4.createFromNumber(1,0.64,0,1));
        tempSystem.addAlphaGradient(0,0,0);
        tempSystem.addAlphaGradient(0.5,1,1);
        tempSystem.addAlphaGradient(1,0,0);
    }
  }
})
