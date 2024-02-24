import AnimatorSchema from "../schemas/AnimatorSchema"
import Component from "./Component"
export default class Animator extends Component {

	get schema() {
		return AnimatorSchema
	}
	setDataOne(key, value) {
		if (value == null) {
			return
		}
		switch (key) {
			case "animKeyframe":
				value.then(value => {
				//	console.error("=================", value)
				})
				break
			default:
				console.error("?????", key, value)
				throw new Error()
		}
  }
  createAnimation(claz,data){
    const animation =  new claz(this.el.scene)
    animation.init(data)
    return animation
  }
}
