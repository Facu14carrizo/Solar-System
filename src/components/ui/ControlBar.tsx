import { motion } from 'framer-motion'
import { useSimulation } from '../../hooks/useSimulation'

const SPEED_OPTIONS = [
  { label: '0.5×', value: 0.5 },
  { label: '1×', value: 1 },
  { label: '2×', value: 2 },
]

function GlassButton({
  active,
  onClick,
  children,
  title,
  hideOnMobile,
}: {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  title?: string
  hideOnMobile?: boolean
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-200 flex-shrink-0
        ${active
          ? 'text-white bg-white/15 border border-white/25'
          : 'text-white/45 hover:text-white/75 hover:bg-white/08 border border-transparent'}
        ${hideOnMobile ? 'hidden sm:block' : 'block'}
      `}
    >
      {children}
    </button>
  )
}

export function ControlBar() {
  const {
    isPlaying, togglePlay,
    speedMultiplier, setSpeed,
    isCinematic, toggleCinematic,
    showOrbits, toggleOrbits,
    showLabels, toggleLabels,
    showAtmospheres, toggleAtmospheres,
    selectedPlanet
  } = useSimulation()

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        bottom: (selectedPlanet && window.innerWidth < 640) ? '51vh' : '1.5rem'
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed left-0 right-0 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 flex items-center justify-center px-4"
    >
      <div 
        className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl"
        style={{
          background: 'rgba(5, 8, 25, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 12px 50px rgba(0,0,0,0.7)',
        }}
      >
        {/* Play/pause */}
        <button
          onClick={togglePlay}
          className={`
            w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0
            ${isPlaying
              ? 'bg-white/12 text-white border border-white/20 hover:bg-white/18'
              : 'bg-blue-500/30 text-blue-300 border border-blue-400/30 hover:bg-blue-500/40'}
          `}
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 1.5L12 7L3 12.5V1.5Z" />
            </svg>
          )}
        </button>

        <div className="w-px h-7 bg-white/10 mx-1 flex-shrink-0" />

        {/* Speed options */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {SPEED_OPTIONS.map((opt) => (
            <GlassButton
              key={opt.value}
              active={speedMultiplier === opt.value}
              onClick={() => setSpeed(opt.value)}
              title={`Velocidad ${opt.label}`}
            >
              {opt.label}
            </GlassButton>
          ))}
        </div>

        <div className="w-px h-7 bg-white/10 mx-1 flex-shrink-0" />

        {/* Visual toggles */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <GlassButton active={showOrbits} onClick={toggleOrbits} title="Alternar Órbitas">
            Órb
          </GlassButton>
          <GlassButton active={showLabels} onClick={toggleLabels} title="Alternar Etiquetas">
            Etq
          </GlassButton>
          <GlassButton active={showAtmospheres} onClick={toggleAtmospheres} title="Alternar Atmósfera" hideOnMobile>
            Atm
          </GlassButton>
        </div>

        <div className="w-px h-7 bg-white/10 mx-1 flex-shrink-0" />

        {/* Cinematic mode */}
        <button
          onClick={toggleCinematic}
          className={`
            px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-200 flex-shrink-0
            ${isCinematic
              ? 'text-amber-300 bg-amber-500/15 border border-amber-400/25'
              : 'text-white/45 hover:text-white/75 hover:bg-white/08 border border-transparent'}
          `}
          title="Modo Cinemático"
        >
          Cine
        </button>
      </div>
    </motion.div>
  )
}
