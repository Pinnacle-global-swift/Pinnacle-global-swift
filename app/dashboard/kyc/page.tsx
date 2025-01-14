'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Upload, CheckCircle2, AlertTriangle } from 'lucide-react'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { countries } from 'countries-list'

const formSchema = z.object({
  fullLegalName: z.string().min(1, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  idType: z.string().min(1, 'ID type is required'),
  idNumber: z.string().min(1, 'ID number is required'),
  residentialAddress: z.string().min(1, 'Address is required'),
  idFrontImage: z.string().min(1, 'Address is required'),
  idBackImage: z.string().min(1, 'Address is required')
})

export default function KYCPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [kycstatus, setKyc] = useState<any>('')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullLegalName: '',
      dateOfBirth: '',
      nationality: '',
      idType: '',
      idNumber: '',
      residentialAddress: '',
      idFrontImage: 'base64...',
      idBackImage: 'base64...'
    }
  })

  // statuskyc

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.statuskyc()
        setKyc(data?.data)
        console.log(data?.data)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchAccountInfo()
  }, [])

  async function onSubmit (values: z.infer<typeof formSchema>) {
    if (!frontImage || !backImage) {
      toast({
        // variant: "destructive",
        title: 'Missing Documents',
        description: 'Please upload both front and back images of your ID'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await api.submitkyc(values)
      console.log(response, values)
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: 'KYC Submitted Successfully',
        description: 'We will review your documents and update you soon.'
      })
      form.reset()
      setFrontImage(null)
      setBackImage(null)
    } catch (error) {
      toast({
        // variant: "destructive",
        title: 'Submission Failed',
        description: 'Please try again later'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  console.log(kycstatus?.status)

  return (
    <div className='container max-w-xl mx-auto py-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800'>
          <CardHeader className='border-b border-gray-700 pb-7'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-green-500/10 rounded-lg'>
                <Shield className='w-6 h-6 text-green-500' />
              </div>
              <div>
                <CardTitle className='text-2xl text-white'>
                  KYC Verification
                </CardTitle>
                <CardDescription className='text-gray-400'>
                  {kycstatus?.status == 'processing'
                    ? 'Processing, please contact customer service if not successful'
                    : 'Complete your identity verification'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='mb-6 p-4 bg-yellow-500/10 rounded-lg flex items-center gap-3'>
              <AlertTriangle className='w-5 h-5 text-yellow-500' />
              <p className='text-sm text-yellow-200'>
                Please ensure all information provided matches your official
                documents
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='fullLegalName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Full Legal Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your full name'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='nationality'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Nationality
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Select your nationality' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-800 border-gray-700'>
                          <ScrollArea className='h-[200px]'>
                            {Object.entries(countries).map(
                              ([code, country]) => (
                                <SelectItem key={code} value={code}>
                                  {country.name}
                                </SelectItem>
                              )
                            )}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='idType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>ID Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Select ID type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-800 border-gray-700'>
                          <SelectItem value='passport'>Passport</SelectItem>
                          <SelectItem value='driving_license'>
                            Driving License
                          </SelectItem>
                          <SelectItem value='national_id'>
                            National ID
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='idNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>ID Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter ID number'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='residentialAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Residential Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your address'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      ID Front Image
                    </label>
                    <div className='flex items-center justify-center w-full'>
                      <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700'>
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <Upload className='w-8 h-8 mb-3 text-gray-400' />
                          <p className='mb-2 text-sm text-gray-400'>
                            <span className='font-semibold'>
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                        </div>
                        <input
                          type='file'
                          className='hidden'
                          accept='image/*'
                          onChange={e =>
                            setFrontImage(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                    {frontImage && (
                      <p className='mt-2 text-sm text-green-400 flex items-center gap-1'>
                        <CheckCircle2 className='w-4 h-4' />
                        {frontImage.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      ID Back Image
                    </label>
                    <div className='flex items-center justify-center w-full'>
                      <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700'>
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <Upload className='w-8 h-8 mb-3 text-gray-400' />
                          <p className='mb-2 text-sm text-gray-400'>
                            <span className='font-semibold'>
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                        </div>
                        <input
                          type='file'
                          className='hidden'
                          accept='image/*'
                          onChange={e =>
                            setBackImage(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                    {backImage && (
                      <p className='mt-2 text-sm text-green-400 flex items-center gap-1'>
                        <CheckCircle2 className='w-4 h-4' />
                        {backImage.name}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-green-600 hover:bg-green-700 text-white'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Verification'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='border-t border-gray-700 mt-6 flex flex-col items-start pt-6'>
            <h4 className='text-sm font-medium text-gray-200 mb-2'>
              Verification Process
            </h4>
            <p className='text-sm text-gray-400'>
              Your documents will be reviewed within 24-48 hours. You will be
              notified via email once the verification is complete.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
