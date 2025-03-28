'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Small Business Owner',
    quote:
      'Pinnacle Global Swift has transformed the way I manage my business finances. Their mobile app is intuitive, and their customer service is unparalleled!',
    image:
      'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?fit=crop&w=800&h=800&q=80',
    rating: 5,
    location: 'New York, USA'
  },
  {
    name: 'Michael T.',
    role: 'Freelance Consultant',
    quote:
      "As a frequent traveler, I appreciate the global accessibility and security features Pinnacle offers. It's made international transactions a breeze.",
    image:
      'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?fit=crop&w=800&h=800&q=80',
    rating: 5,
    location: 'San Francisco, USA'
  },
  {
    name: 'Emily R.',
    role: 'First-time Homeowner',
    quote:
      'The mortgage team at Pinnacle was incredibly helpful throughout my home-buying process. Their rates are competitive, and the service is top-notch!',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=800&h=800&q=80',
    rating: 5,
    location: 'Chicago, USA'
  }
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    }
  })
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  })
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Start from bottom
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8
    }
  }
}

export function Testimonials () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [currentIndex, isAutoPlaying])

  const next = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 py-24 lg:py-32'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10' />
        <motion.div
          className='absolute -top-[40%] -right-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px]'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className='absolute -bottom-[40%] -left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[100px]'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
        className='container relative mx-auto px-4'
      >
        <motion.div
          variants={itemVariants}
          className='text-center mb-20'
        >
          <motion.div
            className='flex flex-col items-center gap-6'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeInUpVariants}
              custom={0}
              className='inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20'
            >
              <span className='w-2 h-2 rounded-full bg-blue-400 mr-2' />
              <span className='text-blue-400 text-sm font-medium'>
                Testimonials
              </span>
            </motion.span>
            <motion.h2
              variants={fadeInUpVariants}
              custom={1}
              className='text-4xl lg:text-5xl font-bold text-white tracking-tight'
            >
              What Our Customers Say
            </motion.h2>
            <motion.div
              variants={fadeInUpVariants}
              custom={2}
              className='max-w-2xl'
            >
              <p className='text-lg text-blue-100/80'>
                Join thousands of satisfied customers who trust Pinnacle Global
                Swift
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='relative max-w-6xl mx-auto'
        >
          <AnimatePresence mode='wait' initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              className='relative'
            >
              <div className='bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-white/10'>
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
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className='flex items-center justify-center gap-6 mt-12'>
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
        </motion.div>
      </motion.div>
    </section>
  )
}
