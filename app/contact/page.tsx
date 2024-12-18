'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { GoogleMap } from '@/components/contact/GoogleMap'
import { FAQSection } from '@/components/contact/FAQSection'
import { ContactForm } from '@/components/contact/ContactForm'
import { HeroSection } from '@/components/contact/HeroSection'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <ContactInfo />
        <ContactForm />
        <GoogleMap />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

