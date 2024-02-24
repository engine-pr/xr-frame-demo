import {
  window
} from "dhtml-weixin"

export default class Element {
  ///////////////////////////
	constructor(_type, triggerEvent) {
		this._components = {}
    this._children = []
    console.error("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    ////////////////////////
    /*
		this._guid = new core.GUID()
		const xrFrameSystem = wx.getXrFrameSystem()
		//console.error("【Element】", this.constructor.name, this.defaultComponents)
		Object.keys(this.defaultComponents).forEach(regsiterName => {
			const componentClass = xrFrameSystem.getRegisterComponent(regsiterName)
			if (!componentClass) {
				return
			}
			//console.error("【Element-Component】", regsiterName)
			this.addComponent(componentClass, null)
		})*/
	}
	// Properties
/*
	// event
	get event() {

	}
	get id() {
		return this._id
	}
	get inXML() {
		return this._inXML
	}
	get name() {
		return this._name
	}
	get parent() {
		return this._parent
	}
	set parent(parent) {
		this._parent = parent
		//
		for (const comId of Object.keys(this._components)) {
			const component = this._components[comId]
			component.onAdd(this, component._data)
		}
	}
	get scene() {
		return this._scene
	}
	// Methods
	addChild(child) {
		const xrFrameSystem = wx.getXrFrameSystem()
		child._scene = this._scene
		child.parent = this
		this._children.push(child)
		if (this.three_node && child.three_node) {
			if (!child.getComponent(xrFrameSystem.Camera)) {
				this.three_node.add(child.three_node)
			}
		}
	}
	addComponent(clz, options = {}) {
		const component = new clz()
    component._el = this
    const xrFrameSystem =  wx.getXrFrameSystem()
    
   // const allClass  =xrFrameSystem.getAllRegisterComponents()
    //var comId = Object.keys(allClass).filter(id=>allClass[id]==clz)[0]
		//this._components[comId] = component
		//if (options) {
			//component.setData(options)
		//}
		return component
	}
	dfs(callback, defaultParams, excludeRoot, stop) {
		function _dfs(parent, callback, defaultParams, stop) {
			for (const child of parent._children) {
				if (stop(child, defaultParams)) {
					return true
				}
				callback(child, defaultParams)
				if (_dfs(child, callback, defaultParams, stop)) {
					return
				}
			}
		}
		if (!excludeRoot) {
			if (stop(this, defaultParams)) {
				return
			}
			callback(this, defaultParams)
		}
		_dfs(this, callback, defaultParams, stop)
	}
	getChildAtIndex(index) {
		return this._children[index]
	}
	getChildByClass(clz) {
		for (const child of this._children) {
			if (child instanceof clz) {
				return child
			}
		}
	}
	getChildByFilter(filter) {
		for (const child of this._children) {
			if (filter(child)) {
				return child
			}
		}
	}
	getChildByName(name) {
		for (const child of this._children) {
			if (child.name == name) {
				return child
			}
		}
	}
	getChildrenByFilter(filter) {
		return this._children.filter(child => filter(child))
	}
	getChildrenByName(name) {
		return this._children.filter(child => child.name == name)
	}
	getComponent(clz) {
    const xrFrameSystem =  wx.getXrFrameSystem()
    const allClass  =xrFrameSystem.getAllRegisterComponents()
    var comId = Object.keys(allClass).filter(id=>allClass[id]==clz)[0]
		return this._components[comId]
	}
	release() {
		return this._children = []
	}
	removeChild(child) {
		const index = this._children.findIndex(item => {
			return item._guid == child._guid
		})
		this._children.splice(index, 1)
		this.three_node.remove(child.three_node)
	}
	removeComponent(clz) {
		this._components[clz] = null
	}
	setAttribute(name, value) {

	}
	setId(id) {
		this._id = id
		this.three_node.id = id
	}
	////////////////////////////////////////////

	get three_node() {
		return this._three_node
	}
	set three_node(three_node) {
		this._three_node = three_node
	}
	addMesh(three_mesh) {
		this.three_node.add(three_mesh)
		this._setDrag(this.three_node)
	}
	_setDrag(three_node, canDrag) {
    return
		if (!three_node) {
			return
		}
		if (canDrag == null) {
			if (three_node.el.three_mesh) {
				canDrag = true
				if (three_node.children.length > 0) {
					const three_mesh = three_node.children[0]
					if (three_mesh.material) {
            console.error("22222222222222",three_mesh.material)
            const states = three_mesh.material.xrframe_material.getData("states")
						if (states.depthTestWrite) {
							canDrag = Boolean(states.depthTestWrite != "false")
						}
					}
				}
			}
		}
		const index = this.scene.three_objects.findIndex((object) => {
			return object == three_node
		})
		if (canDrag) {
			if (index >= 0) {
				return
			}
			this.scene.three_objects.push(three_node)
		} else {
			if (index < 0) {
				return
			}
			this.scene.three_objects = this.scene.three_objects.splice(index, 1)
		}

		function addDragControl(scene) {
			const three_objects = scene.three_objects
			const three_camera = scene.three_camera
			const three_canvas = scene.three_canvas
			this.scene.three_drag = new DragControls(three_objects, three_camera, three_canvas);
			this.scene.three_drag.addEventListener('dragstart', function (e) {
				const el = e.object.parent.el
				if (el) {
					const ui = el.ui
			//		console.error("dragstart")
					ui.triggerEvent("touch-shape", {})
				}
			});
			this.scene.three_drag.addEventListener('dragend', function (e) {
				const el = e.object.parent.el
				if (el) {
					const ui = el.ui
			//		console.error("dragend")
					ui.triggerEvent("untouch-shape", {})
				}
      });
      this.scene.three_drag.addEventListener('pointerleave', function (e) {
				const el = e.object.parent.el
				if (el) {
					const ui = el.ui
			//		console.error("dragend")
					ui.triggerEvent("untouch-shape", {})
				}
			});
			this.scene.three_drag.addEventListener('drag', function (e) {
				const el = e.object.parent.el
				if (el) {
					const ui = el.ui
			//		console.error("drag")
					ui.triggerEvent("drag-shape", {
						value: {
							target: el,
							deltaX: -e.deltaX*window.devicePixelRatio,
							deltaY: e.deltaY
						}
					})
				}
			});
		}
		if (this.scene.three_camera && this.scene.three_canvas) {
			addDragControl(this.scene)
		} else {
			this.scene.three_drag = addDragControl
		}
	}*/
}
