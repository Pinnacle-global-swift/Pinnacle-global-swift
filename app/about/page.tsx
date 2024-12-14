'use client'

import { motion } from 'framer-motion'
import { Play, Users, Target, Settings } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Known For Trust, Honesty & Customer Support
              </h1>
              <p className="text-gray-300 mb-8">
                At Pinnacle Global Bank, we are dedicated to upholding the highest standards of trust and integrity in all our services. Our commitment to transparency and customer satisfaction is unwavering, ensuring you have a reliable partner for all your banking needs.
              </p>
              <p className="text-gray-300">
                We believe in empowering our customers with the freedom to manage their finances effortlessly, offering a wide range of services designed to make banking a seamless experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Bank Building"
                width={800}
                height={600}
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="w-8 h-8 text-white" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey & Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our Journey"
                  width={600}
                  height={400}
                  className="w-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Our Journey</h3>
                  <p>Over Four Decades of Excellence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our Team"
                  width={600}
                  height={400}
                  className="w-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Our Team</h3>
                  <p>Passionate & Professional Management</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-600">
                Must explain to you how work mistaken give you complete guide they cannot foresee pain.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Commitment</h3>
              <p className="text-gray-600">
                Business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Consistency</h3>
              <p className="text-gray-600">
                Being able to do what we like best every pleasure is to be welcomed and pain avoided but in certain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

