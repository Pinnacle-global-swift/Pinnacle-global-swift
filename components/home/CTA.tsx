'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone, Headphones } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function CTA () {
  return (
    <section className='bg-gray-900 text-white py-20 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center justify-between'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='lg:w-1/2 mb-10 lg:mb-0'
          >
            <h2 className='text-3xl font-bold mb-6'>
              Ready to Experience Modern Banking?
            </h2>
            <p className='text-xl mb-8'>
              Join thousands of satisfied customers and take control of your
              finances today with Pinnacle Global Swift.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link href='/register'>
                <Button
                  size='lg'
                  className='bg-primary hover:bg-primary-dark text-white'
                >
                  Open an Account
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <Link href='/contact'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white hover:bg-white hover:text-gray-900'
                >
                  <Headphones className='mr-2 h-5 w-5' />
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='lg:w-1/2 relative'
          >
            <div className='relative w-full h-[600px]'>
              <Image
                src='https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&q=80&w=800'
                alt='Mobile banking app'
                fill
                className='object-cover rounded-lg shadow-2xl'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 rounded-lg' />
              <div className='absolute bottom-8 left-8 right-8 text-white'>
                <Smartphone className='w-12 h-12 mb-4' />
                <h3 className='text-2xl font-bold mb-2'>Bank on the Go</h3>
                <p className='text-lg'>
                  Download our mobile app and manage your finances anytime,
                  anywhere.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
