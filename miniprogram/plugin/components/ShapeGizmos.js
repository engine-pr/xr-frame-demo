

import ShapeGizmosSchema  from "../schemas/ShapeGizmosSchema"
import Component from "./Component"
export default class ShapeGizmos extends Component {

  get schema(){
    return ShapeGizmosSchema
  }
}