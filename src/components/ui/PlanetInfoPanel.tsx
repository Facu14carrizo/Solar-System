import { motion, AnimatePresence } from 'framer-motion'
import { useSimulation } from '../../hooks/useSimulation'
import { SUN_DATA } from '../../data/planets'

export function PlanetInfoPanel() {
  const { selectedPlanet, selectPlanet } = useSimulation()

  const isSun = selectedPlanet?.id === 'sun'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const planet = selectedPlanet as any

  return (
    <AnimatePresence>
      {selectedPlanet && (
        <motion.div
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 500, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 sm:bottom-auto sm:top-0 sm:right-0 sm:left-auto w-full sm:w-80 sm:h-full z-40 flex flex-col pointer-events-none p-4 sm:p-0"
        >
          {/* Glass panel */}
          <div className="flex-1 rounded-3xl sm:rounded-none overflow-hidden flex flex-col pointer-events-auto sm:m-0
            bg-[#050819]/90 backdrop-blur-3xl border border-white/20 sm:border-l sm:border-y-0 sm:border-r-0
            shadow-[0_-20px_60px_rgba(0,0,0,0.8)] sm:shadow-[-20px_0_60px_rgba(0,0,0,0.8)]
            max-h-[50vh] sm:max-h-none mt-auto sm:mt-0"
          >
            {/* Mobile Handle */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden flex-shrink-0" />

            {/* Header */}
            <div className="relative p-5 sm:p-8 pb-3 sm:pb-6 flex-shrink-0">
              <button
                onClick={() => selectPlanet(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full flex items-center justify-center
                  text-white/60 hover:text-white/90 hover:bg-white/10 transition-all text-xl font-bold"
              >
                ×
              </button>

              <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                {/* Planet color indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.color ?? SUN_DATA.color}, transparent)`,
                    backgroundColor: planet.color ?? SUN_DATA.color,
                    boxShadow: `0 0 35px ${planet.glowColor ?? planet.color}88`, // Stronger glow
                  }}
                />

                <div className="flex-1">
                  <motion.h2
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                  >
                    {selectedPlanet.name}
                  </motion.h2>

                  {!isSun && planet.moons !== undefined && (
                    <motion.p
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[10px] sm:text-xs text-blue-400 font-mono mt-0.5 sm:mt-2 tracking-[0.2em] uppercase font-bold"
                    >
                      {planet.moons === 0 ? 'Sin lunas' : `${planet.moons} luna${planet.moons !== 1 ? 's' : ''}`}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-5 sm:px-8 pb-8">
              {/* Stats Grid */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="grid grid-cols-2 gap-3 mb-6 sm:mb-8"
              >
                {[
                  { label: 'Diámetro', value: selectedPlanet.realDiameter },
                  { label: 'Periodo', value: selectedPlanet.orbitalPeriod },
                  ...(!isSun ? [{ label: 'Distancia', value: selectedPlanet.realDistance }] : []),
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-3 bg-white/[0.06] border border-white/[0.12]"
                  >
                    <p className="text-[9px] sm:text-[10px] text-white/50 font-mono tracking-widest uppercase mb-1 font-bold">
                      {stat.label}
                    </p>
                    <p className="text-xs sm:text-sm text-white font-bold">{stat.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-bold">
                  {selectedPlanet.description}
                </p>
              </motion.div>

              {/* Moons Section */}
              {planet.mainMoons && planet.mainMoons.length > 0 && (
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.33 }}
                  className="mb-8"
                >
                  <p className="text-[10px] sm:text-xs text-white/40 font-mono tracking-[0.3em] uppercase mb-4 font-bold">
                    Satélites Principales
                  </p>
                  <div className="space-y-3">
                    {planet.mainMoons.map((moon: any) => (
                      <div 
                        key={moon.id} 
                        className="rounded-2xl p-4 bg-white/[0.05] border border-white/[0.1]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: moon.color, boxShadow: `0 0 10px ${moon.color}` }}
                          />
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">{moon.name}</h4>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-medium">
                          {moon.description || 'Satélite natural orbitando el planeta.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Facts Section */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 font-mono tracking-[0.3em] uppercase mb-4 font-bold">
                  Datos Clave
                </p>
                <ul className="space-y-4">
                  {selectedPlanet.facts.map((fact: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ x: -15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex gap-4 text-xs sm:text-sm text-white/90 leading-relaxed font-bold"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: planet.glowColor ?? planet.color ?? '#fff', boxShadow: `0 0 8px ${planet.glowColor ?? planet.color}` }}
                      />
                      {fact}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
