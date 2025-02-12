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
import { cn } from '@/lib/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTranslation } from 'react-i18next'

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
  const [animationParent] = useAutoAnimate()
  const { t } = useTranslation()

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

  if (kycstatus.status === 'approved') {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[500px] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <Check className="w-20 h-20 text-white" />
        </motion.div>
        <motion.h2
          className="mt-8 text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {t('kyc.approvedTitle')}
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-300 text-center max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('kyc.approvedDescription')}
        </motion.p>
      </motion.div>
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
    <div className="container max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <motion.div
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CardHeader className="border-b border-white/20 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
              <Shield className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('kyc.title')}
              </CardTitle>
              <CardDescription className="text-gray-300/90">
                {t('kyc.description')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              ref={animationParent}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullLegalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100">
                        {t('kyc.fullName')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            'bg-gray-950/50 border-white/20 text-gray-100',
                            'rounded-xl h-12 focus:ring-2 focus:ring-blue-400',
                            'transition-all duration-300 hover:border-white/40'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100'>
                        {t('kyc.dateOfBirth')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          className={cn(
                            'bg-gray-950/50 border-white/20 text-gray-100',
                            'rounded-xl h-12 focus:ring-2 focus:ring-blue-400',
                            'transition-all duration-300 hover:border-white/40'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='nationality'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100'>
                        {t('kyc.nationality')}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={cn(
                            'bg-gray-950/50 border-white/20 text-gray-100',
                            'rounded-xl h-12 focus:ring-2 focus:ring-blue-400',
                            'transition-all duration-300 hover:border-white/40'
                          )}>
                            <SelectValue placeholder={t('kyc.selectNationality')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={cn(
                          'bg-gray-950/50 border-white/20 text-gray-100',
                          'rounded-xl'
                        )}>
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
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='idType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100'>
                        {t('kyc.idType')}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={cn(
                            'bg-gray-950/50 border-white/20 text-gray-100',
                            'rounded-xl h-12 focus:ring-2 focus:ring-blue-400',
                            'transition-all duration-300 hover:border-white/40'
                          )}>
                            <SelectValue placeholder={t('kyc.selectIdType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className={cn(
                          'bg-gray-950/50 border-white/20 text-gray-100',
                          'rounded-xl'
                        )}>
                          <SelectItem value='passport'>Passport</SelectItem>
                          <SelectItem value='driving_license'>
                            Driving License
                          </SelectItem>
                          <SelectItem value='national_id'>
                            National ID
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='idNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100'>
                        {t('kyc.idNumber')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            'bg-gray-950/50 border-white/20 text-gray-100',
                            'rounded-xl h-12 focus:ring-2 focus:ring-blue-400',
                            'transition-all duration-300 hover:border-white/40'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='residentialAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100'>
                        {t('kyc.residentialAddress')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            'bg-gray-950/50 border-white/20 text-gray-100',
                            'rounded-xl h-12 focus:ring-2 focus:ring-blue-400',
                            'transition-all duration-300 hover:border-white/40'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-gray-100 font-medium">
                    {t('kyc.idFront')}
                  </label>
                  <div className="group relative">
                    <div className={cn(
                      'border-2 border-dashed border-white/20 rounded-xl p-8',
                      'bg-gray-950/50 transition-all duration-300',
                      'hover:border-blue-400/50 hover:bg-gray-900/50'
                    )}>
                      <div className="flex flex-col items-center justify-center gap-4">
                        <Upload className="w-10 h-10 text-blue-400" />
                        <p className="text-center text-gray-400">
                          {t('kyc.uploadHint')}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={e => setFrontImage(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-gray-100 font-medium">
                    {t('kyc.idBack')}
                  </label>
                  <div className="group relative">
                    <div className={cn(
                      'border-2 border-dashed border-white/20 rounded-xl p-8',
                      'bg-gray-950/50 transition-all duration-300',
                      'hover:border-blue-400/50 hover:bg-gray-900/50'
                    )}>
                      <div className="flex flex-col items-center justify-center gap-4">
                        <Upload className="w-10 h-10 text-blue-400" />
                        <p className="text-center text-gray-400">
                          {t('kyc.uploadHint')}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={e => setBackImage(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className={cn(
                  'w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600',
                  'text-white text-lg font-semibold rounded-xl',
                  'transition-all duration-300 transform hover:scale-[1.01]',
                  'shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t('kyc.submit')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="border-t border-white/20 p-8">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-100">
              {t('kyc.processTitle')}
            </h4>
            <p className="text-gray-400/90 leading-relaxed">
              {t('kyc.processDescription')}
            </p>
          </div>
        </CardFooter>
      </motion.div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-gray-900 border-white/20 rounded-2xl backdrop-blur-lg">
          <motion.div
            className="flex flex-col items-center p-8"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <div className="bg-green-500/20 p-6 rounded-2xl mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
            </div>
            <DialogTitle className="text-3xl font-bold text-green-400 mb-4">
              {t('kyc.successTitle')}
            </DialogTitle>
            <Button
              className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-400/30"
              onClick={() => setShowSuccessModal(false)}
            >
              {t('kyc.continue')}
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
