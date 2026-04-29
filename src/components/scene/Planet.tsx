import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'
import type { PlanetData } from '../../data/planets'
import { useSimulation } from '../../hooks/useSimulation'
import { Moon } from './Moon'

interface PlanetProps {
  data: PlanetData
}

export function Planet({ data }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<{ angle: number }>({ angle: Math.random() * Math.PI * 2 })

  const { isPlaying, speedMultiplier, showLabels, showAtmospheres, hoveredPlanet, selectedPlanet, setHoveredPlanet, selectPlanet } = useSimulation()

  const isSelected = selectedPlanet?.id === data.id
  const isHovered = hoveredPlanet === data.id

  // Performance optimization: check if mobile
  const isMobile = useMemo(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), [])

  const planetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(data.color),
      emissive: new THREE.Color(data.emissive),
      emissiveIntensity: isSelected ? 0.8 : 0.3,
      roughness: data.roughness,
      metalness: data.metalness,
    })
  }, [data, isSelected])

  const atmosphereMaterial = useMemo(() => {
    if (!data.atmosphereColor) return null
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(data.atmosphereColor),
      transparent: true,
      opacity: data.atmosphereOpacity ?? 0.12,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [data])

  // Update emissive on selection change
  useMemo(() => {
    planetMaterial.emissiveIntensity = isSelected ? 1.2 : isHovered ? 0.7 : 0.3
  }, [isSelected, isHovered, planetMaterial])

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return

    // Orbital revolution
    if (isPlaying) {
      orbitRef.current.angle += data.orbitSpeed * speedMultiplier * delta
    }

    const angle = orbitRef.current.angle
    groupRef.current.position.x = Math.cos(angle) * data.orbitRadius
    groupRef.current.position.z = Math.sin(angle) * data.orbitRadius

    // Self-rotation
    if (isPlaying) {
      meshRef.current.rotation.y += data.rotationSpeed * speedMultiplier * delta * 10
    }
  })

  return (
    <group ref={groupRef} name={data.id}>
      <group rotation={[0, 0, data.tilt]}>
        {/* Planet body */}
        <Sphere
          ref={meshRef}
          // Reduced segments for mobile/performance
          args={[data.radius, isMobile ? 32 : 48, isMobile ? 32 : 48]}
          material={planetMaterial}
          castShadow={!isMobile}
          receiveShadow={!isMobile}
          onClick={(e) => {
            e.stopPropagation()
            selectPlanet(data)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHoveredPlanet(data.id)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHoveredPlanet(null)
            document.body.style.cursor = 'default'
          }}
        />

        {/* Atmosphere glow */}
        {showAtmospheres && atmosphereMaterial && !isMobile && (
          <Sphere
            ref={atmosphereRef}
            args={[data.radius * 1.08, 32, 32]}
            material={atmosphereMaterial}
          />
        )}

        {/* Saturn rings */}
        {data.rings && (
          <group rotation={[Math.PI / 2.5, 0, 0]}>
            {[1.4, 1.8].map((scale, i) => (
              <Ring
                key={i}
                args={[
                  data.radius * scale,
                  data.radius * (scale + 0.2),
                  isMobile ? 64 : 96,
                ]}
              >
                <meshBasicMaterial
                  color={data.ringColor ?? '#c8b560'}
                  transparent
                  opacity={0.35 - i * 0.1}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                />
              </Ring>
            ))}
          </group>
        )}

        {/* Hover/selection glow sphere */}
        {(isHovered || isSelected) && (
          <Sphere args={[data.radius * 1.15, 32, 32]}>
            <meshBasicMaterial
              color={data.glowColor}
              transparent
              opacity={isSelected ? 0.2 : 0.12}
              side={THREE.BackSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </Sphere>
        )}
      </group>

      {/* Moons */}
      {data.mainMoons?.map((moon) => (
        <Moon key={moon.id} data={moon} />
      ))}

      {/* Label */}
      {showLabels && (
        <Html
          position={[0, data.radius + 0.8, 0]}
          center
          distanceFactor={isMobile ? 20 : 30}
          occlude={false}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`
              px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300
              ${isSelected
                ? 'text-white bg-white/20 backdrop-blur-sm border border-white/30'
                : isHovered
                  ? 'text-white/90 bg-white/10 backdrop-blur-sm'
                  : 'text-white/50'}
            `}
          >
            {data.name}
          </div>
        </Html>
      )}
    </group>
  )
}
