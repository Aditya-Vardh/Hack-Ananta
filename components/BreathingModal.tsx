'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BreathingModalProps {
  onClose: () => void
}

export default function BreathingModal({ onClose }: BreathingModalProps) {
  const [phase, setPhase] = useState<'inhale'|'hold'|'exhale'>('inhale')
  const [count, setCount] = useState(4)

  useEffect(() => {
    let mounted = true
    const seq = ['inhale','hold','exhale'] as const
    const loop = async () => {
      while (mounted) {
        for (const p of seq) {
          if (!mounted) return
          setPhase(p)
          // durations: inhale 4, hold 4, exhale 6
          const wait = p === 'exhale' ? 6000 : 4000
          await new Promise(r => setTimeout(r, wait))
        }
      }
    }
    loop()
    return () => { mounted = false }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-slate-900 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Breathing Exercise</h3>
            <p className="text-sm text-white/70">Simple 4-4-6 breathing to help calm down</p>
          </div>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-white/8">Close</button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500 to-sky-400 flex items-center justify-center text-2xl font-semibold">
            {phase === 'inhale' ? 'Breathe in' : phase === 'hold' ? 'Hold' : 'Breathe out'}
          </div>
          <div className="text-sm text-white/70">Follow the circle and breathe slowly. We'll repeat until you close.</div>
        </div>
      </motion.div>
    </div>
  )
}
