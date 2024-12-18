'use client'

import { motion } from 'framer-motion'
import { CreditCard, Lock, Zap, Globe, Smartphone, PiggyBank } from 'lucide-react'
import Image from 'next/image'

const features = [
  { 
    icon: CreditCard, 
    title: "Smart Card Management", 
    description: "Control your cards in real-time, set limits, and track expenses with our intuitive interface.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920"
  },
  { 
    icon: Lock, 
    title: "Bank-Grade Security", 
    description: "Rest easy knowing your money and data are protected by state-of-the-art encryption and multi-factor authentication.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1920"
  },
  { 
    icon: Zap, 
    title: "Instant Transfers", 
    description: "Send and receive money in seconds, both domestically and internationally, with low fees and great exchange rates.",
    image: "https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&q=80&w=1920"
  },
  { 
    icon: Globe, 
    title: "Global Access", 
    description: "Bank from anywhere in the world with our comprehensive online and mobile banking platforms.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1920"
  },
  { 
    icon: Smartphone, 
    title: "Mobile Banking", 
    description: "Manage your accounts, pay bills, and deposit checks right from your smartphone with our award-winning app.",
    image: "https://images.unsplash.com/photo-1616514197672-7f32d31ae4b3?auto=format&fit=crop&q=80&w=1920"
  },
  { 
    icon: PiggyBank, 
    title: "Savings Goals", 
    description: "Set and track your savings goals with our interactive tools and automated savings plans.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=1920"
  },
]

export function Features() {
  return (
    <section id="features" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Pinnacle Global Bank?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <feature.icon className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

