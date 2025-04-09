'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { heroSlides } from '@/constants/hero'

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.5
    }
  }
}

const subtitleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const descriptionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.4
    }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.6 + (custom * 0.1),
      ease: [0.4, 0, 0.2, 1]
    }
  })
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    setIsAnimating(true)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))
    setIsAnimating(true)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Reset animation state
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [currentSlide])

  return (
    <section className='relative bg-gradient-primary text-white overflow-hidden min-h-[85vh]'>
      {/* Background Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      />

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial="hidden"
          animate="visible"
          exit="exit"
          className='absolute inset-0'
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div 
            className='absolute inset-0'
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className='object-cover'
              priority
              quality={90}
            />
          </motion.div>

          {/* Content */}
          <div className='relative container mx-auto px-4 h-full flex items-center z-20'>
            <div className='max-w-3xl'>
              {/* Title with Split Text Animation */}
              <motion.h1
                className='text-5xl md:text-7xl font-bold text-white mb-6'
                variants={titleVariants}
              >
                {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle with Gradient */}
              <motion.h2
                variants={subtitleVariants}
                className='text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
              >
                {heroSlides[currentSlide].subtitle}
              </motion.h2>

              {/* Description with Line Animation */}
              <motion.div
                variants={descriptionVariants}
                className='relative mb-8'
              >
                <motion.div
                  className='w-1 h-full bg-blue-500 absolute -left-4'
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <p className='text-xl text-gray-200 leading-relaxed'>
                  {heroSlides[currentSlide].description}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <motion.div variants={buttonVariants} custom={0}>
                  <Link href={heroSlides[currentSlide].cta.primary.link}>
                    <Button
                      size='lg'
                      className='w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300'
                    >
                      {heroSlides[currentSlide].cta.primary.text}
                      <motion.div
                        className='ml-2'
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowRight className='h-5 w-5' />
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={buttonVariants} custom={1}>
                  <Link href={heroSlides[currentSlide].cta.secondary.link}>
                    <Button
                      size='lg'
                      variant='outline'
                      className='w-full sm:w-auto border-2 border-white/30 hover:border-white text-white hover:bg-white/10 backdrop-blur-sm'
                    >
                      {heroSlides[currentSlide].cta.secondary.text}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10'>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <div className='absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10'>
        <button
          className='bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors duration-300'
          onClick={prevSlide}
          aria-label='Previous slide'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button
          className='bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors duration-300'
          onClick={nextSlide}
          aria-label='Next slide'
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </section>
  )
}
