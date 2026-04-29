import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useSimulation } from '../../hooks/useSimulation'
import type { MoonData } from '../../data/planets'

interface MoonProps {
  data: MoonData
}

export function Moon({ data }: MoonProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<{ angle: number }>({ angle: Math.random() * Math.PI * 2 })
  const { isPlaying, speedMultiplier, showLabels } = useSimulation()

  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Orbital revolution around the planet
    if (isPlaying) {
      orbitRef.current.angle += data.orbitSpeed * speedMultiplier * delta * 0.5
    }

    const angle = orbitRef.current.angle
    meshRef.current.position.x = Math.cos(angle) * data.orbitRadius
    meshRef.current.position.z = Math.sin(angle) * data.orbitRadius
    
    // Self-rotation
    if (isPlaying) {
      meshRef.current.rotation.y += delta * speedMultiplier * 2
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[data.radius, 24, 24]}>
        <meshStandardMaterial 
          color={data.color} 
          roughness={0.8} 
          metalness={0.1}
          emissive={data.color}
          emissiveIntensity={0.1}
        />
        
        {showLabels && (
          <Html
            position={[0, data.radius + 0.3, 0]}
            center
            distanceFactor={15}
            occlude={false}
            style={{ pointerEvents: 'none' }}
          >
            <div className="text-[8px] text-white/30 font-mono tracking-tighter uppercase whitespace-nowrap">
              {data.name}
            </div>
          </Html>
        )}
      </Sphere>
      
      {/* Visual orbit line for the moon (optional, maybe too busy?) */}
      {/* 
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.orbitRadius - 0.01, data.orbitRadius + 0.01, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh> 
      */}
    </group>
  )
}
