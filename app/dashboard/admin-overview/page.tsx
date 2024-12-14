'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, DollarSign, Repeat, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface OverviewData {
  totalUsers: number;
  totalIncome: number;
  totalTransfers: number;
  totalTransactions: number;
  recentTransactions: {
    id: number;
    type: string;
    amount: number;
    date: string;
  }[];
  userGrowth: {
    month: string;
    users: number;
  }[];
}

const dummyData: OverviewData = {
  totalUsers: 1000,
  totalIncome: 500000,
  totalTransfers: 2500,
  totalTransactions: 5000,
  recentTransactions: [
    { id: 1, type: 'Deposit', amount: 1000, date: '2023-05-01' },
    { id: 2, type: 'Withdrawal', amount: 500, date: '2023-05-02' },
    { id: 3, type: 'Transfer', amount: 250, date: '2023-05-03' },
    { id: 4, type: 'Deposit', amount: 2000, date: '2023-05-04' },
    { id: 5, type: 'Withdrawal', amount: 750, date: '2023-05-05' },
  ],
  userGrowth: [
    { month: 'Jan', users: 500 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 750 },
    { month: 'Apr', users: 900 },
    { month: 'May', users: 1000 },
  ],
}

export default function AdminOverview() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setData(dummyData)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Admin Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data?.totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalTransfers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {data?.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'Deposit' ? 'bg-green-100' : 
                    transaction.type === 'Withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'Deposit' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : transaction.type === 'Withdrawal' ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : (
                      <Repeat className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'Deposit' ? 'text-green-600' : 
                      transaction.type === 'Withdrawal' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      ${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

