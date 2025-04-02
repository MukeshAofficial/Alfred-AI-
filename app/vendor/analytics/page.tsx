"use client"

import { useState } from "react"
import {
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  Filter,
  Download,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Star,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VendorNavigation from "@/components/vendor/vendor-navigation"
import { cn } from "@/lib/utils"

export default function VendorAnalyticsPage() {
  const [periodFilter, setPeriodFilter] = useState("month")
  const [serviceFilter, setServiceFilter] = useState("all")

  // Mock analytics data
  const analyticsData = {
    totalBookings: 248,
    totalRevenue: 12458.75,
    averageRating: 4.8,
    conversionRate: 68.5,
    bookingsByService: [
      { name: "City Tour", bookings: 82, revenue: 5330.0 },
      { name: "Airport Transfer", bookings: 65, revenue: 2925.0 },
      { name: "Wine Tasting Tour", bookings: 45, revenue: 3825.0 },
      { name: "Personal Fitness", bookings: 56, revenue: 2800.0 },
    ],
    bookingsByMonth: [
      { month: "Jan", bookings: 42, revenue: 2730.0 },
      { month: "Feb", bookings: 38, revenue: 2470.0 },
      { month: "Mar", bookings: 45, revenue: 2925.0 },
      { month: "Apr", bookings: 48, revenue: 3120.0 },
      { month: "May", bookings: 52, revenue: 3380.0 },
      { month: "Jun", bookings: 58, revenue: 3770.0 },
      { month: "Jul", bookings: 62, revenue: 4030.0 },
      { month: "Aug", bookings: 68, revenue: 4420.0 },
      { month: "Sep", bookings: 56, revenue: 3640.0 },
      { month: "Oct", bookings: 52, revenue: 3380.0 },
      { month: "Nov", bookings: 48, revenue: 3120.0 },
      { month: "Dec", bookings: 45, revenue: 2925.0 },
    ],
    customerDemographics: [
      { group: "18-24", percentage: 15 },
      { group: "25-34", percentage: 32 },
      { group: "35-44", percentage: 28 },
      { group: "45-54", percentage: 18 },
      { group: "55+", percentage: 7 },
    ],
    bookingsByDevice: [
      { device: "Mobile", percentage: 65 },
      { device: "Desktop", percentage: 30 },
      { device: "Tablet", percentage: 5 },
    ],
    peakBookingTimes: [
      { time: "Morning (6AM-12PM)", percentage: 25 },
      { time: "Afternoon (12PM-5PM)", percentage: 40 },
      { time: "Evening (5PM-10PM)", percentage: 30 },
      { time: "Night (10PM-6AM)", percentage: 5 },
    ],
  }

  // Calculate period-over-period changes
  const currentPeriodRevenue = 4420.0 // August
  const previousPeriodRevenue = 4030.0 // July
  const revenueChange = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100

  const currentPeriodBookings = 68 // August
  const previousPeriodBookings = 62 // July
  const bookingsChange = ((currentPeriodBookings - previousPeriodBookings) / previousPeriodBookings) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Track your performance metrics and insights</p>
          </div>

          <div className="flex gap-2">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time Period" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Service" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {analyticsData.bookingsByService.map((service) => (
                  <SelectItem key={service.name} value={service.name.toLowerCase().replace(/\s+/g, "-")}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">{analyticsData.totalBookings}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className={cn("flex items-center", bookingsChange >= 0 ? "text-green-600" : "text-red-600")}>
                  {bookingsChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(bookingsChange).toFixed(1)}%</span>
                </div>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">${analyticsData.totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className={cn("flex items-center", revenueChange >= 0 ? "text-green-600" : "text-red-600")}>
                  {revenueChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(revenueChange).toFixed(1)}%</span>
                </div>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <h3 className="text-2xl font-bold mt-1">{analyticsData.averageRating.toFixed(1)}/5.0</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <Star className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>0.2</span>
                </div>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-2xl font-bold mt-1">{analyticsData.conversionRate}%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>3.5%</span>
                </div>
                <span className="text-muted-foreground ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bookings Over Time</CardTitle>
                  <CardDescription>Monthly booking trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Bookings chart visualization</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Revenue chart visualization</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bookings by Service</CardTitle>
                  <CardDescription>Distribution across services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full flex items-center justify-center bg-muted/20 rounded-md mb-4">
                    <PieChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Service distribution chart</span>
                  </div>
                  <div className="space-y-4">
                    {analyticsData.bookingsByService.map((service) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm font-medium">{service.bookings} bookings</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Demographics</CardTitle>
                  <CardDescription>Age group distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full flex items-center justify-center bg-muted/20 rounded-md mb-4">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Demographics chart</span>
                  </div>
                  <div className="space-y-4">
                    {analyticsData.customerDemographics.map((demo) => (
                      <div key={demo.group} className="flex items-center justify-between">
                        <span className="text-sm">{demo.group}</span>
                        <span className="text-sm font-medium">{demo.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Booking Times</CardTitle>
                  <CardDescription>When customers book most</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full flex items-center justify-center bg-muted/20 rounded-md mb-4">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Time distribution chart</span>
                  </div>
                  <div className="space-y-4">
                    {analyticsData.peakBookingTimes.map((time) => (
                      <div key={time.time} className="flex items-center justify-between">
                        <span className="text-sm">{time.time}</span>
                        <span className="text-sm font-medium">{time.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Booking Analytics</CardTitle>
                <CardDescription>In-depth analysis of booking patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Detailed booking analytics visualization</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Revenue analytics visualization</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Insights about your customer base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <Users className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Customer analytics visualization</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

