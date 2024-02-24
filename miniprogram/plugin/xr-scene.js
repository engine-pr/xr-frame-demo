import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	core,
	Event,
	Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';

import Scene from "./Scene";
var window_innerWidth = 0,
	window_innerHeight = 0
var requestId
Component({
	behaviors: [require('xr')],
	properties: {
		width: Number,
		height: Number
	},
	data: {
		ready: false
	},
	observers: {
		'width, height': function (width, height) {
			if (!width || !height) {
				return
			}
			this.window_resize(width, height)
		}
	},
	lifetimes: {
		attached: function () {
			//
			const page = core.Page.current
			page.xr_scene = this._element = new Scene()
			this._element._inXML = true
			//
			const three_scene = new THREE.Scene()
			three_scene.name = this.properties.id
			document.createElementAsync("canvas", "webgl2", this).then(canvas => {
				page.canvas = canvas
				this.canvas = canvas
				this._element.three_canvas = canvas
				this.body_load()
			})
			this._element.three_node = three_scene
		},
		detached: function () {
			cancelAnimationFrame(requestId, this.canvas)
			this.worker && this.worker.terminate()
			if (this.canvas) this.canvas = null
			setTimeout(() => {
				if (this._element.three_ instanceof THREE.WebGLRenderer) {
					this._element.three_renderer.dispose()
					this._element.three_renderer.forceContextLoss()
					this._element.three_renderer.context = null
					this._element.three_renderer.domElement = null
					this._element.three_renderer = null
				}
			}, 0)
		}
	},
	methods: {
		get defaultComponents() {
			return {}
		},
		body_load() {
			if (!this.canvas) {
				return
			}
			const clock = new THREE.Clock(); //计时器
			const FPS = 120.0; // 指的是 30帧每秒的情况
			const singleFrameTime = (1 / FPS);
			let timeStamp = 0;
			const renderer = this._element.three_renderer = new THREE.WebGLRenderer({
				canvas: this.canvas,
				antialias: true,
				alpha: true
			});
			renderer.shadowMap.enabled = true;

			if (this._element.temp_clearColor) {
				this._element.three_renderer.setClearColor(this._element.temp_clearColor, 0)
				this._element.temp_clearColor = null
			}
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window_innerWidth, window_innerHeight);
      /////////////////////////////////////

			const render = (delta) => {
				if (!this._element) {
					return
				}
				const three_camera = this._element.three_camera
				if (!three_camera) {
					return
				}

				if (typeof 	this._element.three_drag == "function") {
          this._element.three_drag(	this._element.scene)
				}
				if (this._element.needControl) {
					//	this._element.three_control = this._element.needControl(three_camera, this.canvas)
					this._element.needControl = null
				}
				//	if (this._element.three_control) {
				//	this._element.three_control.update()
				//}
				this.dfs((child, {
					delta
				}) => {
					Object.keys(child._components).forEach(comId => {
						const component = child._components[comId]
						component.onTick(delta)
					})
				}, {
					delta
        }, true, () => {})
				renderer.render(this._element.three_node, three_camera);
			}
			var temp = 0
			const animate = () => {
				/*if(temp++>=10){
				  return
        }*/
				requestId = requestAnimationFrame(animate);
				const delta = clock.getDelta(); //获取距离上次请求渲染的时间
				//timeStamp += delta;
				//if (timeStamp > singleFrameTime) {
				render(delta); //渲染
				// 剩余的时间合并进入下次的判断计算 这里使用取余数是因为 当页页面失去焦点又重新获得焦点的时候，delta数值会非常大， 这个时候就需要
				//timeStamp = (timeStamp % singleFrameTime);
				//}
			}
			animate()

			this.triggerEvent("ready", {
				value: this._element
			})
		},
		window_resize(width, height) {
			const xrFrameSystem = wx.getXrFrameSystem()
			xrFrameSystem.window_innerWidth = window_innerWidth = width
			xrFrameSystem.window_innerHeight = window_innerHeight = height
			this.body_load()
			const three_camera = this._element.three_camera
			if (three_camera) {
				three_camera.aspect = window_innerWidth / window_innerHeight;
				three_camera.updateProjectionMatrix();
			}
		},
		webgl_touch(e) {
			const web_e = (window.platform == "devtools" ? Event : Event0).fix(e)
			this.canvas.dispatchEvent(web_e)
		}
	}
})
