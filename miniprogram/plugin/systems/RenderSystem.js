import Component from "../components/Component"
import * as THREE from "../three/Three"
export default class RenderSystem extends Component {
	setDataOne(key, value) {
		if (!value) {
			return
		}
		switch (key) {
			case "isSky2d":
				this._isSky2d = value
				break
			case "envData":
				value.then((value) => {
          const texture = value.specularMap.three_texture;
					texture.mapping = THREE.EquirectangularReflectionMapping;
					this.el.scene.three_node.environment = texture
				})
				break;
			case "skyMap":
				value.then((value) => {
					if (this._isSky2d) {
            this.el.scene.three_node.background = value.three_texture
						return
					}
					const geometry = new THREE.SphereGeometry(10, 60, 40);
					geometry.scale(-1, 1, 1);
					const material = new THREE.MeshBasicMaterial({
						map: value.three_texture
					});
					const mesh = new THREE.Mesh(geometry, material);
					this.el.scene.three_node.add(mesh);
				})
				break;
			default:
				console.error(key, value)
				throw new Error()
		}
	}

}
