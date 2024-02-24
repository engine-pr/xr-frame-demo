

import  AssetPostProcessSchema from "../schemas/AssetPostProcessSchema"
import Component from "./Component"
export default class AssetPostProcess extends Component {
 
  get schema(){
    return AssetPostProcessSchema
  }

}