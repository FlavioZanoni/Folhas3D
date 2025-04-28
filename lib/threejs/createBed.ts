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

  // Use printerSize.x and printerSize.y for the bed dimensions
  const bedGeo = new THREE.PlaneGeometry(printerSize.x, printerSize.y)
  bedGeo.rotateX(-Math.PI / 2) // Rotate to lie flat
  const bed = new THREE.Mesh(
    bedGeo,
    new THREE.MeshBasicMaterial({
      color: 0x656565,
      opacity: 0.2,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide,
    })
  )

  bed.position.y = 0;

  const edges = new THREE.EdgesGeometry(bedGeo)
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: 0x4f8fba,
      linecap: "round",
      linejoin: "round",
    })
  )

  box.position.set(0, 0, 0)
  return { box, bed, line }
}

export default createBed
