'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// Move data to a separate constant file
import { testimonials } from '@/constants/testimonials'

// Simplified variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export const Testimonials = memo(function Testimonials() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 py-24'>
      {/* Background Pattern - Simplified */}
      <div className='absolute inset-0'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10' />
      </div>

      <div className='container relative mx-auto px-4'>
        {/* Header Section */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeInVariants}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-white mb-4'>
            What Our Customers Say
          </h2>
          <p className='text-lg text-blue-100/80'>
            Join thousands of satisfied customers who trust us with their financial future
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className='bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col h-full border border-white/5 hover:border-white/20 transition-all duration-300'
            >
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 shadow-xl'>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-white'>
                    {testimonial.name}
                  </h3>
                  <p className='text-blue-300/80 text-sm'>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-4 h-4 text-yellow-500 fill-current'
                  />
                ))}
              </div>

              <p className='text-white/90 leading-relaxed italic flex-grow'>
                "{testimonial.quote}"
              </p>

              <div className='mt-6 pt-6 border-t border-white/5'>
                <p className='text-blue-200/60 text-xs font-medium uppercase tracking-wider'>
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})
