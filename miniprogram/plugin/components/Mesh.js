import MeshSchema from "../schemas/MeshSchema"
import Component from "./Component"
import * as THREE from "../three/Three"
import AssetMaterial from "./AssetMaterial"
export default class Mesh extends Component {

	get schema() {
		return MeshSchema
	}
	setDataOne(key, value) {
		if (this.el._geometry && this.el._material) {
			if (this.el.three_node.children.length <= 0) {
       const three_mesh = new THREE.Mesh(
					this.el._geometry.three_geometry,
					this.el._material.three_material,
        )
        this.el.three_mesh=three_mesh
				this.el.addMesh(three_mesh)
				return
			}
		}
		switch (key) {
			case "geometry":
				if (!this.el._geometry) {
					this.el._geometry = value
				}
				return
			case "material":
				if (!this.el._material) {
					this.el._material = value
					for (const k of Object.keys(this._data)) {
						if (["geometry", "material"].includes(k)) {
							continue
						}
						const v = this._data[k]
						this.setDataOne(k, v)
					}
				}
				return
		}
		if (!this.el.material) {
			return
		}
		const three_mesh = this.el.three_node.children[0]
		switch (key) {
			case "castShadow":
				this.el._material.three_material.castShadow = value
				break
			case "receiveShadow":
				this.el._material.three_material.receiveShadow = value
				break
			default:
        AssetMaterial.setDataOne_any(this.el,three_mesh.material,this.el.material._effect, key, value)
        break
		}
	}
}
