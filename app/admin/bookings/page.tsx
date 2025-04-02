"use client"

import { useState } from "react"
import {
  Calendar,
  Search,
  Filter,
  Download,
  SpadeIcon as Spa,
  Utensils,
  Compass,
  Car,
  Check,
  X,
  Clock,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  id: string
  service: string
  category: string
  guest: string
  room: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  payment: "paid" | "pending" | "failed"
  notes?: string
  guests: number
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const { toast } = useToast()

  // Mock bookings data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "B1001",
      service: "Swedish Massage",
      category: "spa",
      guest: "Alex Johnson",
      room: "507",
      date: "2025-03-31",
      time: "10:30 AM",
      status: "confirmed",
      payment: "paid",
      guests: 1,
      notes: "First-time guest, allergic to lavender",
    },
    {
      id: "B1002",
      service: "Fine Dining Restaurant",
      category: "dining",
      guest: "Emma Wilson",
      room: "302",
      date: "2025-03-31",
      time: "7:00 PM",
      status: "confirmed",
      payment: "pending",
      guests: 2,
      notes: "Anniversary dinner, requested window table",
    },
    {
      id: "B1003",
      service: "Yoga Class",
      category: "activities",
      guest: "Michael Brown",
      room: "415",
      date: "2025-03-31",
      time: "9:00 AM",
      status: "pending",
      payment: "pending",
      guests: 1,
    },
    {
      id: "B1004",
      service: "Airport Pickup",
      category: "transport",
      guest: "Sarah Davis",
      room: "621",
      date: "2025-03-31",
      time: "2:15 PM",
      status: "confirmed",
      payment: "paid",
      guests: 3,
      notes: "Flight AA1234, Terminal 3",
    },
    {
      id: "B1005",
      service: "Deep Tissue Massage",
      category: "spa",
      guest: "Robert Miller",
      room: "218",
      date: "2025-03-31",
      time: "3:00 PM",
      status: "cancelled",
      payment: "failed",
      guests: 1,
      notes: "Cancelled due to illness",
    },
    {
      id: "B1006",
      service: "Pool Bar",
      category: "dining",
      guest: "Jennifer Lee",
      room: "405",
      date: "2025-03-31",
      time: "1:30 PM",
      status: "completed",
      payment: "paid",
      guests: 4,
    },
    {
      id: "B1007",
      service: "City Tour",
      category: "activities",
      guest: "David Wilson",
      room: "512",
      date: "2025-04-01",
      time: "10:00 AM",
      status: "confirmed",
      payment: "paid",
      guests: 2,
    },
    {
      id: "B1008",
      service: "Couples Massage",
      category: "spa",
      guest: "Jessica Taylor",
      room: "619",
      date: "2025-04-01",
      time: "11:00 AM",
      status: "confirmed",
      payment: "paid",
      guests: 2,
      notes: "Celebrating honeymoon",
    },
    {
      id: "B1009",
      service: "Taxi Service",
      category: "transport",
      guest: "Thomas Anderson",
      room: "301",
      date: "2025-04-01",
      time: "6:30 PM",
      status: "pending",
      payment: "pending",
      guests: 2,
    },
    {
      id: "B1010",
      service: "Breakfast Buffet",
      category: "dining",
      guest: "Lisa Johnson",
      room: "420",
      date: "2025-04-01",
      time: "8:00 AM",
      status: "confirmed",
      payment: "paid",
      guests: 3,
    },
  ])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "spa":
        return <Spa className="h-4 w-4" />
      case "dining":
        return <Utensils className="h-4 w-4" />
      case "activities":
        return <Compass className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "paid":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const updateBookingStatus = (id: string, status: "confirmed" | "pending" | "cancelled" | "completed") => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)))

    toast({
      title: "Booking updated",
      description: `Booking ${id} status changed to ${status}`,
    })
  }

  // Filter bookings based on active tab, search query, and filters
  const filteredBookings = bookings.filter((booking) => {
    // Filter by tab
    if (activeTab !== "all" && booking.category !== activeTab) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.service.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.room.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by date
    if (dateFilter && booking.date !== dateFilter) {
      return false
    }

    // Filter by status
    if (statusFilter && booking.status !== statusFilter) {
      return false
    }

    return true
  })

  const exportCSV = () => {
    toast({
      title: "Export started",
      description: "Your bookings data is being exported to CSV",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage and track all guest bookings and reservations</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest, service, or booking ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div className="w-40">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_dates">All Dates</SelectItem>
                <SelectItem value="2025-03-31">Today</SelectItem>
                <SelectItem value="2025-04-01">Tomorrow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_statuses">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="spa">Spa</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Bookings Overview</CardTitle>
                <CardDescription>
                  {filteredBookings.length} booking{filteredBookings.length !== 1 ? "s" : ""} found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bookings found matching your filters</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setDateFilter("")
                    setStatusFilter("")
                    setActiveTab("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium">Booking ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Guest</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Room</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Date & Time</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Payment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-4 text-sm font-medium">{booking.id}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "h-7 w-7 rounded-full flex items-center justify-center mr-2",
                                booking.category === "spa"
                                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                  : booking.category === "dining"
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                    : booking.category === "activities"
                                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                              )}
                            >
                              {getCategoryIcon(booking.category)}
                            </div>
                            {booking.service}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{booking.guest}</td>
                        <td className="py-3 px-4 text-sm">{booking.room}</td>
                        <td className="py-3 px-4 text-sm">
                          <div>
                            <div className="font-medium">
                              {new Date(booking.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-muted-foreground text-xs flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {booking.time}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge
                            variant="outline"
                            className={cn("px-2 py-1 rounded-full text-xs", getStatusColor(booking.status))}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge
                            variant="outline"
                            className={cn("px-2 py-1 rounded-full text-xs", getPaymentColor(booking.payment))}
                          >
                            {booking.payment.charAt(0).toUpperCase() + booking.payment.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="text-green-600 dark:text-green-400"
                                onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Confirm
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-blue-600 dark:text-blue-400"
                                onClick={() => updateBookingStatus(booking.id, "completed")}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={() => updateBookingStatus(booking.id, "cancelled")}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

