"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, CreditCard, ArrowRight, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  id: string
  service: string
  category: string
  date: string
  time: string
  guests: number
  price: string
  status: "upcoming" | "past" | "cancelled"
  location: string
  reference: string
}

export default function UserBookings() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const { toast } = useToast()

  // Mock bookings data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "b1",
      service: "Signature Massage",
      category: "spa",
      date: "2025-04-02",
      time: "10:30 AM",
      guests: 1,
      price: "120.00",
      status: "upcoming",
      location: "Spa & Wellness Center, 2nd Floor",
      reference: "SPA12345",
    },
    {
      id: "b2",
      service: "Main Restaurant",
      category: "dining",
      date: "2025-04-01",
      time: "7:00 PM",
      guests: 2,
      price: "170.00",
      status: "upcoming",
      location: "Main Restaurant, Lobby Level",
      reference: "DIN54321",
    },
    {
      id: "b3",
      service: "City Tour",
      category: "activities",
      date: "2025-03-30",
      time: "9:00 AM",
      guests: 2,
      price: "130.00",
      status: "past",
      location: "Meet at Hotel Lobby",
      reference: "ACT78901",
    },
    {
      id: "b4",
      service: "Airport Transfer",
      category: "transport",
      date: "2025-04-02",
      time: "11:00 AM",
      guests: 2,
      price: "75.00",
      status: "upcoming",
      location: "Hotel Entrance",
      reference: "TRN23456",
    },
    {
      id: "b5",
      service: "Luxury Facial",
      category: "spa",
      date: "2025-03-29",
      time: "2:00 PM",
      guests: 1,
      price: "150.00",
      status: "past",
      location: "Spa & Wellness Center, 2nd Floor",
      reference: "SPA67890",
    },
    {
      id: "b6",
      service: "Yacht Excursion",
      category: "activities",
      date: "2025-03-28",
      time: "10:00 AM",
      guests: 4,
      price: "1000.00",
      status: "cancelled",
      location: "Marina Dock B",
      reference: "ACT34567",
    },
  ])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "spa":
        return <Calendar className="h-4 w-4" />
      case "dining":
        return <Clock className="h-4 w-4" />
      case "activities":
        return <MapPin className="h-4 w-4" />
      case "transport":
        return <Users className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "past":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status: "cancelled" } : booking)))

    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    })
  }

  const requestAddOn = (id: string, addon: string) => {
    toast({
      title: "Add-on Requested",
      description: `Your request for ${addon} has been submitted.`,
    })
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => booking.status === activeTab)

  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {activeTab === "upcoming"
                  ? "Upcoming Bookings"
                  : activeTab === "past"
                    ? "Past Bookings"
                    : "Cancelled Bookings"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredBookings.length} {filteredBookings.length === 1 ? "booking" : "bookings"}
              </p>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No {activeTab} bookings found</p>
                {activeTab !== "upcoming" && (
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab("upcoming")}>
                    View Upcoming Bookings
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className={cn(
                      "overflow-hidden",
                      booking.status === "cancelled" && "border-red-200 dark:border-red-800",
                    )}
                  >
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{booking.service}</h3>
                            <p className="text-sm text-muted-foreground">{booking.location}</p>
                          </div>
                          <Badge variant="outline" className={cn(getStatusColor(booking.status))}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>
                              {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>${booking.price}</span>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-muted-foreground">Reference: {booking.reference}</div>
                      </div>

                      {booking.status === "upcoming" && (
                        <div className="border-t p-3 bg-muted/20 flex justify-between items-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                                <DialogDescription>
                                  {booking.service} - {booking.reference}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="font-medium">{formatDate(booking.date)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Time</p>
                                    <p className="font-medium">{booking.time}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Guests</p>
                                    <p className="font-medium">{booking.guests}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Total</p>
                                    <p className="font-medium">${booking.price}</p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm text-muted-foreground">Location</p>
                                  <p className="font-medium">{booking.location}</p>
                                </div>

                                <div>
                                  <p className="text-sm text-muted-foreground">Reference Number</p>
                                  <p className="font-medium">{booking.reference}</p>
                                </div>

                                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 border border-blue-200 dark:border-blue-800">
                                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400">
                                    Special Instructions
                                  </h4>
                                  <p className="text-sm mt-1">
                                    Please arrive 15 minutes before your scheduled time. Bring your room key for
                                    verification.
                                  </p>
                                </div>
                              </div>

                              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                <Button variant="outline" className="flex-1" onClick={() => cancelBooking(booking.id)}>
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel Booking
                                </Button>
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modify Booking
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Add-ons
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {booking.category === "spa" && (
                                <>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Aromatherapy")}>
                                    Add Aromatherapy ($25)
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Hot Stone")}>
                                    Add Hot Stone Treatment ($35)
                                  </DropdownMenuItem>
                                </>
                              )}

                              {booking.category === "dining" && (
                                <>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Wine Pairing")}>
                                    Add Wine Pairing ($45)
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Dessert")}>
                                    Add Special Dessert ($15)
                                  </DropdownMenuItem>
                                </>
                              )}

                              {booking.category === "activities" && (
                                <>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Private Guide")}>
                                    Add Private Guide ($50)
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Lunch")}>
                                    Add Lunch Package ($30)
                                  </DropdownMenuItem>
                                </>
                              )}

                              {booking.category === "transport" && (
                                <>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Premium Vehicle")}>
                                    Upgrade to Premium Vehicle ($35)
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Extra Stop")}>
                                    Add Extra Stop ($15)
                                  </DropdownMenuItem>
                                </>
                              )}

                              <DropdownMenuItem onClick={() => requestAddOn(booking.id, "Special Request")}>
                                Add Special Request
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}

                      {booking.status === "past" && (
                        <div className="border-t p-3 bg-muted/20 flex justify-between items-center">
                          <Button variant="ghost" size="sm">
                            View Receipt
                          </Button>
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                        </div>
                      )}

                      {booking.status === "cancelled" && (
                        <div className="border-t p-3 bg-muted/20 flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            Cancelled on {new Date().toLocaleDateString()}
                          </p>
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

