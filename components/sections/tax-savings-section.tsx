'use client'

import { motion } from 'framer-motion'
import { ChevronRight, CreditCard, Receipt, Coins } from 'lucide-react'
import Image from 'next/image'

export function TaxSavingsSection() {
  const features = [
    "On the other hand",
    "Perfectly simple & easy",
    "Explorer of the master-builder",
    "On the other hand",
    "Explorer of the master-builder",
    "Perfectly simple & easy"
  ]

  const services = [
    { icon: CreditCard, title: "Trading & Demat a/c", label: "SWIFT-BLINK" },
    { icon: Receipt, title: "Tax Savings a/c", label: "SWIFT-BLINK/H4>" },
    { icon: Coins, title: "Gold Savings a/c", label: "SWIFT-BLINK" }
  ]

  return (
    <section className="bg-[#0f172a] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Tax Savings"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-400 text-sm">Tax Savings a/c</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              Step To Save Your Taxes Money
            </h2>
            <p className="text-gray-400 mb-8">
              It will frequently pleasures repudiated to distinguish nothing the claims off duty or the obligations business.
            </p>

            <ul className="space-y-4 mb-12">
              {features.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <ChevronRight className="w-5 h-5 text-cyan-400" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-cyan-600 p-4 rounded-lg text-center"
                >
                  <service.icon className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">{service.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

