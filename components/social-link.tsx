'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface SocialLinkProps {
  icon: LucideIcon
  href: string
  label: string
  color: string
}

export function SocialLink ({
  icon: Icon,
  href,
  label,
  color
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      className={`bg-gray-800/50 p-2.5 rounded-lg ${color} transition-all duration-300 backdrop-blur-sm`}
      aria-label={label}
    >
      <Icon className='w-5 h-5 text-white' />
    </motion.a>
  )
}
