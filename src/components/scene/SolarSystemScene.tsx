import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { StarsBackground } from './StarsBackground'
import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitRing } from './OrbitRing'
import { SpaceDust } from './SpaceDust'
import { CameraController } from './CameraController'
import { AsteroidBelt } from './AsteroidBelt'
import { PLANETS } from '../../data/planets'

export function SolarSystemScene() {
  // Check if we are on a mobile device to optimize
  const isMobile = useMemo(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), [])

  return (
    <Canvas
      // Optimized dpr for mobile
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 35, 80], fov: 55, near: 0.1, far: 2000 }}
      shadows={!isMobile} // Disable shadows on mobile for performance
      gl={{ 
        antialias: !isMobile, // Disable native antialias if using multisampling or on mobile
        alpha: false, 
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      style={{ background: '#010309' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} color="#1a1a4a" />

        <StarsBackground />
        {!isMobile && <SpaceDust />}

        {PLANETS.map((planet) => (
          <OrbitRing
            key={`orbit-${planet.id}`}
            radius={planet.orbitRadius}
            planetId={planet.id}
            color={planet.color}
          />
        ))}

        <Sun />

        {PLANETS.map((planet) => (
          <Planet key={planet.id} data={planet} />
        ))}

        <AsteroidBelt />

        <CameraController />

        <EffectComposer multisampling={isMobile ? 0 : 4} disableNormalPass>
          <Bloom
            intensity={isMobile ? 0.8 : 1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
            mipmapBlur={!isMobile}
          />
          <Vignette
            offset={0.3}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
