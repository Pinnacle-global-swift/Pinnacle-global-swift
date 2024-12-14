'use client'

import { motion } from 'framer-motion'
import { ArrowRight, PiggyBank, Laptop, Clock } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function BankingSection () {
  const accounts = [
    {
      icon: PiggyBank,
      title: 'Savings Account',
      description: 'Open account now and earn upto 8%',
      image: '/saving.png'
    },
    {
      icon: Laptop,
      title: 'Current Account',
      description: 'Open account now and earn upto 5%',
      image: '/currentaccout.png'
    },
    {
      icon: Clock,
      title: 'Fixed Deposit Account',
      description: 'Open account now and earn upto 10%',
      image: '/fixdeposite.png?height=300&width=400'
    }
  ]

  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Let's Think Of Saving Money
          </h2>
          <p className='text-xl text-gray-600'>
            Convenient banking options for you.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {accounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative group cursor-pointer'
            >
              <div className='aspect-w-16 aspect-h-9 mb-4'>
                <Image
                  src={account.image}
                  alt={account.title}
                  width={400}
                  height={300}
                  className='rounded-lg object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300'
                />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                {account.title}
              </h3>
              <p className='text-gray-600'>{account.description}</p>
            </motion.div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Button variant='outline' className='group'>
            View All Accounts
            <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </Button>
        </div>
      </div>
    </section>
  )
}
