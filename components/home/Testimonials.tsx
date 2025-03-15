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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5
    })
  }

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950'>
      {/* Enhanced Background Pattern */}
      <div className='absolute inset-0'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5" />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10' />
      </div>

      <div className='container relative mx-auto px-4 py-24'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center mb-20'
        >
          <span className='text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block'>
            Testimonials
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            What Our Customers Say
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6' />
          <p className='text-blue-100 text-lg max-w-2xl mx-auto'>
            Join thousands of satisfied customers who trust Pinnacle Global
            Swift
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className='relative max-w-6xl mx-auto'>
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.5 }}
              className='relative'
            >
              {/* Quote Decoration */}
              <div className='absolute -left-4 top-0 text-blue-500/20'>
                <Quote size={120} className='rotate-180' />
              </div>

              {/* Testimonial Card */}
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl'>
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
          <div className='flex justify-center gap-4 mt-8'>
            <button
              onClick={() => {
                setIsAutoPlaying(false)
                prev()
              }}
              className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='w-6 h-6 text-white group-hover:scale-110 transition-transform' />
            </button>
            <div className='flex gap-2 items-center'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setIsAutoPlaying(false)
                next()
              }}
              className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group'
              aria-label='Next testimonial'
            >
              <ChevronRight className='w-6 h-6 text-white group-hover:scale-110 transition-transform' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
