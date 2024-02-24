

import AssetsSchema from "../schemas/AssetsSchema"
import Component from "./Component"
export default class Assets extends Component {

    constructor(){
      super()
    }
get schema(){
  return AssetsSchema
}
}