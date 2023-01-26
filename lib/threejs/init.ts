import * as THREE from "three"
import createBed from "./createBed"
import createControls from "./createControls"
import createLights from "./createLights"

export const init = (
  width: number,
  height: number,
  canvasRef: HTMLCanvasElement,
  printerSize: { x: number; y: number; z: number }
) => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x5a5a5a)
  //camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = printerSize.z / 2
  camera.position.y = printerSize.y / 2
  const controls = createControls(camera, canvasRef)

  //render
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef,
    antialias: true,
  })
  renderer.setSize(width, height)

  //lights
  const lights = createLights()
  scene.add(lights.light)
  scene.add(lights.light2)
  scene.add(lights.light3)

  //bed
  const { box, cama, line } = createBed(printerSize)
  //scene.add(box)
  scene.add(line)
  scene.add(cama)

  const animate = function () {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
  return { scene, camera, renderer, controls, box, cama, line }
}
