'use client'

import { motion } from 'framer-motion'
import {
  CreditCard,
  Lock,
  Zap,
  Globe,
  Smartphone,
  PiggyBank
} from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: CreditCard,
    title: 'Smart Card Management',
    description:
      'Take full control of your cards in real-time. Set spending limits, freeze cards instantly, and track your daily expenses with our intuitive interface.',
    image:
      'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?auto=format&fit=crop&q=80&w=2070',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    description:
      'Rest easy knowing your money and data are protected by state-of-the-art encryption and advanced multi-factor authentication protocols for maximum safety.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1920',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    icon: Zap,
    title: 'Instant Transfers',
    description:
      'Send and receive money in seconds, both domestically and internationally, with incredibly low fees and competitive real-time exchange rates.',
    image:
      'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&q=80&w=1920',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description:
      'Access your accounts and bank from anywhere in the world with our comprehensive online banking and mobile platforms designed for global mobility.',
    image:
      'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1920',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile Banking',
    description:
      'Manage accounts, pay bills, and deposit checks directly from your smartphone with our award-winning app featuring a seamless user experience.',
    image:
      'https://images.unsplash.com/photo-1599202875854-23b7cd490ff4?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    icon: PiggyBank,
    title: 'Savings Goals',
    description:
      'Plan for your future by setting and tracking savings goals with our interactive tools and automated savings plans tailored to your needs.',
    image:
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=1920',
    gradient: 'from-indigo-500 to-purple-600'
  }
]

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className='relative pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-40'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <h2 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-sm filter[drop-shadow(2px_2px_10px_rgba(59,130,246,0.5))]'>
            Why Choose Pinnacle Global Swift?
          </h2>
          <p className='text-gray-600 text-lg'>
            Experience banking excellence with our comprehensive suite of
            features
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'
            >
              {/* Card Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Image Container */}
              <div className='relative h-56 overflow-hidden'>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className='object-cover transform group-hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300'>
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-3 backdrop-blur-sm`}
                  >
                    <feature.icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-semibold text-white'>
                    {feature.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
