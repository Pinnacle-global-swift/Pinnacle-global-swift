'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, ShoppingBag, Home, Car, Zap, ArrowUp, Wallet, FileText, ShieldCheck, ChevronRight, Bell, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransferDialog } from "@/components/transfer-dialog"
import { DepositDialog } from "@/components/deposit-dialog"
import { WithdrawDialog } from "@/components/withdraw-dialog"
import { KYCDialog } from "@/components/kyc-dialog"
import { LoanDialog } from "@/components/loan-dialog"
import Link from 'next/link'

// Define the necessary data structures
const accountData = {
  name: "John Doe",
  accountNumber: "****1234",
  balance: 50000.00,
  currency: "USD"
}

const goalsData = {
  current: 3500,
  target: 5000,
  percentage: 70
}

const upcomingBills = [
  { id: 1, name: "Electricity Bill", type: "Utility", amount: 150, dueDate: "Dec 15" },
  { id: 2, name: "Internet Bill", type: "Utility", amount: 80, dueDate: "Dec 18" },
  { id: 3, name: "Credit Card", type: "Payment", amount: 500, dueDate: "Dec 20" }
]

export default function DashboardOverview() {
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [isKYCOpen, setIsKYCOpen] = useState(false)
  const [isLoanOpen, setIsLoanOpen] = useState(false)

  return (
    <div className="space-y-8">
      <TransferDialog open={isTransferOpen} onOpenChange={setIsTransferOpen} />
      <DepositDialog open={isDepositOpen} onOpenChange={setIsDepositOpen} />
      <WithdrawDialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen} />
      <KYCDialog open={isKYCOpen} onOpenChange={setIsKYCOpen} />
      <LoanDialog open={isLoanOpen} onOpenChange={setIsLoanOpen} />

      {/* Account Overview Card */}
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="font-medium">{accountData.name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Total Balance</p>
              <h2 className="text-3xl font-bold">${accountData.balance.toFixed(2)} {accountData.currency}</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Account number:</span>
                <span>{accountData.accountNumber}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white w-full"
                onClick={() => setIsTransferOpen(true)}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Transfer
              </Button>
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white w-full"
                onClick={() => setIsWithdrawOpen(true)}
              >
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
              <Link href="/dashboard/transactions">
                <Button
                  variant="ghost"
                  className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 w-full text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-xs">Transactions</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 text-white"
                onClick={() => setIsDepositOpen(true)}
              >
                <Wallet className="w-5 h-5" />
                <span className="text-xs">Deposit</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 text-white"
                onClick={() => setIsLoanOpen(true)}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs">Loan</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-gray-700 text-white"
                onClick={() => setIsKYCOpen(true)}
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs">KYC</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Goals */}
        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 text-white">
          <CardHeader>
            <CardTitle>Goals</CardTitle>
            <CardDescription className="text-green-100">December, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-green-100">Current savings</div>
                  <div className="font-semibold">${goalsData.current.toLocaleString()}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm text-green-100">Target</div>
                  <div className="font-semibold">${goalsData.target.toLocaleString()}</div>
                </div>
              </div>
              <Progress value={goalsData.percentage} className="h-2 bg-green-200" />
              <div className="text-sm text-green-100 text-center">
                {goalsData.percentage}% of target achieved
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bills */}
        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Bills</CardTitle>
            <Link href="/dashboard/bills">
              <Button variant="ghost" size="sm" className="text-white hover:text-yellow-100">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{bill.name}</div>
                    <div className="text-sm text-yellow-100">{bill.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${bill.amount}</div>
                    <div className="text-sm text-yellow-100">{bill.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href="/dashboard/transactions">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              No transactions yet
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-green-400">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-green-400">This Month</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">Income</p>
                  <p className="text-xl font-bold text-white">$0.00</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-red-400">
                    <ArrowDownRight className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-red-400">This Month</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">Expenses</p>
                  <p className="text-xl font-bold text-white">$0.00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

