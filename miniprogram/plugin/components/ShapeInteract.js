

import ShapeInteractSchema  from "../schemas/ShapeInteractSchema"
import Component from "./Component"
export default class ShapeInteract extends Component {

  get schema(){
    return ShapeInteractSchema
  }
}