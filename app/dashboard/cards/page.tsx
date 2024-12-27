'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { CardPaymentDialog } from '@/components/card-payment-dialog'
import { api } from '@/lib/api'

const cardTypes = [
  // {
  //   name: "Pinancle Global Bank Debit Card",
  //   description: "Perfect for online purchases and digital transactions",
  //   limit: "Up to $10,000",
  //   fee: "No annual fee",
  //   color: "from-violet-500 to-purple-500"
  // },
  {
    name: 'Pinancle Global Bank  Master Credit Card',
    description: 'Exclusive rewards and premium benefits',
    limit: 'Up to $50,000',
    fee: '$99 annual fee',
    color: 'from-blue-500 to-indigo-600'
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
    'intro' | 'requirements' | 'options' | 'payment' | 'loading' | 'success'
  >('intro')
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [cardstatus, setcardstatus] = useState<any>(null)

  const handleApply = async () => {
    setShowPayment(true)
  }

  const handlePaymentComplete = async () => {
    setShowPayment(false)
    setIsLoading(true)
    const value = { type: 'mastercard' }
    const data = api.applycard(value)
    console.log(data)

    setStep('success')
    setIsLoading(false)
  }
  // cardstatus

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.cardstatus() // Call the API method
        setcardstatus(data?.data) // Set the fetched data to state
        console.log(data)
      } catch (err: any) {
        console.log(err)
        // setError(err?.response?.data?.error?.message || 'Failed to fetch account info') // Handle error
      } finally {
        // setLoading(false) // Stop loading indicator
      }
    }

    fetchAccountInfo() // Call the function when the component mounts
  }, [])


  return (
    <div className='space-y-8 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold text-foreground'>Card Services</h1>

      <AnimatePresence mode='wait'>
        {step === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Get Started with Your New Card</CardTitle>
                <CardDescription>
                  Choose from our selection of cards designed to fit your needs
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-4 p-4 bg-primary/10 rounded-lg'>
                  <CreditCard className='w-8 h-8 text-primary' />
                  <div>
                    <h3 className='font-medium'>
                      Ready to enhance your banking experience?
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      Apply for a card today and enjoy exclusive benefits
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {cardstatus?.hasCard &&
                cardstatus?.cardDetails?.status == 'pending' ? (
                  <Button className='w-full'>Processing...</Button>
                ) : (
                  <Button
                    onClick={() => setStep('requirements')}
                    className='w-full'
                  >
                    Start Application
                    {cardstatus?.cardDetails?.status != 'active' && (
                      <ArrowRight className='ml-2 w-4 h-4' />
                    )}
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
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
                <CardDescription>
                  Please ensure you meet the following requirements before
                  proceeding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  {requirements.map((requirement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className='flex items-center gap-3'
                    >
                      <CheckCircle2 className='w-5 h-5 text-green-500' />
                      <span>{requirement}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='flex gap-4'>
                <Button
                  variant='outline'
                  onClick={() => setStep('intro')}
                  className='w-full'
                >
                  Back
                </Button>
                <Button onClick={() => setStep('options')} className='w-full'>
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
                <Card className='h-full'>
                  <CardHeader>
                    <div
                      className={`w-full h-40 rounded-lg bg-gradient-to-br ${card.color} p-6 text-white`}
                    >
                      <div className='flex justify-between items-start'>
                        <div className='space-y-2'>
                          <p className='text-sm opacity-80'>
                            Pinancle Global Bank
                          </p>
                          <h3 className='text-lg font-semibold'>
                            **** **** **** 4242
                          </h3>
                        </div>
                        <CreditCard className='w-8 h-8' />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <h3 className='font-semibold text-lg'>{card.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {card.description}
                    </p>
                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Limit:</span>
                        <span>{card.limit}</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Fee:</span>
                        <span>{card.fee}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleApply}
                      className='w-full'
                      disabled={isLoading}
                    >
                      {isLoading ? <>Processing...</> : <>Apply Now</>}
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
            <Card>
              <CardHeader>
                <div className='flex flex-col items-center text-center'>
                  <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4'>
                    <CheckCircle2 className='w-6 h-6 text-green-600' />
                  </div>
                  <CardTitle>Application Submitted!</CardTitle>
                  <CardDescription>
                    We've received your card application and will process it
                    shortly.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-sm text-muted-foreground'>
                  You will receive an email with further instructions within
                  24-48 hours.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setStep('intro')} className='w-full'>
                  Back to Cards
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
