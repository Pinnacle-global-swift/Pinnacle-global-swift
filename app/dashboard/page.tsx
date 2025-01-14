'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Wallet,
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowLeftRight,
  Bell,
  CreditCard,
  Target,
  Receipt,
  Copy,
  Check
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
// import { Progress } from "@/components/ui/progress"
import {
  LoadingSpinner,
  CircularSpinner
} from '@/components/ui/loading-spinner'
import Link from 'next/link'
import { api } from '@/lib/api'
import { format } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import { AnimatedBackground } from '@/components/animated-background'

const accountData = {
  name: 'John Doe',
  accountNumber: '****1234',
  balance: 50000.0,
  currency: 'USD'
}

const goalsData = {
  current: 3500,
  target: 5000,
  percentage: 70
}

const upcomingBills = [
  {
    id: 1,
    name: 'Electricity Bill',
    type: 'Utility',
    amount: 150,
    dueDate: 'Dec 15'
  },
  {
    id: 2,
    name: 'Internet Bill',
    type: 'Utility',
    amount: 80,
    dueDate: 'Dec 18'
  },
  {
    id: 3,
    name: 'Credit Card',
    type: 'Payment',
    amount: 500,
    dueDate: 'Dec 20'
  }
]

export default function DashboardOverview () {
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [accountUser, setAccountUser] = useState<any>(null)
  const [Quick, setQuick] = useState<any>(null)
  const [recentTransactions, setRecentTransactions] = useState<any>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getAccountInfo() // Call the API method
        setAccountInfo(data?.data) // Set the fetched data to state
      } catch (err: any) {
        setError(err.message || 'Failed to fetch account info') // Handle error
      } finally {
        setLoading(false) // Stop loading indicator
      }
    }

    fetchAccountInfo() // Call the function when the component mounts
  }, [])

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await api.transactions(1, 5) // Fetch only 5 most recent transactions
        if (response.success) {
          setRecentTransactions(response.data.transactions)
        }
      } catch (error) {
        console.error('Error fetching recent transactions:', error)
      } finally {
        setIsLoadingTransactions(false)
      }
    }

    fetchRecentTransactions()
  }, [])




  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await api.spending() // Fetch only 5 most recent transactions
        if (response.success) {
          setQuick(response?.data)
        }
      } catch (error) {
        console.error('Error fetching recent transactions:', error)
      } finally {
        setIsLoadingTransactions(false)
      }
    }

    fetchRecentTransactions()
  }, [])

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getUserDetails() // Call the API method
        setAccountUser(data?.data?.user) // Set the fetched data to state
      } catch (err: any) {
        setError(err.message || 'Failed to fetch account info') // Handle error
      } finally {
        setLoading(false) // Stop loading indicator
      }
    }

    fetchAccountInfo() // Call the function when the component mounts
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountInfo?.accountNumber)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err)
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Unable to copy account number. Please try again.",
      })
    }
  }


  return (
    <div className='relative min-h-screen'>
      {/* <AnimatedBackground /> */}
      <div className='space-y-8 relative z-10'>
        <Card className='bg-gradient-to-br from-gray-800 to-gray-900 text-white backdrop-blur-sm'>
          <Image
            src='https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=1920&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with your online image URL
            alt='Card background'
            fill
            className='absolute inset-0 object-cover opacity-20 -z-10 ' // Adjust opacity as needed
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader className='pb-2'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center'>
                  <Wallet className='w-5 h-5' />
                </div>
                <div>
                  <p className='text-sm text-gray-400'>Welcome back,</p>
                  <p className='font-medium'>{accountUser?.fullName}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-400'>Total Balance</p>
                  <h2 className='text-3xl font-bold'>
                    ${accountInfo?.balance.toFixed(2)} {accountData.currency}
                  </h2>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-400'>Account number:</span>
                    <div className="flex items-center gap-2">
          <span className="font-medium">{accountInfo?.accountNumber}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCopy}
            className="focus:outline-none"
          >
            {copied ? 
              <Check className="w-4 h-4 text-green-600" /> : 
              <Copy className="w-4 h-4" />
            }
          </Button>
        </div>
                    {/* <span>{accountInfo?.accountNumber}</span> */}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <Link href='/dashboard/transfer'>
                    <Button
                      variant='outline'
                      className='bg-gray-700 border-gray-600 hover:bg-gray-600 text-white w-full'
                    >
                      <ArrowUpRight className='w-4 h-4 mr-2' />
                      Transfer
                    </Button>
                  </Link>
                  <Link href='/dashboard/withdraw'>
                    <Button
                      variant='outline'
                      className='bg-gray-700 border-gray-600 hover:bg-gray-600 text-white w-full'
                    >
                      <ArrowDownRight className='w-4 h-4 mr-2' />
                      Withdraw
                    </Button>
                  </Link>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 pt-4'>
                  <Link href='/dashboard/transactions'>
                    <Button
                      variant='ghost'
                      className='flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 w-full text-white'
                    >
                      <ShoppingBag className='w-5 h-5' />
                      <span className='text-xs'>Transactions</span>
                    </Button>
                  </Link>
                  <Link href='/dashboard/deposit'>
                    <Button
                      variant='ghost'
                      className='flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 text-white w-full'
                    >
                      <Wallet className='w-5 h-5' />
                      <span className='text-xs'>Deposit</span>
                    </Button>
                  </Link>
                  <Link href='/dashboard/loan'>
                    <Button
                      variant='ghost'
                      className='flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 text-white w-full'
                    >
                      <FileText className='w-5 h-5' />
                      <span className='text-xs'>Loan</span>
                    </Button>
                  </Link>
                  <Link href='/dashboard/kyc'>
                    <Button
                      variant='ghost'
                      className='flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 text-white w-full'
                    >
                      <ShieldCheck className='w-5 h-5' />
                      <span className='text-xs'>KYC</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Recent Transactions</CardTitle>
                <Link href='/dashboard/transactions'>
                  <Button variant='ghost' size='sm'>
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingTransactions ? (
                <div className='flex justify-center py-8'>
                  <LoadingSpinner />
                </div>
              ) : recentTransactions.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  No transactions yet
                </div>
              ) : (
                <div className='space-y-4'>
                  {recentTransactions.map((transaction: any) => (
                    <div
                      key={transaction.reference}
                      className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type.toLowerCase() === 'deposit'
                              ? 'bg-green-100 text-green-600'
                              : transaction.type.toLowerCase() === 'withdrawal'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {transaction.type.toLowerCase() === 'deposit' ? (
                            <ArrowDownRight className='w-4 h-4' />
                          ) : transaction.type.toLowerCase() ===
                            'withdrawal' ? (
                            <ArrowUpRight className='w-4 h-4' />
                          ) : (
                            <ArrowLeftRight className='w-4 h-4' />
                          )}
                        </div>
                        <div>
                          <p className='font-medium'>
                            {transaction.description}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {format(
                              new Date(transaction.createdAt),
                              'MMM dd, yyyy'
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p
                          className={`font-medium ${
                            transaction.type.toLowerCase() === 'deposit'
                              ? 'text-green-600'
                              : transaction.type.toLowerCase() === 'withdrawal'
                              ? 'text-red-600'
                              : 'text-blue-600'
                          }`}
                        >
                          ${transaction.amount.toFixed(2)}
                        </p>
                        <Badge
                          variant={
                            transaction.status.toLowerCase() === 'completed'
                              ? 'default'
                              : transaction.status.toLowerCase() === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                          className='text-xs'
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-gray-700 p-4 rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='text-green-400'>
                      <ArrowUpRight className='w-5 h-5' />
                    </div>
                    <span className='text-sm text-green-400'>This Month</span>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-300'>Income</p>
                    <p className='text-xl font-bold text-white'>
                      ${Quick?.totalDeposited || '0'}.00
                    </p>
                  </div>
                </div>
                <div className='bg-gray-700 p-4 rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='text-red-400'>
                      <ArrowDownRight className='w-5 h-5' />
                    </div>
                    <span className='text-sm text-red-400'>This Month</span>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-300'>Expenses</p>
                    <p className='text-xl font-bold text-white'>
                      $ {Quick?.totalWithdrawn || '0'}.00
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
