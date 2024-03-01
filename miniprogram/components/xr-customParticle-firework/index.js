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
				shadow.addChild(shadow_0);
				{
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`particle-texture`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/particles/point.png`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`flarePicture`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/particles/flare.png`,
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
						'id':`firework`,
						'position':`0 0 0`,
						'start-color':`1 1 1 1`,
						'end-color':`1 0 0 1`,
						'capacity':`1`,
						'speed':`1`,
						'size':`0.5`,
						'emit-rate':`1`,
						'life-time':`3`,
						'angle':`0`,
						'texture':`particle-texture`,
					});
					shadow_1.addChild(shadow_1_2);
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 6 -6`,
						'clear-color':`0.1 0.1 0.1 1`,
						'target':`mesh-plane`,
						'background':`skybox`,
						'camera-orbit-control':``,
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
        const xrFrameSystem = wx.getXrFrameSystem()
  
        const fireworkField = xrScene.getElementById("firework");
        const tempSystem = fireworkField.getComponent('custom-particle')
        tempSystem.addSizeGradient(0,0.2);
        tempSystem.addSizeGradient(3,0.5);
  
        var myData ={}
        myData = {
          "capacity": 200,
          "emitRate": 0,  //子发射器不进行每秒发射
          "burstCount": 200, // 一次爆发200粒子
          "burstTime": 0, // 爆发延时为0
          "burstCycle": 1, // 发射一次
          "size":[0.05],
          "startColor":[1,1,0,1],
          "endColor":[1,0,0,0],
          "emitterType":"SphereShape",
          "emitterProps": [["radius","0.8"]],
          "lifeTime":[3], // 粒子生命周期为3秒
          "stopDuration":[3], // 子发射器生命周期为3秒
          "speed":[1],
          "texture":"flarePicture"
        }
  
        var subEmitter = tempSystem.createSubEmitter(myData)
  
        subEmitter.state = 1 // 设置为1为当粒子消失后出现作用子发射器
        //可以规定多个子发射器的阵列
        tempSystem.subEmitters = [subEmitter]
    },

    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
      
    },
    handleAssetsLoaded: function({detail}) {

    }
  }
})
