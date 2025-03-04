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
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    name: 'Michael T.',
    role: 'Freelance Consultant',
    quote:
      "As a frequent traveler, I appreciate the global accessibility and security features Pinnacle offers. It's made international transactions a breeze.",
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    name: 'Emily R.',
    role: 'First-time Homeowner',
    quote:
      'The mortgage team at Pinnacle was incredibly helpful throughout my home-buying process. Their rates are competitive, and the service is top-notch!',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
]

export function Testimonials() {
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
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container relative mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
            What Our Customers Say
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Trusted by thousands of customers worldwide
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 text-white/20">
                <Quote size={60} className="rotate-180" />
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div 
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white/20">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-white fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xl md:text-2xl text-white leading-relaxed mb-6">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-white/60">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setIsAutoPlaying(false)
                prev()
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex gap-2 items-center">
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
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
