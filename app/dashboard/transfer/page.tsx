'use client'

import { useState, useCallback } from 'react'
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

export default function TransferPage() {
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

  const validateAccountNumber = useCallback(async (accountNumber: string) => {
    if (accountNumber.length < 10) return

    setIsValidatingAccount(true)
    try {
      // Simulate API call to validate account
      await new Promise(resolve => setTimeout(resolve, 1000))

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
  }, [form])

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
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
      await api.transfer({
        accountNumber: values.accountNumber,
        beneficiaryName: values.beneficiaryName,
        amount: parseFloat(values.amount),
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
        type: "error",
        title: 'Transfer Failed',
        description: 'Please contact our customer service'
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [form, toast])

  return (
    <div className='min-h-full bg-[#f8fafc] dark:bg-[#0f172a] p-4 lg:p-8'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className='border-none shadow-2xl bg-white dark:bg-slate-800 overflow-hidden'>
          <CardHeader className='bg-[#1e293b] text-white p-8 relative overflow-hidden'>
            <div className="absolute inset-0 opacity-10 bg-[url(\'https://www.transparenttextures.com/patterns/carbon-fibre.png\')]" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                <ArrowUpRight className='w-8 h-8 text-blue-400' />
              </div>
              <div>
                <CardTitle className='text-2xl font-bold tracking-tight'>
                  Transfer Funds
                </CardTitle>
                <CardDescription className='text-slate-400 mt-1 font-medium'>
                  Securely send money between accounts
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-8'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='accountNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>
                          Recipient Account
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Search className={cn(
                              'absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors',
                              isValidatingAccount ? 'animate-spin text-blue-500' : 'text-slate-400'
                            )} />
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                validateAccountNumber(e.target.value)
                              }}
                              placeholder='Account Number'
                              className='pl-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-mono tracking-wider'
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='beneficiaryName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>
                          Beneficiary Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Full legal name'
                            className='bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='transferType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>
                          Method
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all'>
                              <SelectValue placeholder='Select type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-slate-800 border-slate-700">
                            <SelectItem value='internal'>Internal Transfer</SelectItem>
                            <SelectItem value='external'>External Transfer</SelectItem>
                            <SelectItem value='international'>International/Wire</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>Amount</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold'>$</span>
                            <Input
                              type='number'
                              placeholder='0.00'
                              className='pl-8 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 text-lg font-bold rounded-xl focus:ring-2 focus:ring-blue-500 transition-all'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>
                        Reference (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='E.g. Invoice payment'
                          className='bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 mt-4'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Verifying Transaction...' : 'Confirm Transfer'}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className='bg-slate-50 dark:bg-slate-900/50 p-6 flex flex-col items-start gap-4'>
            <div className='w-full'>
              <h4 className='text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4'>
                Recent Beneficiaries
              </h4>
              <div className='p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center'>
                <p className='text-slate-400 text-sm italic'>Information will appear after your first transfer</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
