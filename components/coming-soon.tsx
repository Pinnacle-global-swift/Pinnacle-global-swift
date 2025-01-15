'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ComingSoon({ pageName }: { pageName: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-xl mb-8">{pageName} is under construction</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="mb-6">Be the first to know when we launch. Sign up for updates!</p>
          <div className="flex space-x-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white bg-opacity-20 border-transparent focus:border-white focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-100">
              Notify Me
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 flex items-center space-x-4"
      >
        <Mail className="w-6 h-6" />
        <span>Contact us:  support@pinnacleglobalswift.com</span>
      </motion.div>
    </div>
  )
}

