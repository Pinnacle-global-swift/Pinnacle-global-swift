'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'

const limits = [
  {
    type: 'Daily Transfer',
    current: 2500,
    max: 5000,
    icon: ArrowUpRight,
    color: 'text-blue-500'
  },
  {
    type: 'Daily Withdrawal',
    current: 1000,
    max: 2000,
    icon: ArrowDownRight,
    color: 'text-red-500'
  },
  {
    type: 'Card Spending',
    current: 3000,
    max: 10000,
    icon: CreditCard,
    color: 'text-green-500'
  }
]

export default function TransactionLimits () {
  const [isLoading, setIsLoading] = useState(false)
  const [verify, setKyc] = useState<any>('')
  const { toast } = useToast()

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      await api.updateTransactionLimits({
        dailyTransfer: 5000,
        dailyWithdrawal: 2000,
        cardSpending: 10000
      })
      toast({
        title: 'Limits Upgraded',
        description: 'Your transaction limits have been successfully upgraded.',
        duration: 3000,
                type: 'success'
      })
    } catch (error) {
      console.error('Error upgrading limits:', error)
      toast({
        type:"error",
        title: 'Upgrade Failed',
        description: 'Failed to upgrade transaction limits. Please try again.',
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

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

  console.log(verify.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='max-w-2xl mx-auto space-y-8'
    >
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Transaction Limits</h1>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Current Limits</CardTitle>
            <CardDescription>
              View and manage your transaction limits
            </CardDescription>
          </CardHeader>
          {verify.status == 'approved' ? (
            <CardContent className='space-y-6'>
              {limits.map((limit, index) => {
                const Icon = limit.icon
                const percentage = (limit.current / limit.max) * 100

                return (
                  <motion.div
                    key={limit.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='space-y-2'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <Icon className={`w-5 h-5 ${limit.color}`} />
                        <span className='font-medium'>{limit.type}</span>
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        UNLIMITED
                      </span>
                    </div>
                    <Progress value={percentage} className='h-2' />
                  </motion.div>
                )
              })}
            </CardContent>
          ) : (
            <CardContent className='space-y-6'>
              {limits.map((limit, index) => {
                const Icon = limit.icon
                const percentage = (limit.current / limit.max) * 100

                return (
                  <motion.div
                    key={limit.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='space-y-2'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <Icon className={`w-5 h-5 ${limit.color}`} />
                        <span className='font-medium'>{limit.type}</span>
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        ${limit.current.toLocaleString()} / $
                        {limit.max.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className='h-2' />
                  </motion.div>
                )
              })}
            </CardContent>
          )}
          {verify.status !== 'approved' && (
            <CardFooter className='flex flex-col gap-4'>
              <p className='text-sm text-muted-foreground text-center'>
                Need higher limits? Upgrade your account to increase your
                transaction limits.
              </p>
              <Button onClick={handleUpgrade} className='w-full'>
                Upgrade Account
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </motion.div>
  )
}
