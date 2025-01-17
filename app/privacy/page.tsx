'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { List, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PrivacyPolicy() {
  const policyPoints = [
    {
      title: "Information We Collect",
      items: [
        "Personal identification information (Name, email address, phone number, etc.)",
        "Financial information (Account numbers, transaction history, credit information)",
        "Authentication information (Passwords, security questions)",
        "Device and usage information (IP address, browser type, operating system)"
      ]
    },
    {
      title: "How We Use Your Information",
      items: [
        "Providing and maintaining our Services",
        "Processing transactions and sending related communications",
        "Verifying your identity and preventing fraud",
        "Improving and personalizing our Services",
        "Complying with legal and regulatory requirements"
      ]
    },
    // ... other policy points
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">Privacy Policy</h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-700"
          >
            At Pinnacle Global Swift, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and banking services (collectively, the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Services.
          </motion.p>

          <div className="space-y-6 mt-8">
            {policyPoints.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                className="border-b border-gray-200 pb-4"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <List className="w-5 h-5 mr-2 text-primary" /> {section.title}
                </h2>
                <ul className="space-y-2 ml-6 list-disc">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-gray-700 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-gray-500 text-center">Last Updated: January 15, 2025</p>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}