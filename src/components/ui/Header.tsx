import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', damping: 20 }}
      className="fixed top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2 sm:gap-3"
    >
      {/* Logo mark */}
      <div
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center"
        style={{
          background: 'rgba(5, 8, 25, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 20px rgba(253,184,19,0.15)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="4" fill="#FDB813" />
          <circle cx="9" cy="9" r="7" stroke="#FDB813" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
          <circle cx="9" cy="9" r="8.5" stroke="#FDB813" strokeWidth="0.25" strokeOpacity="0.2" fill="none" />
        </svg>
      </div>

      <div>
        <h1 className="text-white font-bold text-sm sm:text-base tracking-[0.2em] uppercase leading-none">
          COSMOS
        </h1>
        <p className="text-white/30 text-[9px] sm:text-xs font-mono tracking-widest mt-0.5 whitespace-nowrap">
          Explorador del Sistema Solar
        </p>
      </div>
    </motion.div>
  )
}
