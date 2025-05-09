import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { addToScene, getMeshVolume, init, loadSTL } from "../../lib/threejs"
import { SceneInit, View3dProps } from "./types"

const printerSize = {
  x: 256,
  y: 256,
  z: 256,
}

export const View3d = ({ width, height, files, setVolume }: View3dProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scene, setScene] = useState<SceneInit>()
  const [mesh, setMesh] = useState<{ mesh: THREE.Mesh; bBox: THREE.Box3 }>()

  useEffect(() => {
    canvasRef.current &&
      setScene(init(width, height, canvasRef.current, printerSize))
  }, [canvasRef, height, width])

  useEffect(() => {
    if (scene) {
      if (mesh) {
        addToScene(scene, mesh, printerSize)
      }
    }
    if (mesh?.mesh) {
      setVolume(getMeshVolume(mesh.mesh))
    }
  }, [mesh, scene])

  useEffect(() => {
    if (scene?.scene) {
      if (files.length > 0) {
        files.forEach((file) => {
          const url = URL.createObjectURL(file)
          loadSTL(url, setMesh)
          URL.revokeObjectURL(url)
        })
      }
    }
  }, [files, scene])

  return (
    <>
      <canvas
        className="border-2 border-slate-700"
        ref={canvasRef}
        id="canvas"
      />
      <p className="text-slate-500 text-sm mt-1 ml-2">*Renderização meramente ilustrativa</p>
    </>
  )
}
