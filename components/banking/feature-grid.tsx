'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { fadeInUp, stagger } from '@/lib/animations'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

interface FeatureGridProps {
  title: string
  description: string
  features: Feature[]
}

export function FeatureGrid({ title, description, features }: FeatureGridProps) {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 border border-gray-100"
          >
            <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {feature.description}
            </p>
            <Button variant="ghost" className="group-hover:translate-x-1 transition-transform duration-300">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}