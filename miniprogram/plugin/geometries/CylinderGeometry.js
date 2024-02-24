import * as THREE from "../three/Three"
import Geometry from "../assets/Geometry"
export default function(scene){
  const geo = new Geometry(scene);
  geo.three_geometry = new THREE.CylinderGeometry(0.5,0.5,2)
  return geo;
}