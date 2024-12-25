'use client'

import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary'
}

export  function LoadingSpinner({ 
  className,
  size = 'md',
  variant = 'default'
}: LoadingSpinnerProps) {
  // Define size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  // Define variant classes
  const variantClasses = {
    default: 'text-primary',
    primary: 'text-white'
  }

  // Animation variants for the dots
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const dotVariants = {
    initial: {
      y: "0%"
    },
    animate: {
      y: ["0%", "-100%", "0%"],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[100px]" role="status">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            variants={dotVariants}
            className={cn(
              "block rounded-full",
              sizeClasses[size],
              i === 0 && "bg-blue-500",
              i === 1 && "bg-green-500",
              i === 2 && "bg-purple-500",
              "opacity-70",
              className
            )}
            style={{
              scale: (3 - i) * 0.25
            }}
          />
        ))}
      </motion.div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Alternative spinner styles that can be exported from the same file
export function CircularSpinner({ 
  className,
  size = 'md',
  variant = 'default'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[100px]" role="status">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={cn(
          "rounded-full border-t-transparent",
          sizeClasses[size],
          variant === 'default' ? 'border-primary' : 'border-white',
          className
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Pulse loader
export function PulseLoader({
  className,
  size = 'md',
  variant = 'default'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const pulseVariants = {
    initial: {
      scale: 1,
      opacity: 1
    },
    animate: {
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[100px]" role="status">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: i * 0.2
            }}
            className={cn(
              "rounded-full",
              sizeClasses[size],
              variant === 'default' ? 'bg-primary' : 'bg-white',
              className
            )}
          />
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Progress bar loader
export function ProgressLoader({
  className,
  variant = 'default'
}: Omit<LoadingSpinnerProps, 'size'>) {
  return (
    <div className="w-full max-w-md mx-auto" role="status">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "h-1 rounded-full",
          variant === 'default' ? 'bg-primary' : 'bg-white',
          className
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

