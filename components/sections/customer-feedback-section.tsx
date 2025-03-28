'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'

interface Testimonial {
  id: number
  name: string
  role: string
  comment: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Owner',
    comment:
      'SwifPinance Global Bank has revolutionized how I manage my finances. The interface is intuitive and the customer service is exceptional.',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Entrepreneur',
    comment:
      "The best banking experience I've ever had. The mobile app is fantastic and the security features give me peace of mind.",
    rating: 5,
    image: '/placeholder.svg?height=100&width=100'
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Freelancer',
    comment:
      'I love how easy it is to manage my transactions and track my spending. SwiftTask has made banking enjoyable!',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100'
  }
]

export function CustomerFeedbackSection () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className='py-20 bg-gradient-to-br from-teal-400 to-blue-600'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-white mb-4'></h2>
          <p className='text-xl text-white/80'>
            Don't just take our word for it
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto relative'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className='bg-white rounded-xl p-8 shadow-xl'
          >
            <div className='flex flex-col items-center text-center'>
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                width={100}
                height={100}
                className='rounded-full mb-4'
              />
              <div className='flex gap-1 mb-4'>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <p className='text-xl text-gray-700 mb-6'>
                "{testimonials[currentIndex].comment}"
              </p>
              <h3 className='font-bold text-lg'>
                {testimonials[currentIndex].name}
              </h3>
              <p className='text-gray-500'>{testimonials[currentIndex].role}</p>
            </div>
          </motion.div>

          <div className='flex justify-center gap-4 mt-8'>
            <Button
              variant='outline'
              size='icon'
              onClick={prevTestimonial}
              className='bg-white hover:bg-gray-100'
            >
              <ChevronLeft className='w-5 h-5' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={nextTestimonial}
              className='bg-white hover:bg-gray-100'
            >
              <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
