'use client'

import { useState, useEffect } from 'react'
import { MapPin, Mail, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'
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
    <div className="bg-[#0B1222] text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center gap-2 mb-2 sm:mb-0 text-center sm:text-left">
          <MapPin className="w-4 h-4 hidden sm:inline" />
          <span className="sm:hidden">Address:</span>
          <span>201 TELOK KURAU ROAD #01-05 KURAU COURT, SINGAPORE</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 hidden sm:inline" />
            <span className="sm:hidden">Email:</span>
            <a href="mailto:support@pinnaclebank.com" className="hover:text-primary transition-colors">
              support@pinnaclebank.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-[100px] bg-transparent border-none text-white focus:ring-0">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ms">Bahasa</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-3">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Youtube className="w-4 h-4" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

