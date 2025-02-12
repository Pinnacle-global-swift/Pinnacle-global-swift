'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { TopBar } from './TopBar'
import Image from 'next/image'

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact Us', href: '/contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/pgb.png"
                alt="DBS Bank"
                width={200}
                height={200}
                className="h-10 w-auto"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register
                  </Button>
                </Link>
              </div>
             
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-gray-200"
              >
                <div className="py-4 space-y-4">
                  <nav className="flex flex-col space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="px-4 space-y-4">
                    <Link href="/login">
                      <Button variant="outline" className="w-full text-white bg-black justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="default" className="w-full justify-center text-white bg-blue-600 hover:bg-blue-700">
                        Register
                      </Button>
                    </Link>
                  
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
