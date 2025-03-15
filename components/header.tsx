'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TopBar } from './TopBar'
import Image from 'next/image'

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact Us', href: '/contact' }
]

export function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  }

  const menuVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.1 }
    })
  }

  return (
    <>
      <TopBar />
      <motion.header
        initial='hidden'
        animate='visible'
        variants={containerVariants}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 transition-all duration-300 ${
          scrolled
            ? 'shadow-lg border-b border-gray-200 dark:border-gray-800'
            : ''
        }`}
      >
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} className='relative z-10'>
              <Link href='/' className='flex items-center gap-2'>
                <Image
                  src='/pgb.png'
                  alt='Pinnacle Global'
                  width={160}
                  height={40}
                  className='h-8 md:h-10 w-auto'
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-1'>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={menuVariants}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className='hidden lg:flex items-center gap-3'>
              <Link href='/login'>
                <Button
                  variant='ghost'
                  className='rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  Login
                </Button>
              </Link>
              <Link href='/register'>
                <Button className='rounded-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'>
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className='lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label='Toggle menu'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className='h-6 w-6' />
                  ) : (
                    <Menu className='h-6 w-6' />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='lg:hidden border-t border-gray-200 dark:border-gray-700'
              >
                <motion.div
                  className='py-4 space-y-4'
                  initial='hidden'
                  animate='visible'
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                  }}
                >
                  <nav className='flex flex-col space-y-1'>
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        variants={menuVariants}
                        custom={index}
                      >
                        <Link
                          href={item.href}
                          className='flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                  <div className='px-4 space-y-3 pt-2'>
                    <Link href='/login' className='block'>
                      <Button
                        variant='outline'
                        className='w-full justify-center rounded-lg border-gray-300 dark:border-gray-600'
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href='/register' className='block'>
                      <Button className='w-full justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
                        Register
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
