import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpaceDust() {
  const dustRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Distribute in a disk around the solar system
      const angle = Math.random() * Math.PI * 2
      const r = 5 + Math.random() * 65
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = Math.sin(angle) * r

      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }

    return { positions, velocities }
  }, [])

  useFrame(() => {
    if (!dustRef.current) return
    const posAttr = dustRef.current.geometry.attributes.position as THREE.BufferAttribute
    const pos = posAttr.array as Float32Array
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#8899cc"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
