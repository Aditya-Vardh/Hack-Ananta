'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Card { q: string; a: string; known?: boolean }

interface FlashcardModalProps {
  cards: Card[]
  onClose: () => void
  onUpdate: (cards: Card[]) => void
}

export default function FlashcardModal({ cards: initial, onClose, onUpdate }: FlashcardModalProps) {
  const [index, setIndex] = useState(0)
  const [cards, setCards] = useState<Card[]>(initial)
  const cur = cards[index]

  const toggleKnown = () => {
    const next = [...cards]
    next[index] = { ...cur, known: !cur.known }
    setCards(next)
    onUpdate(next)
  }

  const flipNext = () => {
    setIndex((i) => (i + 1) % cards.length)
  }

  const flipPrev = () => {
    setIndex((i) => (i - 1 + cards.length) % cards.length)
  }

  const exportText = () => {
    const text = cards.map((c, i) => `${i + 1}. Q: ${c.q}\nA: ${c.a}`).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flashcards.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl bg-slate-900 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Flashcards</h3>
            <p className="text-sm text-white/70">Flip cards and mark known / unknown</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportText} className="px-3 py-1 rounded-md bg-white/6">Export</button>
            <button onClick={onClose} className="px-3 py-1 rounded-md bg-white/8">Close</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-xl">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 text-center shadow-inner">
              <div className="text-sm text-white/60 mb-2">Card {index + 1} / {cards.length}</div>
              <motion.div layout className="min-h-[120px]">
                <div className="text-left">
                  <div className="font-medium text-lg mb-2">Q: {cur.q}</div>
                  <div className="text-sm text-white/70">A: {cur.a}</div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={flipPrev} className="px-3 py-1 rounded-md bg-white/6">Prev</button>
            <button onClick={flipNext} className="px-3 py-1 rounded-md bg-white/6">Next</button>
            <button onClick={toggleKnown} className="px-3 py-1 rounded-md bg-emerald-600">{cur.known ? 'Known ✓' : 'Mark known'}</button>
          </div>

          <div className="w-full mt-3 grid grid-cols-2 gap-2 text-sm text-white/70">
            <div>Known: {cards.filter(c => c.known).length}</div>
            <div>Unknown: {cards.filter(c => !c.known).length}</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
