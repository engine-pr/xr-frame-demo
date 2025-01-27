import cont from './earring'

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
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRParticle,{
						'id':`human-face`,
						'position':`0 0 2`,
						'capacity':`3000`,
						'emit-rate':`2000`,
						'size':`0.1`,
						'start-color':`1 1 1 0`,
						'start-color2':`1 1 1 0`,
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
        const particle = xrScene.getElementById("human-face");
        // // 来自图片数据的二元数组content
        var content = cont
        // // 影响画作的大小与粒子疏密程度的因子
        var step = 0.02
        var height = Math.floor(step * content.length)
        //设置箱型发射器的发射方向，与粒子初始位置范围
        particle.getComponent(xrFrameSystem.Particle).createBoxEmitter(xrFrameSystem.Vector3.createFromNumber(1.0, 0.0, 0), xrFrameSystem.Vector3.createFromNumber(1.0, 0.0, 0),
        xrFrameSystem.Vector3.createFromNumber(0, 0, 0.5), xrFrameSystem.Vector3.createFromNumber(0, height, 0.0));
        //实现发射器的自定义粒子运作接口
        particle.getComponent(xrFrameSystem.Particle).particleEmitter.processInstance =  (instance, deltaTime)=> {
          var contentTemp = content
          var cellNumY = contentTemp.length
          var cellNumX = contentTemp[0].length
          var width =  Math.floor(step * cellNumX)
          if(instance.position.x - instance.particleSystem.emitterPosition.x> width){
            instance.age = instance.lifeTime;
                return;
            }
            instance.age = 0;
            const posX = Math.floor((instance.position.x -  instance.particleSystem.emitterPosition.x)/ step);
            const posY = Math.floor(instance.position.y/ step);
            const speed = contentTemp[cellNumY-1-posY][posX] * 0.97;
            instance.position.x += ( 1 - speed * 0.97 ) * 0.03 + Math.random() * 0.007;
            instance.color.w = speed * 0.3;
        };
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
