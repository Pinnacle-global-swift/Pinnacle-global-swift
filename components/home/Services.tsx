'use client'

import { motion } from 'framer-motion'
import { CreditCard, Briefcase, Home, BarChartIcon as ChartBar, Plane, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function Services() {
  const services = [
    { icon: CreditCard, name: "Personal Banking", description: "Checking, savings, and credit card solutions tailored to your needs." },
    { icon: Briefcase, name: "Business Accounts", description: "Comprehensive banking services to help your business thrive." },
    { icon: Home, name: "Mortgages", description: "Competitive rates and flexible terms for your dream home." },
    { icon: ChartBar, name: "Investment Services", description: "Expert guidance and diverse portfolio options for wealth growth." },
    { icon: Plane, name: "International Banking", description: "Seamless cross-border transactions and multi-currency accounts." },
    { icon: Shield, name: "Insurance Products", description: "Protect what matters most with our range of insurance offerings." },
  ]

  return (
    <section id="services" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg text-center hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <service.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-sm mb-4">{service.description}</p>
              <Button variant="outline" className="mt-2">Learn More</Button>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

