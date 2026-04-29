import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { SUN_DATA } from '../../data/planets'
import { useSimulation } from '../../hooks/useSimulation'

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const { selectPlanet, setHoveredPlanet } = useSimulation()

  // Performance optimization: check if mobile
  const isMobile = useMemo(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), [])

  // Animated shader for the sun surface
  const sunMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FDB813'),
      emissive: new THREE.Color('#FF6000'),
      emissiveIntensity: 2.5,
      roughness: 0.8,
      metalness: 0.0,
    })
  }, [])

  const coronaMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FF8C00'),
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFD700'),
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      // Pulsing glow
      const pulse = Math.sin(t * 0.8) * 0.05 + 1
      sunMaterial.emissiveIntensity = 2.5 * pulse
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.0005
      const cPulse = Math.sin(t * 0.6) * 0.03 + 1
      coronaRef.current.scale.setScalar(cPulse)
    }
    if (glowRef.current) {
      const gPulse = Math.sin(t * 0.4 + 1) * 0.02 + 1
      glowRef.current.scale.setScalar(gPulse)
    }
  })

  return (
    <group>
      {/* Point light from the sun */}
      <pointLight
        position={[0, 0, 0]}
        intensity={isMobile ? 150 : 300}
        color="#FFF8E7"
        decay={0.5}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? [512, 512] : [2048, 2048]}
      />
      {!isMobile && <pointLight position={[0, 0, 0]} intensity={80} color="#FFB347" decay={0.3} />}

      {/* Sun surface */}
      <Sphere
        ref={meshRef}
        args={[SUN_DATA.radius, isMobile ? 48 : 64, isMobile ? 48 : 64]}
        material={sunMaterial}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selectPlanet(SUN_DATA as any)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredPlanet('sun')
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHoveredPlanet(null)
          document.body.style.cursor = 'default'
        }}
      />

      {/* Corona layer 1 */}
      <Sphere
        ref={coronaRef}
        args={[SUN_DATA.radius * 1.3, isMobile ? 16 : 32, isMobile ? 16 : 32]}
        material={coronaMaterial}
      />

      {/* Corona layer 2 */}
      {!isMobile && (
        <Sphere
          ref={glowRef}
          args={[SUN_DATA.radius * 1.8, 32, 32]}
          material={glowMaterial}
        />
      )}

      {/* Outer diffuse glow */}
      {!isMobile && (
        <Sphere args={[SUN_DATA.radius * 2.8, 16, 16]}>
          <meshBasicMaterial
            color="#FF6000"
            transparent
            opacity={0.025}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      )}
    </group>
  )
}
