'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search, Eye, ArrowUpRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  balance: number;
  joinDate: string;
  lastLogin: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [transferAmount, setTransferAmount] = useState('')

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", balance: 5000, joinDate: "2023-01-15", lastLogin: "2023-05-10" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", balance: 2500, joinDate: "2023-02-20", lastLogin: "2023-05-09" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", balance: 3000, joinDate: "2023-03-10", lastLogin: "2023-05-11" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager", balance: 7500, joinDate: "2023-01-05", lastLogin: "2023-05-08" },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "User", balance: 1000, joinDate: "2023-04-01", lastLogin: "2023-05-07" },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTransfer = (userId: number) => {
    const amount = parseFloat(transferAmount)
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount")
      return
    }

    // Simulating transfer
    setUsers(users.map(user => 
      user.id === userId ? {...user, balance: user.balance + amount} : user
    ))

    setTransferAmount('')
    alert(`Successfully transferred $${amount} to ${selectedUser?.name}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">User Management</h2>
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button>Add New User</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Manage and view details of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>${user.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Details</DialogTitle>
                          <DialogDescription>View and manage user information</DialogDescription>
                        </DialogHeader>
                        {selectedUser && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Name</Label>
                                <p className="font-medium">{selectedUser.name}</p>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <p className="font-medium">{selectedUser.email}</p>
                              </div>
                              <div>
                                <Label>Role</Label>
                                <p className="font-medium">{selectedUser.role}</p>
                              </div>
                              <div>
                                <Label>Balance</Label>
                                <p className="font-medium">${selectedUser.balance.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label>Join Date</Label>
                                <p className="font-medium">{selectedUser.joinDate}</p>
                              </div>
                              <div>
                                <Label>Last Login</Label>
                                <p className="font-medium">{selectedUser.lastLogin}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Transfer Funds</Label>
                              <div className="flex space-x-2">
                                <Input
                                  type="number"
                                  placeholder="Enter amount"
                                  value={transferAmount}
                                  onChange={(e) => setTransferAmount(e.target.value)}
                                />
                                <Button onClick={() => handleTransfer(selectedUser.id)}>
                                  <ArrowUpRight className="w-4 h-4 mr-2" />
                                  Transfer
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

