'use client'

import { motion } from 'framer-motion'
import { Home, Bell, Building2, CreditCard, Shield, FileText } from 'lucide-react'

export function BenefitsSection() {
  const benefits = [
    {
      icon: Home,
      title: "Purchase Gold and Earn Profits",
      description: "Invest in gold through your Swift-Blink account and watch your wealth grow. Benefit from competitive rates and the potential for high returns."
    },
    {
      icon: Bell,
      title: "Free SMS Alerts",
      description: "Stay informed with free SMS alerts. Receive instant notifications for transactions, account activity, and important updates."
    },
    {
      icon: Building2,
      title: "Discounts on Locker",
      description: "Safeguard your valuables with our locker services and enjoy exclusive discounts as a Swift-Blink account holder."
    },
    {
      icon: CreditCard,
      title: "International Debit Cards",
      description: "Enjoy the convenience of international debit cards, offering you the freedom to make purchases worldwide."
    },
    {
      icon: Shield,
      title: "Provides Safety",
      description: "Your security is our priority. Benefit from advanced security features, including two-factor authentication and fraud detection systems."
    },
    {
      icon: FileText,
      title: "Paperless Banking",
      description: "Embrace eco-friendly banking with our paperless solutions. Access statements, pay bills, and manage your account online."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Benefits For Account Holders
          </h2>
          <p className="text-xl text-gray-600">
            We help businesses and customers achieve more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

