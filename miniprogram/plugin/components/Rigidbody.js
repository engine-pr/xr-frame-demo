

import  RigidbodySchema from "../schemas/RigidbodySchema"
import Component from "./Component"
export default class Rigidbody extends Component {
  get schema(){
    return RigidbodySchema
  }
}