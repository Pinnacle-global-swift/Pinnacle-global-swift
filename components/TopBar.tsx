'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const contactInfo = [
  {
    icon: MapPin,
    text: '2401 W Park Row Dr, Pantego, TX 76013, United States',
    href: 'https://maps.google.com/',
    color: 'text-emerald-400'
  },
  {
    icon: Mail,
    text: 'support@pinnacleglobalswift.com',
    href: 'mailto:support@pinnacleglobalswift.com',
    color: 'text-blue-400'
  }
]

const socialLinks = [
  { icon: Facebook, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
  { icon: Linkedin, href: '#', color: 'hover:bg-blue-700', label: 'LinkedIn' },
  { icon: Twitter, href: '#', color: 'hover:bg-sky-500', label: 'Twitter' },
  {
    icon: Instagram,
    href: '#',
    color: 'hover:bg-pink-600',
    label: 'Instagram'
  },
  { icon: Youtube, href: '#', color: 'hover:bg-red-600', label: 'Youtube' }
]

export function TopBar () {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white border-b border-white/10 backdrop-blur-sm'
        >
          <div className='container mx-auto py-2 px-4'>
            {/* Mobile View (Stacked Layout) */}
            <div className='lg:hidden space-y-3 py-2'>
              {/* Contact Info Mobile */}
              <div className='space-y-2'>
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex items-center gap-2 group hover:text-white transition-colors justify-center'
                  >
                    <span className='p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors'>
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </span>
                    <span className='text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors'>
                      {item.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Actions Mobile */}
              <div className='flex justify-center items-center gap-4'>
                <Select defaultValue='en'>
                  <SelectTrigger className='w-[100px] h-8 bg-white/5 border-white/10 text-gray-300 text-xs'>
                    <Globe className='w-3.5 h-3.5 mr-1.5 text-blue-400' />
                    <SelectValue placeholder='Language' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-900 border-gray-800'>
                    {[
                      { value: 'en', label: 'English' },
                      { value: 'zh', label: '中文' },
                      { value: 'ms', label: 'Bahasa' }
                    ].map(lang => (
                      <SelectItem
                        key={lang.value}
                        value={lang.value}
                        className='text-gray-300 hover:bg-white/5 focus:bg-white/5 cursor-pointer'
                      >
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className='flex items-center gap-1.5'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-1.5 rounded-lg bg-white/5 ${social.color} transition-all duration-300 hover:scale-110`}
                      aria-label={social.label}
                    >
                      <social.icon className='w-3 h-3 text-white' />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop View (Horizontal Layout) */}
            <div className='hidden lg:flex justify-between items-center'>
              {/* Contact Info Desktop */}
              <div className='flex items-center gap-6'>
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className='flex items-center gap-2 group hover:text-white transition-colors'
                  >
                    <span className='p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors'>
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </span>
                    <span className='text-sm text-gray-300 group-hover:text-white transition-colors'>
                      {item.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Actions Desktop */}
              <div className='flex items-center gap-6'>
                <Select defaultValue='en'>
                  <SelectTrigger className='w-[120px] h-8 bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 focus:ring-1 focus:ring-white/20 transition-colors'>
                    <Globe className='w-4 h-4 mr-2 text-blue-400' />
                    <SelectValue placeholder='Language' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-900 border-gray-800'>
                    {[
                      { value: 'en', label: 'English' },
                      { value: 'zh', label: '中文' },
                      { value: 'ms', label: 'Bahasa' }
                    ].map(lang => (
                      <SelectItem
                        key={lang.value}
                        value={lang.value}
                        className='text-gray-300 hover:bg-white/5 focus:bg-white/5 cursor-pointer'
                      >
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className='flex items-center gap-2'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-1.5 rounded-lg bg-white/5 ${social.color} transition-all duration-300 hover:scale-110`}
                      aria-label={social.label}
                    >
                      <social.icon className='w-3.5 h-3.5 text-white' />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
