'use client'

import { motion } from 'framer-motion'

export function LoadingAnimation() {
  const letters = "PINNACLE GLOBAL SWIFT".split("")
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="relative w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
        {/* Animated text */}
        <div className="flex flex-wrap justify-center">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.215, 0.610, 0.355, 1.000]
              }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white m-1"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        />

        {/* Loading dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: dot * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}


