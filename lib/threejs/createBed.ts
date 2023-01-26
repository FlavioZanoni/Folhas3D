import * as THREE from "three"

const createBed = (printerSize: { x: number; y: number; z: number }) => {
  const boxGeo = new THREE.BoxGeometry(
    printerSize.x,
    printerSize.y,
    printerSize.z,
    10,
    10,
    10
  )
  boxGeo.rotateX(-Math.PI / 2)
  const box = new THREE.Mesh(
    boxGeo,
    new THREE.MeshBasicMaterial({
      color: 0x656565,
      opacity: 0.2,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide,
    })
  )

  const camaGeo = new THREE.PlaneGeometry(192, 120)
  camaGeo.rotateX(-Math.PI / 2)
  const cama = new THREE.Mesh(
    camaGeo,
    new THREE.MeshBasicMaterial({
      color: 0x656565,
      opacity: 0.2,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide,
    })
  )
  const camaBBox = new THREE.Box3().setFromObject(cama)
  cama.position.y = -camaBBox.min.y

  const edges = new THREE.EdgesGeometry(camaGeo)
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: 0x4f8fba,
      linecap: "round",
      linejoin: "round",
    })
  )

  box.position.set(0, 0, 0)
  cama.position.set(0, 0, 0)
  line.position.set(0, 0, 0)
  return { box, cama, line }
}

export default createBed
