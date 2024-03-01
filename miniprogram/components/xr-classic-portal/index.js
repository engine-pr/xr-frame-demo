Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
  },
  data: {
    loaded: false,
    arReady: false,
  },
  lifetimes: {
    detached() {
      wx.setKeepScreenOn({keepScreenOn: false});
    }
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
						'asset-id':`anchor`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/ar-plane-marker.glb`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`gltf`,
						'asset-id':`gltf-model`,
						'src':`https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/demo/ship_in_clouds/scene.gltf`,
					});
					shadow_0.addChild(shadow_0_1);
				}
				{
					const shadow_0_2 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`mat`,
						'effect':`simple`,
					});
					shadow_0.addChild(shadow_0_2);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRNode,{
					'wx:if':`${this.data.loaded}`,
				});
				shadow.addChild(shadow_1);
				{
					const shadow_1_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'mode':`Plane`,
					});
					shadow_1.addChild(shadow_1_0);
					{
						const shadow_1_0_0 = this.scene.createElement(xrFrameSystem.XRGLTF,{
							'id':`anchor`,
							'model':`anchor`,
						});
						shadow_1_0.addChild(shadow_1_0_0);
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
							'id':`scene-mesh`,
							'model':`gltf-model`,
							'position':`0 2 8`,
							'rotation':`0 0 0`,
							'scale':`5 5 5`,
							'states':`stencilComp: 3, stencilRef: 1, stencilReadMask: 1`,
						});
						shadow_1_1.addChild(shadow_1_1_0);
					}
					{
						const shadow_1_1_1 = this.scene.createElement(xrFrameSystem.XRNode,{
							'id':`door`,
							'position':`0 1 0`,
						});
						shadow_1_1.addChild(shadow_1_1_1);
						{
							const shadow_1_1_1_0 = this.scene.createElement(xrFrameSystem.XRMesh,{
								'id':`door-mesh`,
								'rotation':`90 0 0`,
								'scale':`0.8 1 1.6`,
								'geometry':`plane`,
								'material':`mat`,
								'states':`renderQueue: 1, stencilComp: 7, stencilRef: 1, stencilReadMask: 1, stencilWriteMask: 1, stencilPass: 1, stencilFail: 2, stencilZFail: 2`,
							});
							shadow_1_1_1.addChild(shadow_1_1_1_0);
						}
					}
				}
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
					'id':`main-camera`,
					'near':`0.1`,
					'far':`2000`,
					'background':`ar`,
					'is-ar-camera':``,
					'clear-color':`1 0 0 1`,
				});
				shadow.addChild(shadow_2);
			}
			{
				const shadow_3 = this.scene.createElement(xrFrameSystem.XRCamera,{
					'id':`magic-camera`,
					'background':`default`,
					'cull-mask':`0`,
					'is-clear-color':`false`,
					'is-clear-stencil':`false`,
					'is-clear-depth':`false`,
				});
				shadow.addChild(shadow_3);
			}
			{
				const shadow_4 = this.scene.createElement(xrFrameSystem.XRNode,{
					'node-id':`lights`,
				});
				shadow.addChild(shadow_4);
				{
					const shadow_4_0 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`ambient`,
						'color':`1 1 1`,
						'intensity':`0.6`,
					});
					shadow_4.addChild(shadow_4_0);
				}
			}
      this.inRealWorld = true;
      console.log('xr-scene', xrScene);
    },
    handleAssetsProgress: function ({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function ({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
      this.scene.event.addOnce('touchstart', this.placeNode.bind(this));
      wx.showToast({title: '点击屏幕放置'});
    },
    handleTick() {
      if (!this.placed) {
        return;
      }

      const xrSystem = wx.getXrFrameSystem();
      const mainCamEl = this.scene.getElementById('main-camera');
      const magicCamEl = this.scene.getElementById('magic-camera');
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

      //@todo: 等待物理加上碰撞检测，替换
      if (preDis <= 0.2 || dis > 0.2) {
        return;
      }

      if (this.inRealWorld && dir >= 0) {
        return;
      }

      if (!this.inRealWorld && dir <= 0) {
        return;
      }

      const mainCam = mainCamEl.getComponent(xrSystem.Camera);
      const magicCam = magicCamEl.getComponent(xrSystem.Camera);
      const doorMesh = this.scene.getElementById('door-mesh').getComponent(xrSystem.Mesh);
      const sceneMesh = this.scene.getElementById('scene-mesh').getComponent(xrSystem.GLTF);

      if (!this.inRealWorld) {
        // 现实世界
        // mainCam: ar -> stencil -> scene
        // magicCam: nothing
        this.inRealWorld = true;
        mainCam.setData({background: 'ar'});
        magicCam.setData({background: 'default'});
        magicCam.setData({isClearDepth: false});
        magicCam.clearBackgroundRenderStates();
        doorMesh.material.renderQueue = 1;
        doorMesh.material.setRenderState('cullFace', 2);
        sceneMesh.meshes.forEach(mesh => mesh.material.setRenderState('stencilComp', 3));
      } else {
        // 虚拟世界
        // mainCam: scene -> stencil
        // magicCam: ar
        this.inRealWorld = false;
        mainCam.setData({background: 'default'});
        magicCam.setData({background: 'ar'});
        magicCam.setData({isClearDepth: true});
        magicCam.setBackgroundRenderStates({
          stencilComp: 3,
          stencilRef: 1,
          stencilReadMask: 1
        });
        doorMesh.material.renderQueue = 9999;
        doorMesh.material.setRenderState('cullFace', 1);
        sceneMesh.meshes.forEach(mesh => mesh.material.setRenderState('stencilComp', 0));
      }
    },
    placeNode(event) {
      const {clientX, clientY} = event.touches[0];
      const {frameWidth: width, frameHeight: height} = this.scene;

      if (clientY / height > 0.8 && clientX / width > 0.8) {
        this.scene.getNodeById('setitem').visible = false;
        this.scene.ar.resetPlane();
        this.scene.event.addOnce('touchstart', this.placeNode.bind(this));
      } else {
        this.scene.ar.placeHere('setitem', true);
        this.scene.getElementById('anchor').getComponent(wx.getXrFrameSystem().Transform).setData({visible: false});
        this.placed = true;
        wx.setKeepScreenOn({keepScreenOn: true});
      }
    },
  }
})
