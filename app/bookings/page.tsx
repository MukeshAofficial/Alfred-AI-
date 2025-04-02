"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Utensils, SpadeIcon as Spa, Ticket } from "lucide-react"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"

// Add the missing import
import { cn } from "@/lib/utils"

// Mock booking data
const bookings = [
  {
    id: "booking1",
    type: "restaurant",
    title: "The Grand Bistro",
    date: "2023-05-15",
    time: "19:30",
    guests: 2,
    status: "confirmed",
    location: "Main Building, Floor 1",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "booking2",
    type: "spa",
    title: "Deep Tissue Massage",
    date: "2023-05-16",
    time: "14:00",
    duration: "60 min",
    status: "confirmed",
    location: "Spa & Wellness Center",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "booking3",
    type: "activity",
    title: "Sunset Yacht Cruise",
    date: "2023-05-17",
    time: "17:30",
    guests: 2,
    status: "pending",
    location: "Marina Dock B",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "booking4",
    type: "restaurant",
    title: "Seaside Grill",
    date: "2023-05-18",
    time: "20:00",
    guests: 4,
    status: "confirmed",
    location: "Beach Level, South Wing",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const isMobile = useMobile()
  const router = useRouter()

  const upcomingBookings = bookings.filter((booking) => new Date(`${booking.date}T${booking.time}`) > new Date())

  const pastBookings = bookings.filter((booking) => new Date(`${booking.date}T${booking.time}`) <= new Date())

  const getBookingIcon = (type) => {
    switch (type) {
      case "restaurant":
        return <Utensils className="h-5 w-5 text-orange-500" />
      case "spa":
        return <Spa className="h-5 w-5 text-blue-500" />
      case "activity":
        return <Ticket className="h-5 w-5 text-purple-500" />
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const handleNewBooking = (type) => {
    switch (type) {
      case "restaurant":
        router.push("/restaurants")
        break
      case "spa":
        router.push("/spa-services")
        break
      case "activity":
        router.push("/explore")
        break
      default:
        router.push("/services")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Bookings & Reservations" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1 pb-20", isMobile ? "pb-20" : "")}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                              <img
                                src={booking.image || "/placeholder.svg"}
                                alt={booking.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    {getBookingIcon(booking.type)}
                                    <h3 className="font-medium">{booking.title}</h3>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      <span>{formatDate(booking.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>{booking.time}</span>
                                      {booking.duration && <span> • {booking.duration}</span>}
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <MapPin className="h-3.5 w-3.5" />
                                      <span>{booking.location}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <span
                                    className={cn(
                                      "text-xs px-2 py-1 rounded-full",
                                      booking.status === "confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800",
                                    )}
                                  >
                                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                      <p className="text-gray-500 mb-6">You don't have any upcoming bookings or reservations.</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <Button onClick={() => handleNewBooking("restaurant")}>Book Restaurant</Button>
                        <Button variant="outline" onClick={() => handleNewBooking("spa")}>
                          Book Spa
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="space-y-4">
                  {pastBookings.length > 0 ? (
                    pastBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden opacity-75">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                              <img
                                src={booking.image || "/placeholder.svg"}
                                alt={booking.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    {getBookingIcon(booking.type)}
                                    <h3 className="font-medium">{booking.title}</h3>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      <span>{formatDate(booking.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>{booking.time}</span>
                                      {booking.duration && <span> • {booking.duration}</span>}
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <MapPin className="h-3.5 w-3.5" />
                                      <span>{booking.location}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                    Completed
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Past Bookings</h3>
                      <p className="text-gray-500">You don't have any past bookings or reservations.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Quick Bookings</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => handleNewBooking("restaurant")}>
                    <Utensils className="mr-2 h-4 w-4" />
                    Book a Restaurant
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleNewBooking("spa")}>
                    <Spa className="mr-2 h-4 w-4" />
                    Book a Spa Treatment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleNewBooking("activity")}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Book an Activity
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/room-dining")}
                  >
                    <Utensils className="mr-2 h-4 w-4" />
                    Order Room Dining
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Need Assistance?</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Our concierge team is available 24/7 to help with your bookings and reservations.
                </p>
                <Button variant="outline" className="w-full" onClick={() => router.push("/concierge")}>
                  Chat with Concierge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

