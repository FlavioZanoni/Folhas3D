import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"

type MeshType = {
  mesh: THREE.Mesh
  bBox: THREE.Box3
}

export const loadSTL = async (
  fileUrl: string,
  setMesh: ({ mesh, bBox }: MeshType) => void
) => {
  const loader = new STLLoader()
  return loader.load(fileUrl, function (geometry) {
    const material = new THREE.MeshPhongMaterial({
      color: 0x308cc9,
      specular: 0x111111,
      shininess: 50,
    })
    const mesh = new THREE.Mesh(geometry, material)

    // align mesh to the bottom of the scene using the mesh's bounding box
    mesh.rotation.set(0, -Math.PI / 2, 0)
    mesh.scale.set(1, 1, 1)
    mesh.castShadow = true

    setMesh({ mesh, bBox: new THREE.Box3().setFromObject(mesh) })
    return mesh
  })
}

export default loadSTL
