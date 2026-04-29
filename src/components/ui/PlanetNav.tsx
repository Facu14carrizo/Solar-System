import { motion } from 'framer-motion'
import { PLANETS, SUN_DATA } from '../../data/planets'
import { useSimulation } from '../../hooks/useSimulation'

export function PlanetNav() {
  const { selectedPlanet, selectPlanet } = useSimulation()

  const all = [SUN_DATA, ...PLANETS]

  return (
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: 'spring', damping: 22 }}
      className="fixed left-0 right-0 sm:right-auto sm:left-6 top-[88px] sm:top-1/2 sm:-translate-y-1/2 z-20"
    >
      <div className="relative mx-4 sm:mx-0">
        <div
          className="rounded-2xl p-2 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible no-scrollbar"
          style={{
            background: 'rgba(5, 8, 25, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {all.map((planet, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const p = planet as any
            const isActive = selectedPlanet?.id === planet.id
            return (
              <motion.button
                key={planet.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.04 }}
                onClick={() => selectPlanet(isActive ? null : p)}
                title={planet.name}
                className={`
                  relative flex items-center gap-2 sm:gap-3 px-3.5 sm:px-3 py-2 sm:py-2.5 rounded-xl transition-all duration-200 flex-shrink-0
                  ${isActive
                    ? 'bg-white/10'
                    : 'hover:bg-white/06'}
                `}
              >
                {/* Color dot */}
                <div
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: p.color ?? SUN_DATA.color,
                    boxShadow: isActive ? `0 0 10px ${p.glowColor ?? p.color}` : 'none',
                  }}
                />
                {/* Name */}
                <span className={`text-[11px] sm:text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  isActive ? 'text-white font-bold' : 'text-white/45 hover:text-white/75'
                }`}>
                  {planet.name}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-planet"
                    className="absolute right-2 sm:right-3 w-1 h-1 rounded-full bg-white/80"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
        
        {/* Mobile scroll indicator - subtle gradient at the end */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#050819] to-transparent pointer-events-none rounded-r-2xl sm:hidden" />
      </div>
    </motion.div>
  )
}
