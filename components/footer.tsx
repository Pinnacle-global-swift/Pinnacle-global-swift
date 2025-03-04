'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Send, Shield, Globe, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  const [email, setEmail] = useState('')

  const footerSections = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' }
    ],
    services: [
      { name: 'Personal Banking', href: '/services' },
      { name: 'Business Banking', href: '/services' },
      { name: 'Investments', href: '/services' },
      { name: 'Insurance', href: '/services' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Security', href: '/security' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center" />
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pinnacle Global Swift
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Your trusted partner in banking and financial services. Building wealth and securing futures since 1990.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gray-800/50 p-2.5 rounded-lg ${social.color} transition-all duration-300 backdrop-blur-sm`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links Sections */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center text-white">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {footerSections.quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center text-white">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerSections.services.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-800">
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form onSubmit={(e) => {
                e.preventDefault()
                // Handle subscription
                setEmail('')
              }}>
                <div className="flex gap-2 mb-6">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button type="submit" size="icon" variant="default" className="bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              <div className="space-y-4 text-sm">
                <motion.div 
                  className="flex items-center text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span className="hover:text-primary transition-colors">support@pinnacleglobalswift.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-start text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <span className="hover:text-primary transition-colors">2401 W Park Row Dr, Pantego, TX 76013, United States</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Pinnacle Global Swift. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerSections.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

