import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const createControls = (camera: THREE.Camera, canvas: HTMLCanvasElement) => {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 1
  controls.maxDistance = 500
  controls.maxPolarAngle = Math.PI / 2
  return controls
}

export default createControls
