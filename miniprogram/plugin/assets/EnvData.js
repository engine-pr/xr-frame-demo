export default class EnvData {
	constructor(options) {
		this._data = options
	}
	get diffuseSH() {
		return this._data.diffuse.coefficients
	}
	get hasDiffuse() {
		return this._data.diffuse != null
	}
	get hasSpecular() {
		return this._data.specular != null
	}
	get skyboxMap() {
		return this._data.skybox.map
	}
	get specularMap() {
		return this._data.specular.map
	}
	get specularMipmapCount() {
		return this._data.specular.mipmapCount
	}
	get specularMipmaps() {
		return this._data.specular.mipmaps
	}
	get specularRGBD() {
		return this._data.specular.rgbd
	}
	get useHalfSkyMap() {
		return this._data.skybox.half
	}
	destroy() {
		this._data = null
	}
}
