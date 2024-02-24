import TransformSchema from "../schemas/TransformSchema"
import * as THREE from "../three/Three"
import Component from "./Component"
//////////////////////////////////////////////////////////////////////////////////////////
import {d2a} from "../core/units"
export default class Transform extends Component {

	get schema() {
		return TransformSchema
	}
	set layer(layer) {
		this._layer = layer
	}
	get layer() {
		return this._layer
	}
	get node() {
		return this
	}
	get position() {
		return this.el.three_node.position
	}
	get quaternion() {
		return this.el.three_node.quaternion
	}
	get rotation() {
		return this.el.three_node.rotation
	}
	get scale() {
		return this.el.three_node.scale
	}
	get visible() {
		return this.el.three_node.visible
	}
	set visible(visible) {
		this.el.three_node.visible = visible
	}
	get worldForward() {

	}
	get worldMatrix() {

	}
	get worldPosition() {

	}
	get worldQuaternion() {

	}
	get worldRight() {

	}
	get worldScale() {

	}
	get worldUp() {

	}
	setLocalMatrix(mat) {

	}
	setDataOne(key, value) {
		if (value == null) {
			return
		}
		switch (key) {
			case "nodeId":
				this.el.nodeId = value
				this.el.three_node.name = value
				break;
			case "position":
				this.el.three_node.position.fromArray(value)
				break;
			case "rotation":
				this.el.three_node.rotation.fromArray([d2a(value[0]), d2a(value[1]), d2a(value[2])])
				break;
			case "scale":
				this.el.three_node.scale.fromArray(value)
				break;
			case "visible":
				this.el.three_node.visible = value
				break;
			case "layer":
				// this.el.three_node.layer = value
				break;
			default:
				console.error("?????", key, value)
				throw new Error()
		}
	}
	onAdd(parent, data) {
		parent.three_node = new THREE.Group()
		parent.three_node.el = parent
	}

}
