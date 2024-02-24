import GLTFModel from "../assets/GLTFModel"
import GLTFSchema from "../schemas/GLTFSchema"
import Component from "./Component"
export default class GLTF extends Component {
	get schema() {
		return GLTFSchema
	}
	setDataOne(key, value) {
		switch (key) {
			case "castShadow":
				this.el.three_node.castShadow = value
				break
			case "receiveShadow":
				this.el.three_node.receiveShadow = value
				break
			case "model":
				if (value instanceof GLTFModel) {
					value = new Promise(resolve => resolve(value))
				}
				value.then(value => {
          const three_mesh = value.three_model.clone()
          this.el.three_mesh=three_mesh
          this.el.addMesh(three_mesh)
          if( this.el.ui){
            this.el.ui.triggerEvent("gltf-loaded",{value: {target:this.el}})
          }
				})
				break
			default:
          AssetMaterial.setDataOne_any(this.el,three_mesh.material,this.el.material._effect, key, value)
          break
		}
	}
}
