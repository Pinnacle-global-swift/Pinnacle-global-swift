'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, Search, CreditCard, Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CardRequest {
  id: number;
  userId: number;
  userName: string;
  cardType: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

export default function AdminCards() {
  const [cardRequests, setCardRequests] = useState<CardRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCard, setSelectedCard] = useState<CardRequest | null>(null)

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setCardRequests([
        { id: 1, userId: 101, userName: "John Doe", cardType: "Platinum", status: "pending", requestDate: "2023-05-10" },
        { id: 2, userId: 102, userName: "Jane Smith", cardType: "Gold", status: "approved", requestDate: "2023-05-09" },
        { id: 3, userId: 103, userName: "Bob Johnson", cardType: "Silver", status: "rejected", requestDate: "2023-05-08" },
        { id: 4, userId: 104, userName: "Alice Brown", cardType: "Platinum", status: "pending", requestDate: "2023-05-07" },
        { id: 5, userId: 105, userName: "Charlie Davis", cardType: "Gold", status: "approved", requestDate: "2023-05-06" },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredRequests = cardRequests.filter(request =>
    request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.cardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setCardRequests(cardRequests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ))
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
      <h2 className="text-3xl font-bold">Card Management</h2>
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search card requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Card Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Card Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.cardType}</TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === 'approved' ? 'default' :
                      request.status === 'rejected' ? 'destructive' :
                      'secondary'
                    }>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCard(request)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Card Request Details</DialogTitle>
                          <DialogDescription>Review and manage card request</DialogDescription>
                        </DialogHeader>
                        {selectedCard && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>User Name</Label>
                                <p className="font-medium">{selectedCard.userName}</p>
                              </div>
                              <div>
                                <Label>User ID</Label>
                                <p className="font-medium">{selectedCard.userId}</p>
                              </div>
                              <div>
                                <Label>Card Type</Label>
                                <p className="font-medium">{selectedCard.cardType}</p>
                              </div>
                              <div>
                                <Label>Request Date</Label>
                                <p className="font-medium">{selectedCard.requestDate}</p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <Badge variant={
                                  selectedCard.status === 'approved' ? 'default' :
                                  selectedCard.status === 'rejected' ? 'destructive' :
                                  'secondary'
                                }>
                                  {selectedCard.status.charAt(0).toUpperCase() + selectedCard.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            {selectedCard.status === 'pending' && (
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => handleStatusChange(selectedCard.id, 'rejected')}>
                                  Reject
                                </Button>
                                <Button onClick={() => handleStatusChange(selectedCard.id, 'approved')}>
                                  Approve
                                </Button>
                              </div>
                            )}
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

