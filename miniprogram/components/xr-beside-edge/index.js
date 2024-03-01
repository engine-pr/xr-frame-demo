const info = wx.getSystemInfoSync();
const dpi = info.pixelRatio;
const width = info.windowWidth * dpi;
const height = info.windowHeight * dpi;

import CONFIG from './config.js';

const ROOT_DURATIONS = [
  3000, 4500, 6000, Infinity
];
const ROOT_DELAYS = [
  2000, 1500, 1000, 0
];
const ROOT_AMBIENTS = [
  0.05, 0.15, 0.4, 1
];
const ROOT_BLURS = [
  32, 32, 16, 0
];
const REAL_BLURS = [
  0, 32, 48, 96
];

function showFinalChoose(content, callback) {
  wx.showModal({
    title: '做出选择',
    content,
    showCancel: true,
    confirmText: '正视现实',
    cancelText: '我不要！',
    success: (res) => {
      if (res.cancel) {
        showFinalChoose('不能逃避！', callback);
      } else {
        callback();
        setTimeout(() => {
          wx.showToast({
            title: '勇敢一些\n不要怯懦',
            duration: 5000,
            icon: 'none'
          })
        }, 500);
      }
    }
  });
}

Component({
  scene: null,
  properties: {
    nextAction: {
      type: String,
      value: '',
      observer(fromWhat, old) {
        if (fromWhat === 'item') {
          this.remainItems -= 1;
          if (this.remainItems === 0) {
            this.disable3DTouch = false;
            this.setData({subStep: true});
            return;
          }

          this.switchSide(false);
          this.triggerEvent('requireLight', {state: 'idle'});
          return;
        }

        if (fromWhat === 'char') {
          const {texts} = this.config.steps[this.data.step];
          this.requireDialog({texts, from: 'step'});
          return;
        }

        if (fromWhat === 'step' || fromWhat === 'intro') {
          const step = this.data.step + 1;
          if (step === 4) {
            wx.showModal({
              title: '最后的信',
              content: this.config.letter.texts.join('\n'),
              showCancel: false,
              confirmText: '做出选择',
              complete: () => {
                showFinalChoose('', () => this.switchSide(false, 0));
              }
            });
            return;
          }

          if (step === 3) {
            this.bgm.stop();
            this.bgm2.play();
          }

          this.remainItems = this.config.steps[step].itemCount;
          this.setData({step, subStep: false, ambient: ROOT_AMBIENTS[step]});
          this.switchSide(false);
          this.triggerEvent('requireLight', {state: 'idle'});
          return;
        }

        if (fromWhat === 'light') {
          this.switchSide(true);
          this.disable3DTouch = false;
          this.lightDuration = ROOT_DURATIONS[this.data.step];
          this.lightDelay = ROOT_DELAYS[this.data.step];
        }
      }
    }
  },
  data: {
    step: -1,
    subStep: false,
    ambient: 0,
    width: width,
    height: height,
    loaded: false,
    arReady: false
  },
  lifetimes: {
    detached() {
      this.bgm.stop();
      this.bgm2.stop();
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
				shadow_0.event.add('loaded',(e)=>{
					this.handleAssetsLoaded({detail:{value:e}});
				});
				shadow.addChild(shadow_0);
				{
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`loading`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/loading.glb`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`sky`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/sky.gltf`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`office`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/ggj2023-scene.glb`,
					});
					shadow_0.addChild(shadow_0_2);
				}
				{
					const shadow_0_3 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`hikari`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/hikari-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_3);
				}
				{
					const shadow_0_4 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`roam`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/roam-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_4);
				}
				{
					const shadow_0_5 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`xinyi`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/xinyi-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_5);
				}
				{
					const shadow_0_6 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`texture`,
						'asset-id':`particle-point`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/particles/point.png`,
					});
					shadow_0.addChild(shadow_0_6);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						'id':`setitem`,
						'node-id':`setitem`,
						'visible':`false`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`sky`,
							'model':`sky`,
							'states':`cullOn: false`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
					}
					{
						const shadow_1_0_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`scene-mesh`,
							'model':`office`,
						});
						shadow_1_0.addChild(shadow_1_0_1);
					}
					{
						const shadow_1_0_2 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.step === 0}`,
							'position':`5.6 -0.5 2.27`,
						});
						shadow_1_0.addChild(shadow_1_0_2);
						{
							const shadow_1_0_2_0 = this.scene.createElement(xrFrameSystem.XRNode,{
								'id':`wine`,
								'wx:if':`${this.data.!subStep}`,
								'cube-shape':`size:0.2 0.4 1.6`,
							});
							shadow_1_0_2_0.event.add('touch-shape',(e)=>{
								this.handleTouchObj({detail:{value:e}});
							});
							shadow_1_0_2.addChild(shadow_1_0_2_0);
						}
						{
							const shadow_1_0_2_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
								'id':`xinyi`,
								'wx:if':`${this.data.subStep}`,
								'position':`-1.2 -1.8 -0.5`,
								'rotation':`0 80 0`,
								'model':`xinyi`,
								'anim-autoplay':`clip:Idle`,
								'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
							});
							shadow_1_0_2_1.event.add('touch-shape',(e)=>{
								this.handleTouchChar({detail:{value:e}});
							});
							shadow_1_0_2.addChild(shadow_1_0_2_1);
						}
					}
					{
						const shadow_1_0_3 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.step === 1}`,
							'position':`-3.2 -1.3 -5`,
						});
						shadow_1_0.addChild(shadow_1_0_3);
						{
							const shadow_1_0_3_0 = this.scene.createElement(xrFrameSystem.XRNode,{
								'id':`vending`,
								'wx:if':`${this.data.!subStep}`,
								'rotation':`0 0 0`,
								'cube-shape':`size:2 2 0.4`,
							});
							shadow_1_0_3_0.event.add('touch-shape',(e)=>{
								this.handleTouchObj({detail:{value:e}});
							});
							shadow_1_0_3.addChild(shadow_1_0_3_0);
						}
						{
							const shadow_1_0_3_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
								'id':`roam`,
								'wx:if':`${this.data.subStep}`,
								'position':`-0.4 -1 0.6`,
								'rotation':`0 180 0`,
								'model':`roam`,
								'anim-autoplay':`clip:Idle`,
								'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
							});
							shadow_1_0_3_1.event.add('touch-shape',(e)=>{
								this.handleTouchChar({detail:{value:e}});
							});
							shadow_1_0_3.addChild(shadow_1_0_3_1);
						}
					}
					{
						const shadow_1_0_4 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.step === 2}`,
							'position':`-5.7 -1.17 4.47`,
						});
						shadow_1_0.addChild(shadow_1_0_4);
						{
							const shadow_1_0_4_0 = this.scene.createElement(xrFrameSystem.XRNode,{
								'id':`corner`,
								'wx:if':`${this.data.!subStep}`,
								'cube-shape':`size:1 1 1`,
							});
							shadow_1_0_4_0.event.add('touch-shape',(e)=>{
								this.handleTouchObj({detail:{value:e}});
							});
							shadow_1_0_4.addChild(shadow_1_0_4_0);
						}
						{
							const shadow_1_0_4_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
								'id':`hikari`,
								'wx:if':`${this.data.subStep}`,
								'position':`1.5 -0.6 -0.6`,
								'rotation':`0 90 0`,
								'model':`hikari`,
								'anim-autoplay':`clip:Idle`,
								'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
							});
							shadow_1_0_4_1.event.add('touch-shape',(e)=>{
								this.handleTouchChar({detail:{value:e}});
							});
							shadow_1_0_4.addChild(shadow_1_0_4_1);
						}
					}
					{
						const shadow_1_0_5 = this.scene.createElement(xrFrameSystem.XRNode,{
							'wx:if':`${this.data.step === 3}`,
							'position':`0 -2 -4.5`,
						});
						shadow_1_0.addChild(shadow_1_0_5);
						{
							const shadow_1_0_5_0 = this.scene.createElement(xrFrameSystem.XRNode,{
								'id':`sofa`,
								'wx:if':`${this.data.!subStep}`,
								'rotation':`0 16 0`,
								'cube-shape':`size:2 0.6 1`,
							});
							shadow_1_0_5_0.event.add('touch-shape',(e)=>{
								this.handleTouchObj({detail:{value:e}});
							});
							shadow_1_0_5.addChild(shadow_1_0_5_0);
						}
						{
							const shadow_1_0_5_1 = this.scene.createElement(xrFrameSystem.XRNode,{
								'wx:if':`${this.data.subStep}`,
								'position':`0 -0.4 0.2`,
							});
							shadow_1_0_5.addChild(shadow_1_0_5_1);
							{
								const shadow_1_0_5_1_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
									'id':`xinyi`,
									'position':`-0.6 0 0`,
									'rotation':`0 180 0`,
									'model':`xinyi`,
									'anim-autoplay':`clip:Sitting`,
									'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
								});
								shadow_1_0_5_1_0.event.add('touch-shape',(e)=>{
									this.handleTouchChar({detail:{value:e}});
								});
								shadow_1_0_5_1.addChild(shadow_1_0_5_1_0);
							}
							{
								const shadow_1_0_5_1_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
									'id':`roam`,
									'position':`0.6 0 0`,
									'rotation':`0 180 0`,
									'model':`roam`,
									'anim-autoplay':`clip:Sitting`,
									'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
								});
								shadow_1_0_5_1_1.event.add('touch-shape',(e)=>{
									this.handleTouchChar({detail:{value:e}});
								});
								shadow_1_0_5_1.addChild(shadow_1_0_5_1_1);
							}
							{
								const shadow_1_0_5_1_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
									'id':`hikari`,
									'position':`0 0 0`,
									'rotation':`0 180 0`,
									'model':`hikari`,
									'anim-autoplay':`clip:Sitting`,
									'capsule-shape':`height:1;raduis:0.2;center:0 0.7 0`,
								});
								shadow_1_0_5_1_2.event.add('touch-shape',(e)=>{
									this.handleTouchChar({detail:{value:e}});
								});
								shadow_1_0_5_1.addChild(shadow_1_0_5_1_2);
							}
						}
					}
				}
				{
					const shadow_1_1 = this.scene.createElement(xrFrameSystem.XRAssetPostProcess,{
						'asset-id':`blur`,
						'type':`blur`,
						'data':`radius:0`,
					});
					shadow_1.addChild(shadow_1_1);
				}
				{
					const shadow_1_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`main-camera`,
						'node-id':`main-camera`,
						'background':`ar`,
						'is-ar-camera':``,
						'near':`0.1`,
						'far':`2000`,
						'clear-color':`0 0 0 1`,
						'post-process':`blur`,
					});
					shadow_1.addChild(shadow_1_2);
					{
						const shadow_1_2_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'wx:if':`${this.data.arReady && !loaded}`,
							'position':`0 0 10`,
							'model':`loading`,
							'anim-autoplay':``,
						});
						shadow_1_2.addChild(shadow_1_2_0);
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
						'intensity':`${this.data.ambient}`,
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'node-id':`light`,
						'type':`spot`,
						'color':`1 1 1`,
						'intensity':`4`,
						'inner-cone-angle':`5`,
						'outer-cone-angle':`25`,
						'range':`4`,
						'wx:if':`${this.data.step < 3}`,
					});
					shadow_2.addChild(shadow_2_1);
				}
			}
      this.scene.event.add('tick', this.handleTick.bind(this));
      this.inited = false;
      this.disable3DTouch = false;
      this.remainItems = 0;
      this.lightDuration = 0;
      this.lightDelay = 0;
      this.bgm = wx.createInnerAudioContext({});
      this.bgm.src = 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/beside-edge/bgm1.mp3';
      this.bgm.loop = true;
      this.bgm2 = wx.createInnerAudioContext({});
      this.bgm2.src = 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/beside-edge/bgm2.mp3';
      this.bgm2.loop = true;
    },
    handleARReady() {
      wx.setKeepScreenOn({keepScreenOn: true});
      this.setData({arReady: true});
    },
    handleAssetsLoaded: function ({detail}) {
      console.log('assets loaded', detail.value);
      this.config = CONFIG;
      this.setData({loaded: true});
    },
    handleTick(dt) {
      const mainCamera = this.scene.getNodeById('main-camera');
      const light = this.scene.getNodeById('light');

      if (mainCamera && light) {
        light.position.set(mainCamera.position);
        light.rotation.set(mainCamera.rotation);
        light.rotation.x = Math.PI - light.rotation.x;
        light.rotation.y += Math.PI;
      }

      if (this.inited) {
        const nextDuration = Math.max(this.lightDuration - dt, 0);
        if (this.lightDuration > 0 && nextDuration === 0) {
          this.disable3DTouch = true;
          this.switchSide(false);
          this.triggerEvent('requireLight', {state: 'cd', wait: 1});
        } else if (this.lightDuration === 0) {
          const nextDelay = Math.max(this.lightDelay - dt, 0);
          if (this.lightDelay > 0 && nextDelay === 0) {
            this.triggerEvent('requireLight', {state: 'idle'});
          } else if (this.lightDelay > 0) {
            this.triggerEvent('requireLight', {state: 'cd', wait: nextDelay / ROOT_DELAYS[this.data.step]});
          }
          this.lightDelay = nextDelay;
        }

        this.lightDuration = nextDuration;
        return;
      }

      if (!this.data.arReady || !this.data.loaded) {
        return;
      }

      const setItem = this.scene.getNodeById('setitem');
      setItem.position.set(mainCamera.position);
      setItem.position.y = 1;
      this.inited = true;

      setTimeout(() => {
        this.switchSide(true, ROOT_BLURS[0]);
        const {texts} = this.config.intro;
        this.requireDialog({texts, from: 'intro'});
        this.bgm.play();
      }, 1000);
    },
    switchSide(virtual, blur) {
      const setItem = this.scene.getNodeById('setitem');
      setItem.visible = virtual;
      const blurAsset = this.scene.assets.getAsset('post-process', 'blur');
      if (virtual) {
        blurAsset.data.radius = blur === undefined ? ROOT_BLURS[this.data.step] : blur;
        this.triggerEvent('requireLight', {state: 'hide'});
      } else {
        blurAsset.data.radius = blur === undefined ? REAL_BLURS[this.data.step] : blur;
      }
    },
    handleResume() {
      if (this.inited) {
        this.data.step === 3 ? this.bgm2.play() : this.bgm2.play();
      }
    },
    handleTouchObj({detail}) {
      if (!this.inDistance(detail)) {
        return;
      }

      const id = detail.value.target.id;
      const {texts} = this.config.items[id];

      this.requireDialog({texts, from: 'item'});
    },
    handleTouchChar({detail}) {
      if (!this.inDistance(detail)) {
        return;
      }

      const id = this.data.step === 3 ? 'final' : detail.value.target.id;
      const {name, texts} = this.config.chars[id];
      this.requireDialog({name, texts, from: 'char'});
    },
    requireDialog(info) {
      this.disable3DTouch = true;
      this.lightDuration = Infinity;
      this.triggerEvent('requireLight', {state: 'hide'});
      info.name = info.name || '某个声音';
      this.triggerEvent('requireDialog', info);
    },
    inDistance(detail) {
      if (detail.value.camera.el.id !== 'main-camera') {
        return false;
      }

      if (this.disable3DTouch) {
        return false;
      }

      const xrSystem = wx.getXrFrameSystem();
      const {camera, target} = detail.value;
      const camTrs = camera.el.getComponent(xrSystem.Transform);
      const targetTrs = target.getComponent(xrSystem.Transform);
      const diff = camTrs.worldPosition.sub(targetTrs.worldPosition);

      return Math.sqrt(diff.x * diff.x + diff.z * diff.z) < 3;
    }
  }
})
