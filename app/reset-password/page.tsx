'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export default function ResetPassword () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const resetToken = 'dummy-token' // Replace this with actual token retrieval logic
      await api.resetPassword(resetToken, values.password)
      toast({
        title: 'Password Reset Successful',
        description:
          'Your password has been reset. Please log in with your new password.',
        duration: 5000
      })
      router.push('/login')
    } catch (error:any) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Password Reset Failed',
        description:
          error.message || 'An unexpected error occurred. Please try again.',
        duration: 5000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/placeholder.svg?height=50&width=200'
            alt='Swift-Blink Logo'
            width={200}
            height={50}
            // classNameclassName='h-12 w-auto'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-6 text-center'
        >
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Reset Your Password
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Enter your new password below
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
      >
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10 pr-10 bg-blue-50'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your new password'
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={togglePasswordVisibility}
                          className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10 pr-10 bg-blue-50'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Confirm your new password'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-emerald-500 hover:bg-emerald-600'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </Form>
        </div>

        <div className='mt-6 flex justify-center space-x-4 text-sm text-gray-600'>
          <Link href='/privacy' className='hover:text-gray-900'>
            Privacy Notice
          </Link>
          <span>•</span>
          <Link href='/terms' className='hover:text-gray-900'>
            Terms of service
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
