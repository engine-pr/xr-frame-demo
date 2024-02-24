import * as THREE from "../three/Three"
import Geometry from "../assets/Geometry"
export default function(scene){
  const geo = new Geometry(scene);
  geo.three_geometry = new THREE.SphereGeometry(1)
  return geo;
}