'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Shield,
  Globe,
  ChevronRight,
  Lock,
  Smartphone,
  ShieldCheck,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  const [email, setEmail] = useState('')

  const footerSections = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Careers', href: '/careers' }
    ],
    products: [
      { name: 'Personal Banking', href: '/services' },
      { name: 'Business Banking', href: '/services' },
      { name: 'Mortgages & Loans', href: '/services' },
      { name: 'Wealth Management', href: '/services' },
      { name: 'Card Services', href: '/dashboard/cards' }
    ],
    support: [
      { name: 'Help Center', href: '/contact' },
      { name: 'Security Center', href: '/security' },
      { name: 'Fraud Prevention', href: '/security' },
      { name: 'Accessibility', href: '/accessibility' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' }
  ]

  return (
    <footer className='relative bg-gradient-to-b from-[#0a1128] via-[#050a1a] to-[#010510] text-white overflow-hidden'>
      {/* Subtle Background Pattern */}
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none'>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center bg-[length:40px_40px]" />
      </div>

      <div className='relative container mx-auto px-4 pt-20 pb-10'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16'>

          {/* Brand & Mission Section */}
          <div className='lg:col-span-4 space-y-8'>
            <div className='space-y-4'>
              <h3 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent'>
                Pinnacle Global Swift
              </h3>
              <p className='text-blue-100/60 text-sm leading-relaxed max-w-sm'>
                Empowering individuals and businesses with innovative financial solutions.
                Our commitment to security, transparency, and excellence defines our legacy
                in global banking since 1990.
              </p>
            </div>

            <div className='flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-blue-400/80'>
              <div className='flex items-center gap-1.5'>
                <ShieldCheck className='w-4 h-4' />
                <span>Bank-Level Security</span>
              </div>
              <div className='w-1 h-1 rounded-full bg-blue-800' />
              <div className='flex items-center gap-1.5'>
                <Lock className='w-4 h-4' />
                <span>SSL Encrypted</span>
              </div>
            </div>

            <div className='flex gap-3'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className={`bg-white/5 p-3 rounded-xl ${social.color} transition-all duration-300 border border-white/10 hover:border-transparent hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
                  aria-label={social.label}
                >
                  <social.icon className='w-5 h-5 text-blue-200' />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className='lg:col-span-1 border-r border-white/5 hidden lg:block' />

          <div className='lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8'>
            <div className='space-y-6'>
              <h4 className='text-sm font-bold uppercase tracking-wider text-blue-300/90'>Company</h4>
              <ul className='space-y-4'>
                {footerSections.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-blue-100/50 hover:text-blue-200 transition-colors text-sm font-medium'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='space-y-6'>
              <h4 className='text-sm font-bold uppercase tracking-wider text-blue-300/90'>Products</h4>
              <ul className='space-y-4'>
                {footerSections.products.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-blue-100/50 hover:text-blue-200 transition-colors text-sm font-medium'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='space-y-6'>
              <h4 className='text-sm font-bold uppercase tracking-wider text-blue-300/90'>Resources</h4>
              <ul className='space-y-4'>
                {footerSections.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-blue-100/50 hover:text-blue-200 transition-colors text-sm font-medium'>
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <div className='pt-2 flex flex-col gap-3'>
                    <div className='flex items-center gap-3 text-blue-100/60 transition-colors group cursor-pointer'>
                      <div className='p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20'>
                        <Smartphone className='w-4 h-4 text-blue-400' />
                      </div>
                      <span className='text-xs font-semibold'>Get Mobile App</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Newsletter Bar */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-10 border-y border-white/5'>
          <div className='flex items-center gap-4 text-sm text-blue-100/60'>
            <div className='p-3 bg-blue-500/10 rounded-full'>
              <MapPin className='w-5 h-5 text-blue-400' />
            </div>
            <span>2401 W Park Row Dr, Pantego, TX 76013, USA</span>
          </div>
          <div className='flex items-center gap-4 text-sm text-blue-100/60'>
            <div className='p-3 bg-blue-500/10 rounded-full'>
              <Mail className='w-5 h-5 text-blue-400' />
            </div>
            <span>support@pinnacleglobalswift.com</span>
          </div>
          <div>
            <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
              <Input
                type='email'
                placeholder='Professional Updates'
                className='bg-white/5 border-white/10 text-white placeholder:text-blue-200/30'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className='bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'>
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className='mt-12 space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[11px] text-blue-100/30 leading-relaxed text-justify md:text-left uppercase font-medium tracking-tighter'>
            <p>
              Investment and insurance products are not insured by the FDIC or any other government agency,
              are not deposits or other obligations of Pinnacle Global Swift,
              and are subject to investment risks, including possible loss of the principal amount invested.
            </p>
            <p>
              Pinnacle Global Swift is an Equal Housing Lender and Member FDIC. Credit products
              offered by Pinnacle Global Swift and its affiliates are subject to credit approval and
              may be subject to collateral requirements.
            </p>
            <p>
              The names, logos, and brands of third-party services (such as Mastercard, Visa)
              mentioned on this site are the property of their respective owners
              and do not imply endorsement or affiliation with Pinnacle Global Swift.
            </p>
            <p>
              © {new Date().getFullYear()} Pinnacle Global Swift. All rights reserved.
              Designed by Vite ICT Nig LTD. NMLS ID: 458712. Registered on the
              Financial Conduct Authority's Register with number 59422.
            </p>
          </div>

          <div className='flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-white/5'>
            <div className='flex flex-wrap justify-center gap-8'>
              {footerSections.legal.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-blue-100/30 hover:text-blue-200 text-xs font-bold transition-all uppercase tracking-widest'
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className='flex items-center gap-2 opacity-30 brightness-0 invert'>
              {/* Simulated trust logos or badges could go here if assets existed */}
              <Building2 className='w-5 h-5' />
              <div className='h-4 w-px bg-white/20 mx-2' />
              <Shield className='w-5 h-5' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
