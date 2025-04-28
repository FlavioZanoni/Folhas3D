import * as THREE from "three"
import getAllMeshes from "./getAllMeshes"

export const doesBoxContainSTL = (
  scene: THREE.Scene,
  box: THREE.Mesh,
  boxGeouuid: string,
  bedGeouuid: string
) => {
  const meshes = getAllMeshes(scene)

  return meshes.forEach((mesh) => {
    const boxBBox = new THREE.Box3().setFromObject(box)
    const meshBB = new THREE.Box3().setFromObject(mesh)
    if (
      !(boxGeouuid !== mesh.geometry.uuid && bedGeouuid !== mesh.geometry.uuid)
    ) {
      return
    }

    if (!boxBBox.containsBox(meshBB)) {
      return false
    } else {
      return true
    }
  })
}
