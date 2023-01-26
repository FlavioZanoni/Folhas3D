import * as THREE from "three"

const createLights = () => {
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(1, 1, 1)
  const light2 = new THREE.DirectionalLight(0x002288)
  light2.position.set(-1, -1, -1)
  const light3 = new THREE.AmbientLight(0x222222)

  return { light, light2, light3 }
}

export default createLights
