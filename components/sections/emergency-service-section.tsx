'use client'

import { motion } from 'framer-motion'
import { CreditCard, Smartphone, UserCheck, FileText } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function EmergencyServiceSection() {
  const services = [
    {
      icon: CreditCard,
      title: "Credit & Debit Card Related"
    },
    {
      icon: Smartphone,
      title: "Mobile & Internet Banking"
    },
    {
      icon: UserCheck,
      title: "Account & Personal Details Change"
    },
    {
      icon: FileText,
      title: "Cheque Book / DD Related"
    }
  ]

  return (
    <section className="py-20 bg-gray-100">
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
              src="/onlineemerg.png?height=600&width=800"
              alt="Emergency Services"
              width={600}
              height={800}
              className="rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Online Emergency Service Requests All In One Place
            </h2>
            <p className="text-gray-600 mb-8">
              Swift-Blink offers a centralized platform for all your emergency service requests. Whether you need to report a lost card, request urgent assistance, or handle any banking emergency, you can do it all seamlessly through our online portal.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <service.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-medium">{service.title}</h3>
                </motion.div>
              ))}
            </div>

            <Button className="mt-8">
              Customer FAQ's
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

