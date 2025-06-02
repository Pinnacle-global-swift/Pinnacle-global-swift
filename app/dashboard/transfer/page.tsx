'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  accountNumber: z
    .string()
    .min(1, 'Account number is required')
    .regex(/^\d+$/, 'Account number must contain only numbers')
    .min(10, 'Account number must be at least 10 digits')
    .max(16, 'Account number must not exceed 16 digits'),
  beneficiaryName: z
    .string()
    .min(3, 'Beneficiary name must be at least 3 characters')
    .max(50, 'Beneficiary name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Beneficiary name must contain only letters and spaces'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)), {
      message: 'Amount must be a valid number',
    })
    .refine((val) => parseFloat(val) >= 10, {
      message: 'Minimum transfer amount is $10',
    })
    .refine((val) => parseFloat(val) <= 50000, {
      message: 'Maximum transfer amount is $50,000',
    }),
  transferType: z.enum(['internal', 'external', 'international'], {
    required_error: 'Please select a transfer type',
  }),
  description: z
    .string()
    .max(100, 'Description must not exceed 100 characters')
    .optional()
})

export default function TransferPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidatingAccount, setIsValidatingAccount] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: '',
      beneficiaryName: '',
      amount: '',
      transferType: undefined,
      description: ''
    }
  })

  const validateAccountNumber = async (accountNumber: string) => {
    if (accountNumber.length < 10) return
    
    setIsValidatingAccount(true)
    try {
      // Simulate API call to validate account
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Add your actual account validation API call here
      
      // For demo purposes, let's assume account numbers starting with '1' are invalid
      if (accountNumber.startsWith('1')) {
        form.setError('accountNumber', {
          type: 'manual',
          message: 'Invalid account number'
        })
      }
    } catch (error) {
      form.setError('accountNumber', {
        type: 'manual',
        message: 'Error validating account'
      })
    } finally {
      setIsValidatingAccount(false)
    }
  }

  async function onSubmit (values: z.infer<typeof formSchema>) {
    const amount = parseFloat(values.amount)
    if (amount > 10000 && values.transferType === 'internal') {
      return toast({
        type: "error",
        title: 'Validation Error',
        description: 'Internal transfers cannot exceed $10,000'
      })
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await api.transfer({
        accountNumber: values.accountNumber,
        beneficiaryName: values.beneficiaryName,
        amount: parseFloat(values.amount),
        // bankName: values.bankName,
        // withdrawalMethod: values.withdrawalMethod,

        description: values.description
      })

      toast({
        title: 'Transfer Successful',
        description: `$${values.amount} has been transferred to ${values.beneficiaryName}`,
                type: 'success'
      })
      form.reset()
    } catch (error: any) {
      toast({
        type:"error",
        title: 'Transfer Failed',
        // description: error?.response?.data?.errors?.msg
        description: 'Please contact own customer service'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='container max-w-xl mx-auto py-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='border-0 shadow-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg rounded-2xl border border-white/10'>
          <CardHeader className='border-b border-white/20 pb-7'>
            <CardTitle className='text-3xl font-bold text-white flex items-center gap-3'>
              <ArrowUpRight className='w-7 h-7 text-blue-400' />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transfer Money
              </span>
            </CardTitle>
            <CardDescription className='text-gray-300/90'>
              Send money to other bank accounts securely
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-8'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='accountNumber'
                    render={({ field }) => (
                      <FormItem className='space-y-4'>
                        <FormLabel className='text-gray-100 font-medium'>
                          Account Number
                        </FormLabel>
                        <FormControl>
                          <div className='relative group'>
                            <Search className={cn(
                              'absolute left-3 top-3 h-5 w-5',
                              isValidatingAccount ? 'animate-spin text-blue-400' : 'text-gray-400',
                              'group-focus-within:text-blue-400 transition-colors'
                            )} />
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                validateAccountNumber(e.target.value)
                              }}
                              placeholder='Enter account number'
                              className={cn(
                                'pl-11 bg-gray-950/50 border-white/20 text-gray-100',
                                'rounded-xl h-12 focus:ring-2 focus:ring-blue-400 focus:border-transparent',
                                'transition-all duration-300 hover:border-white/40'
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className='text-red-300' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='beneficiaryName'
                    render={({ field }) => (
                      <FormItem className='space-y-4'>
                        <FormLabel className='text-gray-100 font-medium'>
                          Beneficiary Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter beneficiary name'
                            className={cn(
                              'bg-gray-950/50 border-white/20 text-gray-100',
                              'rounded-xl h-12 focus:ring-2 focus:ring-blue-400 focus:border-transparent',
                              'transition-all duration-300 hover:border-white/40'
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='text-red-300' />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='transferType'
                  render={({ field }) => (
                    <FormItem className='space-y-4'>
                      <FormLabel className='text-gray-100 font-medium'>
                        Transfer Type
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='bg-gray-950/50 border-white/20 text-gray-100 rounded-xl h-12 px-4'>
                            <SelectValue placeholder='Select transfer type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-900 border-white/20 backdrop-blur-lg rounded-xl'>
                          <SelectItem 
                            value='internal'
                            className='focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg'
                          >
                            Internal Transfer
                          </SelectItem>
                          <SelectItem 
                            value='external'
                            className='focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg'
                          >
                            External Transfer
                          </SelectItem>
                          <SelectItem 
                            value='international'
                            className='focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg'
                          >
                            International Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className='text-red-300' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem className='space-y-4'>
                      <FormLabel className='text-gray-100 font-medium'>Amount</FormLabel>
                      <FormControl>
                        <div className='relative group'>
                          <span className='absolute left-3 top-3.5 text-gray-400 text-lg'>$</span>
                          <Input
                            type='number'
                            placeholder='0.00'
                            className={cn(
                              'pl-10 bg-gray-950/50 border-white/20 text-gray-100',
                              'rounded-xl h-12 text-lg font-medium focus:ring-2 focus:ring-blue-400',
                              'focus:border-transparent transition-all duration-300 hover:border-white/40'
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-300' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Description (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter transfer description'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className={cn(
                    'w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500',
                    'text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.01]',
                    'shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95'
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Transfer Money'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='border-t border-white/20 mt-8 py-6'>
            <div className='w-full'>
              <h4 className='text-lg font-semibold text-gray-100 mb-3'>
                Recent Transfers
              </h4>
              <div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm'>
                <p className='text-gray-400/90 text-sm'>No recent transfers</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
