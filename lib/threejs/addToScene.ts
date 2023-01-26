import * as THREE from "three"
import { SceneInit } from "../../components/View3d/types"
import getAllMeshes from "./getAllMeshes"

export const addToScene = async (
  sceneInit: SceneInit,
  mesh: { mesh: THREE.Mesh; bBox: THREE.Box3 },
  printerSize: { x: number; y: number; z: number }
) => {
  const meshes = await getAllMeshes(sceneInit, true)

  const positionZero = {
    x: -mesh.bBox.min.x,
    y: -mesh.bBox.min.y,
    z: -mesh.bBox.min.z,
  }

  if (meshes.length === 0) {
    sceneInit.scene.add(mesh.mesh)
    mesh.mesh.position.set(positionZero.x, positionZero.y, positionZero.z)
    const box = new THREE.BoxHelper(mesh.mesh, 0xffff00)
    sceneInit.scene.add(box)
  } else {
    const box = new THREE.BoxHelper(mesh.mesh, 0xffff00)
    sceneInit.scene.add(box)
    const newMeshSize = calculateSpace(mesh.mesh)
    const positionedMeshesSpace = calculateOcupiedSpace(meshes, printerSize)
    const newPosition = calculateNewPosition(
      mesh,
      positionedMeshesSpace,
      newMeshSize,
      printerSize,
      positionZero
    )
    sceneInit.scene.add(mesh.mesh)
    mesh.mesh.position.set(newPosition.x, newPosition.y, newPosition.z)
  }
}

const calculateOcupiedSpace = (
  meshes: THREE.Mesh[],
  printerSize: { x: number; y: number; z: number }
) => {
  let positionedMeshesSpace = {
    x: 0,
    y: 0,
    z: 0,
  }

  meshes.forEach((mesh) => {
    const meshSize = calculateSpace(mesh)
    if (positionedMeshesSpace.x + meshSize.x < printerSize.x) {
      console.log("tru")
      positionedMeshesSpace.x = meshSize.x
    }
    if (positionedMeshesSpace.z + meshSize.z < printerSize.z) {
      positionedMeshesSpace.z = meshSize.z
    }
  })

  return positionedMeshesSpace
}

const calculateBBox = (mesh: THREE.Mesh) => {
  const bBox = new THREE.Box3()
  bBox.setFromObject(mesh)
  return bBox
}

const calculateSpace = (mesh: THREE.Mesh) => {
  const bBox = calculateBBox(mesh)
  const space = {
    x: bBox.max.x - bBox.min.x,
    y: bBox.max.y - bBox.min.y,
    z: bBox.max.z - bBox.min.z,
  }
  return space
}

function calculateNewPosition(
  mesh: { mesh: THREE.Mesh; bBox: THREE.Box3 },
  positionedMeshesSpace: { x: number; y: number; z: number },
  newMeshSize: { x: number; y: number; z: number },
  printerSize: { x: number; y: number; z: number },
  positionZero: { x: number; y: number; z: number }
) {
  const newPosition = {
    x: positionedMeshesSpace.x,
    y: positionedMeshesSpace.y,
    z: positionedMeshesSpace.z,
  }

  if (positionedMeshesSpace.z + newMeshSize.z > printerSize.z) {
    const biggestPiece = console.log(newPosition)
  } else {
    newPosition.x = positionedMeshesSpace.x + newMeshSize.x - positionZero.x
    newPosition.y = positionZero.y
  }

  return newPosition
}
