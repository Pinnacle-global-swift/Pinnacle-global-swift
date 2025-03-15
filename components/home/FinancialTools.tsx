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
      <div className='absolute inset-0 opacity-40'>
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
          <h2 className='text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4'>
            Professional Financial Tools
          </h2>
          <p className='text-gray-600 text-lg'>
            Access powerful tools to manage your finances and make informed
            decisions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'
            >
              {/* Card Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Image Container */}
              <div className='relative h-56 overflow-hidden'>
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className='object-cover transform group-hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
              </div>

              {/* Content */}
              <div className='p-8 relative'>
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.gradient} mb-6 transform -translate-y-12 shadow-lg`}
                >
                  <tool.icon className='w-6 h-6 text-white' />
                </div>

                <div className='space-y-4'>
                  <h3 className='text-2xl font-semibold group-hover:text-primary transition-colors'>
                    {tool.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {tool.description}
                  </p>

                  <Link href={tool.link}>
                    <Button
                      variant='ghost'
                      className='group/button hover:text-primary transition-colors p-0'
                    >
                      Try Now
                      <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1' />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
