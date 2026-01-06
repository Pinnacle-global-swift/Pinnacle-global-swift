"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Wallet,
  FileText,
  ShieldCheck,
  ArrowLeftRight,
  Bell,
  CreditCard,
  Target,
  Receipt,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Diamond as GoldIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"
import { api } from "@/lib/api"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TransactionReceipt } from '@/components/dashboard/TransactionReceipt'

// Memoized Transaction Item Component
const TransactionItem = memo(({ transaction, onClick }: { transaction: any; onClick: (t: any) => void }) => {
  return (
    <div
      onClick={() => onClick(transaction)}
      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2.5 rounded-xl transition-transform group-hover:scale-110 ${transaction.type.toLowerCase() === "deposit"
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : transaction.type.toLowerCase() === "withdrawal"
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}
        >
          {transaction.type.toLowerCase() === "deposit" ? (
            <ArrowDownRight className="w-5 h-5" />
          ) : transaction.type.toLowerCase() === "withdrawal" ? (
            <ArrowUpRight className="w-5 h-5" />
          ) : (
            <ArrowLeftRight className="w-5 h-5" />
          )}
        </div>
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{transaction.description}</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {format(new Date(transaction?.date), "MMM dd, yyyy • HH:mm")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-bold text-lg ${transaction.type.toLowerCase() === "deposit"
            ? "text-emerald-600 dark:text-emerald-400"
            : transaction.type.toLowerCase() === "withdrawal"
              ? "text-rose-600 dark:text-rose-400"
              : "text-blue-600 dark:text-blue-400"
            }`}
        >
          {transaction.type.toLowerCase() === "withdrawal" ? "-" : "+"}${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-1">
          <Badge
            variant="outline"
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0 border-none ${transaction.status.toLowerCase() === "completed"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : transaction.status.toLowerCase() === "pending"
                ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
              }`}
          >
            {transaction.status}
          </Badge>
        </div>
      </div>
    </div>
  )
})

TransactionItem.displayName = "TransactionItem"

