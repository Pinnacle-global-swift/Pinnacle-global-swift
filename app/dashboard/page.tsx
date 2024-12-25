'use client'

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
  Bell,
  CreditCard,
  Target,
  Receipt
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
// import { Progress } from "@/components/ui/progress"
import {LoadingSpinner, CircularSpinner} from "@/components/ui/loading-spinner"
import Link from 'next/link'
import { api } from '@/lib/api'
import { format } from 'date-fns'

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
  const [recentTransactions, setRecentTransactions] = useState<any>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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
        const response = await api.transactions(1, 5); // Fetch only 5 most recent transactions
        if (response.success) {
          setRecentTransactions(response.data.transactions);
        }
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchRecentTransactions();
  }, []);

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

  return (
    <div className='space-y-8'>
      {/* Account Overview Card */}
      <Card className='bg-gradient-to-br from-gray-800 to-gray-900 text-white'>
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
                <span>{accountInfo?.accountNumber}</span>
              </div>
            </div>

            {/* Action Buttons */}
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

            {/* Quick Actions */}
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
      </Card>

      {/* Top Row */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        
        
        <Card className='bg-gradient-to-br from-gray-700 to-gray-800 text-white'>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
            <CardDescription className='text-green-100'>
              December, 2023
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <div className='mb-4'>
                <Target className='w-12 h-12 text-gray-500' />
              </div>
              <p className='text-gray-400'>No goals set yet</p>
              <Button
                variant='outline'
                className='mt-4 text-white border-white hover:bg-white/10'
              >
                Set Your First Goal
              </Button>
            </div>
          </CardContent>
        </Card>

       
        <Card className='bg-gradient-to-br from-yellow-400 to-orange-500 text-white'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Upcoming Bills</CardTitle>
            <Link href='/dashboard/bills'>
              <Button
                variant='ghost'
                size='sm'
                className='text-white hover:text-yellow-100'
              >
                View All <ChevronRight className='w-4 h-4 ml-1' />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <div className='mb-4'>
                <Receipt className='w-12 h-12 text-yellow-200' />
              </div>
              <p className='text-yellow-100'>No upcoming bills</p>
              <Button
                variant='outline'
                className='mt-4 text-white border-white hover:bg-white/10'
              >
                Add Your First Bill
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
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
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No transactions yet
              </div>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((transaction:any) => (
                  <div key={transaction.reference} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type.toLowerCase() === 'deposit'
                          ? 'bg-green-100 text-green-600'
                          : transaction.type.toLowerCase() === 'withdrawal'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-blue-100 text-blue-600'
                      }`}>
                        {transaction.type.toLowerCase() === 'deposit' ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : transaction.type.toLowerCase() === 'withdrawal' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowLeftRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type.toLowerCase() === 'deposit'
                          ? 'text-green-600'
                          : transaction.type.toLowerCase() === 'withdrawal'
                            ? 'text-red-600'
                            : 'text-blue-600'
                      }`}>
                        ${transaction.amount.toFixed(2)}
                      </p>
                      <Badge
                        variant={
                          transaction.status.toLowerCase() === 'completed' ? 'default' :
                            transaction.status.toLowerCase() === 'pending' ? 'secondary' :
                              'destructive'
                        }
                        className="text-xs"
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
                  <p className='text-xl font-bold text-white'>$0.00</p>
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
                  <p className='text-xl font-bold text-white'>$0.00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
