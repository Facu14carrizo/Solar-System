import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SolarSystemScene } from './components/scene/SolarSystemScene'
import { PlanetInfoPanel } from './components/ui/PlanetInfoPanel'
import { ControlBar } from './components/ui/ControlBar'
import { Header } from './components/ui/Header'
import { PlanetNav } from './components/ui/PlanetNav'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { useSimulation } from './hooks/useSimulation'

export default function App() {
  const [loading, setLoading] = useState(true)
  const { selectedPlanet } = useSimulation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden bg-[#010309] selection:bg-blue-500/30">
      {/* 3D Scene — full screen */}
      <div className="absolute inset-0 z-0">
        <SolarSystemScene />
      </div>

      {/* UI Overlay */}
      <Header />
      
      {/* Navigation - hidden on mobile if a planet is selected to reduce clutter */}
      <div className={`${selectedPlanet ? 'hidden sm:block' : 'block'}`}>
        <PlanetNav />
      </div>

      <PlanetInfoPanel />

      {/* Control bar - move up slightly on mobile if info is open */}
      <ControlBar />

      {/* Subtle hint - hidden on mobile */}
      {!loading && !selectedPlanet && (
        <div className="fixed bottom-24 sm:bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:block">
          <p className="text-white/15 text-[10px] font-mono tracking-widest text-center uppercase">
            Arrastra para girar · Scroll para zoom · Click en planeta
          </p>
        </div>
      )}

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
    </div>
  )
}
