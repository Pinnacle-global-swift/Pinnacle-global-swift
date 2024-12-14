'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning';
  message: string;
  date: string;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setNotifications([
        { id: 1, type: 'info', message: 'New feature: Card management is now available', date: '2023-05-15 09:00', read: false },
        { id: 2, type: 'success', message: 'Your last transaction was successful', date: '2023-05-14 14:30', read: false },
        { id: 3, type: 'warning', message: 'Please update your contact information', date: '2023-05-13 11:15', read: true },
        { id: 4, type: 'info', message: 'Scheduled maintenance on May 20th', date: '2023-05-12 16:45', read: true },
        { id: 5, type: 'success', message: 'Your account verification is complete', date: '2023-05-11 10:20', read: true },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Notifications</h2>
        <Button onClick={markAllAsRead}>Mark all as read</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`flex items-center p-4 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-white border border-gray-200'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                  notification.type === 'success' ? 'bg-green-100 text-green-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {notification.type === 'info' && <Info className="w-5 h-5" />}
                  {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                  {notification.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
                {!notification.read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                    Mark as read
                  </Button>
                )}
                <Badge variant={notification.read ? "secondary" : "default"} className="ml-2">
                  {notification.read ? "Read" : "Unread"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

