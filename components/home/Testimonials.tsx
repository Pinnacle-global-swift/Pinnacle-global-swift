'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

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

export function Testimonials () {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <section
      id='testimonials'
      className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'
    >
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-3xl font-bold text-center mb-12'
        >
          What Our Customers Say
        </motion.h2>
        <div className='relative max-w-4xl mx-auto'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className='bg-white bg-opacity-10 p-8 rounded-lg flex flex-col items-center text-center'
            >
              <div className='w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white'>
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={96}
                  height={96}
                  className='object-cover'
                />
              </div>
              <p className='text-xl mb-6 italic'>
                "{testimonials[currentIndex].quote}"
              </p>
              <div className='flex mb-2'>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <h3 className='text-lg font-semibold'>
                {testimonials[currentIndex].name}
              </h3>
              <p className='text-sm opacity-75'>
                {testimonials[currentIndex].role}
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prev}
            className='absolute top-1/2 -left-12 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 focus:outline-none'
            aria-label='Previous testimonial'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            onClick={next}
            className='absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 focus:outline-none'
            aria-label='Next testimonial'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      </div>
    </section>
  )
}
