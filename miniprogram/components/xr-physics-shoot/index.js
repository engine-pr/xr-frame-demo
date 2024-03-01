Component({
  behaviors: [require('../common/share-behavior').default],
  properties: {
    a: Number,
  },
  data: {
    loaded: false,
    displayBricks: false
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
					const shadow_0_0 = this.scene.createElement(xrFrameSystem.XRMaterial,{
						'asset-id':`standard-mat`,
						'effect':`standard`,
					});
					shadow_0.addChild(shadow_0_0);
				}
				{
					const shadow_0_1 = this.scene.createElement(xrFrameSystem.XRAssetLoad,{
						'type':`raw`,
						'asset-id':`logo`,
						'src':`/assets/wx_logo.bmp.bin`,
					});
					shadow_0.addChild(shadow_0_1);
				}
			}
			{
				const shadow_1 = this.scene.createElement(xrFrameSystem.XRPhysics,{
				});
				shadow.addChild(shadow_1);
			}
			{
				const shadow_2 = this.scene.createElement(xrFrameSystem.XRNode,{
				});
				shadow.addChild(shadow_2);
				{
					const shadow_2_0 = this.scene.createElement(xrFrameSystem.XRArTracker,{
						'id':`arTracker`,
						'mode':`Marker`,
						'src':`/components/xr-physics-shoot/weixin.png`,
					});
					shadow_2_0.event.add('ar-tracker-state',(e)=>{
						this.handleARTrackerState({detail:{value:e}});
					});
					shadow_2.addChild(shadow_2_0);
					{
						const shadow_2_0_0 = this.scene.createElement(xrFrameSystem.XRNode,{
						});
						shadow_2_0.addChild(shadow_2_0_0);
					}
				}
				{
					const shadow_2_1 = this.scene.createElement(xrFrameSystem.XRNode,{
						'layer':`1`,
					});
					shadow_2.addChild(shadow_2_1);
					{
						const shadow_2_1_0 = this.scene.createElement(xrFrameSystem.XRShadow,{
							'id':`bricksRoot`,
							'node-id':`bricksRoot`,
						});
						shadow_2_1.addChild(shadow_2_1_0);
					}
				}
				{
					const shadow_2_2 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera2`,
						'node-id':`camera2`,
						'clear-color':`0.925 0.925 0.925 1`,
						'position':`0 0 5`,
						'background':`ar`,
						'is-ar-camera':``,
						'cull-mask':`1`,
					});
					shadow_2.addChild(shadow_2_2);
				}
				{
					const shadow_2_3 = this.scene.createElement(xrFrameSystem.XRCamera,{
						'id':`camera`,
						'node-id':`camera`,
						'position':`1 2 4`,
						'is-clear-color':`false`,
						'target':`bricksRoot`,
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
						'intensity':`1`,
					});
					shadow_3.addChild(shadow_3_0);
				}
				{
					const shadow_3_1 = this.scene.createElement(xrFrameSystem.XRLight,{
						'type':`directional`,
						'rotation':`180 0 0`,
						'color':`1 1 1`,
						'intensity':`3`,
					});
					shadow_3.addChild(shadow_3_1);
				}
			}
      this.cubeGeometry = this.scene.assets.getAsset("geometry", "cube");
      this.bricksRoot = this.scene.getElementById("bricksRoot");
      console.log('xr-scene', xrScene);
      this.matMap = new Map();
    },
    handleAssetsProgress: function({detail}) {
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function({detail}) {
      console.log('assets loaded', detail.value);
      this.setData({loaded: true});
    },
    handleARTrackerState({detail}) {console.log("ar state", detail.value.state);
      // 事件的值即为`ARTracker`实例
      const tracker = detail.value;
      // 获取当前状态和错误信息
      const {state, errorMessage} = tracker;
      if (state === 2 && !this.inited) {
        this.initBricks();
        this.inited = true;
      }
    },
    initBricks() {
      const xr = wx.getXrFrameSystem();
      const logo = this.scene.assets.getAsset("raw", "logo");
      const logoView = new Uint8Array(logo);
      if (logoView[0] !== 0x42 || logoView[1] !== 0x4D) {
        console.error("Not a valid bmp file!");
        return;
      }
      const dataOffset = logoView[10];
      const width = logoView[18];
      const height = logoView[22];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const b = logoView[dataOffset + (j * width + i) * 4 + 0];
          const g = logoView[dataOffset + (j * width + i) * 4 + 1];
          const r = logoView[dataOffset + (j * width + i) * 4 + 2];
          if (r !== 0xff || g !== 0x0 || b !== 0x80) {
            // not transparent pixel
            this.makeBrick((i - width * 0.5) * 0.11, (j - height * 0.5) * 0.11, r, g, b);
          }
        }
      }
      this.scene.event.add('touchstart', (e) => {
        const touch0 = e.touches[0];
        this.shoot(((touch0.pageX / this.scene.frameWidth) * 2 - 1) * 1, ((1.0 - touch0.pageY / this.scene.frameHeight) * 2 - 1) * 1);
      });
    },
    makeBrick(x, y, r, g, b) {
      const xr = wx.getXrFrameSystem();

      let mat = this.matMap.get(r * 256 * 256 + g * 256 + b);
      if (!mat) {
        mat = new xr.Material(this.scene);
        mat.initByEffect(this.scene.assets.getAsset("effect", "standard"));
        mat.setVector("u_baseColorFactor", xr.Vector4.createFromNumber(r / 256, g / 256, b / 256, 1));
        this.matMap.set(r * 256 * 256 + g * 256 + b, mat);
      }

      const meshDesc = {
        geometry: this.cubeGeometry,
        material: mat
      };
      const brickEl = this.scene.createElement(xr.XRNode);
      this.bricksRoot.addChild(brickEl);
      const brickMesh = brickEl.addComponent(xr.Mesh, meshDesc);
      const transform = brickEl.getComponent("transform");
      transform.position.x = x;
      transform.position.y = y;
      transform.position.z = 0;
      transform.scale.setValue(0.1, 0.1, 0.1);

      const rigidbody = brickEl.addComponent(xr.Rigidbody, { useGravity: false });
      brickEl.addComponent(xr.CubeShape, { autoFit: true });
      brickEl.addComponent(xr.ShapeInteract, { collide: true, bounciness: 0 });
      rigidbody.sleep();
      
      return brickMesh;
    },
    shoot(x, y) {
      const xr = wx.getXrFrameSystem();

      const camera = this.scene.getElementById("camera").getComponent("camera");
      const origin = this.scene.getElementById("camera").getComponent("transform");

      const meshDesc = {
        geometry: this.scene.assets.getAsset("geometry", "sphere")
      };
      const bulletEl = this.scene.createElement(xr.XRNode);
      this.bricksRoot.addChild(bulletEl);
      const bulletMesh = bulletEl.addComponent(xr.Mesh, meshDesc);
      const transform = bulletEl.getComponent("transform");
      transform.position.set(origin.position);
      transform.scale.setValue(0.1, 0.1, 0.1);

      const rigidbody = bulletEl.addComponent(xr.Rigidbody, { useGravity: false });
      bulletEl.addComponent(xr.SphereShape, { autoFit: true });
      bulletEl.addComponent(xr.ShapeInteract, { collide: true, bounciness: 0 });
      let ray = xr.Vector3.createFromNumber(0, 0, 0);
      camera.convertClipPositionToWorld(xr.Vector3.createFromNumber(x, y, 0), ray);
      ray = ray.sub(origin.position);
      ray = ray.scale(10 / ray.length());
      rigidbody.addForce(ray, 1);
    }
  }
})
