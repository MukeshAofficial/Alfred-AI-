"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, Clock, DollarSign, Package, PlusCircle, Star, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import VendorNavigation from "@/components/vendor/vendor-navigation"

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = [
    {
      title: "Total Bookings",
      value: "248",
      icon: <Calendar className="h-5 w-5 text-red-500" />,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Services",
      value: "8",
      icon: <Package className="h-5 w-5 text-blue-500" />,
      change: "+2",
      trend: "up",
    },
    {
      title: "Total Revenue",
      value: "$12,458",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      change: "+0.2",
      trend: "up",
    },
  ]

  const recentBookings = [
    {
      id: "B-7829",
      service: "Luxury Spa Treatment",
      guest: "Emma Thompson",
      date: "Today, 2:00 PM",
      status: "confirmed",
      amount: "$120.00",
    },
    {
      id: "B-7828",
      service: "Airport Transfer",
      guest: "Michael Chen",
      date: "Today, 4:30 PM",
      status: "pending",
      amount: "$85.00",
    },
    {
      id: "B-7827",
      service: "Wine Tasting Tour",
      guest: "Sarah Johnson",
      date: "Tomorrow, 11:00 AM",
      status: "confirmed",
      amount: "$175.00",
    },
    {
      id: "B-7826",
      service: "Private Yacht Tour",
      guest: "David Miller",
      date: "Jul 15, 9:00 AM",
      status: "completed",
      amount: "$350.00",
    },
    {
      id: "B-7825",
      service: "Gourmet Dinner",
      guest: "Jessica Williams",
      date: "Jul 14, 7:30 PM",
      status: "completed",
      amount: "$220.00",
    },
  ]

  const upcomingServices = [
    {
      id: 1,
      name: "Airport Transfer",
      time: "Today, 4:30 PM",
      guest: "Michael Chen",
      status: "On time",
    },
    {
      id: 2,
      name: "Spa Treatment",
      time: "Today, 5:00 PM",
      guest: "Emma Thompson",
      status: "On time",
    },
    {
      id: 3,
      name: "Wine Tasting Tour",
      time: "Tomorrow, 11:00 AM",
      guest: "Sarah Johnson",
      status: "On time",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      service: "Luxury Spa Treatment",
      guest: "Emma Thompson",
      rating: 5,
      comment: "Absolutely amazing experience! The staff was professional and attentive.",
      date: "2 days ago",
    },
    {
      id: 2,
      service: "Private Yacht Tour",
      guest: "David Miller",
      rating: 4,
      comment: "Great tour, beautiful views. The captain was very knowledgeable.",
      date: "3 days ago",
    },
    {
      id: 3,
      service: "Gourmet Dinner",
      guest: "Jessica Williams",
      rating: 5,
      comment: "The food was exquisite and the service was impeccable.",
      date: "5 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <VendorNavigation />

      <div className="p-4 sm:p-6 md:p-8 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back! Here's what's happening with your services.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline">
              <Link href="/vendor/services">
                <Package className="mr-2 h-4 w-4" />
                Manage Services
              </Link>
            </Button>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/vendor/services/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Service
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">{stat.icon}</div>
                </div>
                <div
                  className={`mt-2 text-xs font-medium ${
                    stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Services</TabsTrigger>
            <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Bookings</CardTitle>
                  <CardDescription>Your latest 3 bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Users className="mr-1 h-3 w-3" />
                            {booking.guest}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {booking.status}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{booking.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                    <Link href="/vendor/bookings">View all bookings</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Services</CardTitle>
                  <CardDescription>Services scheduled for today and tomorrow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="mr-1 h-3 w-3" />
                            {service.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {service.status}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{service.guest}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                    <Link href="/vendor/services">View all services</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
                <CardDescription>Your earnings for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500 dark:text-gray-400">Revenue chart will appear here</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                    <p className="text-xl font-bold mt-1">$4,280</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% from last month</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Month</p>
                    <p className="text-xl font-bold mt-1">$3,820</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+8% from previous</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Projected</p>
                    <p className="text-xl font-bold mt-1">$4,500</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+5% growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>A list of your recent bookings and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{booking.service}</p>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">#{booking.id}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Users className="mr-1 h-3 w-3" />
                          {booking.guest}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="inline mr-1 h-3 w-3" />
                          {booking.date}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {booking.status}
                        </div>
                        <p className="font-medium mt-1">{booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Services</CardTitle>
                <CardDescription>Services scheduled for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          {service.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Users className="mr-1 h-3 w-3" />
                          {service.guest}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {service.status}
                        </div>
                        <Button size="sm" variant="outline" className="ml-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>What your guests are saying about your services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{review.service}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Users className="inline mr-1 h-3 w-3" />
                        {review.guest}
                      </p>
                      <p className="mt-2 text-sm">{review.comment}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

