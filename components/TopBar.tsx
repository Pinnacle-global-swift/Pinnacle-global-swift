'use client'

import React,  { useState, useEffect } from 'react'
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

  // Prevent hydration errors by only rendering after mount
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
            <a href="mailto:support@pinnaclebank.com" className="hover:text-primary">
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
              <Link href="#" className="hover:text-primary">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

