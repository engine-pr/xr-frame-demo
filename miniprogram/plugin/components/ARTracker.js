import ARTrackerSchema from "../schemas/ARTrackerSchema";
import Component from "./Component";

export default class ARTracker extends Component{
  get schema(){
    return ARTrackerSchema
  }
}