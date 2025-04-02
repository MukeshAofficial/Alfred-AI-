"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Search, Filter, Check, X, Clock, User, MapPin, Phone, Mail, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import VendorNavigation from "@/components/vendor/vendor-navigation"

interface Booking {
  id: string
  service: string
  customer: {
    name: string
    email: string
    phone: string
    room?: string
    hotel?: string
  }
  date: string
  time: string
  guests: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  amount: string
  notes?: string
}

export default function VendorBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Mock bookings data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "B1234",
      service: "City Tour",
      customer: {
        name: "Alex Johnson",
        email: "alex@example.com",
        phone: "+1 (555) 123-4567",
        hotel: "Grand Luxury Hotel",
        room: "507",
      },
      date: "2025-04-02",
      time: "10:30 AM",
      guests: 2,
      status: "confirmed",
      amount: "$65.00",
      notes: "Interested in historical landmarks and local cuisine.",
    },
    {
      id: "B1235",
      service: "Airport Transfer",
      customer: {
        name: "Emma Wilson",
        email: "emma@example.com",
        phone: "+1 (555) 987-6543",
        hotel: "Seaside Resort",
        room: "302",
      },
      date: "2025-04-02",
      time: "2:15 PM",
      guests: 1,
      status: "pending",
      amount: "$45.00",
      notes: "Flight AA1234, arriving at Terminal 3.",
    },
    {
      id: "B1236",
      service: "City Tour",
      customer: {
        name: "Michael Brown",
        email: "michael@example.com",
        phone: "+1 (555) 456-7890",
        hotel: "Grand Luxury Hotel",
        room: "415",
      },
      date: "2025-04-03",
      time: "9:00 AM",
      guests: 4,
      status: "confirmed",
      amount: "$130.00",
    },
    {
      id: "B1237",
      service: "Airport Transfer",
      customer: {
        name: "Sarah Davis",
        email: "sarah@example.com",
        phone: "+1 (555) 234-5678",
        hotel: "Mountain View Lodge",
        room: "621",
      },
      date: "2025-04-03",
      time: "4:30 PM",
      guests: 2,
      status: "confirmed",
      amount: "$55.00",
      notes: "Flight DL5678, departing from Terminal 2.",
    },
    {
      id: "B1238",
      service: "Wine Tasting Tour",
      customer: {
        name: "David Miller",
        email: "david@example.com",
        phone: "+1 (555) 876-5432",
        hotel: "Vineyard Resort",
        room: "208",
      },
      date: "2025-04-04",
      time: "1:00 PM",
      guests: 2,
      status: "confirmed",
      amount: "$85.00",
    },
    {
      id: "B1239",
      service: "City Tour",
      customer: {
        name: "Jennifer Lee",
        email: "jennifer@example.com",
        phone: "+1 (555) 345-6789",
        hotel: "Downtown Suites",
        room: "712",
      },
      date: "2025-04-01",
      time: "10:00 AM",
      guests: 3,
      status: "completed",
      amount: "$97.50",
    },
    {
      id: "B1240",
      service: "Airport Transfer",
      customer: {
        name: "Robert Taylor",
        email: "robert@example.com",
        phone: "+1 (555) 654-3210",
        hotel: "Airport Hotel",
        room: "125",
      },
      date: "2025-04-01",
      time: "7:45 AM",
      guests: 1,
      status: "cancelled",
      amount: "$45.00",
      notes: "Cancelled due to flight change.",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const updateBookingStatus = (id: string, newStatus: "confirmed" | "cancelled" | "completed") => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === id) {
          return { ...booking, status: newStatus }
        }
        return booking
      }),
    )

    toast({
      title: "Booking updated",
      description: `Booking ${id} has been ${newStatus}.`,
    })

    if (selectedBooking?.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus })
    }
  }

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsDetailsOpen(true)
  }

  // Filter bookings based on search query and filters
  const filteredBookings = bookings.filter((booking) => {
    // Filter by search query
    if (
      searchQuery &&
      !booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.service.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter && booking.status !== statusFilter) {
      return false
    }

    // Filter by date
    if (dateFilter && booking.date !== dateFilter) {
      return false
    }

    return true
  })

  // Get unique dates for the date filter
  const uniqueDates = [...new Set(bookings.map((booking) => booking.date))].sort()

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bookings</h1>
            <p className="text-muted-foreground">Manage your service bookings</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/vendor/calendar")} className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or service..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
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
                      setStatusFilter("")
                      setDateFilter("")
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
                        <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Date & Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Guests</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{booking.id}</td>
                          <td className="py-3 px-4 text-sm">{booking.service}</td>
                          <td className="py-3 px-4 text-sm">{booking.customer.name}</td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(booking.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            • {booking.time}
                          </td>
                          <td className="py-3 px-4 text-sm">{booking.guests}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(booking.status))}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">{booking.amount}</td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 text-xs"
                                onClick={() => viewBookingDetails(booking)}
                              >
                                Details
                              </Button>
                              {booking.status === "pending" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-green-600"
                                  onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {booking.status === "confirmed" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-blue-600"
                                  onClick={() => updateBookingStatus(booking.id, "completed")}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {(booking.status === "pending" || booking.status === "confirmed") && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600"
                                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
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

        {/* Booking Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                {selectedBooking?.id} • {selectedBooking?.service}
              </DialogDescription>
            </DialogHeader>

            {selectedBooking && (
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Booking Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date & Time</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(selectedBooking.date)} • {selectedBooking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Guests</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedBooking.guests} {selectedBooking.guests === 1 ? "person" : "people"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <Badge
                            variant="outline"
                            className={cn("mt-1 font-normal", getStatusColor(selectedBooking.status))}
                          >
                            {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Amount</p>
                          <p className="text-sm text-muted-foreground">{selectedBooking.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-sm text-muted-foreground">{selectedBooking.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{selectedBooking.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{selectedBooking.customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Hotel & Room</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedBooking.customer.hotel} • Room {selectedBooking.customer.room}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm">{selectedBooking.notes}</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBooking.status === "pending" && (
                      <>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            updateBookingStatus(selectedBooking.id, "confirmed")
                            setIsDetailsOpen(false)
                          }}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Confirm Booking
                        </Button>
                        <Button
                          variant="outline"
                          className="text-red-600"
                          onClick={() => {
                            updateBookingStatus(selectedBooking.id, "cancelled")
                            setIsDetailsOpen(false)
                          }}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Decline Booking
                        </Button>
                      </>
                    )}
                    {selectedBooking.status === "confirmed" && (
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          updateBookingStatus(selectedBooking.id, "completed")
                          setIsDetailsOpen(false)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

