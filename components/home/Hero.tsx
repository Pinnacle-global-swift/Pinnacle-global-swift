'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button } from '@/components/ui/button'

const heroSlides = [
  {
    title: 'Banking Made Simple',
    subtitle: 'Secure, and Smart',
    description:
      'Experience modern banking with our sleek, user-friendly interface. Stay on top of your finances effortlessly with Pinnacle Global Swift.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/first-project-a5bbf.appspot.com/o/imagebuilding.jpg?alt=media&token=cdceeabf-1e6e-4c5d-8143-56e9d1917612',
    cta: {
      primary: { text: 'Get Started', link: '/register' },
      secondary: { text: 'Learn More', link: '/about' }
    }
  },
  {
    title: 'Invest in Your Future',
    subtitle: 'With Smart Savings',
    description:
      "Grow your wealth with our range of investment options. From high-yield savings to diversified portfolios, we've got you covered.",
    image:
      'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=1920',
    cta: {
      primary: { text: 'Start Investing', link: '/login' },
      secondary: { text: 'Explore Options', link: '/services' }
    }
  },
  {
    title: 'Global Banking',
    subtitle: 'At Your Fingertips',
    description:
      'Access your accounts, make transactions, and manage your finances from anywhere in the world with our secure mobile banking app.',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1920',
    cta: {
      primary: { text: 'Start Saving', link: '/login' },
      secondary: { text: 'See Features', link: '/services' }
    }
  }
]

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.2
    }
  })
}

const slideVariants = {
  enter: { opacity: 0, scale: 1.1 },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.7
    }
  }
}

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } }
}

const textSlideVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5 } }
}

export function Hero () {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => {
      setIsAnimating(true)
      setCurrentSlide(next)
    },
    afterChange: () => {
      setIsAnimating(false)
    }
  }

  return (
    <section className='relative bg-gradient-primary text-white overflow-hidden'>
      <Slider {...settings}>
        {heroSlides.map((slide, index) => (
          <div key={index} className='relative'>
            <motion.div
              className='absolute inset-0 z-0'
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={imageVariants}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className='object-cover'
                sizes='100vw'
                priority={index === 0}
                quality={90}
              />
              <div className='absolute inset-0 bg-black opacity-50'></div>
            </motion.div>
            <div className='container mx-auto px-4 py-20 lg:py-32 relative z-10'>
              <div className='flex flex-col lg:flex-row items-center'>
                <div className='lg:w-1/2 mb-10 lg:mb-0'>
                  <motion.h2
                    className='text-4xl lg:text-5xl font-bold mb-2'
                    variants={textSlideVariants}
                    initial='hidden'
                    animate={isAnimating ? 'hidden' : 'visible'}
                    exit='exit'
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.h3
                    className='text-2xl lg:text-3xl font-semibold mb-4'
                    variants={textSlideVariants}
                    initial='hidden'
                    animate={isAnimating ? 'hidden' : 'visible'}
                    exit='exit'
                  >
                    {slide.subtitle}
                  </motion.h3>
                  <motion.p
                    className='text-lg mb-8'
                    variants={textSlideVariants}
                    initial='hidden'
                    animate={isAnimating ? 'hidden' : 'visible'}
                    exit='exit'
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    className='flex flex-col sm:flex-row gap-4'
                    variants={textSlideVariants}
                    initial='hidden'
                    animate={isAnimating ? 'hidden' : 'visible'}
                    exit='exit'
                  >
                    <Link href={slide.cta.primary.link}>
                      <Button
                        size='lg'
                        className='w-full sm:w-auto bg-white text-black hover:bg-gray-100'
                      >
                        {slide.cta.primary.text}
                        <ArrowRight className='ml-2 h-5 w-5' />
                      </Button>
                    </Link>
                    <Link href={slide.cta.secondary.link}>
                      <Button
                        size='lg'
                        variant='outline'
                        className='w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary'
                      >
                        {slide.cta.secondary.text}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2'>
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
      <button
        className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors duration-300'
        onClick={() =>
          setCurrentSlide(prev =>
            prev === 0 ? heroSlides.length - 1 : prev - 1
          )
        }
        aria-label='Previous slide'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>
      <button
        className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors duration-300'
        onClick={() =>
          setCurrentSlide(prev =>
            prev === heroSlides.length - 1 ? 0 : prev + 1
          )
        }
        aria-label='Next slide'
      >
        <ChevronRight className='w-6 h-6' />
      </button>
    </section>
  )
}
