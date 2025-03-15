'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  CreditCard,
  Briefcase,
  Home,
  BarChartIcon as ChartBar,
  Plane,
  Shield,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRef } from 'react'

const services = [
  {
    icon: CreditCard,
    name: 'Personal Banking',
    description:
      'Checking, savings, and credit card solutions tailored to your needs.',
    gradient: 'from-blue-500 to-indigo-600',
    link: '/services'
  },
  {
    icon: Briefcase,
    name: 'Business Accounts',
    description: 'Comprehensive banking services to help your business thrive.',
    gradient: 'from-green-500 to-teal-600',
    link: '/services'
  },
  {
    icon: Home,
    name: 'Mortgages',
    description: 'Competitive rates and flexible terms for your dream home.',
    gradient: 'from-red-500 to-pink-600',
    link: '/services/mortgages'
  },
  {
    icon: ChartBar,
    name: 'Investment Services',
    description:
      'Expert guidance and diverse portfolio options for wealth growth.',
    gradient: 'from-purple-500 to-violet-600',
    link: '/services'
  },
  {
    icon: Plane,
    name: 'International Banking',
    description:
      'Seamless cross-border transactions and multi-currency accounts.',
    gradient: 'from-yellow-500 to-orange-600',
    link: '/services'
  },
  {
    icon: Shield,
    name: 'Insurance Products',
    description:
      'Protect what matters most with our range of insurance offerings.',
    gradient: 'from-gray-500 to-gray-600',
    link: '/services'
  }
]

export function Services () {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section className='relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50'>
      {/* Background Pattern */}
      <div className='absolute inset-0 z-0'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5" />
      </div>

      <div className='container mx-auto px-4 relative z-10' ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <span className='text-sm font-semibold text-blue-600 tracking-wider uppercase mb-4 block'>
            Our Services
          </span>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight'>
            Comprehensive Banking Solutions
          </h2>
          <p className='text-gray-600 text-lg md:text-xl'>
            Discover our range of professional banking services designed to meet
            your financial goals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className='group relative'
            >
              {/* Hover Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl blur-2xl`}
              />

              {/* Card */}
              <div className='relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full flex flex-col'>
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-6 self-start`}
                >
                  <service.icon className='w-6 h-6 text-white' />
                </div>

                {/* Content */}
                <div className='flex-grow'>
                  <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors'>
                    {service.name}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                    {service.description}
                  </p>
                </div>

                {/* Button */}
                <Link href={service.link} className='inline-block'>
                  <Button
                    variant='ghost'
                    className={`group/button hover:text-white hover:bg-gradient-to-r ${service.gradient} transition-all duration-300`}
                  >
                    Explore Service
                    <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1' />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mt-16'
        >
          <Link href='/services'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8'
            >
              View All Services
              <ArrowRight className='ml-2 h-5 w-5 animate-bounceX' />
            </Button>
          </Link>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className='absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
          style={{ y, opacity }}
        />
        <motion.div
          className='absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
          style={{ y: opacity }}
        />
      </div>
    </section>
  )
}
