import Component from '../components/Component.js';

export default class AssetsSystem extends Component {

	constructor() {
		super()
		this._assets = {}
		this._assetWithStates = {}
    this._loaders = {}
	}
	_init(type) {
    const xrFrameSystem = wx.getXrFrameSystem()
		if (!Object.keys(xrFrameSystem.getAllRegisterAssetLoader()).includes(type) || this._loaders[type]) {
			return
		}
		const AssetLoaderClass = xrFrameSystem.getRegisterAssetLoader(type)
		if (!AssetLoaderClass) {
			console.error(type)
			throw new Error()
		}
    const loader = new AssetLoaderClass(this.el.scene)
		this._loaders[type] = loader
    const builtin = loader.getBuiltin()
   	for (const asset of builtin) {
			asset.type = type
			this.loadAsset(asset, this.el)
		}
	}
	//////////////////////////////////
	addAsset(type, assetId, asset) {
		if (!this._assets[type]) {
			this._assets[type] = {}
		}
		this._assets[type][assetId] = {params:{
      type,
      assetId
    }, value:asset}
	}
	cancelAsset(type, id) {

	}
	getAsset(type, id, fallback) {
    this._init(type)
    if(!this._assets[type]){
      return null
    }
		const asset = this._assets[type][id]
		if (!asset && fallback) {
			fallback(asset)
		}
		return asset
	}
	getAssetWithState(type, id, fallback) {
    this._init(type)
    if(!this._assetWithStates[type]){
      console.error(type)
    }
		const assetWithState = this._assetWithStates[type][id]
		if (!assetWithState && fallback) {
			fallback(asset)
		}
		return assetWithState
	}
	loadAsset(params, parent) {
    this._init(params.type)
		const assetWithState = new Promise((resolve, reject) => {
			const load_callback = (value) => {
				resolve({
					params,
					value
				})
			}

			this._loaders[params.type].load(params, {
				onLoaded: (value) => {
					load_callback(value)
				},
				onError(e) {
					reject(e)
				}
			}).then()
		})
		if (!this._assetWithStates[params.type]) {
			this._assetWithStates[params.type] = {}
		}
		this._assetWithStates[params.type][params.assetId] = assetWithState
		return assetWithState
	}
	releaseAsset(type, id) {

	}
}
