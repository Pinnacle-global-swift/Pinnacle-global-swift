'use client'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Key,
  ArrowLeft,
  Loader2
} from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  password: z.string().min(1, {
    message: 'Password is required.'
  }),
  rememberMe: z.boolean().optional()
})

export default function Login () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '', // Provide default values
      password: '', // Provide default values
      rememberMe: false
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const data = await api.login(values.email, values.password)

      // Set expiry time to 30 minutes from now
      const expiryTime = new Date(Date.now() + 30 * 60 * 1000)

      // Set cookies with secure attributes
      document.cookie = `token=${
        data.token
      }; path=/; expires=${expiryTime.toUTCString()}; SameSite=Strict`
      document.cookie = `expiry=${expiryTime.toISOString()}; path=/; expires=${expiryTime.toUTCString()}; SameSite=Strict`

      // Set localStorage with same expiry
      localStorage.setItem('token', data.token)
      localStorage.setItem('expires_at', expiryTime.toISOString())

      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
        type: 'success'
      })

      // Show redirect animation
      setIsRedirecting(true)

      // Delay redirect slightly to show animation
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description:
          error?.response?.data?.error ||
          'An unexpected error occurred. Please try again.',
        duration: 5000,
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {/* Redirect Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4'
            >
              <Loader2 className='w-8 h-8 text-primary animate-spin' />
              <p className='text-lg font-medium'>Redirecting to dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Login Form */}
      <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative'>
        <Link
          href='/'
          className='absolute top-4 left-4 p-2 flex items-center gap-2 text-white hover:text-gray-200 transition-colors z-20'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='hidden sm:inline'>Back to Home</span>
        </Link>

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
              src='/pgbw.png?height=100&width=400'
              alt='Swift-Blink Logo'
              width={400}
              height={100}
              className='h-12 w-auto'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
              Welcome Back
            </h2>
            <p className='mt-2 text-center text-sm text-white'>
              Please sign in to continue
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-10 bg-blue-50'
                            placeholder='Enter your email'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-10 pr-10 bg-blue-50'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
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

                <div className='flex items-center justify-end'>
                  <div className='text-sm'>
                    <Link
                      href='/forgot-password'
                      className='font-medium text-primary hover:text-primary/80'
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>

                <div className='mt-6 text-center text-sm'>
                  <span className='text-gray-600'>Don't have an account? </span>
                  <Link
                    href='/register'
                    className='font-medium text-primary hover:text-primary/80'
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </Form>
          </div>
          <div className='mt-6 flex justify-center space-x-4'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'
            >
              <Shield className='w-6 h-6 text-white' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'
            >
              <Lock className='w-6 h-6 text-white' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center'
            >
              <Key className='w-6 h-6 text-white' />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

