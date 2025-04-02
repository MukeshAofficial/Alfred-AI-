"use client"

import { useState } from "react"
import {
  Calendar,
  Hotel,
  Users,
  TrendingUp,
  Clock,
  Plus,
  Utensils,
  SpadeIcon as Spa,
  Car,
  Compass,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  // Mock data
  const stats = {
    bookingsToday: 12,
    availableSlots: {
      spa: { total: 24, booked: 18 },
      dining: { total: 40, booked: 22 },
      activities: { total: 15, booked: 8 },
      transport: { total: 30, booked: 15 },
    },
    occupiedRooms: 42,
    totalRooms: 50,
    pendingRequests: 7,
  }

  const popularServices = [
    { name: "Couples Massage", category: "spa", bookings: 8 },
    { name: "Fine Dining Restaurant", category: "dining", bookings: 12 },
    { name: "City Tour", category: "activities", bookings: 6 },
    { name: "Airport Transfer", category: "transport", bookings: 9 },
  ]

  const recentBookings = [
    {
      id: "B1234",
      service: "Swedish Massage",
      guest: "Alex Johnson",
      room: "507",
      time: "10:30 AM",
      status: "confirmed",
    },
    {
      id: "B1235",
      service: "Dinner Reservation",
      guest: "Emma Wilson",
      room: "302",
      time: "7:00 PM",
      status: "confirmed",
    },
    {
      id: "B1236",
      service: "Yoga Class",
      guest: "Michael Brown",
      room: "415",
      time: "9:00 AM",
      status: "pending",
    },
    {
      id: "B1237",
      service: "Airport Pickup",
      guest: "Sarah Davis",
      room: "621",
      time: "2:15 PM",
      status: "confirmed",
    },
  ]

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
        return <Plus className="h-4 w-4" />
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your hotel today.</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/upload-services")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/admin/bookings")}>
            View All Bookings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Bookings Today</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.bookingsToday}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400"
                    onClick={() => router.push("/admin/bookings")}
                  >
                    View details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Room Occupancy</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {stats.occupiedRooms}/{stats.totalRooms}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Hotel className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={(stats.occupiedRooms / stats.totalRooms) * 100}
                    className="h-2 bg-green-100 dark:bg-green-900/30"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}% occupancy rate
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.pendingRequests}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-sm text-amber-600 dark:text-amber-400"
                    onClick={() => router.push("/admin/staff")}
                  >
                    Assign staff
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Guests</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.occupiedRooms * 1.8}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-sm text-purple-600 dark:text-purple-400"
                    onClick={() => router.push("/admin/rooms")}
                  >
                    View guest details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Available Slots Remaining</CardTitle>
                <CardDescription>Today's availability for bookable services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(stats.availableSlots).map(([category, data]) => {
                    const availablePercentage = ((data.total - data.booked) / data.total) * 100
                    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            <span className="ml-2 text-sm font-medium">{categoryName}</span>
                          </div>
                          <span className="text-sm">
                            {data.total - data.booked} of {data.total} available
                          </span>
                        </div>
                        <Progress
                          value={availablePercentage}
                          className={cn(
                            "h-2",
                            availablePercentage > 50
                              ? "bg-green-100 dark:bg-green-900/30"
                              : availablePercentage > 20
                                ? "bg-amber-100 dark:bg-amber-900/30"
                                : "bg-red-100 dark:bg-red-900/30",
                          )}
                        />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/admin/upload-services")}>
                  Manage Service Availability
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
                <CardDescription>Most booked services today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                            service.category === "spa"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                              : service.category === "dining"
                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                : service.category === "activities"
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                          )}
                        >
                          {getCategoryIcon(service.category)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{service.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                          <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {service.bookings}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("services")}>
                  View All Services
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest service bookings from guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium">Booking ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Guest</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Room</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Time</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-4 text-sm">{booking.id}</td>
                        <td className="py-3 px-4 text-sm">{booking.service}</td>
                        <td className="py-3 px-4 text-sm">{booking.guest}</td>
                        <td className="py-3 px-4 text-sm">{booking.room}</td>
                        <td className="py-3 px-4 text-sm">{booking.time}</td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                            )}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/admin/bookings")}>
                View All Bookings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Today's Bookings</CardTitle>
              <CardDescription>Manage and view all bookings for today</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Bookings content will be displayed here.</p>
              <Button className="mt-4" onClick={() => router.push("/admin/bookings")}>
                Go to Bookings Page
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Service Management</CardTitle>
              <CardDescription>Manage your hotel services and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Services content will be displayed here.</p>
              <Button className="mt-4" onClick={() => router.push("/admin/upload-services")}>
                Manage Services
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

