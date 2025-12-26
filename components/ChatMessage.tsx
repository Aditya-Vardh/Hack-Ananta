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
      <motion.div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-md'
            : 'text-white rounded-bl-md'
        }`}
        style={isUser ? {
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        } : {
          background: 'linear-gradient(135deg, rgba(80, 80, 95, 0.5), rgba(70, 70, 85, 0.4))',
          backdropFilter: 'blur(25px) saturate(150%)',
          WebkitBackdropFilter: 'blur(25px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        }}
        whileHover={!isUser ? {
          scale: 1.02,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {typeof message === 'string' ? (
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        ) : (
          message
        )}
      </motion.div>
    </motion.div>
  )
}

