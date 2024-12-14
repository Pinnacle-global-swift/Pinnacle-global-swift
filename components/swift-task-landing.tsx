'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, ShieldCheck, Zap } from 'lucide-react'

import { BankingSection } from './sections/banking-section'
import { TaxSavingsSection } from './sections/tax-savings-section'
import { BenefitsSection } from './sections/benefits-section'
import { EmergencyServiceSection } from './sections/emergency-service-section'
import { AccountStepsSection } from './sections/account-steps-section'
import { PersonalizeCardSection } from './sections/personalize-card-section'
import { CustomerFeedbackSection } from './sections/customer-feedback-section'
import { Header } from './header'
import { Footer } from './footer'

export default function PinnacleGlobalBank() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-white py-20 lg:py-32">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.1
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-100/90 to-white/95" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Banking Made Simple, Secure, and Smart
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl text-gray-700 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Experience modern banking with our sleek, user-friendly interface. Stay on top of your finances effortlessly with Pinnacle Global Bank.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-base px-8 py-6 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                    >
                      Open Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary/10 rounded-full text-base px-8 py-6 flex items-center justify-center transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
                <motion.div 
                  className="mt-12 grid grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {[
                    { icon: CreditCard, text: "Instant Card Management" },
                    { icon: ShieldCheck, text: "Secure Transactions" },
                    { icon: Zap, text: "Fast & Easy Setup" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="bg-primary/20 p-3 rounded-full mb-3">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-gray-700">{item.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-4 sm:p-8 max-w-md mx-auto">
                  <Image
                    src="/hero-banking-app.png"
                    alt="Banking App Interface"
                    width={600}
                    height={500}
                    className="w-full h-auto rounded-2xl"
                    priority
                  />
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70 z-0"></div>
                <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-70 z-0"></div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12 md:space-y-20 bg-white"
        >
          <BankingSection />
          <TaxSavingsSection />
          <BenefitsSection />
          <EmergencyServiceSection />
          <AccountStepsSection />
          <PersonalizeCardSection />
          <CustomerFeedbackSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

