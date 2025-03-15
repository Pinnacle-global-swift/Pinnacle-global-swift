'use client'

import {
  PiggyBankIcon as Piggy,
  Briefcase,
  Building,
  Users,
  ArrowRight,
  Check
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const accountTypes = [
  {
    icon: Piggy,
    title: 'Personal Savings',
    description:
      'Grow your wealth with our high-yield savings accounts and personalized financial planning services.',
    features: [
      'High-yield interest rates',
      'No monthly fees',
      'Mobile banking access',
      '24/7 customer support'
    ],
    link: '/services',
    gradient: 'from-blue-600 to-indigo-600',
    shadowColor: 'shadow-blue-500/20',
    price: '$0',
    period: '/month'
  },
  {
    icon: Briefcase,
    title: 'Business Checking',
    description:
      'Streamlined business banking solutions with advanced cash management tools and dedicated support.',
    features: [
      'Advanced cash management',
      'Dedicated support',
      'No monthly fees',
      'Mobile banking access'
    ],
    link: '/services',
    gradient: 'from-purple-500 to-pink-400',
    shadowColor: 'shadow-purple-500/20',
    price: '$10',
    period: '/month'
  },
  {
    icon: Building,
    title: 'Corporate Banking',
    description:
      'Comprehensive financial solutions for large corporations with global banking capabilities.',
    features: [
      'Global banking capabilities',
      'Dedicated account manager',
      'Custom financial solutions',
      '24/7 customer support'
    ],
    link: '/services',
    gradient: 'from-emerald-500 to-teal-400',
    shadowColor: 'shadow-emerald-500/20',
    price: '$50',
    period: '/month'
  },
  {
    icon: Users,
    title: 'Joint Accounts',
    description:
      'Simplified shared banking with smart features for families and partnerships.',
    features: [
      'Shared account access',
      'Smart budgeting tools',
      'No monthly fees',
      'Mobile banking access'
    ],
    link: '/services',
    gradient: 'from-orange-500 to-amber-400',
    shadowColor: 'shadow-orange-500/20',
    price: '$0',
    period: '/month'
  }
]

export function AccountTypes () {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className='relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden'>
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
            Choose Your Account Type
          </h2>
          <p className='text-gray-600 text-lg'>
            Select the perfect account that aligns with your financial goals and
            aspirations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {accountTypes.map((type, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='relative group'
            >
              {/* Hover Effect Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${type.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-2xl -z-10`}
              />

              <div
                className={`bg-white rounded-2xl p-6 shadow-lg ${type.shadowColor} hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-transparent relative z-10`}
              >
                {/* Header */}
                <div
                  className={`p-4 rounded-xl bg-gradient-to-r ${type.gradient} mb-6`}
                >
                  <div className='flex items-center justify-between text-white mb-4'>
                    <type.icon className='w-8 h-8' />
                    <div className='text-right'>
                      <span className='text-2xl font-bold'>{type.price}</span>
                      <span className='text-sm opacity-75'>{type.period}</span>
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold text-white'>
                    {type.title}
                  </h3>
                </div>

                {/* Description */}
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  {type.description}
                </p>

                {/* Features */}
                <ul className='space-y-3 mb-8'>
                  {type.features.map((feature, idx) => (
                    <li key={idx} className='flex items-center text-gray-600'>
                      <Check className='w-5 h-5 mr-3 text-green-500' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={type.link} className='block'>
                  <Button
                    className={`w-full bg-gradient-to-r ${type.gradient} text-white hover:opacity-90 transition-opacity`}
                  >
                    Open Account
                    <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
