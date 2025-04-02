"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Download, Search, FileText, Calendar, ChevronDown, ChevronUp, Printer, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

// Mock receipt data
const mockReceipts = [
  {
    id: "R001",
    type: "restaurant",
    title: "The Grand Bistro",
    date: "2023-07-15",
    amount: 142.5,
    status: "paid",
    items: [
      { name: "Grilled Salmon", quantity: 1, price: 28.0 },
      { name: "Beef Tenderloin", quantity: 1, price: 34.0 },
      { name: "Bottle of Wine", quantity: 1, price: 45.0 },
      { name: "Chocolate Lava Cake", quantity: 2, price: 12.0 },
    ],
    subtotal: 131.0,
    tax: 11.5,
    total: 142.5,
    paymentMethod: "Room Charge",
    roomNumber: "304",
  },
  {
    id: "R002",
    type: "spa",
    title: "Serenity Spa",
    date: "2023-07-14",
    amount: 160.0,
    status: "paid",
    items: [{ name: "Hot Stone Massage", quantity: 1, price: 160.0 }],
    subtotal: 160.0,
    tax: 0.0,
    total: 160.0,
    paymentMethod: "Credit Card",
    roomNumber: "304",
  },
  {
    id: "R003",
    type: "room-service",
    title: "Room Service",
    date: "2023-07-14",
    amount: 42.35,
    status: "paid",
    items: [
      { name: "Club Sandwich", quantity: 1, price: 16.0 },
      { name: "Caesar Salad", quantity: 1, price: 14.0 },
      { name: "Sparkling Water", quantity: 2, price: 5.0 },
    ],
    subtotal: 40.0,
    tax: 2.35,
    total: 42.35,
    paymentMethod: "Room Charge",
    roomNumber: "304",
  },
  {
    id: "R004",
    type: "tour",
    title: "City Tour",
    date: "2023-07-13",
    amount: 65.0,
    status: "paid",
    items: [{ name: "City Tour - Adult", quantity: 1, price: 65.0 }],
    subtotal: 65.0,
    tax: 0.0,
    total: 65.0,
    paymentMethod: "Credit Card",
    roomNumber: "304",
  },
  {
    id: "R005",
    type: "accommodation",
    title: "Room Charge",
    date: "2023-07-12",
    amount: 350.0,
    status: "paid",
    items: [{ name: "Deluxe Ocean View Room", quantity: 1, price: 350.0 }],
    subtotal: 350.0,
    tax: 0.0,
    total: 350.0,
    paymentMethod: "Credit Card",
    roomNumber: "304",
  },
]

export default function ReceiptsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [receipts, setReceipts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [expandedReceipt, setExpandedReceipt] = useState<string | null>(null)
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null)
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setReceipts(mockReceipts)
      setLoading(false)
    }, 1000)
  }, [])

  const toggleReceiptExpansion = (id) => {
    if (expandedReceipt === id) {
      setExpandedReceipt(null)
    } else {
      setExpandedReceipt(id)
    }
  }

  const viewReceiptDetails = (receipt) => {
    setSelectedReceipt(receipt)
    setIsReceiptDialogOpen(true)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "restaurant":
        return <FileText className="h-5 w-5 text-red-500" />
      case "spa":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "room-service":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "tour":
        return <FileText className="h-5 w-5 text-green-500" />
      case "accommodation":
        return <FileText className="h-5 w-5 text-amber-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "restaurant":
        return "Restaurant"
      case "spa":
        return "Spa & Wellness"
      case "room-service":
        return "Room Service"
      case "tour":
        return "Tours & Activities"
      case "accommodation":
        return "Accommodation"
      default:
        return type
    }
  }

  const formatDate = (dateString) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const filteredReceipts = receipts.filter((receipt) => {
    // Filter by search term
    const matchesSearch =
      receipt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by type
    const matchesType = typeFilter === "all" || receipt.type === typeFilter

    // Filter by date
    let matchesDate = true
    const receiptDate = new Date(receipt.date)
    const today = new Date()

    if (dateFilter === "today") {
      matchesDate = receiptDate.toDateString() === today.toDateString()
    } else if (dateFilter === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(today.getDate() - 7)
      matchesDate = receiptDate >= weekAgo
    } else if (dateFilter === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(today.getMonth() - 1)
      matchesDate = receiptDate >= monthAgo
    }

    return matchesSearch && matchesType && matchesDate
  })

  const totalSpent = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Digital Receipts" />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Digital Receipt Center</h1>
          <p className="text-gray-600">View and manage all your receipts in one place</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search receipts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="spa">Spa & Wellness</SelectItem>
                  <SelectItem value="room-service">Room Service</SelectItem>
                  <SelectItem value="tour">Tours & Activities</SelectItem>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-gray-500">
                {filteredReceipts.length} receipt{filteredReceipts.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Most Expensive</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredReceipts.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">
                    ${Math.max(...filteredReceipts.map((r) => r.amount)).toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {filteredReceipts.sort((a, b) => b.amount - a.amount)[0]?.title}
                  </p>
                </>
              ) : (
                <div className="text-gray-500">No data available</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Latest Receipt</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredReceipts.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">
                    $
                    {filteredReceipts
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
                      ?.amount.toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {filteredReceipts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.title}
                  </p>
                </>
              ) : (
                <div className="text-gray-500">No data available</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {loading ? (
            // Skeleton loading state
            [...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredReceipts.length > 0 ? (
            filteredReceipts.map((receipt) => (
              <Card key={receipt.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleReceiptExpansion(receipt.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getTypeIcon(receipt.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{receipt.title}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(receipt.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">${receipt.amount.toFixed(2)}</span>
                        {expandedReceipt === receipt.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedReceipt === receipt.id && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="pl-13 ml-10 border-t pt-3">
                        <div className="flex justify-between mb-2">
                          <Badge variant="outline" className="capitalize">
                            {getTypeLabel(receipt.type)}
                          </Badge>
                          <Badge variant="outline" className="capitalize bg-green-50 text-green-700 border-green-200">
                            {receipt.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Receipt ID:</span>
                            <span>{receipt.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payment Method:</span>
                            <span>{receipt.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Room Number:</span>
                            <span>{receipt.roomNumber}</span>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              viewReceiptDetails(receipt)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">No receipts found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || typeFilter !== "all" || dateFilter !== "all"
                  ? "No receipts match your current filters."
                  : "You don't have any receipts yet."}
              </p>
              {(searchTerm || typeFilter !== "all" || dateFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setTypeFilter("all")
                    setDateFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Receipt Detail Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Receipt Details</DialogTitle>
            <DialogDescription>
              {selectedReceipt && `${selectedReceipt.title} - ${formatDate(selectedReceipt.date)}`}
            </DialogDescription>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{selectedReceipt.title}</h3>
                  <Badge variant="outline" className="capitalize bg-green-50 text-green-700 border-green-200">
                    {selectedReceipt.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Receipt ID: {selectedReceipt.id}</div>
                  <div>Date: {formatDate(selectedReceipt.date)}</div>
                  <div>Room: {selectedReceipt.roomNumber}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedReceipt.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${selectedReceipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${selectedReceipt.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium mt-1">
                  <span>Total</span>
                  <span>${selectedReceipt.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Method</span>
                  <span>{selectedReceipt.paymentMethod}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsReceiptDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Navigation />
    </div>
  )
}

