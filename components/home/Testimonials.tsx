'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// Move data to a separate constant file
import { testimonials } from '@/constants/testimonials'

// Simplified variants
const slideVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<any>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<any>(true)

  const next = useCallback(() => {
    setCurrentIndex((prev:any) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev:any) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 py-24'>
      {/* Background Pattern - Simplified */}
      <div className='absolute inset-0'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10' />
      </div>

      <div className='container relative mx-auto px-4'>
        {/* Header Section - Simplified animations */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeInVariants}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-white mb-4'>
            What Our Customers Say
          </h2>
          <p className='text-lg text-blue-100/80'>
            Join thousands of satisfied customers who trust us
          </p>
        </motion.div>

        {/* Testimonial Slider - Optimized */}
        <div className='max-w-4xl mx-auto'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              className='bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8'
            >
              <div className='flex flex-col lg:flex-row items-center gap-12'>
                {/* Profile Section */}
                <motion.div
                  className='relative flex-shrink-0'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl'>
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={160}
                      height={160}
                      className='object-cover w-full h-full'
                      priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
                  </div>
                  {/* Rating Badge */}
                  <motion.div
                    className='absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-2 rounded-full shadow-lg'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className='flex items-center gap-1'>
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className='w-4 h-4 text-white fill-current'
                          />
                        )
                      )}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                <div className='flex-1 text-center lg:text-left'>
                  <motion.p
                    className='text-2xl md:text-3xl text-white leading-relaxed mb-8 font-light'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{testimonials[currentIndex].quote}"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className='text-2xl font-bold text-white mb-2'>
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className='text-blue-200 font-medium'>
                      {testimonials[currentIndex].role}
                    </p>
                    <p className='text-blue-300/60 text-sm'>
                      {testimonials[currentIndex].location}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Simplified */}
          <div className='flex justify-center items-center gap-4 mt-8'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAutoPlaying(false)
                prev()
              }}
              className='p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-200'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='w-6 h-6 text-white' />
            </motion.button>

            <div className='flex gap-3 items-center'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`relative h-2 transition-all duration-300 ${
                    index === currentIndex ? 'w-8' : 'w-2'
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full ${
                      index === currentIndex
                        ? 'bg-white'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAutoPlaying(false)
                next()
              }}
              className='p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-200'
              aria-label='Next testimonial'
            >
              <ChevronRight className='w-6 h-6 text-white' />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
