import * as THREE from "three"

const colorOutsideMesh = (mesh: THREE.Mesh, color: number) => {
  color == 0xff0000
    ? mesh.material.emissive.setHex(color)
    : (mesh.material.emissive = new THREE.Color(0x000000))
}

export default colorOutsideMesh
