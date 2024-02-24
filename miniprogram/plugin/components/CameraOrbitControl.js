import Component from "./Component"
import CameraOrbitControlSchema from "../schemas/CameraOrbitControlSchema"
import {
	window
} from "dhtml-weixin"
import {
	OrbitControls
} from '../three/addons/controls/OrbitControls.js';
import {
	OrbitControls0
} from '../three/addons/controls/OrbitControls0.js';

export default class CameraOrbitControl extends Component {
	get schema() {
		return CameraOrbitControlSchema
	}
	setDataOne(key, value) {
    /*
		if (!this.el.scene.three_control) {
			this.el.scene.needControl = (three_camera, three_canvas) => {
				const three_control = new(window.platform == "devtools" ? OrbitControls : OrbitControls0)(
					three_camera,
					three_canvas);
				for (const k of Object.keys(this._data)) {
					const v = this._data[k]
					this.setDataOne(k, v)
        }
        three_control.update()
				return three_control
			}
			return
		}
		const three_control = this.el.scene.three_control
		switch (key) {
			case "enabled":
				three_control.enabled = value
				break;
			default:
				console.error(key, value)
				throw new Error()
		}*/
	}
}
