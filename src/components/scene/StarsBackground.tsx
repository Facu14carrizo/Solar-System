import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function StarsBackground() {
  const starsRef = useRef<THREE.Points>(null)
  const nebulaRef = useRef<THREE.Points>(null)

  // Generate star field
  const { starPositions, starColors, starSizes } = useMemo(() => {
    const count = 8000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 400 + Math.random() * 200

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Star color variation: white, blue-white, yellow-white
      const colorType = Math.random()
      if (colorType < 0.6) {
        colors[i * 3] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 1.0
      } else if (colorType < 0.8) {
        colors[i * 3] = 0.7 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
        colors[i * 3 + 2] = 1.0
      } else {
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3
      }

      sizes[i] = Math.random() < 0.05 ? 2.5 + Math.random() * 2 : 0.5 + Math.random() * 1.5
    }

    return { starPositions: positions, starColors: colors, starSizes: sizes }
  }, [])

  // Nebula dust cloud
  const { nebulaPositions, nebulaColors } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 350 + Math.random() * 100

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3 // flatten
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Nebula colors: blue-purple hues
      const t = Math.random()
      colors[i * 3] = 0.2 + t * 0.3
      colors[i * 3 + 1] = 0.1 + t * 0.2
      colors[i * 3 + 2] = 0.4 + t * 0.4
    }

    return { nebulaPositions: positions, nebulaColors: colors }
  }, [])

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.00005
    }
  })

  return (
    <group>
      {/* Main star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[starSizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.2}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* Nebula layer */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nebulaPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nebulaColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={6}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
