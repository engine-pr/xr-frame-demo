import Component from "./Component"
import EnvSchema from "../schemas/EnvSchema";
import EnvData from "../assets/EnvData";
export default class Env extends Component {
	get schema() {
		return EnvSchema
	}
	setDataOne(key, value) {

		switch (key) {
			case "envData":
				if (value instanceof EnvData) {
					value = new Promise(resolve => resolve(value))
				}
				this.el.scene.render.setData({
					envData: value
				})
				break
			case "isSky2d":
        this.el.scene.render.setData({
					isSky2d: value
				})
				break
			case "diffuseExp":
        break
			case "skyMap":
				this.el.scene.render.setData({
					skyMap: value
				})
        break
			case "rotation":
			case "specularExp":
				break
			default:
				console.error(key)
				throw new Error()
		}
	}
}
