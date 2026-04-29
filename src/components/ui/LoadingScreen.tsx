import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#010309' }}
    >
      {/* Sun glow */}
      <div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(253,184,19,0.15) 0%, transparent 70%)',
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="14" fill="#FDB813" opacity="0.9" />
          {[22, 28, 34].map((r, i) => (
            <motion.circle
              key={r}
              cx="30" cy="30" r={r}
              fill="none"
              stroke="#FDB813"
              strokeWidth="0.5"
              strokeOpacity={0.4 - i * 0.1}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-white text-2xl font-bold tracking-[0.25em] uppercase"
      >
        COSMOS
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-white/30 text-xs font-mono tracking-[0.3em] uppercase"
      >
        Inicializando Sistema Solar...
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-8 h-0.5 w-40 origin-left"
        style={{ background: 'linear-gradient(to right, #FDB813, #FF6000)' }}
      />
    </motion.div>
  )
}
