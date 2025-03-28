'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Lock,
  PinIcon as Chip
} from 'lucide-react'
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
import { ProofOfPaymentUpload } from '@/components/proof-of-payment-upload'
import { ProofOfPaymentDialog } from '@/components/proof-of-payment-dialog'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

const cardTypes = [
  {
    name: 'Pinnacle Global Swift Master Credit Card',
    description: 'Exclusive rewards and premium benefits',
    limit: 'Up to $50,000',
    fee: '$99 annual fee',
    color: 'from-blue-600 to-purple-600',
    gradientText: 'text-blue-50'
  }
]

const requirements = [
  'Valid government-issued ID',
  'Proof of address (utility bill, lease agreement)',
  'Minimum account balance of $100',
  'Active account for at least 3 working days'
]

export default function Cards () {
  const [step, setStep] = useState<
    | 'intro'
    | 'requirements'
    | 'options'
    | 'payment'
    | 'proofOfPayment'
    | 'loading'
    | 'success'
  >('intro')
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showPinEntry, setShowPinEntry] = useState(false)
  const [isPinActivation, setIsPinActivation] = useState(false)
  const [cardStatus, setCardStatus] = useState<any>(null)
  const [showProofOfPaymentUpload, setShowProofOfPaymentUpload] =
    useState(false)
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false)

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
        setCardStatus({
          ...cardStatus,
          cardDetails: { ...cardStatus.cardDetails, hasPIN: true }
        })
      } else {
        // Handle card activation
        const formData = new FormData()
        formData.append('pin', pin)
        const data = await api.activateCard(formData)
        console.log(data)
        setCardStatus({
          ...cardStatus,
          cardDetails: { ...cardStatus.cardDetails, status: 'active' }
        })
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
    setTimeout(() => {
      setShowProofOfPaymentUpload(true)
    }, 300)
  }

  const handleProofOfPaymentUpload = async (file: File) => {
    setShowProofOfPaymentUpload(false)
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('paymentReceipt', file)
      formData.append('type', 'mastercard')
      console.log(formData)
      const data = await api.applyCard(formData)
      console.log(data)
      setStep('success')
    } catch (error) {
      console.error('Error uploading proof of payment:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
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
    <div className='min-h-screen w-full py-4 px-2 sm:py-6 sm:px-4 md:py-8 lg:py-10'>
      <div className='container max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='w-full'
        >
          <Card className='shadow-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10'>
            <CardHeader className='border-b border-white/20 p-4 sm:p-6 lg:pb-7'>
              <CardTitle className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Card Services
              </CardTitle>
            </CardHeader>
            <CardContent className='p-4 sm:p-6 pt-6'>
              <AnimatePresence mode='wait'>
                {cardStatus?.hasCard &&
                cardStatus?.cardDetails?.status == 'approved' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='grid gap-4 sm:gap-6 md:grid-cols-2'
                  >
                    <PinEntryDialog
                      open={showPinEntry}
                      onOpenChange={setShowPinEntry}
                      onSubmit={handlePinSubmit}
                    />
                    {cardTypes.map((card, index) => (
                      <motion.div key={card.name} className='w-full'>
                        <Card className='h-full border-0 shadow-lg bg-gray-800/50 backdrop-blur'>
                          <CardHeader className='p-0'>
                            <div
                              className={`w-full p-4 sm:p-6 rounded-lg bg-gradient-to-br ${card.color}`}
                            >
                              <div className='flex flex-col h-40 sm:h-52'>
                                {/* Bank Info & Logo */}
                                <div className='flex justify-between items-start mb-4 sm:mb-6'>
                                  <h3 className='text-white/90 text-base sm:text-lg font-medium'>
                                    Pinnacle Global Swift
                                  </h3>
                                  <div className='flex items-center gap-2'>
                                    <div className='hidden sm:block text-white/90'>
                                      Mastercard
                                    </div>
                                    <CreditCard className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                                  </div>
                                </div>

                                {/* Chip & Status */}
                                <div className='flex items-center gap-3 mb-4 sm:mb-6'>
                                  <Chip className='w-10 h-8 sm:w-12 sm:h-9 text-yellow-300/90 rounded-md' />
                                  <span className='text-white/80 text-xs sm:text-sm px-2 py-1 bg-white/20 rounded-full'>
                                    {cardStatus?.cardDetails?.status ===
                                    'active'
                                      ? 'Active'
                                      : 'Pending'}
                                  </span>
                                </div>

                                {/* Card Number */}
                                <div className='text-base sm:text-lg text-white font-mono tracking-wider break-words'>
                                  {cardStatus?.cardDetails?.maskedCardNumber
                                    .split('-')
                                    .map((group: string, idx: number) => (
                                      <span key={idx} className='mr-2 sm:mr-4'>
                                        {group}
                                      </span>
                                    ))}
                                </div>

                                {/* Card Details */}
                                <div className='flex justify-between items-end mt-2 sm:mt-4'>
                                  <div className='space-y-0.5 sm:space-y-1'>
                                    <div className='text-white/60 text-xs'>
                                      VALID THRU
                                    </div>
                                    <div className='text-white text-sm sm:text-base font-medium'>
                                      {cardStatus?.cardDetails?.expiryMonth}/
                                      {cardStatus?.cardDetails?.expiryYear}
                                    </div>
                                  </div>

                                  <div className='space-y-0.5 sm:space-y-1 text-right'>
                                    <div className='text-white/60 text-xs'>
                                      CREDIT LIMIT
                                    </div>
                                    <div className='text-white text-sm sm:text-base font-medium'>
                                      $
                                      {cardStatus?.cardDetails?.limit.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className='space-y-3 sm:space-y-4 p-4 sm:p-6'>
                            <h3 className='font-semibold text-base sm:text-lg text-white'>
                              {card.name}
                            </h3>
                            <p className='text-sm text-gray-300'>
                              {card.description}
                            </p>
                            <div className='space-y-2'>
                              <div className='flex justify-between text-sm'>
                                <span className='text-gray-400'>Fee:</span>
                                <span className='text-gray-200'>
                                  {card.fee}
                                </span>
                              </div>
                              <div className='flex justify-between text-sm'>
                                <span className='text-gray-400'>PIN:</span>
                                <span className='text-gray-200'>
                                  {cardStatus?.cardDetails?.hasPIN
                                    ? 'Set'
                                    : 'Not Set'}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          {cardStatus?.cardDetails?.status === 'active' &&
                            cardStatus?.cardDetails?.hasPIN && (
                              <CardContent className='space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-700/50 rounded-b-lg'>
                                <h4 className='font-semibold text-md text-white'>
                                  Card Details
                                </h4>
                                <div className='space-y-2'>
                                  <div className='flex justify-between text-sm'>
                                    <span className='text-gray-400'>
                                      Card Number:
                                    </span>
                                    <span className='text-gray-200'>
                                      {cardStatus?.cardDetails?.cardNumber}
                                    </span>
                                  </div>
                                  <div className='flex justify-between text-sm'>
                                    <span className='text-gray-400'>CVV:</span>
                                    <span className='text-gray-200'>***</span>
                                  </div>
                                </div>
                              </CardContent>
                            )}
                          <CardFooter className='bg-gray-800/50 p-4 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-4'>
                            <Button
                              onClick={handleActivate}
                              className={cn(
                                'w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                                'rounded-xl h-10 sm:h-12 text-base sm:text-lg font-medium transition-all duration-300',
                                'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400'
                              )}
                              disabled={
                                isLoading ||
                                cardStatus?.cardDetails?.status === 'active'
                              }
                            >
                              {isLoading
                                ? 'Processing...'
                                : cardStatus?.cardDetails?.status === 'active'
                                ? 'Card Active'
                                : 'Activate Card'}
                            </Button>
                            <Button
                              onClick={handleActivatePin}
                              className={cn(
                                'w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white',
                                'rounded-xl h-10 sm:h-12 text-base sm:text-lg font-medium transition-all duration-300',
                                'hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400'
                              )}
                              disabled={
                                isLoading || cardStatus?.cardDetails?.hasPIN
                              }
                            >
                              {isLoading
                                ? 'Processing...'
                                : cardStatus?.cardDetails?.hasPIN
                                ? 'PIN Set'
                                : 'Activate PIN'}
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
                        <Card className='border-0 shadow-lg bg-gray-800/50 backdrop-blur'>
                          <CardHeader className='border-b border-white/20'>
                            <CardTitle className='text-white'>
                              Get Started with Your New Card
                            </CardTitle>
                            <CardDescription className='text-gray-300'>
                              Choose from our selection of cards designed to fit
                              your needs
                            </CardDescription>
                          </CardHeader>
                          <CardContent className='space-y-4 p-6'>
                            <div className='flex items-center gap-4 p-4 bg-blue-900/50 rounded-lg border border-blue-700/50'>
                              <CreditCard className='w-8 h-8 text-blue-400' />
                              <div>
                                <h3 className='font-medium text-white'>
                                  Ready to enhance your banking experience?
                                </h3>
                                <p className='text-sm text-gray-300'>
                                  Apply for a card today and enjoy exclusive
                                  benefits
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className='bg-gray-800/50'>
                            {cardStatus?.hasCard &&
                            cardStatus?.cardDetails?.status === 'pending' ? (
                              <Button
                                className={cn(
                                  'w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                                  'rounded-xl h-12 text-lg font-medium transition-all duration-300',
                                  'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400'
                                )}
                              >
                                Processing...
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setStep('requirements')}
                                className={cn(
                                  'w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                                  'rounded-xl h-12 text-lg font-medium transition-all duration-300',
                                  'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400'
                                )}
                              >
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
                        <Card className='border-0 shadow-lg bg-gray-800/50 backdrop-blur'>
                          <CardHeader className='border-b border-white/20'>
                            <CardTitle className='text-white'>
                              Application Requirements
                            </CardTitle>
                            <CardDescription className='text-gray-300'>
                              Please ensure you meet the following requirements
                              before proceeding
                            </CardDescription>
                          </CardHeader>
                          <CardContent className='p-6'>
                            <ul className='space-y-4'>
                              {requirements.map((requirement, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className='flex items-center gap-3 text-gray-200'
                                >
                                  <CheckCircle2 className='w-5 h-5 text-blue-400' />
                                  <span>{requirement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className='bg-gray-800/50 gap-4'>
                            <Button
                              variant='outline'
                              onClick={() => setStep('intro')}
                              className='w-full border-gray-700 hover:bg-gray-700 text-gray-200'
                            >
                              Back
                            </Button>
                            <Button
                              onClick={() => setStep('options')}
                              className={cn(
                                'w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                                'rounded-xl h-12 text-lg font-medium transition-all duration-300',
                                'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400'
                              )}
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
                        className='grid gap-4 sm:gap-6 md:grid-cols-2'
                      >
                        <CardPaymentDialog
                          open={showPayment}
                          onOpenChange={open => {
                            if (!open) {
                              handlePaymentComplete()
                            }
                            setShowPayment(open)
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
                            <Card className='h-full border-0 shadow-lg bg-gray-800/50 backdrop-blur'>
                              <CardHeader className='p-0'>
                                <div
                                  className={`w-full p-4 sm:p-6 rounded-lg bg-gradient-to-br ${card.color}`}
                                >
                                  <div className='flex flex-col h-40 sm:h-52'>
                                    {/* Bank Info & Logo */}
                                    <div className='flex justify-between items-start mb-4 sm:mb-6'>
                                      <h3 className='text-white/90 text-base sm:text-lg font-medium'>
                                        Pinnacle Global Swift
                                      </h3>
                                      <div className='flex items-center gap-2'>
                                        <div className='hidden sm:block text-white/90'>
                                          Mastercard
                                        </div>
                                        <CreditCard className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                                      </div>
                                    </div>

                                    {/* Chip & Status */}
                                    <div className='flex items-center gap-3 mb-4 sm:mb-6'>
                                      <div className='w-10 h-8 sm:w-12 sm:h-9 bg-yellow-300/90 rounded-md' />{' '}
                                      {/* Chip */}
                                      <span className='text-white/80 text-xs sm:text-sm px-2 py-1 bg-white/20 rounded-full'>
                                        {cardStatus?.cardDetails?.status ===
                                        'active'
                                          ? 'Active'
                                          : 'Pending'}
                                      </span>
                                    </div>

                                    {/* Card Number */}
                                    <div className='text-base sm:text-lg text-white font-mono tracking-wider break-words'>
                                      **** **** **** ****
                                    </div>

                                    {/* Card Details */}
                                    <div className='flex justify-between items-end mt-2 sm:mt-4'>
                                      <div className='space-y-0.5 sm:space-y-1'>
                                        <div className='text-white/60 text-xs'>
                                          VALID THRU
                                        </div>
                                        <div className='text-white text-sm sm:text-base font-medium'>
                                          MM/YY
                                        </div>
                                      </div>

                                      <div className='space-y-0.5 sm:space-y-1 text-right'>
                                        <div className='text-white/60 text-xs'>
                                          CREDIT LIMIT
                                        </div>
                                        <div className='text-white text-sm sm:text-base font-medium'>
                                          ${card.limit}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className='space-y-3 sm:space-y-4 p-4 sm:p-6'>
                                <h3 className='font-semibold text-base sm:text-lg text-white'>
                                  {card.name}
                                </h3>
                                <p className='text-sm text-gray-300'>
                                  {card.description}
                                </p>
                                <div className='space-y-2'>
                                  <div className='flex justify-between text-sm'>
                                    <span className='text-gray-400'>Fee:</span>
                                    <span className='text-gray-200'>
                                      {card.fee}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className='bg-gray-800/50 p-4 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-4'>
                                <Button
                                  onClick={handleApply}
                                  className={cn(
                                    'w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                                    'rounded-xl h-10 sm:h-12 text-base sm:text-lg font-medium transition-all duration-300',
                                    'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400'
                                  )}
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

                    {step === 'proofOfPayment' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProofOfPaymentUpload
                          onUpload={handleProofOfPaymentUpload}
                          onClose={() => setStep('options')}
                        />
                      </motion.div>
                    )}

                    {step === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className='border-0 shadow-lg bg-gray-800/50 backdrop-blur'>
                          <CardHeader>
                            <div className='flex flex-col items-center text-center'>
                              <div className='w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4'>
                                <CheckCircle2 className='w-6 h-6 text-blue-400' />
                              </div>
                              <CardTitle className='text-white'>
                                Application Submitted!
                              </CardTitle>
                              <CardDescription className='text-gray-300'>
                                We've received your card application and proof
                                of payment. We will process it shortly.
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className='text-center p-6'>
                            <p className='text-sm text-gray-300'>
                              You will receive an email with further
                              instructions within 24-48 hours.
                            </p>
                          </CardContent>
                          <CardFooter className='bg-gray-800/50'>
                            <Button
                              onClick={() => setStep('intro')}
                              className={cn(
                                'w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                                'rounded-xl h-12 text-lg font-medium transition-all duration-300',
                                'hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-400'
                              )}
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
            </CardContent>
          </Card>
        </motion.div>

        <CardPaymentDialog
          open={showPayment}
          onOpenChange={open => {
            if (!open) {
              handlePaymentComplete()
            }
            setShowPayment(open)
          }}
          amount={3000}
        />

        <ProofOfPaymentDialog
          open={showProofOfPaymentUpload}
          onOpenChange={setShowProofOfPaymentUpload}
          onSubmit={handleProofOfPaymentUpload}
        />

        <PinEntryDialog
          open={showPinEntry}
          onOpenChange={setShowPinEntry}
          onSubmit={handlePinSubmit}
        />

        {/* {showProofOfPaymentUpload && (
          <ProofOfPaymentUpload
            onUpload={handleProofOfPaymentUpload}
            onClose={() => setShowProofOfPaymentUpload(false)}
          />
        )} */}
      </div>
    </div>
  )
}
