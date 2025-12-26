'use client'

import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex justify-start mb-4"
    >
      <div 
        className="max-w-[80px] px-4 py-3 rounded-2xl rounded-bl-md"
        style={{
          background: 'linear-gradient(135deg, rgba(80, 80, 95, 0.5), rgba(70, 70, 85, 0.4))',
          backdropFilter: 'blur(25px) saturate(150%)',
          WebkitBackdropFilter: 'blur(25px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        }}
      >
        <div className="flex space-x-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

