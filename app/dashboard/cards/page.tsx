'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, CheckCircle2, ArrowRight, Lock, PinIcon as Chip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { CardPaymentDialog } from '@/components/card-payment-dialog'
import { PinEntryDialog } from '@/components/pin-entry-dialog'
import { api } from '@/lib/api'

const cardTypes = [
  {
    name: 'Pinancle Global Bank Master Credit Card',
    description: 'Exclusive rewards and premium benefits',
    limit: 'Up to $50,000',
    fee: '$99 annual fee',
    color: 'from-emerald-600 to-teal-700',
    gradientText: 'text-emerald-50'
  }
]

const requirements = [
  'Valid government-issued ID',
  'Proof of address (utility bill, lease agreement)',
  'Minimum account balance of $100',
  'Active account for at least 3 working days'
]

export default function Cards() {
  const [step, setStep] = useState<'intro' | 'requirements' | 'options' | 'payment' | 'loading' | 'success'>('intro')
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showPinEntry, setShowPinEntry] = useState(false)
  const [isPinActivation, setIsPinActivation] = useState(false)
  const [cardStatus, setCardStatus] = useState<any>(null)

  const handleActivate = async () => {
    setIsPinActivation(false)
    setShowPinEntry(true)
  }

  const handleActivatePin = async () => {
    setIsPinActivation(true)
    setShowPinEntry(true)
  }

  const handlePinSubmit = async (pin: string) => {
    setShowPinEntry(false)
    setIsLoading(true)
    try {
      if (isPinActivation) {
        // Handle PIN activation
        const data = await api.activatePin({ pin })
        console.log(data)
        setCardStatus({ ...cardStatus, cardDetails: { ...cardStatus.cardDetails, hasPIN: true } })
      } else {
        // Handle card activation
        const value = { pin: pin }
        const data = await api.activateCard(value)
        console.log(data)
        setCardStatus({ ...cardStatus, cardDetails: { ...cardStatus.cardDetails, status: 'active' } })
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = async () => {
    setShowPayment(true)
  }

  const handlePaymentComplete = async () => {
    setShowPayment(false)
    setIsLoading(true)
    const value = { type: 'mastercard' }
    const data = await api.applyCard(value)
    console.log(data)
    setStep('success')
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.cardStatus()
        setCardStatus(data?.data)
        console.log(data?.data)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchAccountInfo()
  }, [])

  console.log(cardStatus)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      <div className='space-y-8 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-slate-800'>Card Services</h1>

        <AnimatePresence mode='wait'>
          {cardStatus?.hasCard &&  cardStatus?.cardDetails?.status == "approved"  ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='grid gap-6 md:grid-cols-2'
            >
              <PinEntryDialog
                open={showPinEntry}
                onOpenChange={setShowPinEntry}
                onSubmit={handlePinSubmit}
              />
              {cardTypes.map((card, index) => (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className='h-full border-0 shadow-lg bg-white/80 backdrop-blur'>
                    <CardHeader className="p-0">
                      <div className="w-full p-6 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700">
                        <div className="flex flex-col h-52">
                          {/* Bank Info & Logo */}
                          <div className="flex justify-between items-start mb-6">
                            <h3 className="text-white/90 text-lg font-medium">Pinancle Global Bank</h3>
                            <div className="flex items-center gap-2">
                              <div className="text-white/90">Mastercard</div>
                              <CreditCard className="w-8 h-8 text-white" />
                            </div>
                          </div>

                          {/* Chip & Status */}
                          <div className="flex items-center gap-3 mb-6">
                            <Chip className="w-12 h-9 text-yellow-300/90 rounded-md" /> {/* Chip */}
                            <span className="text-white/80 text-sm px-2 py-1 bg-white/20 rounded-full">
                              {cardStatus?.cardDetails?.status === 'active' ? 'Active' : 'Pending'}
                            </span>
                          </div>

                          {/* Card Number */}
                          <div className="mb-6">
                            <div className="text-lg text-white font-mono tracking-wider">
                              {cardStatus?.cardDetails?.maskedCardNumber.split('-').map((group:any, index:any) => (
                                <span key={index} className="mr-4">{group}</span>
                              ))}
                            </div>
                          </div>

                          {/* Card Details */}
                          <div className="flex justify-between items-end mt-auto">
                            <div className="space-y-1">
                              <div className="text-white/60 text-xs">VALID THRU</div>
                              <div className="text-white font-medium">
                                {cardStatus?.cardDetails?.expiryMonth}/{cardStatus?.cardDetails?.expiryYear}
                              </div>
                            </div>

                            <div className="space-y-1 text-right">
                              <div className="text-white/60 text-xs">CREDIT LIMIT</div>
                              <div className="text-white font-medium">
                                ${cardStatus?.cardDetails?.limit.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4 p-6'>
                      <h3 className='font-semibold text-lg text-slate-800'>{card.name}</h3>
                      <p className='text-sm text-slate-600'>{card.description}</p>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-slate-500'>Fee:</span>
                          <span className='text-slate-700'>{card.fee}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-slate-500'>PIN:</span>
                          <span className='text-slate-700'>{cardStatus?.cardDetails?.hasPIN ? 'Set' : 'Not Set'}</span>
                        </div>
                      </div>
                    </CardContent>
                    {cardStatus?.cardDetails?.status === 'active' && cardStatus?.cardDetails?.hasPIN && (
                      <CardContent className='space-y-4 p-6 bg-gray-100 rounded-b-lg'>
                        <h4 className='font-semibold text-md text-slate-800'>Card Details</h4>
                        <div className='space-y-2'>
                          <div className='flex justify-between text-sm'>
                            <span className='text-slate-500'>Card Number:</span>
                            <span className='text-slate-700'>{cardStatus?.cardDetails?.cardNumber}</span>
                          </div>
                          <div className='flex justify-between text-sm'>
                            <span className='text-slate-500'>CVV:</span>
                            <span className='text-slate-700'>***</span>
                          </div>
                        </div>
                      </CardContent>
                    )}
                    <CardFooter className="bg-slate-50/50 flex flex-col gap-2">
                      <Button
                        onClick={handleActivate}
                        className='w-full bg-emerald-600 hover:bg-emerald-700'
                        disabled={isLoading || cardStatus?.cardDetails?.status === 'active'}
                      >
                        {isLoading ? 'Processing...' : cardStatus?.cardDetails?.status === 'active' ? 'Card Active' : 'Activate Card'}
                      </Button>
                      <Button
                        onClick={handleActivatePin}
                        className='w-full bg-blue-600 hover:bg-blue-700'
                        disabled={isLoading || cardStatus?.cardDetails?.hasPIN}
                      >
                        {isLoading ? 'Processing...' : cardStatus?.cardDetails?.hasPIN ? 'PIN Set' : 'Activate PIN'}
                        <Lock className='ml-2 h-4 w-4' />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <>
              {step === 'intro' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle className="text-slate-800">Get Started with Your New Card</CardTitle>
                      <CardDescription className="text-slate-600">Choose from our selection of cards designed to fit your needs</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4 p-6'>
                      <div className='flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100'>
                        <CreditCard className='w-8 h-8 text-emerald-600' />
                        <div>
                          <h3 className='font-medium text-emerald-900'>Ready to enhance your banking experience?</h3>
                          <p className='text-sm text-emerald-600'>Apply for a card today and enjoy exclusive benefits</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50">
                      {cardStatus?.hasCard && cardStatus?.cardDetails?.status === 'pending' ? (
                        <Button className='w-full bg-emerald-600 hover:bg-emerald-700'>Processing...</Button>
                      ) : (
                        <Button onClick={() => setStep('requirements')}
                          className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'>
                          Start Application
                          <ArrowRight className='ml-2 w-4 h-4' />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {step === 'requirements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle className="text-slate-800">Application Requirements</CardTitle>
                      <CardDescription className="text-slate-600">
                        Please ensure you meet the following requirements before proceeding
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className='space-y-4'>
                        {requirements.map((requirement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='flex items-center gap-3 text-slate-700'
                          >
                            <CheckCircle2 className='w-5 h-5 text-emerald-500' />
                            <span>{requirement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 gap-4">
                      <Button
                        variant='outline'
                        onClick={() => setStep('intro')}
                        className='w-full border-slate-200 hover:bg-slate-100'
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep('options')}
                        className='w-full bg-emerald-600 hover:bg-emerald-700'
                      >
                        Continue
                        <ArrowRight className='ml-2 w-4 h-4' />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {step === 'options' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='grid gap-6 md:grid-cols-2'
                >
                  <CardPaymentDialog
                    open={showPayment}
                    onOpenChange={open => {
                      setShowPayment(open)
                      if (!open) {
                        handlePaymentComplete()
                      }
                    }}
                    amount={2000}
                  />
                  {cardTypes.map((card, index) => (
                    <motion.div
                      key={card.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className='h-full border-0 shadow-lg bg-white/80 backdrop-blur'>
                        <CardHeader className="p-0">
                          <div className={`w-full p-6 rounded-lg bg-gradient-to-br ${card.color}`}>
                            <div className="flex flex-col h-52">
                              {/* Bank Info & Logo */}
                              <div className="flex justify-between items-start mb-6">
                                <h3 className="text-white/90 text-lg font-medium">Pinancle Global Bank</h3>
                                <div className="flex items-center gap-2">
                                  <div className="text-white/90">Mastercard</div>
                                  <CreditCard className="w-8 h-8 text-white" />
                                </div>
                              </div>

                              {/* Chip & Status */}
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-9 bg-yellow-300/90 rounded-md" /> {/* Chip */}
                                <span className="text-white/80 text-sm px-2 py-1 bg-white/20 rounded-full">
                                  {cardStatus?.cardDetails?.status === 'active' ? 'Active' : 'Pending'}
                                </span>
                              </div>

                              {/* Card Number */}
                              <div className="mb-6">
                                <div className="text-lg text-white font-mono tracking-wider">
                                  {cardStatus?.cardDetails?.maskedCardNumber.split('-').map((group:any, index:any) => (
                                    <span key={index} className="mr-4">{group}</span>
                                  ))}
                                </div>
                              </div>

                              {/* Card Details */}
                              <div className="flex justify-between items-end mt-auto">
                                <div className="space-y-1">
                                  <div className="text-white/60 text-xs">VALID THRU</div>
                                  <div className="text-white font-medium">
                                    {cardStatus?.cardDetails?.expiryMonth}/{cardStatus?.cardDetails?.expiryYear}
                                  </div>
                                </div>

                                <div className="space-y-1 text-right">
                                  <div className="text-white/60 text-xs">CREDIT LIMIT</div>
                                  <div className="text-white font-medium">
                                    ${cardStatus?.cardDetails?.limit.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className='space-y-4 p-6'>
                          <h3 className='font-semibold text-lg text-slate-800'>{card.name}</h3>
                          <p className='text-sm text-slate-600'>{card.description}</p>
                          <div className='space-y-2'>
                            <div className='flex justify-between text-sm'>
                              <span className='text-slate-500'>Fee:</span>
                              <span className='text-slate-700'>{card.fee}</span>
                            </div>
                            <div className='flex justify-between text-sm'>
                              <span className='text-slate-500'>PIN:</span>
                              <span className='text-slate-700'>{cardStatus?.cardDetails?.hasPIN ? 'Set' : 'Not Set'}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50">
                          <Button
                            onClick={handleApply}
                            className='w-full bg-emerald-600 hover:bg-emerald-700'
                            disabled={isLoading}
                          >
                            {isLoading ? 'Processing...' : 'Apply Now'}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                    <CardHeader>
                      <div className='flex flex-col items-center text-center'>
                        <div className='w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4'>
                          <CheckCircle2 className='w-6 h-6 text-emerald-600' />
                        </div>
                        <CardTitle className="text-slate-800">Application Submitted!</CardTitle>
                        <CardDescription className="text-slate-600">
                          We've received your card application and will process it shortly.
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className='text-center p-6'>
                      <p className='text-sm text-slate-600'>
                        You will receive an email with further instructions within 24-48 hours.
                      </p>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50">
                      <Button
                        onClick={() => setStep('intro')}
                        className='w-full bg-emerald-600 hover:bg-emerald-700'
                      >
                        Back to Cards
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

