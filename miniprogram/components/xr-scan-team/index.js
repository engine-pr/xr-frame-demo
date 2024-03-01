import XrTeamCameraAnimation from '../../xr-custom/animations/XrTeamCameraAnimation';

Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    loaded: false,
    run: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.requireRun = true;
        }
      }
    }
  },
  lifetimes: {
    detached: function() {
      this.voice.stop();
      this.bgm.stop();
    },
  },
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
						'type':`gltf`,
						'asset-id':`hikari`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/hikari-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`roam`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/roam-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`xinyi`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/xr-frame-team/xinyi-unlit.glb`,
					});
					shadow_0.addChild(shadow_0_2);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XREnv,{
					'env-data':`xr-frame-team-workspace-day`,
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.loaded}`,
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'id':`hikari`,
						'position':`0 0 0`,
						'rotation':`0 180 0`,
						'model':`hikari`,
						'anim-autoplay':`clip:Idle`,
						'capsule-shape':`height:2;raduis:0.3;center:0 1 0`,
					});
					shadow_2_0.event.add('gltf-loaded',(e)=>{
						this.handleModelLoaded({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_0);
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'id':`roam`,
						'position':`-1 0 0`,
						'rotation':`0 180 0`,
						'model':`roam`,
						'anim-autoplay':`clip:Idle`,
						'capsule-shape':`height:1;raduis:0.3;center:0 1 0`,
					});
					shadow_2_1.event.add('gltf-loaded',(e)=>{
						this.handleModelLoaded({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_1);
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRGLTF,{
						'id':`xinyi`,
						'position':`1 0 0`,
						'rotation':`0 180 0`,
						'model':`xinyi`,
						'anim-autoplay':`clip:Idle`,
						'capsule-shape':`height:1;raduis:0.3;center:0 1 0`,
					});
					shadow_2_2.event.add('gltf-loaded',(e)=>{
						this.handleModelLoaded({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_2);
				}
			}
			{
				const shadow_3 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`camera-target`,
					'position':`0 0.8 0`,
				});
				shadow.addChild(shadow_3);
			}
			{
				const shadow_4 = this.scene.createElement(xrFrameSystem.XRCamera,{
					'id':`camera`,
					'position':`0 0.8 3`,
					'clear-color':`0.925 0.925 0.925 1`,
					'background':`skybox`,
					'target':`camera-target`,
					'camera-orbit-control':``,
				});
				shadow.addChild(shadow_4);
			}
			{
				const shadow_5 = this.scene.createElement(xrFrameSystem.XRLight,{
					'type':`ambient`,
					'color':`1 1 1`,
					'intensity':`0.4`,
				});
				shadow.addChild(shadow_5);
			}
      console.log('xr-scene', xrScene);
      this.bgm = wx.createInnerAudioContext({});
      this.bgm.src = 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/kaqituolitai.mp3';
      this.bgm.volume = 0.5;
      this.voice = wx.createInnerAudioContext({useWebAudioImplement: true});
      this.voice.src = 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/homo.m4a';
      this.voiceFrag = {
        xinyi: [4, 2],
        roam: [6.8, 2],
        hikari: [53.9, 2],
        jump: [8.9, 1.5]
      };
      this.tmpV3 = new (wx.getXrFrameSystem().Vector3)();
    },
    handleAssetsLoaded: function({detail}) {
      this.triggerEvent('assetsLoaded', detail.value);
    },
    handleRaf: function({detail}) {
      if (!this.init()) {
        return;
      }
      
      if (this.requireRun) {
        this.requireRun = false;
        this.run();
      }

      this.triggerEvent('syncPositions', [
        this.getScreenPosition(this.hikari, '瞬光'),
        this.getScreenPosition(this.roam, 'roam'),
        this.getScreenPosition(this.xinyi, 'xinyi')
      ]);
    },
    getScreenPosition: function(char, name) {
      this.tmpV3.set(char.worldPosition);
      this.tmpV3.x += -0.1;
      this.tmpV3.y += 1.2;
      const clipPos = this.camera.convertWorldPositionToClip(this.tmpV3);
      const {frameWidth, frameHeight} = this.scene;
      return [((clipPos.x + 1) / 2) * frameWidth, (1 - (clipPos.y + 1) / 2) * frameHeight, name];
    },
    init: function() {
      if (!this.camera) {
        const camEl = this.scene.getElementById('camera');
        this.camera = camEl.getComponent(wx.getXrFrameSystem().Camera);
        this.cameraCtrl = camEl.getComponent('camera-orbit-control');
      }

      const inited = this.camera && this.hikari && this.roam && this.xinyi;

      if (inited && !this.cameraAnim) {
        this.cameraAnim = this.camera.el.addComponent(wx.getXrFrameSystem().Animator);
        this.cameraAnim.createAnimation(XrTeamCameraAnimation, {
          targets: {
            hikari: this.hikari.position,
            roam: this.roam.position,
            xinyi: this.xinyi.position,
            final: this.hikari.position
          },
          startY: 1.2,
          finalY: 0.8
        });
      }

      return inited;
    },
    handleModelLoaded: function({detail}) {
      const {target} = detail.value;
      this[target.id] = target.getComponent(wx.getXrFrameSystem().Transform);
    },
    run: async function() {
      this.cameraCtrl.disable();

      await this.prepareRun('xinyi');
      await this.prepareRun('roam');
      await this.prepareRun('hikari');

      await this.prepareCamera();

      this.runOne(this.hikari);
      this.runOne(this.roam);
      this.runOne(this.xinyi);

      this.cameraCtrl.enable();
    },
    prepareRun: async function(char) {
      const voiceFrag = this.voiceFrag[char];

      return new Promise(resolve => {
        const animator = this[char].el.getComponent(wx.getXrFrameSystem().Animator);

        this.cameraAnim.play(char);
        this.cameraAnim.el.event.addOnce('anim-stop', () => {
          this.voice.seek(voiceFrag[0]);
          this.voice.play();

          setTimeout(() => {
            this.voice.stop();
            animator.stop();
            animator.pauseToFrame('Run', 0);
            setTimeout(() => resolve(), 200);
          }, voiceFrag[1] * 1000);
        });
      });
    },
    prepareCamera: async function() {
      this.bgm.play();
      this.bgm.seek(46);

      return new Promise(resolve => {
        this.cameraAnim.play('final');
        this.cameraAnim.el.event.addOnce('anim-stop', () => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      });
    },
    runOne: function(char) {
      const animator = char.el.getComponent(wx.getXrFrameSystem().Animator);
      animator.resume();

      const jump = () => {
        this.voice.seek(this.voiceFrag.jump[0]);
        this.voice.play();
        animator.stop();
        animator.play('Jump', {loop: 0});
        animator.el.event.addOnce('anim-stop', () => {
          animator.play('Run');
          this.voice.stop();
        });
        char.el.event.addOnce('touch-shape', jump);
      }

      char.el.event.addOnce('touch-shape', jump);
    }
  }
})
