'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LoadingAnimation() {
  const [mounted, setMounted] = useState(false)
  const letters = "PINNACLE GLOBAL SWIFT".split("")
  const words = ["PINNACLE", "GLOBAL", "SWIFT"]

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  }

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10" />
            <motion.div
              className="absolute -top-[40%] -right-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/pgbw.png"
                alt="Pinnacle Global Swift"
                width={200}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </motion.div>

            {/* Animated Text - Responsive for all screen sizes */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center space-y-2 sm:space-y-4"
            >
              {words.map((word, wordIndex) => (
                <div key={wordIndex} className="flex justify-center">
                  {word.split('').map((letter, index) => (
                    <motion.span
                      key={`${wordIndex}-${index}`}
                      variants={letterVariants}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Progress Bar */}
            <div className="relative mt-8 sm:mt-12">
              <motion.div
                className="h-1 w-full rounded-full bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                />
              </motion.div>
            </div>

            {/* Loading Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 text-center text-sm sm:text-base text-blue-200/80"
            >
              Loading your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}















// 'use client'

// import { motion } from 'framer-motion'

// export function LoadingAnimation() {
//   const letters = "PINNACLE GLOBAL SWIFT".split("")

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
//       <div className="relative w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
//         {/* Animated text */}
//         <div className="flex justify-center"> {/* Changed to flex justify-center */}
//           {letters.map((letter, index) => (
//             <motion.span
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.5,
//                 delay: index * 0.1,
//                 ease: [0.215, 0.610, 0.355, 1.000]
//               }}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white" // Removed margin
//             >
//               {letter === " " ? "\u00A0" : letter}
//             </motion.span>
//           ))}
//         </div>

//         {/* Animated line */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ duration: 1, delay: 2 }}
//           className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
//         />

//         {/* Loading dots */}
//         <div className="mt-8 flex justify-center space-x-2">
//           {[0, 1, 2].map((dot) => (
//             <motion.div
//               key={dot}
//               initial={{ scale: 0 }}
//               animate={{ scale: [0, 1, 0] }}
//               transition={{
//                 duration: 1,
//                 repeat: Infinity,
//                 delay: dot * 0.2,
//                 ease: "easeInOut"
//               }}
//               className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
