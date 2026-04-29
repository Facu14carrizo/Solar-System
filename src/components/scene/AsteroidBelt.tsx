import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSimulation } from '../../hooks/useSimulation'

export function AsteroidBelt() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { isPlaying, speedMultiplier } = useSimulation()

  const count = 600
  const innerRadius = 20
  const outerRadius = 24

  const asteroids = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
      const angle = Math.random() * Math.PI * 2
      const speed = (0.005 + Math.random() * 0.01) * 0.2
      const y = (Math.random() - 0.5) * 1.5
      const size = 0.02 + Math.random() * 0.05
      const rotationSpeed = Math.random() * 0.02
      
      data.push({ radius, angle, speed, y, size, rotationSpeed })
    }
    return data
  }, [])

  const tempObject = new THREE.Object3D()

  useFrame((state, delta) => {
    if (!meshRef.current) return

    asteroids.forEach((asteroid, i) => {
      if (isPlaying) {
        asteroid.angle += asteroid.speed * speedMultiplier * delta * 5
      }

      const x = Math.cos(asteroid.angle) * asteroid.radius
      const z = Math.sin(asteroid.angle) * asteroid.radius

      tempObject.position.set(x, asteroid.y, z)
      tempObject.scale.set(asteroid.size, asteroid.size, asteroid.size)
      tempObject.rotation.y += asteroid.rotationSpeed
      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#8b8b8b" roughness={0.9} metalness={0.1} />
    </instancedMesh>
  )
}
