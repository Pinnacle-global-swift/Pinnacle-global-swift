'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  User,
  Mail,
  Lock,
  MapPin,
  Phone
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z
  .object({
    accountType: z.string({
      required_error: 'Please select an account type'
    }),
    fullName: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    gender: z.string({
      required_error: 'Please select your gender'
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.'
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    }),
    confirmPassword: z.string(),
    country: z.string({
      required_error: 'Please select your country'
    }),
    address: z.string().min(5, {
      message: 'Please enter your full address.'
    }),
    phoneNumber: z.string().min(10, {
      message: 'Please enter a valid phone number.'
    }),
    privacyPolicy: z.boolean().refine(value => value === true, {
      message: 'You must agree to the privacy policy'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export default function Register () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacyPolicy: false
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      console.log(values)
    const result =   await api.register(values)
    console.log(result)
      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered. Please log in.',
        duration: 5000
      })
      router.push('/login')
    } catch (error:any) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description:
          error.message || 'An unexpected error occurred. Please try again.',
        duration: 5000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full mx-auto space-y-8'>
        <div>
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
              className='h-12 w-auto'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Welcome To Swift-Blink
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Please sign up to continue
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='bg-white p-8 rounded-lg shadow-md'
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='accountType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select account type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='personal'>
                          Personal Account
                        </SelectItem>
                        <SelectItem value='business'>
                          Business Account
                        </SelectItem>
                        <SelectItem value='corporate'>
                          Corporate Account
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10'
                          placeholder='Enter your full name'
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
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          className='pl-10'
                          type='email'
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
                          className='pl-10'
                          type='password'
                          placeholder='Enter your password'
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
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10'
                          type='password'
                          placeholder='Confirm your password'
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
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='us'>United States</SelectItem>
                        <SelectItem value='uk'>United Kingdom</SelectItem>
                        <SelectItem value='ca'>Canada</SelectItem>
                        <SelectItem value='au'>Australia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <MapPin className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10'
                          placeholder='Enter your address'
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
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10'
                          placeholder='Enter your phone number'
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
                name='privacyPolicy'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>
                        I agree with{' '}
                        <Link
                          href='/privacy-policy'
                          className='text-primary hover:underline'
                        >
                          privacy policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-green-500 hover:bg-green-600'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  )
}
