"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
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

export default function DashboardOverview() {
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [accountUser, setAccountUser] = useState<any>(null)
  const [quickStats, setQuickStats] = useState<any>(null)
  const [recentTransactions, setRecentTransactions] = useState<any>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountInfo?.accountNumber)
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
  }

  const chartData = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 3000, expenses: 1398 },
    { name: "Mar", income: 2000, expenses: 9800 },
    { name: "Apr", income: 2780, expenses: 3908 },
    { name: "May", income: 1890, expenses: 4800 },
    { name: "Jun", income: 2390, expenses: 3800 },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="space-y-8 relative z-10 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white backdrop-blur-sm shadow-lg border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=1920&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card background"
              fill
              className="absolute inset-0 object-cover opacity-20 -z-10"
            />
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Welcome back,</p>
                  <p className="font-medium">{accountUser?.fullName}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Total Balance</p>
                  <h2 className="text-3xl font-bold">
                    $
                    {accountInfo?.balance?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Account number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{accountInfo?.accountNumber}</span>
                      <Button variant="ghost" size="icon" onClick={handleCopy} className="focus:outline-none">
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/transfer">
                    <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white w-full border-none">
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Transfer
                    </Button>
                  </Link>
                  <Link href="/dashboard/withdraw">
                    <Button
                      variant="outline"
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full border-none"
                    >
                      <ArrowDownRight className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
                  <Link href="/dashboard/transactions">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-white/10 w-full text-white"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="text-xs">Transactions</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/deposit">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-white/10 text-white w-full"
                    >
                      <Wallet className="w-5 h-5" />
                      <span className="text-xs">Deposit</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/loan">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-white/10 text-white w-full"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-xs">Loan</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/kyc">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center space-y-1 h-auto py-4 hover:bg-white/10 text-white w-full"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-xs">KYC</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm shadow-lg border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">Recent Transactions</CardTitle>
                  <Link href="/dashboard/transactions">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
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
                  <div className="text-center py-8 text-gray-400">No transactions yet</div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map((transaction: any) => (
                      <div
                        key={transaction.reference}
                        className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type.toLowerCase() === "deposit"
                                ? "bg-green-500/20 text-green-400"
                                : transaction.type.toLowerCase() === "withdrawal"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {transaction.type.toLowerCase() === "deposit" ? (
                              <ArrowDownRight className="w-4 h-4" />
                            ) : transaction.type.toLowerCase() === "withdrawal" ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowLeftRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{transaction.description}</p>
                            <p className="text-sm text-gray-400">
                              {format(new Date(transaction.createdAt), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.type.toLowerCase() === "deposit"
                                ? "text-green-400"
                                : transaction.type.toLowerCase() === "withdrawal"
                                  ? "text-red-400"
                                  : "text-blue-400"
                            }`}
                          >
                            ${transaction.amount.toFixed(2)}
                          </p>
                          <Badge
                            variant={
                              transaction.status.toLowerCase() === "completed"
                                ? "default"
                                : transaction.status.toLowerCase() === "pending"
                                  ? "secondary"
                                  : "destructive"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm shadow-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-500/20 p-4 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="text-green-400">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-green-400">This Month</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">Income</p>
                        <p className="text-xl font-bold text-white">${quickStats?.totalDeposited || "0"}.00</p>
                      </div>
                    </div>
                    <div className="bg-purple-500/20 p-4 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="text-red-400">
                          <TrendingDown className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-red-400">This Month</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">Expenses</p>
                        <p className="text-xl font-bold text-white">${quickStats?.totalWithdrawn || "0"}.00</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">Income vs Expenses</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                          itemStyle={{ color: "#E5E7EB" }}
                          labelStyle={{ color: "#E5E7EB" }}
                        />
                        <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm shadow-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 bg-blue-500/20 hover:bg-blue-500/30 text-white border-blue-500/50"
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span>Pay Bills</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 bg-purple-500/20 hover:bg-purple-500/30 text-white border-purple-500/50"
                >
                  <Target className="w-6 h-6 mb-2" />
                  <span>Set Goals</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 bg-green-500/20 hover:bg-green-500/30 text-white border-green-500/50"
                >
                  <Receipt className="w-6 h-6 mb-2" />
                  <span>Invoices</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 bg-yellow-500/20 hover:bg-yellow-500/30 text-white border-yellow-500/50"
                >
                  <Bell className="w-6 h-6 mb-2" />
                  <span>Notifications</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </div>
  )
}

