const info = wx.getSystemInfoSync();
const dpi = info.pixelRatio;
const width = info.windowWidth * dpi;
const height = info.windowHeight * dpi;

Component({
  scene: null,
  properties: {},
  data: {
    width: width,
    height: height,
    loaded: false,
    arReady: false,
    placed: false,
    gateClosed: false
  },
  lifetimes: {
    attached() {
      wx.reportEvent("xr_frame", {
        "xr_page_path": '/pages/scene-last-record/index',
        "xr_last_record_click": 1
      });
    },
    detached() {
      this.bgm.stop();
      wx.setKeepScreenOn({keepScreenOn: false});
    }
  },
  methods: {
    handleReady({detail}) {
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
						'type':`raw`,
						'asset-id':`records`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/last-record.json`,
						'options':`encoding:utf-8`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`raw`,
						'asset-id':`note`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/last-note.txt`,
						'options':`encoding:utf-8`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'asset-id':`anchor`,
						'type':`keyframe`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/last-record-anchor-animation.json`,
					});
					shadow_0.addChild(shadow_0_2);
				}
				{
					const shadow_0_3 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`loading`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/loading.glb`,
					});
					shadow_0.addChild(shadow_0_3);
				}
				{
					const shadow_0_4 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`anchor`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/ar-plane-marker.glb`,
					});
					shadow_0.addChild(shadow_0_4);
				}
				{
					const shadow_0_5 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`butterfly`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/butterfly/index.glb`,
					});
					shadow_0.addChild(shadow_0_5);
				}
				{
					const shadow_0_6 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`sky`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/sky.gltf`,
					});
					shadow_0.addChild(shadow_0_6);
				}
				{
					const shadow_0_7 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`office`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/last-record-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_7);
				}
				{
					const shadow_0_8 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`hikari`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/hikari-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_8);
				}
				{
					const shadow_0_9 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`roam`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/roam-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_9);
				}
				{
					const shadow_0_10 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`xinyi`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/xinyi-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_10);
				}
				{
					const shadow_0_11 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`particle-point`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/particles/point.png`,
					});
					shadow_0.addChild(shadow_0_11);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'layer':`1`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'wx:if':`${this.data.loaded && !placed}`,
						'mode':`Plane`,
						'visible':`false`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRNode,{
							'node-id':`anchor`,
							'anim-keyframe':`anchor`,
							'anim-autoplay':`clip:parent`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
						{
							const shadow_1_0_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
								'model':`anchor`,
							});
							shadow_1_0_0.addChild(shadow_1_0_0_0);
						}
						{
							const shadow_1_0_0_1 = this.scene.createElement(xrFrameSystem.XRParticle,{
								'position':`0 0.8 0`,
								'cube-shape':`size:0.8 1.6 0.8`,
								'capacity':`4000`,
								'emit-rate':`20`,
								'size':`0.01 0.03`,
								'life-time':`2.5 5`,
								'speed':`0.2 0.4`,
								'start-color':`1 1 1 1`,
								'end-color':`1 1 1 0.5`,
								'emitter-type':`BoxShape`,
								'emitter-props':`minEmitBox:-0.15 -0.8 -0.15,maxEmitBox:0.15 -0.6 0.15,direction:0 1 0,direction2:0 1 0`,
								'atlas':`numbers`,
								'atlas-frames':`0 1`,
								'atlas-speed':`4`,
								'atlas-random':``,
							});
							shadow_1_0_0_1.event.add('touch-shape',(e)=>{
								this.handleShowDoor({detail:{value:e}});
							});
							shadow_1_0_0.addChild(shadow_1_0_0_1);
						}
					}
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'id':`setitem`,
						'node-id':`setitem`,
						'visible':`false`,
					});
					shadow_1.addChild(shadow_1_1);
					{
						const shadow_1_1_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`sky`,
							'model':`sky`,
							'states':`cullOn: false, stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
						});
						shadow_1_1.addChild(shadow_1_1_0);
					}
					{
						const shadow_1_1_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`scene-mesh`,
							'model':`office`,
							'states':`stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
						});
						shadow_1_1.addChild(shadow_1_1_1);
					}
					{
						const shadow_1_1_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`hikari`,
							'position':`-0.192 0.073 -5.403`,
							'rotation':`0 106 0`,
							'model':`hikari`,
							'anim-autoplay':`clip:Sitting`,
							'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
							'states':`stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
						});
						shadow_1_1_2.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_2);
					}
					{
						const shadow_1_1_3 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`roam`,
							'position':`-2.404 0.015 -5.152`,
							'rotation':`0 -84 0`,
							'model':`roam`,
							'anim-autoplay':`clip:Sitting`,
							'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
							'states':`stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
						});
						shadow_1_1_3.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_3);
					}
					{
						const shadow_1_1_4 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`xinyi`,
							'position':`-0.883 0.089 -7.118`,
							'rotation':`0 -60 0`,
							'model':`xinyi`,
							'anim-autoplay':`clip:Sitting`,
							'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
							'states':`stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
						});
						shadow_1_1_4.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_4);
					}
					{
						const shadow_1_1_5 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-keyboard`,
							'position':`-0.865 0.775 -5.276`,
							'rotation':`0 9 0`,
							'cube-shape':`size:0.3 0.05 0.4`,
						});
						shadow_1_1_5.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_5);
					}
					{
						const shadow_1_1_6 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-telephone`,
							'position':`-1.103 0.809 -4.786`,
							'rotation':`0 0 0`,
							'cube-shape':`size:0.07 0.16 0.2`,
						});
						shadow_1_1_6.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_6);
					}
					{
						const shadow_1_1_7 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-qq`,
							'position':`-1.14 1.344 -5.195`,
							'rotation':`0 0 0`,
							'cube-shape':`size:0.1 0.2 0.2`,
						});
						shadow_1_1_7.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_7);
					}
					{
						const shadow_1_1_8 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-cap`,
							'position':`-0.493 0.786 -4.598`,
							'rotation':`0 56 0`,
							'cube-shape':`size:0.3 0.05 0.15`,
						});
						shadow_1_1_8.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_8);
					}
					{
						const shadow_1_1_9 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-calendar`,
							'position':`-0.798 0.8 -4.674`,
							'rotation':`0 111 0`,
							'cube-shape':`size:0.2 0.05 0.1`,
						});
						shadow_1_1_9.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_9);
					}
					{
						const shadow_1_1_10 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-drinks`,
							'position':`-0.617 0.795 -4.749`,
							'rotation':`0 52 0`,
							'cube-shape':`size:0.15 0.1 0.1`,
						});
						shadow_1_1_10.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_10);
					}
					{
						const shadow_1_1_11 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`chair`,
							'position':`-0.413 0.638 -4.054`,
							'rotation':`0 3 0`,
							'cube-shape':`size:0.4 0.5 0.3`,
						});
						shadow_1_1_11.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_11);
					}
					{
						const shadow_1_1_12 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`hikari-earphone`,
							'position':`-0.892 0.752 -4.934`,
							'rotation':`0 10 0`,
							'cube-shape':`size:0.1 0.03 0.1`,
						});
						shadow_1_1_12.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_12);
					}
					{
						const shadow_1_1_13 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`roam-pc`,
							'position':`-1.69 0.805 -5.272`,
							'rotation':`0 6 0`,
							'cube-shape':`size:0.2 0.05 0.3`,
						});
						shadow_1_1_13.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_13);
					}
					{
						const shadow_1_1_14 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`roam-monitor`,
							'position':`-1.577 1.085 -4.565`,
							'rotation':`0 143 0`,
							'cube-shape':`size:0.05 0.4 0.5`,
						});
						shadow_1_1_14.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_14);
					}
					{
						const shadow_1_1_15 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`xinyi-desktop`,
							'position':`-0.181 0.787 -7.306`,
							'rotation':`0 10 0`,
							'cube-shape':`size:0.33 0.06 0.67`,
						});
						shadow_1_1_15.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_15);
					}
					{
						const shadow_1_1_16 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`xinyi-plant`,
							'position':`0.164 0.896 -7.923`,
							'rotation':`0 10 0`,
							'cube-shape':`size:0.33 0.3 0.3`,
						});
						shadow_1_1_16.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_16);
					}
					{
						const shadow_1_1_17 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`xinyi-plant`,
							'position':`0.164 0.896 -7.923`,
							'rotation':`0 10 0`,
							'cube-shape':`size:0.33 0.3 0.3`,
						});
						shadow_1_1_17.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_17);
					}
					{
						const shadow_1_1_18 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`xinyi-box`,
							'position':`-0.254 0.282 -8.048`,
							'rotation':`0 0 0`,
							'cube-shape':`size:0.5 0.5 0.5`,
						});
						shadow_1_1_18.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_18);
					}
					{
						const shadow_1_1_19 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`disorder-desktop`,
							'position':`-1.181 0.906 -4.05`,
							'rotation':`0 272 0`,
							'cube-shape':`size:0.5 0.3 0.65`,
						});
						shadow_1_1_19.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_19);
					}
					{
						const shadow_1_1_20 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`fan`,
							'position':`-2.179 0.459 -4.022`,
							'rotation':`0 272 0`,
							'cube-shape':`size:0.3 1 0.3`,
						});
						shadow_1_1_20.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_20);
					}
					{
						const shadow_1_1_21 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`face-mask`,
							'position':`-4.124 0.795 -4.512`,
							'rotation':`0 286 0`,
							'cube-shape':`size:0.2 0.05 0.3`,
						});
						shadow_1_1_21.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_21);
					}
					{
						const shadow_1_1_22 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`oscilloscope`,
							'position':`-1.729 0.875 -4.084`,
							'rotation':`0 25 0`,
							'cube-shape':`size:0.3 0.3 0.2`,
						});
						shadow_1_1_22.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_22);
					}
					{
						const shadow_1_1_23 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`vege-dog`,
							'position':`-1.872 0.833 -4.227`,
							'rotation':`0 26 0`,
							'cube-shape':`size:0.4 0.2 0.2`,
						});
						shadow_1_1_23.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_23);
					}
					{
						const shadow_1_1_24 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`trash`,
							'position':`-3.164 0.405 -3.856`,
							'rotation':`0 0 0`,
							'cube-shape':`size:0.3 0.63 0.55`,
						});
						shadow_1_1_24.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_24);
					}
					{
						const shadow_1_1_25 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`light-monitor`,
							'position':`-2.682 0.984 -7.266`,
							'rotation':`0 0 0`,
							'cube-shape':`size:0.1 0.28 0.55`,
						});
						shadow_1_1_25.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_25);
					}
					{
						const shadow_1_1_26 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`charge-pal`,
							'position':`-2.438 0.181 -7.887`,
							'rotation':`0 0 0`,
							'cube-shape':`size:0.2 0.28 0.3`,
						});
						shadow_1_1_26.event.add('touch-shape',(e)=>{
							this.handleTouchObj({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_26);
					}
					{
						const shadow_1_1_27 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`note`,
							'position':`-0.719 0.747 -5.008`,
							'rotation':`0 16 0`,
							'cube-shape':`size:0.22 0.04 0.15`,
						});
						shadow_1_1_27.event.add('touch-shape',(e)=>{
							this.handleTouchNote({detail:{value:e}});
						});
						shadow_1_1.addChild(shadow_1_1_27);
					}
					{
						const shadow_1_1_28 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.gateClosed}`,
						});
						shadow_1_1.addChild(shadow_1_1_28);
						{
							const shadow_1_1_28_0 = this.scene.createElement(xrFrameSystem.XRParticle,{
								'material':`particle-mat`,
								'position':`-2.2 0.2 -5`,
								'capacity':`2000`,
								'emit-rate':`40`,
								'never-cull':``,
								'size':`0.06 0.12`,
								'life-time':`15 20`,
								'speed':`0.2 0.4`,
								'start-color':`1 1 1 1`,
								'end-color':`1 1 1 0.4`,
								'emitter-type':`BoxShape`,
								'emitter-props':`minEmitBox:-20 0 -20,maxEmitBox:20 0 20,direction:0 1 0,direction2:0 1 0`,
								'texture':`particle-point`,
							});
							shadow_1_1_28.addChild(shadow_1_1_28_0);
						}
						{
							const shadow_1_1_28_1 = this.scene.createElement(xrFrameSystem.XRNode,{
								'id':`oberon`,
								'position':`0 1.4 1`,
								'rotation':`0 0 0`,
								'sphere-shape':`radius:0.3`,
							});
							shadow_1_1_28_1.event.add('touch-shape',(e)=>{
								this.handleTouchObj({detail:{value:e}});
							});
							shadow_1_1_28.addChild(shadow_1_1_28_1);
							{
								const shadow_1_1_28_1_0 = this.scene.createElement(xrFrameSystem.XRParticle,{
									'capacity':`1000`,
									'emit-rate':`80`,
									'never-cull':``,
									'size':`0.02 0.03`,
									'life-time':`1.5 2`,
									'speed':`0.04 0.08`,
									'start-color':`0.5 0.9 0.7 1`,
									'end-color':`0.5 0.9 0.7 0.4`,
									'emitter-type':`SphereShape`,
									'emitter-props':`radius:0.05,randomizeDirection:0`,
									'texture':`particle-point`,
								});
								shadow_1_1_28_1.addChild(shadow_1_1_28_1_0);
							}
						}
						{
							const shadow_1_1_28_2 = this.scene.createElement(xrFrameSystem.XRNode,{
								'id':`noname`,
								'position':`-1 1.4 1`,
								'rotation':`0 0 0`,
								'sphere-shape':`radius:0.3`,
							});
							shadow_1_1_28_2.event.add('touch-shape',(e)=>{
								this.handleTouchObj({detail:{value:e}});
							});
							shadow_1_1_28.addChild(shadow_1_1_28_2);
							{
								const shadow_1_1_28_2_0 = this.scene.createElement(xrFrameSystem.XRParticle,{
									'capacity':`1000`,
									'emit-rate':`80`,
									'never-cull':``,
									'size':`0.02 0.03`,
									'life-time':`1.5 2`,
									'speed':`0.04 0.08`,
									'start-color':`0.5 0.7 0.9 1`,
									'end-color':`0.5 0.7 0.9 0.4`,
									'emitter-type':`SphereShape`,
									'emitter-props':`radius:0.05,randomizeDirection:0`,
									'texture':`particle-point`,
								});
								shadow_1_1_28_2.addChild(shadow_1_1_28_2_0);
							}
						}
					}
					{
						const shadow_1_1_29 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.placed && !gateClosed}`,
							'id':`door`,
							'position':`0 1 0`,
							'scale':`0 0 0`,
						});
						shadow_1_1.addChild(shadow_1_1_29);
						{
							const shadow_1_1_29_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'id':`door-mesh`,
								'rotation':`90 0 0`,
								'scale':`0.8 1 1.6`,
								'geometry':`plane`,
								'states':`renderQueue: 1, stencilComp: 7, stencilRef: 1, stencilReadMask: 1, stencilWriteMask: 1, stencilPass: 1, stencilFail: 2, stencilZFail: 2`,
							});
							shadow_1_1_29.addChild(shadow_1_1_29_0);
						}
					}
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRElement,{
						'wx:if':`${this.data.!gateClosed}`,
					});
					shadow_1.addChild(shadow_1_2);
					{
						const shadow_1_2_0 = this.scene.createElement(xrFrameSystem.XRAssetRenderTexture,{
							'asset-id':`ar-camera`,
							'width':`${this.data.width}`,
							'height':`${this.data.height}`,
						});
						shadow_1_2.addChild(shadow_1_2_0);
					}
					{
						const shadow_1_2_1 = this.scene.createElement(xrFrameSystem.XRAssetRenderTexture,{
							'asset-id':`main-camera`,
							'width':`${this.data.width}`,
							'height':`${this.data.height}`,
						});
						shadow_1_2.addChild(shadow_1_2_1);
					}
					{
						const shadow_1_2_2 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`blur`,
							'type':`blur`,
							'data':`radius:0`,
						});
						shadow_1_2.addChild(shadow_1_2_2);
					}
					{
						const shadow_1_2_3 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
							'asset-id':`vignette`,
							'type':`vignette`,
							'data':`intensity:0,smoothness:2,color:0.1 0.1 0.1 1`,
						});
						shadow_1_2.addChild(shadow_1_2_3);
					}
					{
						const shadow_1_2_4 = this.scene.createElement(xrFrameSystem.XRCamera,{
							'id':`ar-bg-camera`,
							'cull-mask':`0`,
							'depth':`0`,
							'background':`ar`,
							'post-process':`blur vignette`,
							'render-target':`ar-camera`,
						});
						shadow_1_2.addChild(shadow_1_2_4);
					}
					{
						const shadow_1_2_5 = this.scene.createElement(xrFrameSystem.XRMaterial,{
							'asset-id':`final`,
							'effect':`last-record-final`,
							'uniforms':`u_arBg:render-ar-camera,u_main:render-main-camera`,
						});
						shadow_1_2.addChild(shadow_1_2_5);
					}
					{
						const shadow_1_2_6 = this.scene.createElement(xrFrameSystem.XRMesh,{
							'node-id':`final`,
							'layer':`2`,
							'geometry':`ar-camera-plane`,
							'material':`final`,
							'position':`0 0 2`,
						});
						shadow_1_2.addChild(shadow_1_2_6);
					}
					{
						const shadow_1_2_7 = this.scene.createElement(xrFrameSystem.XRCamera,{
							'id':`final-camera`,
							'cull-mask':`0b101`,
							'depth':`2`,
							'target':`final`,
							'is-clear-color':`false`,
						});
						shadow_1_2.addChild(shadow_1_2_7);
					}
				}
				{
					const shadow_1_3 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
						'asset-id':`bloom`,
						'type':`bloom`,
						'is-hdr':``,
						'data':`radius:32,intensity:2,threshold:0.7`,
					});
					shadow_1.addChild(shadow_1_3);
				}
				{
					const shadow_1_4 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
						'asset-id':`tone`,
						'type':`tone`,
					});
					shadow_1.addChild(shadow_1_4);
				}
				{
					const shadow_1_5 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`main-camera`,
						'near':`0.1`,
						'far':`2000`,
						'cull-mask':`0b11`,
						'depth':`1`,
						'is-ar-camera':``,
						'clear-color':`0 0 0 0`,
						'post-process':`bloom tone`,
						'render-target':`main-camera`,
					});
					shadow_1.addChild(shadow_1_5);
					{
						const shadow_1_5_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'wx:if':`${this.data.arReady && !loaded}`,
							'position':`0 0 10`,
							'model':`loading`,
							'anim-autoplay':``,
						});
						shadow_1_5.addChild(shadow_1_5_0);
					}
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
						'intensity':`2`,
					});
					shadow_2.addChild(shadow_2_0);
				}
			}
      this.scene.event.add('tick', this.handleTick.bind(this));
      this.inRealWorld = true;
      this.texts = {};
      this.textsIndex = {};
      this.bgm = wx.createInnerAudioContext({});
      this.bgm.src = 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/bgm.mp3';
      this.bgm.loop = true;
    },
    handleAssetsProgress: function ({detail}) {
      console.log('assets progress', detail.value);
    },
    handleARReady() {
      this.setData({arReady: true});
    },
    handleAssetsLoaded: function ({detail}) {
      console.log('assets loaded', detail.value);
      this.records = JSON.parse(this.scene.assets.getAsset('raw', 'records'));
      this.note = this.scene.assets.getAsset('raw', 'note');
      this.setData({loaded: true});
    },
    handleTick(dt) {
      this.syncTexts();

      if (!this.data.placed || !this.inRealWorld) {
        return;
      }

      const xrSystem = wx.getXrFrameSystem();
      const mainCamEl = this.scene.getElementById('main-camera');
      const mainTrs = mainCamEl.getComponent(xrSystem.Transform);
      const door = this.scene.getElementById('door').getComponent(xrSystem.Transform);

      let forward = door.worldForward;
      forward = xrSystem.Vector2.createFromNumber(forward.x, forward.z);
      let diff = mainTrs.worldPosition.sub(door.worldPosition);
      diff = xrSystem.Vector2.createFromNumber(diff.x, diff.z);
      const preDiff = this.diff || diff;
      this.diff = diff;

      const dis = diff.length();
      const preDis = preDiff.length();
      const dir = forward.dot(diff);
      this.startDis = this.startDis || dis;

      const blurAsset = this.scene.assets.getAsset('post-process', 'blur');
      const vignetteAsset = this.scene.assets.getAsset('post-process', 'vignette');
      const bloomAsset = this.scene.assets.getAsset('post-process', 'bloom');
      const edgeEnv1 = 0.5;
      const edgeEnv2 = 0.8;
      const edgeDoor1 = 0.3;
      const edgeDoor2 = 0.7;

      if (this.blurDuration) {
        this.blurDuration = Math.max(0, this.blurDuration - dt);
        const p = 1 - this.blurDuration / this.blurTotal;

        if (p <= edgeEnv1) {
          const progress = xrSystem.noneParamsEaseFuncs['ease-in-out'](p / edgeEnv1);
          vignetteAsset.data.intensity = progress * 2;
          blurAsset.data.radius = progress * 86 + 10;
        } else if (p > edgeEnv2) {
          const progress = xrSystem.noneParamsEaseFuncs['ease-in-out']((1 - p) / (1 - edgeEnv2));
          vignetteAsset.data.intensity = progress * 2;
          blurAsset.data.radius = progress * 96;
        }
        
        if (p >= edgeDoor1 && p < edgeDoor2) {
          const progress = xrSystem.noneParamsEaseFuncs['ease-in-out']((p - edgeDoor1) / (edgeDoor2 - edgeDoor1));
          door.scale.setValue(progress, 1, 1);
        }
      } else if (this.blurTotal) {
        let progress = (1 - Math.max(0, Math.min(dis / this.startDis, 0.8)));
        if (progress >= 0.2) {
          progress = (progress - 0.2) / 0.6;
          blurAsset.data.radius = progress * 96;
          vignetteAsset.data.intensity = progress * 2;
          bloomAsset.data.threshold = 0.5 + progress * 2;
        }
      }

      //@todo: 等待物理加上碰撞检测，替换
      if (dir >= 0 || preDis <= 0.2 || dis > 0.2) {
        return;
      }

      ['sky', 'scene-mesh', 'hikari', 'roam', 'xinyi'].forEach(id => {
        this.scene
          .getElementById(id)
          .getComponent(xrSystem.GLTF).meshes.forEach(mesh => mesh.material.setRenderState('stencilComp', 0));
      });
      mainCamEl.getComponent(xrSystem.Camera).setData({
        renderTarget: null,
        postProcess: ['tone']
      });
      this.setData({gateClosed: true});
      this.inRealWorld = false;
    },
    handleShowDoor({detail}) {
      if (detail.value.camera.el.id !== 'main-camera') {
        return;
      }

      const success = this.scene.ar.placeHere('setitem', true);
      if (!success) {
        return;
      }

      setTimeout(() => {
        this.blurTotal = this.blurDuration = 1700;
      }, 300);
      wx.setKeepScreenOn({keepScreenOn: true});
      this.bgm.play();
      this.setData({placed: true});
    },
    handleResume() {
      if (this.data.placed) {
        this.bgm.play();
      }
    },
    handleTouchNote({detail}) {
      if (detail.value.camera.el.id !== 'main-camera') {
        return;
      }

      this.triggerEvent('showNote', this.note);
    },
    handleTouchObj({detail}) {
      if (detail.value.camera.el.id !== 'main-camera') {
        return;
      }

      const xrSystem = wx.getXrFrameSystem();
      const {el, value} = detail;
      const {camera, target} = value;
      const id = target.id;
      let text = this.texts[id];
      const camTrs = camera.el.getComponent(xrSystem.Transform);
      const targetTrs = target.getComponent(xrSystem.Transform);
      const diff = camTrs.worldPosition.sub(targetTrs.worldPosition);
      const distance = Math.sqrt(diff.x * diff.x + diff.z * diff.z);

      if (!this.records[id]) {
        return;
      }

      const {y, d, texts: records} = this.records[id];

      if (distance > (d || 1.5)) {
        return;
      }

      if (text) {
        clearTimeout(text.timerId);
      }

      let index = this.textsIndex[id] === undefined ? -1 : this.textsIndex[id];
      if (index >= records.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      this.textsIndex[id] = index;

      this.texts[id] = {
        content: records[index],
        camera, target, y,
        timerId: setTimeout(() => {
          delete this.texts[id];
        }, 4000)
      };
    },
    syncTexts: function() {
      const texts = Object.keys(this.texts).map(id => {
        const {camera, target, content, y} = this.texts[id];
        const xrSystem = wx.getXrFrameSystem();
        const trs = target.getComponent(xrSystem.Transform);
        const tmp = trs.worldPosition.clone();
        tmp.y += y;
        const clipPos = camera.convertWorldPositionToClip(tmp);
        const {frameWidth, frameHeight} = this.scene;
  
        return {
          content, id,
          x: ((clipPos.x + 1) / 2) * frameWidth,
          y: (1 - (clipPos.y + 1) / 2) * frameHeight
        };
      });

      this.triggerEvent('changeTexts', texts);
    }
  }
})
