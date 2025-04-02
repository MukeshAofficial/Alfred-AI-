"use client"

import { useState } from "react"
import { DollarSign, Calendar, Download, CreditCard, ArrowUpRight, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import VendorNavigation from "@/components/vendor/vendor-navigation"

interface Transaction {
  id: string
  date: string
  customer: string
  service: string
  amount: number
  status: "completed" | "pending" | "refunded"
}

interface Payout {
  id: string
  date: string
  amount: number
  status: "processed" | "pending" | "failed"
  method: string
  reference: string
}

export default function VendorEarningsPage() {
  const [periodFilter, setPeriodFilter] = useState("month")
  const [serviceFilter, setServiceFilter] = useState("all")

  // Mock data
  const earningsData = {
    total: 4850.75,
    pending: 350.25,
    thisMonth: 1250.5,
    lastMonth: 980.25,
    growth: 27.6,
    services: [
      { name: "City Tour", earnings: 2450.5, bookings: 38 },
      { name: "Airport Transfer", earnings: 1575.25, bookings: 35 },
      { name: "Wine Tasting Tour", earnings: 825, bookings: 10 },
    ],
  }

  const transactions: Transaction[] = [
    {
      id: "TRX-001",
      date: "2025-04-02",
      customer: "Alex Johnson",
      service: "City Tour",
      amount: 65,
      status: "completed",
    },
    {
      id: "TRX-002",
      date: "2025-04-02",
      customer: "Emma Wilson",
      service: "Airport Transfer",
      amount: 45,
      status: "completed",
    },
    {
      id: "TRX-003",
      date: "2025-04-03",
      customer: "Michael Brown",
      service: "City Tour",
      amount: 130,
      status: "completed",
    },
    {
      id: "TRX-004",
      date: "2025-04-03",
      customer: "Sarah Davis",
      service: "Airport Transfer",
      amount: 55,
      status: "completed",
    },
    {
      id: "TRX-005",
      date: "2025-04-04",
      customer: "David Miller",
      service: "Wine Tasting Tour",
      amount: 85,
      status: "pending",
    },
    {
      id: "TRX-006",
      date: "2025-04-01",
      customer: "Jennifer Lee",
      service: "City Tour",
      amount: 97.5,
      status: "completed",
    },
    {
      id: "TRX-007",
      date: "2025-04-01",
      customer: "Robert Taylor",
      service: "Airport Transfer",
      amount: 45,
      status: "refunded",
    },
  ]

  const payouts: Payout[] = [
    {
      id: "PAY-001",
      date: "2025-03-31",
      amount: 980.25,
      status: "processed",
      method: "Bank Transfer",
      reference: "REF123456",
    },
    {
      id: "PAY-002",
      date: "2025-02-28",
      amount: 875.5,
      status: "processed",
      method: "Bank Transfer",
      reference: "REF123457",
    },
    {
      id: "PAY-003",
      date: "2025-01-31",
      amount: 1025.75,
      status: "processed",
      method: "Bank Transfer",
      reference: "REF123458",
    },
    {
      id: "PAY-004",
      date: "2025-04-30",
      amount: 1250.5,
      status: "pending",
      method: "Bank Transfer",
      reference: "REF123459",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "processed":
        return "text-green-600"
      case "pending":
        return "text-amber-600"
      case "refunded":
      case "failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Earnings</h1>
            <p className="text-muted-foreground">Track your revenue and financial performance</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(earningsData.total)}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>{earningsData.growth}%</span>
                </div>
                <span className="text-muted-foreground ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(earningsData.thisMonth)}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>
                    {Math.round(((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100)}%
                  </span>
                </div>
                <span className="text-muted-foreground ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Earnings</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(earningsData.pending)}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">Expected by end of month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Earnings by service</CardDescription>
                </div>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Period" />
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {earningsData.services.map((service) => {
                  const percentage = (service.earnings / earningsData.total) * 100
                  return (
                    <div key={service.name}>
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({service.bookings} bookings)</span>
                        </div>
                        <span className="text-sm font-medium">{formatCurrency(service.earnings)}</span>
                      </div>
                      <div className="flex items-center">
                        <Progress
                          value={percentage}
                          className="h-2 flex-1 mr-4"
                          indicatorClassName={cn(
                            percentage > 50 ? "bg-green-600" : percentage > 25 ? "bg-blue-600" : "bg-amber-600",
                          )}
                        />
                        <span className="text-xs font-medium w-12 text-right">{Math.round(percentage)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Payout</CardTitle>
              <CardDescription>Estimated for April 30, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-4xl font-bold mb-2">{formatCurrency(earningsData.thisMonth)}</div>
                <p className="text-sm text-muted-foreground mb-6">Current balance</p>
                <Button className="w-full bg-red-600 hover:bg-red-700">Request Early Payout</Button>
              </div>
              <div className="border-t pt-4 mt-2">
                <h4 className="text-sm font-medium mb-2">Payout Method</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">Bank Account (****6789)</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payout History</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Your recent earnings from bookings</CardDescription>
                  </div>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Service" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      {earningsData.services.map((service) => (
                        <SelectItem key={service.name} value={service.name.toLowerCase().replace(/\s+/g, "-")}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">Transaction ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Service</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{transaction.id}</td>
                          <td className="py-3 px-4 text-sm">{formatDate(transaction.date)}</td>
                          <td className="py-3 px-4 text-sm">{transaction.customer}</td>
                          <td className="py-3 px-4 text-sm">{transaction.service}</td>
                          <td className="py-3 px-4 text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={cn("font-medium", getStatusColor(transaction.status))}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button variant="outline">View All Transactions</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>Record of your received payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">Payout ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Method</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Reference</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payouts.map((payout) => (
                        <tr key={payout.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{payout.id}</td>
                          <td className="py-3 px-4 text-sm">{formatDate(payout.date)}</td>
                          <td className="py-3 px-4 text-sm font-medium">{formatCurrency(payout.amount)}</td>
                          <td className="py-3 px-4 text-sm">{payout.method}</td>
                          <td className="py-3 px-4 text-sm">{payout.reference}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={cn("font-medium", getStatusColor(payout.status))}>
                              {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button variant="outline">Download Payout History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

