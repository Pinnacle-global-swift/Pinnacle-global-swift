'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Calendar, Download, Filter, Search } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from '@/components/date-range-picker'
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface Transaction {
  type: 'withdrawal' | 'deposit' | 'transfer';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  description: string;
  createdAt: string;
  balanceAfter: number;
}

interface TransactionResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    };
  };
}

export default function TransactionsPage() {
 const [transactions, setTransactions] = useState<any[]>([])
 const [loading, setLoading] = useState(true)
 const [searchTerm, setSearchTerm] = useState('')
 const [transactionType, setTransactionType] = useState<string | null>(null)
 const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null)
 const [currentPage, setCurrentPage] = useState(1)
 const [totalPages, setTotalPages] = useState(1)
 const { toast } = useToast()

 useEffect(() => {
   fetchTransactions()
 }, [currentPage, transactionType, dateRange])

 const fetchTransactions = async () => {
   try {
     setLoading(true)
     const response = await api.transactions(currentPage, 20);
     if (response?.success) {
       setTransactions(response.data.transactions)
       setTotalPages(response.data.pagination.pages)
     } else {
       toast({
         title: "Error",
         description: "Failed to fetch transactions. Please try again.",
         type:"success"
       })
     }
   } catch (error) {
     console.error('Error fetching transactions:', error)
     toast({
       title: "Error",
       description: "An unexpected error occurred. Please try again.",
  type:"error"
     })
   } finally {
     setLoading(false)
   }
 }

 const getTransactionIcon = (type: string) => {
   switch (type.toLowerCase()) {
     case 'deposit':
       return <ArrowDownRight className="w-4 h-4 text-green-500" />
     case 'withdrawal':
       return <ArrowUpRight className="w-4 h-4 text-red-500" />
     case 'transfer':
       return <ArrowLeftRight className="w-4 h-4 text-blue-500" />
     default:
       return null
   }
 }



 const getStatusBadge = (status: string) => {
  console.log(status)
   switch (status.toLowerCase()) {
     case 'completed':
       return <Badge variant="default" className="bg-green-500">Completed</Badge>
     case 'processing':
       return <Badge variant="secondary">processing</Badge>
     case 'failed':
       return <Badge variant="destructive">Failed</Badge>
     default:
       return null
   }
 }

 const filteredTransactions = transactions?.filter(transaction =>
   transaction?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
   transaction?.reference?.toLowerCase()?.includes(searchTerm?.toLowerCase())
 )

 return (
   <div className="space-y-8">
     <div className="flex justify-between items-center">
       <h2 className="text-3xl font-bold">Transactions</h2>
       <Button variant="outline">
         <Download className="w-4 h-4 mr-2" />
         Export
       </Button>
     </div>

     <Card>
       <CardHeader>
         <CardTitle className="text-lg font-medium">Filters</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="relative">
             <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder="Search transactions..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-9"
             />
           </div>
           <Select value={transactionType || undefined} onValueChange={setTransactionType}>
             <SelectTrigger>
               <SelectValue placeholder="Transaction type" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All types</SelectItem>
               <SelectItem value="deposit">Deposit</SelectItem>
               <SelectItem value="withdrawal">Withdrawal</SelectItem>
               <SelectItem value="transfer">Transfer</SelectItem>
             </SelectContent>
           </Select>
           <div className="md:col-span-2">
             <DatePickerWithRange 
               dateRange={dateRange}
               setDateRange={setDateRange}
             />
           </div>
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardContent className="p-0">
         {loading ? (
           <LoadingSpinner />
      
         ) : (
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Type</TableHead>
                 <TableHead>Date</TableHead>
                 <TableHead>Description</TableHead>
                 <TableHead>Reference</TableHead>
                 <TableHead>Amount</TableHead>
                 <TableHead>Balance After</TableHead>
                 <TableHead>Status</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {filteredTransactions.map((transaction) => (
                 <TableRow key={transaction.reference}>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       {getTransactionIcon(transaction.type)}
                       <span className="capitalize">{transaction.type}</span>
                     </div>
                   </TableCell>
                   <TableCell>
                     {format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm')}
                   </TableCell>
                   <TableCell>{transaction.description}</TableCell>
                   <TableCell>
                     <code className="px-2 py-1 bg-muted rounded-md">
                       {transaction.reference}
                     </code>
                   </TableCell>
                   <TableCell>
                     <span className={
                       transaction.type.toLowerCase() === 'deposit' 
                         ? 'text-green-500' 
                         : transaction.type.toLowerCase() === 'withdrawal'
                         ? 'text-red-500'
                         : 'text-blue-500'
                     }>
                       ${transaction.amount.toFixed(2)}
                     </span>
                   </TableCell>
                   <TableCell>${transaction.balanceAfter.toFixed(2)}</TableCell>
                   <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         )}
       </CardContent>
     </Card>

     {totalPages > 1 && (
       <div className="flex justify-center gap-2">
         <Button
           variant="outline"
           onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
           disabled={currentPage === 1}
         >
           Previous
         </Button>
         <Button
           variant="outline"
           onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
           disabled={currentPage === totalPages}
         >
           Next
         </Button>
       </div>
     )}
   </div>
 )
}

