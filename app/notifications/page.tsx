"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Clock, Calendar, AlertTriangle, ShoppingBag, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "booking",
    title: "Dinner Reservation Confirmed",
    message: "Your reservation at The Grand Bistro for tonight at 7:30 PM has been confirmed.",
    time: "2 hours ago",
    read: false,
    icon: Calendar,
    color: "blue",
  },
  {
    id: "2",
    type: "service",
    title: "Room Cleaning Completed",
    message: "Your room has been cleaned and refreshed as requested.",
    time: "3 hours ago",
    read: true,
    icon: Check,
    color: "green",
  },
  {
    id: "3",
    type: "reminder",
    title: "Spa Appointment Reminder",
    message: "Don't forget your spa appointment tomorrow at 2:00 PM. Please arrive 15 minutes early.",
    time: "5 hours ago",
    read: false,
    icon: Clock,
    color: "purple",
  },
  {
    id: "4",
    type: "alert",
    title: "Fire Alarm Test",
    message: "There will be a routine fire alarm test tomorrow at 10:00 AM. No evacuation is necessary.",
    time: "Yesterday",
    read: true,
    icon: AlertTriangle,
    color: "red",
  },
  {
    id: "5",
    type: "order",
    title: "Room Service Order Delivered",
    message: "Your room service order has been delivered to your room.",
    time: "Yesterday",
    read: true,
    icon: ShoppingBag,
    color: "amber",
  },
  {
    id: "6",
    type: "message",
    title: "Message from Concierge",
    message: "Your requested theater tickets have been arranged. Please collect them from the concierge desk.",
    time: "2 days ago",
    read: true,
    icon: MessageSquare,
    color: "indigo",
  },
]

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getFilteredNotifications = () => {
    if (activeTab === "all") {
      return notifications
    } else if (activeTab === "unread") {
      return notifications.filter((notification) => !notification.read)
    } else {
      return notifications.filter((notification) => notification.type === activeTab)
    }
  }

  const getIconColor = (color) => {
    switch (color) {
      case "blue":
        return "text-blue-500"
      case "green":
        return "text-green-500"
      case "purple":
        return "text-purple-500"
      case "red":
        return "text-red-500"
      case "amber":
        return "text-amber-500"
      case "indigo":
        return "text-indigo-500"
      default:
        return "text-gray-500"
    }
  }

  const getIconBgColor = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-100"
      case "green":
        return "bg-green-100"
      case "purple":
        return "bg-purple-100"
      case "red":
        return "bg-red-100"
      case "amber":
        return "bg-amber-100"
      case "indigo":
        return "bg-indigo-100"
      default:
        return "bg-gray-100"
    }
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Notifications" />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "No unread notifications"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
              Clear All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">
              All
              {notifications.length > 0 && (
                <Badge className="ml-2 bg-gray-100 text-gray-900 hover:bg-gray-100">{notifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-100 text-red-900 hover:bg-red-100">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="service">Services</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {loading ? (
            // Skeleton loading state
            [...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon

              return (
                <Card key={notification.id} className={`${!notification.read ? "border-l-4 border-l-blue-500" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full ${getIconBgColor(notification.color)} flex items-center justify-center`}
                      >
                        <IconComponent className={`h-5 w-5 ${getIconColor(notification.color)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm my-1">{notification.message}</p>
                        <Badge variant="outline" className="text-xs capitalize">
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-500">
                {activeTab === "all"
                  ? "You don't have any notifications yet."
                  : activeTab === "unread"
                    ? "You don't have any unread notifications."
                    : `You don't have any ${activeTab} notifications.`}
              </p>
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  )
}

