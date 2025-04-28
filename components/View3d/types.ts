import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
export type View3dProps = {
  width: number
  height: number
  files: Array<File>
  setVolume: (data: number) => void
}
export type SceneInit = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  box: THREE.Mesh
  bed: THREE.Mesh
  line: THREE.LineSegments
}
