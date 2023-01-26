import * as THREE from "three"
import { SceneInit } from "../../components/View3d/types"

const getAllMeshes = async (
  sceneInit: SceneInit,
  excludeBedRelated?: boolean
) => {
  const meshes: THREE.Mesh[] = []

  sceneInit.scene.traverse((object) => {
    if (excludeBedRelated) {
      if (
        object.isMesh &&
        object.uuid != sceneInit.box.uuid &&
        object.uuid != sceneInit.cama.uuid &&
        object.uuid != sceneInit.line.uuid
      ) {
        meshes.push(object)
      }
    } else {
      if (object.isMesh) meshes.push(object)
    }
  })
  return meshes
}

export default getAllMeshes