export default function DashboardOverview() {
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [accountUser, setAccountUser] = useState<any>(null)
  const [quickStats, setQuickStats] = useState<any>(null)
  const [recentTransactions, setRecentTransactions] = useState<any>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [showBalance, setShowBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('showBalance') !== 'false'
    }
    return true
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getAccountInfo()
        setAccountInfo(data?.data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch account info")
      } finally {
        setLoading(false)
      }
    }

    const fetchRecentTransactions = async () => {
      try {
        const response = await api.transactions(1, 5)
        if (response.success) {
          setRecentTransactions(response.data.transactions)
        }
      } catch (error) {
        console.error("Error fetching recent transactions:", error)
      } finally {
        setIsLoadingTransactions(false)
      }
    }

    const fetchQuickStats = async () => {
      try {
        const response = await api.spending()
        if (response.success) {
          setQuickStats(response?.data)
        }
      } catch (error) {
        console.error("Error fetching quick stats:", error)
      }
    }

    const fetchUserDetails = async () => {
      try {
        const data = await api.getUserDetails()
        setAccountUser(data?.data?.user)
      } catch (err: any) {
        setError(err.message || "Failed to fetch user details")
      }
    }

    fetchAccountInfo()
    fetchRecentTransactions()
    fetchQuickStats()
    fetchUserDetails()
  }, [])

  const handleCopy = useCallback(async () => {
    if (!accountInfo?.accountNumber) return
    try {
      await navigator.clipboard.writeText(accountInfo.accountNumber)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard.",
        type: "success",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        type: "error",
        title: "Copy failed",
        description: "Unable to copy account number. Please try again.",
      })
    }
  }, [accountInfo?.accountNumber, toast])

  const toggleBalanceVisibility = useCallback(() => {
    setShowBalance(prev => {
      const newState = !prev
      localStorage.setItem('showBalance', newState.toString())
      return newState
    })
  }, [])

  const formatHiddenBalance = useCallback((balance: number) => {
    if (!balance && balance !== 0) return '*****'
    const length = balance.toString().split('.')[0].length
    return '$' + '*'.repeat(Math.max(length, 4))
  }, [])

  const handleTransactionClick = useCallback((transaction: any) => {
    setSelectedTransaction(transaction)
  }, [])

  const formattedBalance = useMemo(() => {
    if (!accountInfo?.balance && accountInfo?.balance !== 0) return "0.00"
    return accountInfo.balance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [accountInfo?.balance])

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a]">
      <div className="space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Welcome back, <span className="font-semibold text-slate-700 dark:text-slate-200">{accountUser?.fullName}</span>
            </p>
          </motion.div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              Secure Account
            </Badge>
            <span className="text-sm text-slate-400 dark:text-slate-500">
              Last login: {format(new Date(), "MMM dd, HH:mm")}
            </span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-none shadow-xl bg-[#1e293b] text-white relative overflow-hidden group">
            {/* Professional Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <GoldIcon className="w-32 h-32 rotate-12 transition-transform group-hover:scale-110 duration-500" />
            </div>

            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium tracking-wider">
                        <Wallet className="w-4 h-4" />
                        AVAILABLE BALANCE
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {showBalance ? (
                          `$${formattedBalance}`
                        ) : (
                          <span className="select-none">{formatHiddenBalance(accountInfo?.balance)}</span>
                        )}
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleBalanceVisibility}
                        className="text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                    <span className="text-xs text-slate-400">Account:</span>
                    <span className="text-sm font-mono tracking-wider">{accountInfo?.accountNumber || "----"}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopy}
                      className="h-6 w-6 p-0 hover:bg-transparent text-slate-400 hover:text-white"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href="/dashboard/transfer" className="flex-1 min-w-[140px]">
                      <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-900/40 py-6 text-base font-semibold transition-all hover:-translate-y-0.5">
                        <ArrowUpRight className="w-5 h-5 mr-2" />
                        Transfer
                      </Button>
                    </Link>
                    <Link href="/dashboard/withdraw" className="flex-1 min-w-[140px]">
                      <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 py-6 text-base font-semibold transition-all hover:-translate-y-0.5">
                        <ArrowDownRight className="w-5 h-5 mr-2" />
                        Withdraw
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="h-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all cursor-pointer group/item flex flex-col justify-between aspect-square">
                      <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center transition-transform group-hover/item:scale-110`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-slate-300 group-hover/item:text-white">{action.label}</span>
                    </div>
                  </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-sm dark:bg-slate-800/50">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-700 px-6 py-4">
                <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-200">Recent Transactions</CardTitle>
                <Link href="/dashboard/transactions">
                  <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400 hover:no-underline font-semibold">
                    Show all <ArrowUpRight className="ml-1 w-3 h-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingTransactions ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full items-center justify-center mb-4">
                      <ArrowLeftRight className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">No transaction history found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
                    {recentTransactions.map((transaction: any) => (
                      <div key={transaction?.reference} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <TransactionItem
                          transaction={transaction}
                          onClick={handleTransactionClick}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-none shadow-sm dark:bg-slate-800/50">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700 px-6 py-4">
                <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-200">Financial Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-emerald-500 text-white rounded-lg">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Net Income</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      +${quickStats?.totalDeposited?.toLocaleString() || "0"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total revenue this period</p>
                  </div>

                  <div className="p-4 bg-rose-50 dark:bg-rose-500/5 rounded-xl border border-rose-100 dark:border-rose-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-rose-500 text-white rounded-lg">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Total Output</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      -${quickStats?.totalWithdrawn?.toLocaleString() || "0"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total expenses/withdrawals</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Spending Goal</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-200">72%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[72%] rounded-full shadow-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 border-none shadow-lg text-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Target className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">Premium Support</h3>
                <p className="text-indigo-100 text-sm mb-4">Get direct access to our specialist wealth managers 24/7.</p>
                <Button variant="secondary" className="w-full bg-white text-blue-700 hover:bg-slate-100 font-bold border-none">
                  Contact Advisor
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <TransactionReceipt
          isOpen={!!selectedTransaction}
          onClose={() => handleTransactionClick(null)}
          transaction={selectedTransaction}
        />
      </div>
    </div>
  )
}
