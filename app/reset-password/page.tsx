'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Key } from 'lucide-react'
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await api.resetPassword(values.password)
      toast({
        title: 'Password Reset Successful',
        description:
          'Your password has been reset. Please log in with your new password.',
        duration: 5000,
          type:"success"
      })
      localStorage.removeItem('resetToken')
      router.push('/login')
    } catch (error: any) {
      console.error(error)
      toast({
       type:"error",
        title: 'Password Reset Failed',
        description:
          error?.response?.data?.error ||
          'An unexpected error occurred. Please try again.',
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
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/first-project-a5bbf.appspot.com/o/imagebuilding.jpg?alt=media&token=cdceeabf-1e6e-4c5d-8143-56e9d1917612?auto=format&fit=crop&q=80&w=2070'
          alt='Background'
          layout='fill'
          objectFit='cover'
          quality={100}
        />
        <div className='absolute inset-0 bg-gray-900 opacity-75'></div>
      </div>

      <div className='sm:mx-auto sm:w-full sm:max-w-md z-10'>
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/pgbw.png?height=200&width=200'
            alt='Swift-Blink Logo'
            width={200}
            height={50}
            className='h-12 w-auto'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-6 text-center'
        >
          <h2 className='text-3xl font-extrabold text-white'>
            Reset Your Password
          </h2>
          <p className='mt-2 text-sm text-purple-200'>
            Enter your new password below
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10'
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
                          className='pl-10 pr-10 bg-gray-50'
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
                          className='pl-10 pr-10 bg-gray-50'
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
                className='w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Resetting Password...
                  </div>
                ) : (
                  <>
                    Reset Password
                    <Key className='ml-2 h-5 w-5' />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mt-6 flex justify-center space-x-4'
        >
          <Link
            href='/privacy'
            className='text-sm text-purple-200 hover:text-white'
          >
            Privacy Notice
          </Link>
          <span className='text-purple-200'>•</span>
          <Link
            href='/terms'
            className='text-sm text-purple-200 hover:text-white'
          >
            Terms of service
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
