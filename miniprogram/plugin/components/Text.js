

import  TextSchema  from "../schemas/TextSchema"
import Component from "./Component"
export default class Text extends Component {
  get schema(){
    return TextSchema
  }

}