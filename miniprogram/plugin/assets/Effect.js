import * as THREE from "../three/Three"
export default class Effect {
	constructor(_scene, description) {
		this._scene = _scene
    this._description = description
	}
	get description() {
		return this._description
	}
	get name() {
		return this._description.name
	}
	get passCount() {
		return (this._description.passes || []).length
	}
	get scene() {
		return this._scene
	}

	warmUp() {
    return true
	}
	key2key_simple(xr_key, xr_value) {
    const result = []
    if(xr_value==null){
      return result
    }
		switch (xr_key) {
			case "u_baseColorMap":
				result.push({
					k: "map",
					v: xr_value.three_texture
				})
				break;
			case "u_baseColorFactor":
				result.push({
					k: "color",
					v: new THREE.Color().fromArray(xr_value)
				})
				break;
			default:
        console.error(xr_key,xr_value)
				throw new Error()
		}
		return result
	}
	key2key_standard(xr_key, xr_value) {
    const result = []
    if(xr_value==null){
      return result
    }
		switch (xr_key) {
			// baseColor
			case "u_baseColorMap":
				result.push({
					k: "map",
					v: xr_value.three_texture
				})
				break;
			case "u_baseColorFactor":
				result.push({
					k: "color",
					v: new THREE.Color().fromArray(xr_value)
				})
				break;
				// metallic rougness
			case "u_metallicRoughnessMap":
				throw new Error("u_metallicRoughnessMap not surpport")
			case "u_metallicMap":
				result.push({
					k: "metallicMap",
					v: xr_value.three_texture
				})
				break;
			case "u_roughnessMap":
				result.push({
					k: "roughnessMap",
					v: xr_value.three_texture
				})
				break;
			case "u_metallicRoughnessValues":
				result.push({
					k: "metallic",
					v: xr_value[0]
				}, {
					k: "roughness",
					v: xr_value[1]
				})
				break;
			case "u_ior":
				result.push({
					k: "ior",
					v: xr_value
				})
				break;
				// metallic rougness
			case "u_normalMap":
				result.push({
					k: "normalMap",
					v: xr_value.three_texture
				})
				break;
			case "u_normalScale":
				result.push({
					k: "normalScale",
					v: xr_value
				})
				break;
				// metallic rougness
			case "u_emissiveMap":
				result.push({
					k: "emissiveMap",
					v: xr_value.three_texture
				})
				break;
			case "u_emissiveFactor":
				result.push({
					k: "emissive",
					v: new THREE.Color().fromArray(xr_value)
				})
				break;
				// Ambient occlusion
			case "u_occlusionMap":
				result.push({
					k: "aoMap",
					v: xr_value.three_texture
				})
				break;
			case "u_occlusionStrength":
				result.push({
					k: "aoMapIntensity",
					v: xr_value
				})
				break;
				// alphaCutoff
			case "u_alphaCutoff":
				result.push({
					k: "alphaTest",
					v: xr_value
				})
				break;
				// clearcoat
			case "u_clearcoatFactor":
				result.push({
					k: "clearcoat",
					v: xr_value
				})
				break;
			case "u_clearcoatRoughnessFactor":
				result.push({
					k: "clearcoatRoughness",
					v: xr_value
				})
				break;
        // specularGlossiness
        
			case "u_specularFactor":
				/*result.push({
					k: "specularIntensityMap",
					v: new THREE.Vector3().fromArray(xr_value)
				})*/
				break;
			case "u_glossinessFactor":
				result.push({
					k: "sheen",
					v: xr_value
				})
				break;
			case "u_specularGlossinessMap":
				result.push({
					k: "specularColorMap",
					v: xr_value.three_texture
				})
				break;
			default:
        console.error(xr_key,xr_value)
				throw new Error()
		}
		return result
	}
}
