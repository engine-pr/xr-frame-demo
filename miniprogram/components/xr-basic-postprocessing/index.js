const blurData = {
  cullMask: 0b101,
  aIntensity: 1,
  dIntensity: 2,
  env: "",
  background: "default",
  cameraPosition: 1.3,
  clearColor: "0 0 0 1",
  cameraTarget: "camera-target",

  pp: "blur",
  // blurRadius: 0
};

const bloomData = {
  cullMask: 0b11,
  aIntensity: 0,
  dIntensity: 0,
  env: "",
  background: "default",
  cameraPosition: 10,
  clearColor: "0 0 0 1",
  cameraTarget: "camera-target",

  pp: "bloom2",
  // bloomRadius_0: 0,
  // bloomRadius_1: 0
};

const fxaaData = {
  cullMask: 0b1001,
  aIntensity: 1,
  dIntensity: 3,
  env: "",
  background: "default",
  cameraPosition: 1,
  clearColor: "0.925 0.925 0.925 1",
  cameraTarget: "mesh-sphere"
};

const vignetteData = {
  cullMask: 0b101,
  aIntensity: 1,
  dIntensity: 2,
  env: "",
  background: "default",
  cameraPosition: 1.3,
  clearColor: "0 0 0 1",
  cameraTarget: "camera-target",
  pp: "vignette",
};

Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    type: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === 0) {
            this.activeBlur();
          } else if (newVal === 1) {
            this.activeBloom();
          } else if (newVal === 2) {
            this.activeVignette();
          } else if (newVal === 3) {
            this.activeFXAA();
          }
        }
      }
    },
    blurRadius: {
      type: Number,
      value: 0
    },
    bloomRadius: {
      type: Number,
      value: 0,
      observer(newVal, oldVal) {
        this.setData({
          bloomRadius_0: newVal * 0.2,
          bloomRadius_1: newVal * 0.8
        });
      }
    },
    bloomIntensity: {
      type: Number,
      value: 1,
    },
    bloomThreshold: {
      type: Number,
      value: 0.5,
    },
    vignetteIntensity: {
      type: Number,
      value: 1,
    },
    vignetteSmoothness: {
      type: Number,
      value: 2,
    },
    vignetteRoundness: {
      type: Number,
      value: 1,
    },
    fxaaEnabled: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        this.setData({
          fxaaEnabled: newVal
        });
        if (this.data.type === 3) {
          this.activeFXAA();
        }
      }
    }
  },
  data: {
    loaded: false,
    env: "",
    cullMask: 0,
    background: "default",
    aIntensity: 0,
    dIntensity: 0,
    pp: "",
    cameraPosition: 1,
    cameraTarget: "camera-target",

    //---bloom---
    bloomRadius_0: 0,
    bloomRadius_1: 1,

    //---fxaa---
    fxaaEnabled: false
  },
  lifetimes: {
    attached() {
      console.log('data.a', this.data.a) // expected 123
    }
  },
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
						'type':`env-data`,
						'asset-id':`env1`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/env-test.bin`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`night_car_landscape`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/night_car_landscape.glb`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`bedroom`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/bedroom.glb`,
					});
					shadow_0.addChild(shadow_0_2);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'env-data':`${this.data.env}`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'node-id':`camera-target`,
						'position':`0 0 0`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'layer':`1`,
					});
					shadow_2.addChild(shadow_2_1);
					{
						const shadow_2_1_0 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`bloom1`,
							'type':`bloom`,
							'is-hdr':``,
							'data':`radius: ${this.data.bloomRadius_0}, intensity: ${this.data.bloomIntensity}, threshold: ${this.data.bloomThreshold}, softThreshold: 0.8`,
						});
						shadow_2_1.addChild(shadow_2_1_0);
					}
					{
						const shadow_2_1_1 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`bloom2`,
							'type':`bloom`,
							'is-hdr':``,
							'data':`radius: ${this.data.bloomRadius_1}, intensity: ${this.data.bloomIntensity}, threshold: ${this.data.bloomThreshold}, softThreshold: 0.8`,
						});
						shadow_2_1.addChild(shadow_2_1_1);
					}
					{
						const shadow_2_1_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'node-id':`gltf_1`,
							'position':`0 0 0`,
							'rotation':`0 0 0`,
							'scale':`0.01 0.01 0.01`,
							'model':`night_car_landscape`,
						});
						shadow_2_1.addChild(shadow_2_1_2);
					}
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRNode,{
						'layer':`2`,
					});
					shadow_2.addChild(shadow_2_2);
					{
						const shadow_2_2_0 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`blur`,
							'type':`blur`,
							'data':`radius: ${this.data.blurRadius}`,
						});
						shadow_2_2.addChild(shadow_2_2_0);
					}
					{
						const shadow_2_2_1 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`vignette`,
							'type':`vignette`,
							'data':`color:1 0 0 1,intensity:${this.data.vignetteIntensity},smoothness:${this.data.vignetteSmoothness},roundness:${this.data.vignetteRoundness}`,
						});
						shadow_2_2.addChild(shadow_2_2_1);
					}
					{
						const shadow_2_2_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'node-id':`gltf_2`,
							'position':`0.5 -1 -2`,
							'rotation':`0 0 0`,
							'scale':`1 1 1`,
							'model':`bedroom`,
						});
						shadow_2_2.addChild(shadow_2_2_2);
					}
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRNode,{
						'layer':`3`,
					});
					shadow_2.addChild(shadow_2_3);
					{
						const shadow_2_3_0 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`fxaa`,
							'type':`fxaa`,
						});
						shadow_2_3.addChild(shadow_2_3_0);
					}
					{
						const shadow_2_3_1 = this.scene.createElement(xrFrameSystem.XRMaterial,{
							'asset-id':`standard-mat`,
							'effect':`standard`,
						});
						shadow_2_3.addChild(shadow_2_3_1);
					}
					{
						const shadow_2_3_2 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-plane`,
							'position':`0 -0.02 -4`,
							'rotation':`0 0 0`,
							'scale':`5 1 5`,
							'geometry':`plane`,
							'material':`standard-mat`,
							'uniforms':`u_baseColorFactor:0.48 0.78 0.64 1`,
							'receive-shadow':``,
						});
						shadow_2_3.addChild(shadow_2_3_2);
					}
					{
						const shadow_2_3_3 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'id':`cube`,
							'node-id':`mesh-cube`,
							'position':`-1 0.5 -3.5`,
							'scale':`1 1 1`,
							'rotation':`0 45 0`,
							'geometry':`cube`,
							'material':`standard-mat`,
							'uniforms':`u_baseColorFactor:0.298 0.764 0.85 1`,
							'cast-shadow':``,
						});
						shadow_2_3.addChild(shadow_2_3_3);
					}
					{
						const shadow_2_3_4 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-sphere`,
							'position':`0 1.25 -5`,
							'scale':`1.25 1.25 1.25`,
							'geometry':`sphere`,
							'material':`standard-mat`,
							'uniforms':`u_baseColorFactor:0.937 0.176 0.368 1`,
							'cast-shadow':``,
						});
						shadow_2_3.addChild(shadow_2_3_4);
					}
					{
						const shadow_2_3_5 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`mesh-cylinder`,
							'position':`1 0.7 -3.5`,
							'scale':`1 0.7 1`,
							'geometry':`cylinder`,
							'material':`standard-mat`,
							'uniforms':`u_baseColorFactor:1 0.776 0.364 1`,
							'cast-shadow':``,
						});
						shadow_2_3.addChild(shadow_2_3_5);
					}
				}
				{
					const shadow_2_4 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`0 0 ${this.data.cameraPosition}`,
						'clear-color':`${this.data.clearColor}`,
						'near':`0.1`,
						'far':`2000`,
						'target':`${this.data.cameraTarget}`,
						'background':`${this.data.background}`,
						'camera-orbit-control':``,
						'cull-mask':`${this.data.cullMask}`,
						'post-process':`${this.data.pp}`,
					});
					shadow_2.addChild(shadow_2_4);
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
						'intensity':`${this.data.aIntensity}`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`40 180 0`,
						'color':`1 1 1`,
						'intensity':`${this.data.dIntensity}`,
					});
					shadow_3.addChild(shadow_3_1);
				}
			}
      console.log('scene', detail.value);
      this.activeBlur();
    },
    handleTick: function() {
      // const camera = this.scene.getNodeById("camera");
      // const transform = camera.el._components.transform;
      // if (transform.rotation.y > Math.PI * 0.25) {
      //   transform.rotation.y = Math.PI * 0.25;
      // } else if  (transform.rotation.y < -Math.PI * 0.25) {
      //   transform.rotation.y = -Math.PI * 0.25;
      // }
    },
    handleAssetsProgress: function({detail}) {
      this.triggerEvent('assetsProgress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      this.triggerEvent('assetsLoaded', detail.value);
      this.setData({loaded: true});
    },
    activeBlur() {
      this.setData(blurData);
    },
    activeBloom() {
      this.setData(bloomData);
    },
    activeVignette() {
      this.setData(vignetteData);
    },
    activeFXAA() {
      this.setData(fxaaData);
      this.setData({
        pp: this.data.fxaaEnabled ? "fxaa" : ""
      });
    }
  }
})
