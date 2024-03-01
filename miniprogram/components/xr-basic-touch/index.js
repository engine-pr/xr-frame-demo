Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    a: Number,
  },
  data: {
    loaded: false,
    touchingMoon: false,
    touchingEarth: false,
    θ: Math.PI,
    r: 10,
    ω: 5e-4,
    outerRing: 20,
    innerRing: 10
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
						'type':`texture`,
						'asset-id':`earth-texture`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/2k_earth_daymap.jpeg`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`moon-texture`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/2k_moon.jpeg`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`sky`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/dark-cosmos.jpg`,
					});
					shadow_0.addChild(shadow_0_2);
				}
				{
					const shadow_0_3 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`standard-mat`,
						'effect':`standard`,
					});
					shadow_0.addChild(shadow_0_3);
				}
				{
					const shadow_0_4 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`earth-mat`,
						'effect':`standard`,
						'uniforms':`u_baseColorMap: earth-texture`,
						'render-queue':`501`,
					});
					shadow_0.addChild(shadow_0_4);
				}
				{
					const shadow_0_5 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`earth-silhouette`,
						'effect':`simple`,
						'uniforms':`u_baseColorFactor: 1.0 0.5 0 1.0`,
						'states':`depthTestWrite: false`,
						'render-queue':`500`,
					});
					shadow_0.addChild(shadow_0_5);
				}
				{
					const shadow_0_6 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`moon-mat`,
						'effect':`standard`,
						'uniforms':`u_baseColorMap: moon-texture`,
						'render-queue':`503`,
					});
					shadow_0.addChild(shadow_0_6);
				}
				{
					const shadow_0_7 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`moon-silhouette`,
						'effect':`simple`,
						'uniforms':`u_baseColorFactor: 0.476 0.82 0.957 1.0`,
						'states':`depthTestWrite: false`,
						'render-queue':`502`,
					});
					shadow_0.addChild(shadow_0_7);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'sky-map':`sky`,
					'is-sky2d':``,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-earth`,
						'position':`0 0 0`,
						'scale':`8 8 8`,
						'geometry':`sphere`,
						'material':`earth-mat`,
						'sphere-shape':``,
						'receive-shadow':``,
						'cast-shadow':``,
					});
					shadow_2_0.event.add('touch-shape',(e)=>{
						this.handleTouchEarth({detail:{value:e}});
					});
					shadow_2_0.event.add('untouch-shape',(e)=>{
						this.handleUntouchEarth({detail:{value:e}});
					});
					shadow_2_0.event.add('drag-shape',(e)=>{
						this.handleEarthRotation({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`earth-silhouette`,
						'scale':`8.15 8.15 8.15`,
						'geometry':`sphere`,
						'material':`earth-silhouette`,
						'visible':`${this.data.touchingEarth}`,
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
						'node-id':`mesh-moon`,
						'position':`10 0 0`,
						'scale':`1.5 1.5 1.5`,
						'rotation':`0 90 0`,
						'geometry':`sphere`,
						'material':`moon-mat`,
						'sphere-shape':`radius: 1.5`,
						'receive-shadow':``,
						'cast-shadow':``,
					});
					shadow_2_2.event.add('drag-shape',(e)=>{
						this.handleDragMoon({detail:{value:e}});
					});
					shadow_2_2.event.add('touch-shape',(e)=>{
						this.handleTouchMoon({detail:{value:e}});
					});
					shadow_2_2.event.add('untouch-shape',(e)=>{
						this.handleUntouchMoon({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_2);
					{
						const shadow_2_2_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`moon-silhouette`,
							'scale':`1.1 1.1 1.1`,
							'geometry':`sphere`,
							'material':`moon-silhouette`,
							'visible':`${this.data.touchingMoon}`,
						});
						shadow_2_2.addChild(shadow_2_2_0);
					}
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 20 -35`,
						'clear-color':`0 0 0 1`,
						'target':`mesh-earth`,
						'background':`skybox`,
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
						'intensity':`0.1`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'id':`directional-light`,
						'type':`directional`,
						'rotation':`0 60 0`,
						'color':`1 1 1`,
						'intensity':`5`,
						'shadow-distance':`40`,
						'cast-shadow':``,
						'shadow-bias':`0.004`,
					});
					shadow_3.addChild(shadow_3_1);
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
    },
    handleTouchEarth: function() {
      this.setData({
        touchingEarth: true
      });
    },
    handleUntouchEarth: function() {
      this.setData({
        touchingEarth: false
      });
    },
    handleEarthRotation: function({detail}) {
        const { target, deltaX } = detail.value;
        target._components.transform.rotation.y += deltaX / 100;
    },
    handleDragMoon: function({detail}) {
        const { dir, target, camera } = detail.value;
        const cameraPos = camera.el._components.transform.worldPosition;
        const k = -cameraPos.y / dir[1];
        const x = cameraPos.x + k * dir[0];
        const z = cameraPos.z + k * dir[2];
        const len = Math.sqrt(x * x + z * z);
        if (len > this.data.innerRing) {
            const transform = target._components.transform;
            const scale = len > this.data.outerRing ? this.data.outerRing / len : 1.0;
            transform.position.x = x * scale;
            transform.position.z = z * scale;
        }
    },
    handleTouchMoon: function() {
        this.setData({touchingMoon: true});
    },
    handleUntouchMoon: function() {
        const moon = this.scene.getNodeById("mesh-moon");
        const transform = moon.el._components.transform;
        const x = transform.position.x;
        const z = transform.position.z;
        const len = Math.sqrt(x * x + z * z);
        this.setData({
            r: len,
            θ: x < 0 ? Math.atan(z / x) + Math.PI : Math.atan(z / x),
            ω: Math.sqrt(2.5e-4 / (len * len * len))
        });
        this.setData({touchingMoon: false});
    },
    handleTick: function({detail}) {
        if (this.data.touchingMoon || !this.scene) return;
        const deltaTime = detail.value;
        const moon = this.scene.getNodeById("mesh-moon");
        const transform = moon.el._components.transform;
        const x = Math.cos(this.data.θ) * this.data.r;
        const z = Math.sin(this.data.θ) * this.data.r;
        transform.position.x = x;
        transform.position.z = z;
        transform.rotation.y -= this.data.ω * deltaTime;
        this.setData({
            θ: this.data.θ + this.data.ω * deltaTime
        });
    }
  }
})
