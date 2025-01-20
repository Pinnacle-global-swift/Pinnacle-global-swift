'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, usePresence } from 'framer-motion'
import {
  Shield,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Check,
  Loader2,
  XCircle
} from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import ConfettiExplosion from 'react-confetti-explosion'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

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
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPresent, safeToRemove] = usePresence()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
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
        // Show confetti if KYC is approved after fetching status
        if (data?.data?.status === 'approved') {
          setShowConfetti(true)
        }
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
        type: 'error',
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
        description: 'We will review your documents and update you soon.',
        type: 'success'
      })
      setShowSuccessModal(true)
      setShowConfetti(true)
      form.reset()
      setFrontImage(null)
      setBackImage(null)
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please try again later',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // if (kycstatus?.status === 'approved') {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[500px]">
  //       <div className="bg-green-100 rounded-full p-4">
  //         <CheckCircle2 className="w-16 h-16 text-green-600" />
  //       </div>
  //       <h2 className="text-3xl font-bold mt-4 text-green-700">KYC Approved</h2>
  //       <p className="text-gray-600 mt-2">Your account is fully verified.</p>
  //       {/* <Image
  //         src="https://images.unsplash.com/photo-1634034379077-55550e512103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZWNrJTIwbWFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  //         alt="KYC Approved"
  //         width={200}
  //         height={200}
  //         className="mt-8"
  //       /> */}
  //     </div>
  //   )
  // }

  if (kycstatus.status === 'approved') {
    return (
      <div className='flex flex-col items-center justify-center min-h-[500px]'>
        {/* {showConfetti && <ConfettiExplosion />} */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className='bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4'
        >
          <Check className='w-16 h-16 text-white' />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-3xl font-bold mt-4 text-green-700'
        >
          KYC Approved
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='text-gray-600 mt-2'
        >
          Your account is fully verified.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* <Image
            src='https://images.unsplash.com/photo-1634034379077-55550e512103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZWNrJTIwbWFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            alt='KYC Approved'
            width={200}
            height={200}
            className='mt-8'
          /> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='mt-8 text-center text-gray-600'
        >
          You can now enjoy all the features of Pinnacle Global Swift. Start
          exploring!
        </motion.div>
      </div>
    )
  }

  if (kycstatus?.status === 'rejected') {
    return (
      <div className='flex flex-col items-center justify-center min-h-[500px]'>
        <div className='bg-red-100 rounded-full p-4'>
          <XCircle className='w-16 h-16 text-red-600' />
        </div>
        <h2 className='text-3xl font-bold mt-4 text-red-700'>KYC Rejected</h2>
        <p className='text-gray-600 mt-2'>
          Your KYC application has been rejected. Please contact support for
          more information.
        </p>
      </div>
    )
  }

  if (kycstatus?.status === 'processing') {
    return (
      <div className='flex flex-col items-center justify-center min-h-[500px]'>
        <div className='bg-yellow-100 rounded-full p-4'>
          <Loader2 className='w-16 h-16 text-yellow-600 animate-spin' />
        </div>
        <h2 className='text-3xl font-bold mt-4 text-yellow-700'>KYC Pending</h2>
        <p className='text-gray-600 mt-2'>
          Your application is currently under review.
        </p>
      </div>
    )
  }

  return (
    <div className='container max-w-xl mx-auto py-10'>
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className='bg-white text-gray-900 rounded-lg shadow-lg p-8'>
          <div className='flex flex-col items-center justify-center'>
            {/* {showConfetti && <ConfettiExplosion />} */}
            <div className='bg-green-100 rounded-full p-4 mb-4'>
              <CheckCircle2 className='w-16 h-16 text-green-600' />
            </div>
            <DialogTitle className='text-3xl font-bold text-green-700 mb-4'>
              KYC Sent Successfully
            </DialogTitle>
            <DialogDescription className='text-gray-600 mb-8'>
              Your account is fully verified. You can now enjoy all the features
              of Pinnacle Global Bank.
            </DialogDescription>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className='bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg'
            >
              Start Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      

      {/* Rejection Modal */}
      <Dialog open={showRejectionModal} onOpenChange={setShowRejectionModal}>
        <DialogContent className='bg-white text-gray-900 rounded-lg shadow-lg p-8'>
          <div className='flex flex-col items-center justify-center'>
            <div className='bg-red-100 rounded-full p-4 mb-4'>
              <XCircle className='w-16 h-16 text-red-600' />
            </div>
            <DialogTitle className='text-3xl font-bold text-red-700 mb-4'>
              KYC Rejected
            </DialogTitle>
            <DialogDescription className='text-gray-600 mb-8'>
              Your KYC application has been rejected. Please contact support for
              more information.
            </DialogDescription>
            <Button
              onClick={() => setShowRejectionModal(false)}
              className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg'
            >
              Contact Support
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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

                <CardDescription className='text-blue-500'>
                  {kycstatus?.status == 'processing' &&
                    'Processing, please contact customer service if not successful'}
                </CardDescription>
                <CardDescription className='text-green-500'>
                  {kycstatus?.status == 'approved' && 'KYC APPROVED'}
                </CardDescription>
                <CardDescription className='text-gray-400'>
                  {kycstatus?.status !== 'processing' &&
                    kycstatus?.status !== 'approved' &&
                    'Complete your identity verification'}
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
