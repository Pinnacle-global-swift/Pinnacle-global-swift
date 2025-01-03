'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { fadeInUp, stagger } from '@/lib/animations'

interface HeroSectionProps {
  title: string
  titleHighlight?: string
  description: string
  imageSrc: string
  imageAlt: string
  primaryButtonText: string
  secondaryButtonText?: string
  stats?: {
    icon: React.ReactNode
    label: string
    value: string
  }
  trustIndicators?: Array<{
    icon: React.ReactNode
    text: string
  }>
}

export function HeroSection({
  title,
  titleHighlight,
  description,
  imageSrc,
  imageAlt,
  primaryButtonText,
  secondaryButtonText,
  stats,
  trustIndicators
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 py-20">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInUp} className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {titleHighlight ? (
                <>
                  {title.split(titleHighlight)[0]}
                  <span className="text-blue-200">{titleHighlight}</span>
                  {title.split(titleHighlight)[1]}
                </>
              ) : (
                title
              )}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-blue-800 hover:bg-blue-50">
                {primaryButtonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {secondaryButtonText && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {secondaryButtonText}
                </Button>
              )}
            </div>
            
            {trustIndicators && (
              <div className="mt-12 flex items-center gap-8">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {indicator.icon}
                    <span className="text-sm text-blue-100">{indicator.text}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="relative hidden lg:block"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
            />
            {stats && (
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {stats.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stats.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stats.value}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}