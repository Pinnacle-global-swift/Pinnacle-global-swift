'use client'

import { useState, useEffect } from 'react'
import { MapPin, Mail, Phone, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TopBar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-[#0A1E3D] text-white py-2 px-4 text-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">2401 W Park Row Dr, Pantego, TX 76013, United States</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <a 
                href="mailto:support@pinnaclebank.com" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                support@pinnacleglobalswift.com
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-[100px] h-7 bg-transparent border-gray-700 text-gray-300 hover:text-white focus:ring-1 focus:ring-blue-400">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A1E3D] border-gray-700">
                <SelectItem value="en" className="text-gray-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  English
                </SelectItem>
                <SelectItem value="zh" className="text-gray-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  中文
                </SelectItem>
                <SelectItem value="ms" className="text-gray-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  Bahasa
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
                { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Youtube, href: '#', color: 'hover:text-red-500' },
              ].map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href}
                  className={`transition-colors duration-200 text-gray-400 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.icon.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

