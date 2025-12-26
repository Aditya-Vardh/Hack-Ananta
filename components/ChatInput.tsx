'use client'

import { useState, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div 
      className="relative z-10 px-4 py-3 border-t"
      style={{
        background: 'linear-gradient(135deg, rgba(40, 40, 55, 0.6), rgba(35, 35, 50, 0.5))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -1px 0 rgba(255, 255, 255, 0.05) inset',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your message..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(80, 80, 95, 0.6), rgba(70, 70, 85, 0.5))',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(15px) saturate(150%)',
              WebkitBackdropFilter: 'blur(15px) saturate(150%)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            }}
          />
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none"
            />
          )}
        </div>
        <motion.button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 relative overflow-hidden"
          style={{
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          }}
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ x: 0 }}
            animate={{ x: message.trim() ? [0, 2, 0] : 0 }}
            transition={{ duration: 0.3 }}
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </motion.svg>
        </motion.button>
      </div>
    </div>
  )
}

