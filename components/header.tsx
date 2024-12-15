'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronRight, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', submenu: [
    { name: 'Personal Banking', href: '/services/personal' },
    { name: 'Business Banking', href: '/services/business' },
    { name: 'Loans', href: '/services/loans' },
  ]},
  { name: 'Investments', href: '/investments' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name)
  }

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-lg' : 'bg-black bg-opacity-90'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary transition-colors hover:text-primary/80">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Pinnacle Global Bank
            </motion.div>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <div className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-white hover:text-primary transition-colors rounded-md inline-flex items-center"
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>
                </motion.div>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {item.submenu.map((subItem) => (
                        <motion.div
                          key={subItem.name}
                          whileHover={{ backgroundColor: '#f3f4f6' }}
                        >
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-primary"
                            role="menuitem"
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/login">
                <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <User className="w-4 h-4 mr-2" />
                  Online Banking
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="flex justify-between items-center w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100"
                      >
                        {item.name}
                        <ChevronRight className={`h-4 w-4 transition-transform ${activeSubmenu === item.name ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4">
                <Link 
                  href="/login" 
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <User className="w-4 h-4 mr-2" />
                    Online Banking
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

