import AssetLoadSchema from "../schemas/AssetLoadSchema"
import Component from "./Component"

export default class AssetLoad extends Component {

	get schema() {
		return AssetLoadSchema
  }
  setData(data){
    super.setData(data)
    if(this._data.src && this._data.type && this._data.assetId){
      this.el.ui.triggerEvent('onekit_loadasset', {}, { bubbles: true, composed: true }) 
      this.el.scene.assets.loadAsset(this._data,this.el).then(()=>{
        this.el.ui.triggerEvent('onekit_loadedasset', {}, { bubbles: true, composed: true }) 
      })
    }
  }
}
