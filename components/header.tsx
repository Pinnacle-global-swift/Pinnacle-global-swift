'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { TopBar } from './TopBar'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Personal", href: "/personal" },
    { name: "Business", href: "/business" },
    { name: "Loans", href: "/loans" },
    { name: "Investments", href: "/investments" },
    { name: "About", href: "/about" },
  ]

  return (
    <>
      <TopBar />
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Pinnacle Global Bank
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-primary">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm text-gray-600">Customer Support</span>
              <a href="tel:+18001234567" className="text-lg font-bold text-primary hover:text-primary/90">
                1-800-123-4567
              </a>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline" className="text-sm">Log In</Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm">Open Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

