'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ChatMessageProps {
  message: string | ReactNode
  isUser: boolean
  isTyping?: boolean
}

export default function ChatMessage({ message, isUser, isTyping = false }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-md shadow-lg shadow-emerald-500/20'
            : 'bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-bl-md shadow-lg'
        }`}
      >
        {typeof message === 'string' ? (
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        ) : (
          message
        )}
      </div>
    </motion.div>
  )
}

