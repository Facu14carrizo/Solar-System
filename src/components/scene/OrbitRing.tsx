import { useMemo } from 'react'
import * as THREE from 'three'
import { useSimulation } from '../../hooks/useSimulation'

interface OrbitRingProps {
  radius: number
  planetId: string
  color?: string
}

export function OrbitRing({ radius, planetId, color = '#ffffff' }: OrbitRingProps) {
  const { showOrbits, selectedPlanet, hoveredPlanet } = useSimulation()

  const points = useMemo(() => {
    const segments = 256
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  if (!showOrbits) return null

  const isSelected = selectedPlanet?.id === planetId
  const isHovered = hoveredPlanet === planetId
  const opacity = isSelected ? 0.7 : isHovered ? 0.5 : 0.18

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
            3,
          ]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </line>
  )
}
