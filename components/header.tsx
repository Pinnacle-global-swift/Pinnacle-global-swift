'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from 'lucide-react'
import { TopBar } from './TopBar'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'

const mainNavItems = [
  {
    name: "Personal",
    href: "/personal",
    subItems: [
      { name: "Checking Accounts", href: "/personal/checking" },
      { name: "Savings Accounts", href: "/personal/savings" },
      { name: "Credit Cards", href: "/personal/credit-cards" },
      { name: "Mortgages", href: "/personal/mortgages" },
    ]
  },
  {
    name: "Business",
    href: "/business",
    subItems: [
      { name: "Business Checking", href: "/business/checking" },
      { name: "Business Loans", href: "/business/loans" },
      { name: "Merchant Services", href: "/business/merchant-services" },
      { name: "Treasury Management", href: "/business/treasury" },
    ]
  },
  {
    name: "Loans",
    href: "/loans",
    subItems: [
      { name: "Personal Loans", href: "/loans/personal" },
      { name: "Auto Loans", href: "/loans/auto" },
      { name: "Home Loans", href: "/loans/home" },
      { name: "Business Loans", href: "/loans/business" },
    ]
  },
  {
    name: "Investments",
    href: "/investments",
    subItems: [
      { name: "Wealth Management", href: "/investments/wealth-management" },
      { name: "Retirement Planning", href: "/investments/retirement" },
      { name: "Investment Advisory", href: "/investments/advisory" },
      { name: "Portfolio Management", href: "/investments/portfolio" },
    ]
  },
  {
    name: "About",
    href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/story" },
      { name: "Leadership", href: "/about/leadership" },
      { name: "Careers", href: "/about/careers" },
      { name: "Contact", href: "/contact" },
    ]
  }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <>
      <TopBar />
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=300"
                alt="Pinnacle Global Bank Logo"
                width={180}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 py-8 text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </Link>

                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 border"
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="font-medium">Log In</Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium">Open Account</Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="lg:hidden"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[400px] lg:hidden">
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto py-6">
                    {mainNavItems.map((item) => (
                      <div key={item.name} className="mb-6">
                        <Link
                          href={item.href}
                          className="text-lg font-semibold text-gray-900 mb-3 block"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <div className="space-y-2 pl-4">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-600 hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-6 space-y-4">
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button className="w-full">Open Account</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  )
}

