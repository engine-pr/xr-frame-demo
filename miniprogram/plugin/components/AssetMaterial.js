import AssetMaterialSchema from "../schemas/AssetMaterialSchema"
import Component from "./Component"
import * as THREE from "../three/Three"
export default class AssetMaterial extends Component {

	get schema() {
		return AssetMaterialSchema
	}
	setDataOne(key, value) {
		const wxrFrameSystem = wx.getXrFrameSystem()
		if (key == "effect") {
			const assetId = this.getData("assetId")
			var asset = this.el.scene.assets.getAsset("effect", value)
			var effect
			if (asset) {
				effect = asset.value
			} else {
				const effectFunction = wxrFrameSystem.getRegisterEffect(value)
				effect = effectFunction(this.el.scene)
			}
			//effect.warmUp()
      const material = this.el.scene.createMaterial(effect, effect.description.uniforms)
      material.three_material.assetMaterial = this
			this.el.scene.assets.addAsset("asset-material", assetId, material)
			this.el.material = material

			this.el._effect = effect
			for (const k of Object.keys(this._data)) {
				const v = this._data[k]
				this.setDataOne(k, v)
			}
			return
		}
		if (!this.el.material) {
			return
		}
		AssetMaterial.setDataOne_any(this.el, this.el.material.three_material, this.el.material.effect, key, value)
	}
	static setDataOne_any(el, three_material, effect, key, value) {
		switch (key) {
			case "assetId":
			case "marcos":
			case "renderQueue":
			case "envData":
			case "neverCull":
				return
			case "states":
				for (const state_k of Object.keys(value)) {
					const state_v = value[state_k]
					switch (state_k) {
						case "depthTestWrite":
             // console.error("????????????????",value,el.three_node)
							el._setDrag(el.three_node, Boolean(state_v))
							break;
						default:
							console.error(key, value)
							break
					}
				}
				return
		}

		if (effect.name == "simple") {
			AssetMaterial.setDataOne_simple(el, three_material, effect, key, value)
			return
		}
		if (effect.name == "standard") {
			AssetMaterial.setDataOne_standard(el, three_material, effect, key, value)
			return
		}
		console.error(three_material, effect)
		throw new Error()
	}
	static setDataOne_simple(el, three_material, effect, key, value) {
		if (!value) {
			return
		}
		const xrFrameSystem = wx.getXrFrameSystem()
		switch (key) {
			case "uniforms":
				for (const uniform_k of Object.keys(value)) {
					const property = effect.description.properties.find(property => property.key == uniform_k)
					if (!property) {
						console.error(effect.description.properties, uniform_k)
						return
					}
					const uniform_v_ = value[uniform_k]
					var uniform_v
					switch (property.type) {
						case xrFrameSystem.EUniformType.FLOAT:
							uniform_v = parseFloat(uniform_v_)
							break;
						case xrFrameSystem.EUniformType.FLOAT2:
						case xrFrameSystem.EUniformType.FLOAT3:
						case xrFrameSystem.EUniformType.FLOAT4:
							uniform_v = uniform_v_.split(" ").map(v => parseFloat(v))
							break;
						case xrFrameSystem.EUniformType.SAMPLER:
							el.scene.assets.getAssetWithState("texture", uniform_v_).then(asset => {
								const {
									value
								} = asset
								const kvs = this.el.material._effect.key2key_simple(uniform_k, value)
								for (const kv of kvs) {
									const map = kv.v
									map.wrapS = THREE.RepeatWrapping;
									map.wrapT = THREE.RepeatWrapping;
									map.anisotropy = 4;
									map.colorSpace = THREE.SRGBColorSpace;
									three_material[kv.k] = map
									three_material.needsUpdate = true;
								}
							})
							return
						default:
							console.error(property.type, uniform_v)
							throw new Error()
					}
					effect.key2key_simple(uniform_k, uniform_v).map(kv => {
						three_material[kv.k] = kv.v
					})
				}
				break
			default:
				console.error(key, value)
				throw new Error()
		}
	}
	static setDataOne_standard(el, three_material, effect, key, value) {
		if (!value) {
			return
		}
		const xrFrameSystem = wx.getXrFrameSystem()
		switch (key) {
			case "uniforms":
				for (const uniform_k of Object.keys(value)) {
					var uniform_v_ = value[uniform_k]
					if (uniform_v_) {
						uniform_v_ = uniform_v_.trim()
					}
					const property = effect.description.properties.find(property => property.key == uniform_k)
					if (!property) {
						console.error(effect.description.properties, uniform_k)
						return
					}
					var uniform_v
					switch (property.type) {
						case xrFrameSystem.EUniformType.FLOAT:
							uniform_v = parseFloat(uniform_v_)
							break;
						case xrFrameSystem.EUniformType.FLOAT2:
						case xrFrameSystem.EUniformType.FLOAT3:
						case xrFrameSystem.EUniformType.FLOAT4:
							uniform_v = uniform_v_.split(" ").map(v => parseFloat(v))
							break;
						case xrFrameSystem.EUniformType.SAMPLER:
							const asset = el.scene.assets.getAsset("texture", uniform_v_)
							if (!asset) {
								el.scene.assets.addAsset("texture", uniform_v_, null)
							}
							el.scene.assets.getAssetWithState("texture", uniform_v_).then(asset => {
								const {
									value
								} = asset
								const kvs = effect.key2key_standard(uniform_k, value)
								for (const kv of kvs) {
									const map = kv.v
									//map.wrapS = THREE.RepeatWrapping;
									//map.wrapT = THREE.RepeatWrapping;
									//map.anisotropy = 4;
									map.colorSpace = THREE.SRGBColorSpace;
									//    console.error("4444444444444444")
									three_material[kv.k] = map
									three_material.needsUpdate = true;
								}
							})
							return
						default:
							console.error(property.type, uniform_v)
							throw new Error()
					}
					const kvs = effect.key2key_standard(uniform_k, uniform_v)
					for (const kv of kvs) {
						three_material[kv.k] = kv.v
					}
				}
				break
			default:
				console.error(key, value)
				throw new Error()
		}
	}
}
