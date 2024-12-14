'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessagesSquare, Shield, Wallet } from 'lucide-react'
import Link from 'next/link'
// import { Loader } from "@/components/ui/loader"

export function AccountStepsSection() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const steps = [
    {
      number: "01",
      icon: MessagesSquare,
      title: "Consult With Team",
      description: "Get personalized assistance by consulting with our dedicated team. Schedule a consultation to discuss your financial goals."
    },
    {
      number: "02",
      icon: Shield,
      title: "KYC Verification",
      description: "Ensuring your identity is secure is our top priority. Our streamlined KYC process makes it easy to verify your identity."
    },
    {
      number: "03",
      icon: Wallet,
      title: "Start Your Spending",
      description: "With your account set up and verified, you're ready to start spending. Enjoy the convenience and security of managing your finances."
    }
  ]

  // if (isLoading) {
  //   return <Loader />
  // }

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
            Your Account In Easy Steps
          </h2>
          <p className="text-xl text-gray-600">
            We show our value by serving faithfully.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 left-0 bg-blue-500 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                {step.number}
              </div>
              <div className="pt-12 p-6 bg-gray-50 rounded-xl h-full">
                <step.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Schedule an appointment with our specialist to discuss{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

