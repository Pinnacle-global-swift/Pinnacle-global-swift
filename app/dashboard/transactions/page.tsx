"use client"

import { useState, useEffect, useMemo, useCallback, memo } from "react"
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
import { CircularSpinner } from "@/components/ui/loading-spinner"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { TransactionReceipt } from '@/components/dashboard/TransactionReceipt'

interface Transaction {
  type: "withdrawal" | "deposit" | "transfer"
  amount: number
  status: "completed" | "pending" | "failed"
  reference: string
  description: string
  date: string
  balanceAfter: number
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

const TransactionRow = memo(({
  transaction,
  onSelect
}: {
  transaction: Transaction
  onSelect: (t: Transaction) => void
}) => {
  return (
    <TableRow
      className="border-b border-white/10 hover:bg-white/5 cursor-pointer"
      onClick={() => onSelect(transaction)}
    >
      <TableCell className="text-white">
        <div className="flex items-center gap-2">
          {getTransactionIcon(transaction.type)}
          <span className="capitalize">{transaction.type}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-300">{format(new Date(transaction.date), "MMM dd, yyyy HH:mm")}</TableCell>
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
})

TransactionRow.displayName = "TransactionRow"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionType, setTransactionType] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const showErrorToast = useCallback((message: string) => {
    toast({
      title: "Error",
      description: message,
      type: "error",
    })
  }, [toast])

  const fetchTransactions = useCallback(async (isPagination = false) => {
    try {
      if (isPagination) {
        setPaginationLoading(true)
      } else {
        setLoading(true)
      }
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
      if (isPagination) {
        setPaginationLoading(false)
      } else {
        setLoading(false)
      }
    }
  }, [currentPage, showErrorToast])

  useEffect(() => {
    fetchTransactions(currentPage > 1)
  }, [fetchTransactions, currentPage])

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [transactions, searchTerm])

  const handleTransactionSelect = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }, [])

  return (
    <div className="min-h-full bg-[#f8fafc] dark:bg-[#0f172a] p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Ledger & History</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Audit and export your complete record of transactions</p>
          </div>
          <Button variant="outline" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 h-11 px-6 font-bold shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Audit Log
          </Button>
        </div>

        <Card className="border-none shadow-xl bg-white dark:bg-slate-800 overflow-hidden">
          <CardHeader className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700/50">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by description or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 h-11 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
              <Select value={transactionType || undefined} onValueChange={setTransactionType}>
                <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 h-11 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 font-semibold">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 border-slate-700">
                  <SelectItem value="all">Every Transaction</SelectItem>
                  <SelectItem value="deposit">Deposits Only</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals Only</SelectItem>
                  <SelectItem value="transfer">Transfers Only</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-11">
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 flex items-center justify-center min-h-[400px]">
                <CircularSpinner size="lg" variant="default" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-900 group hover:bg-slate-50 dark:hover:bg-slate-900">
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Type</TableHead>
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Timestamp</TableHead>
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Description</TableHead>
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Reference ID</TableHead>
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Amount</TableHead>
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Post-Balance</TableHead>
                      <TableHead className="text-xs font-black uppercase tracking-widest text-slate-500 py-5 px-6">Verification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.reference}
                        onClick={() => handleTransactionSelect(transaction)}
                        className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer transition-colors group"
                      >
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg transition-transform group-hover:scale-110",
                              transaction.type === 'deposit' ? "bg-emerald-500/10" :
                                transaction.type === 'withdrawal' ? "bg-rose-500/10" : "bg-blue-500/10"
                            )}>
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">{transaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{format(new Date(transaction.date), "MMM dd, yyyy")}</p>
                          <p className="text-xs font-medium text-slate-400">{format(new Date(transaction.date), "HH:mm:ss")}</p>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 line-clamp-1">{transaction.description}</span>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <code className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-md uppercase tracking-tighter">
                            {transaction.reference}
                          </code>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <span
                            className={cn(
                              "font-black text-base",
                              transaction.type === "deposit"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : transaction.type === "withdrawal"
                                  ? "text-rose-600 dark:text-rose-400"
                                  : "text-blue-600 dark:text-blue-400",
                            )}
                          >
                            {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">${transaction?.balanceAfter.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-700/30">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || paginationLoading}
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 h-10 px-4 font-bold rounded-lg shadow-sm"
                >
                  {paginationLoading && currentPage > 1 ? (
                    <CircularSpinner size="sm" variant="default" className="mr-2" />
                  ) : null}
                  Prev
                </Button>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Page <span className="text-slate-800 dark:text-white">{currentPage}</span> of <span className="text-slate-800 dark:text-white">{totalPages}</span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || paginationLoading}
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 h-10 px-4 font-bold rounded-lg shadow-sm"
                >
                  {paginationLoading && currentPage < totalPages ? (
                    <CircularSpinner size="sm" variant="default" className="mr-2" />
                  ) : null}
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      <TransactionReceipt
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  )
}
