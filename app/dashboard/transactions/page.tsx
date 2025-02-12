"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Download, Search } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/date-range-picker"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

interface Transaction {
  type: "withdrawal" | "deposit" | "transfer"
  amount: number
  status: "completed" | "pending" | "failed"
  reference: string
  description: string
  createdAt: string
  balanceAfter: number
}

interface TransactionResponse {
  success: boolean
  data: {
    transactions: Transaction[]
    pagination: {
      total: number
      pages: number
      page: number
      limit: number
    }
  }
}

function getTransactionIcon(type: string) {
  switch (type.toLowerCase()) {
    case "deposit":
      return <ArrowDownRight className="w-4 h-4 text-green-400" />
    case "withdrawal":
      return <ArrowUpRight className="w-4 h-4 text-red-400" />
    case "transfer":
      return <ArrowLeftRight className="w-4 h-4 text-blue-400" />
    default:
      return null
  }
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-500/20 text-green-400">
          Completed
        </Badge>
      )
    case "processing":
      return (
        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
          Processing
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="bg-red-500/20 text-red-400">
          Failed
        </Badge>
      )
    default:
      return null
  }
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionType, setTransactionType] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    fetchTransactions()
  }, [currentPage]) //Fixed unnecessary dependencies

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await api.transactions(currentPage, 20)
      if (response?.success) {
        setTransactions(response.data.transactions)
        setTotalPages(response.data.pagination.pages)
      } else {
        showErrorToast("Failed to fetch transactions. Please try again.")
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
      showErrorToast("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const showErrorToast = (message: string) => {
    toast({
      title: "Error",
      description: message,
      type: "error",
    })
  }


  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [transactions, searchTerm])

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg rounded-2xl border border-white/10">
          <CardHeader className="border-b border-white/20 pb-7">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transactions
              </CardTitle>
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-gray-950/50 border-white/20 text-white rounded-xl h-12"
                />
              </div>
              <Select value={transactionType || undefined} onValueChange={setTransactionType}>
                <SelectTrigger className="bg-gray-950/50 border-white/20 text-white rounded-xl h-12">
                  <SelectValue placeholder="Transaction type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-lg rounded-xl">
                  <SelectItem value="all" className="text-white">
                    All types
                  </SelectItem>
                  <SelectItem value="deposit" className="text-white">
                    Deposit
                  </SelectItem>
                  <SelectItem value="withdrawal" className="text-white">
                    Withdrawal
                  </SelectItem>
                  <SelectItem value="transfer" className="text-white">
                    Transfer
                  </SelectItem>
                </SelectContent>
              </Select>
              <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-white/10">
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Description</TableHead>
                      <TableHead className="text-gray-300">Reference</TableHead>
                      <TableHead className="text-gray-300">Amount</TableHead>
                      <TableHead className="text-gray-300">Balance After</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TransactionRow key={transaction.reference} transaction={transaction} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <TableRow className="border-b border-white/10 hover:bg-white/5">
      <TableCell className="text-white">
        <div className="flex items-center gap-2">
          {getTransactionIcon(transaction.type)}
          <span className="capitalize">{transaction.type}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-300">{format(new Date(transaction.createdAt), "MMM dd, yyyy HH:mm")}</TableCell>
      <TableCell className="text-gray-300">{transaction.description}</TableCell>
      <TableCell>
        <code className="px-2 py-1 bg-gray-800/50 rounded-md text-gray-300">{transaction.reference}</code>
      </TableCell>
      <TableCell>
        <span
          className={cn(
            transaction.type === "deposit"
              ? "text-green-400"
              : transaction.type === "withdrawal"
                ? "text-red-400"
                : "text-blue-400",
          )}
        >
          ${transaction.amount.toFixed(2)}
        </span>
      </TableCell>
      <TableCell className="text-gray-300">${transaction?.balanceAfter.toFixed(2)}</TableCell>
      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
    </TableRow>
  )
}

