'use client'

import { motion } from 'framer-motion'
import { DollarSign, Coins, CreditCard, Wallet, PiggyBank } from 'lucide-react'

export function AnimatedBackground() {
  const items = Array.from({ length: 25 }, (_, i) => i) // Increased number of items

  const icons = [
    DollarSign,
    Coins,
    CreditCard,
    Wallet,
    PiggyBank
  ]

  const getRandomIcon = () => {
    const Icon = icons[Math.floor(Math.random() * icons.length)]
    return <Icon className="w-12 h-12" /> // Increased icon size
  }

  const getRandomColor = () => {
    const colors = [
      'text-emerald-500',
      'text-blue-500',
      'text-purple-500',
      'text-yellow-500',
      'text-pink-500'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -50,
            rotate: 0,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: window.innerHeight + 50,
            rotate: 360,
            opacity: [0, 0.8, 0], // Increased opacity
            scale: [0.5, 1.2, 0.5] // Added scale animation
          }}
          transition={{ 
            duration: Math.random() * 8 + 8, // Slightly faster
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          className={`absolute ${getRandomColor()} drop-shadow-lg`} // Added drop shadow
        >
          {getRandomIcon()}
        </motion.div>
      ))}

      {/* Add floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 blur-sm"
        />
      ))}
    </div>
  )
}
