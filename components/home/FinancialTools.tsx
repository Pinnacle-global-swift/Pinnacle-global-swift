'use client'

import {
  Calculator,
  TrendingUp,
  PieChart,
  DollarSign,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const tools = [
  {
    icon: Calculator,
    title: 'Loan Calculator',
    description:
      'Estimate your monthly payments and total interest with our advanced loan calculator. Plan your finances with confidence.',
    image:
      'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?auto=format&fit=crop&q=80&w=2070',
    link: '/tools/loan-calculator',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    icon: TrendingUp,
    title: 'Investment Tracker',
    description: 'Monitor your portfolio performance in real-time.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070',
    link: '/tools/investment-tracker',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    icon: PieChart,
    title: 'Budget Planner',
    description: 'Create and manage your personal or business budget.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070',
    link: '/tools/budget-planner',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    icon: DollarSign,
    title: 'Currency Converter',
    description: 'Get real-time exchange rates for multiple currencies.',
    image:
      'https://images.unsplash.com/photo-1627719172038-611c725920bc?auto=format&fit=crop&q=80&w=2070',
    link: '/tools/currency-converter',
    gradient: 'from-purple-500 to-pink-600'
  }
]

export function FinancialTools () {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className='py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-2xl mx-auto mb-16'
        >
          {/* Updated heading with stronger colors */}
          <span className='text-sm font-semibold text-blue-600 tracking-wider uppercase mb-4 block'>
            Financial Tools
          </span>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-sm'>
            Professional Financial Tools
          </h2>
          <p className='text-gray-700 text-lg md:text-xl'>
            Access powerful tools to manage your finances and make informed
            decisions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className='group relative'
            >
              {/* Enhanced card with better visibility */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl blur-2xl`}
              />

              <div className='relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full flex flex-col'>
                {/* Image Container */}
                <div className='relative h-56 -mx-8 -mt-8 mb-8 rounded-t-2xl overflow-hidden'>
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    className='object-cover transform group-hover:scale-105 transition-transform duration-500'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent' />
                  <div
                    className={`absolute bottom-4 left-4 inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.gradient}`}
                  >
                    <tool.icon className='w-6 h-6 text-white' />
                  </div>
                </div>

                {/* Content with improved visibility */}
                <div className='flex-1 space-y-4'>
                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors'>
                    {tool.title}
                  </h3>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                    {tool.description}
                  </p>
                </div>

                {/* Enhanced button */}
                <Link href={tool.link} className='mt-6 inline-block'>
                  <Button
                    className={`w-full bg-gradient-to-r ${tool.gradient} text-white hover:opacity-90 transition-all duration-300`}
                  >
                    Try Now
                    <ArrowRight className='ml-2 h-4 w-4 animate-bounceX' />
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
