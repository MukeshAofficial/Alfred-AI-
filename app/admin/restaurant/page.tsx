"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  Utensils,
  Check,
  X,
  Filter,
  Search,
  ChevronDown,
  ArrowRight,
  Plus,
  Edit,
  Phone,
  Home,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import AdminNavigation from "@/components/admin/admin-navigation"

export default function RestaurantManagementPage() {
  const [activeTab, setActiveTab] = useState("reservations")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isTableLayoutOpen, setIsTableLayoutOpen] = useState(false)
  const { toast } = useToast()

  // Mock data for restaurant reservations
  const reservations = [
    {
      id: "R1001",
      guest: "John Smith",
      room: "304",
      date: "2025-04-02",
      time: "7:30 PM",
      guests: 2,
      table: "Table 5",
      status: "confirmed",
      specialRequests: "Anniversary dinner, window table preferred",
      contact: "+1 (555) 123-4567",
    },
    {
      id: "R1002",
      guest: "Emma Johnson",
      room: "512",
      date: "2025-04-02",
      time: "8:00 PM",
      guests: 4,
      table: "Table 12",
      status: "confirmed",
      specialRequests: "Allergic to nuts",
      contact: "+1 (555) 987-6543",
    },
    {
      id: "R1003",
      guest: "Michael Brown",
      room: "218",
      date: "2025-04-02",
      time: "6:45 PM",
      guests: 3,
      table: "Table 8",
      status: "pending",
      specialRequests: "",
      contact: "+1 (555) 456-7890",
    },
    {
      id: "R1004",
      guest: "Sarah Davis",
      room: "415",
      date: "2025-04-03",
      time: "7:15 PM",
      guests: 2,
      table: "Table 3",
      status: "confirmed",
      specialRequests: "Celebrating birthday",
      contact: "+1 (555) 234-5678",
    },
    {
      id: "R1005",
      guest: "Robert Wilson",
      room: "621",
      date: "2025-04-03",
      time: "8:30 PM",
      guests: 6,
      table: "Table 15",
      status: "cancelled",
      specialRequests: "Cancelled due to illness",
      contact: "+1 (555) 876-5432",
    },
  ]

  // Mock data for in-room dining orders
  const roomDiningOrders = [
    {
      id: "O1001",
      guest: "David Miller",
      room: "307",
      time: "12:30 PM",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 14 },
        { name: "Grilled Salmon", quantity: 1, price: 28 },
        { name: "Sparkling Water", quantity: 1, price: 5 },
      ],
      total: 47,
      status: "delivered",
      notes: "Extra lemon for the salmon",
    },
    {
      id: "O1002",
      guest: "Jennifer Lee",
      room: "412",
      time: "1:15 PM",
      items: [
        { name: "Club Sandwich", quantity: 1, price: 16 },
        { name: "French Fries", quantity: 1, price: 8 },
        { name: "Chocolate Cake", quantity: 1, price: 10 },
        { name: "Iced Tea", quantity: 1, price: 4 },
      ],
      total: 38,
      status: "preparing",
      notes: "",
    },
    {
      id: "O1003",
      guest: "Thomas Anderson",
      room: "519",
      time: "7:45 PM",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 18 },
        { name: "Tiramisu", quantity: 1, price: 10 },
        { name: "Bottle of Wine", quantity: 1, price: 35 },
      ],
      total: 63,
      status: "out-for-delivery",
      notes: "Wine glasses needed",
    },
    {
      id: "O1004",
      guest: "Lisa Johnson",
      room: "215",
      time: "8:20 PM",
      items: [
        { name: "Beef Tenderloin", quantity: 1, price: 34 },
        { name: "Mashed Potatoes", quantity: 1, price: 8 },
        { name: "Cheesecake", quantity: 1, price: 12 },
        { name: "Sparkling Water", quantity: 2, price: 10 },
      ],
      total: 64,
      status: "pending",
      notes: "Medium-rare for the beef",
    },
  ]

  // Mock data for restaurant tables
  const tables = [
    { id: 1, name: "Table 1", seats: 2, status: "available", location: "window" },
    { id: 2, name: "Table 2", seats: 2, status: "reserved", location: "window" },
    { id: 3, name: "Table 3", seats: 4, status: "available", location: "center" },
    { id: 4, name: "Table 4", seats: 4, status: "occupied", location: "center" },
    { id: 5, name: "Table 5", seats: 2, status: "reserved", location: "window" },
    { id: 6, name: "Table 6", seats: 6, status: "available", location: "corner" },
    { id: 7, name: "Table 7", seats: 8, status: "reserved", location: "corner" },
    { id: 8, name: "Table 8", seats: 4, status: "occupied", location: "center" },
    { id: 9, name: "Table 9", seats: 2, status: "available", location: "bar" },
    { id: 10, name: "Table 10", seats: 2, status: "available", location: "bar" },
    { id: 11, name: "Table 11", seats: 4, status: "cleaning", location: "center" },
    { id: 12, name: "Table 12", seats: 4, status: "reserved", location: "window" },
    { id: 13, name: "Table 13", seats: 6, status: "available", location: "corner" },
    { id: 14, name: "Table 14", seats: 2, status: "cleaning", location: "window" },
    { id: 15, name: "Table 15", seats: 8, status: "reserved", location: "private" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
      case "preparing":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "out-for-delivery":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getTableStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "reserved":
        return "bg-amber-500"
      case "occupied":
        return "bg-red-500"
      case "cleaning":
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const updateReservationStatus = (id, newStatus) => {
    // In a real app, this would update the database
    toast({
      title: "Status updated",
      description: `Reservation ${id} has been ${newStatus}.`,
    })
  }

  const updateOrderStatus = (id, newStatus) => {
    // In a real app, this would update the database
    toast({
      title: "Order status updated",
      description: `Order ${id} status changed to ${newStatus}.`,
    })
  }

  const viewReservationDetails = (reservation) => {
    setSelectedReservation(reservation)
    setIsDetailsOpen(true)
  }

  // Filter reservations based on search query and filters
  const filteredReservations = reservations.filter((reservation) => {
    // Filter by search query
    if (
      searchQuery &&
      !reservation.guest.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !reservation.room.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter && reservation.status !== statusFilter) {
      return false
    }

    // Filter by date
    if (dateFilter && reservation.date !== dateFilter) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Restaurant Management</h1>
            <p className="text-muted-foreground">Manage reservations, orders, and table availability</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsTableLayoutOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              View Table Layout
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="reservations">Table Reservations</TabsTrigger>
            <TabsTrigger value="room-dining">In-Room Dining</TabsTrigger>
            <TabsTrigger value="tables">Table Management</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by guest, ID, or room..."
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
                      <SelectItem value="">All Dates</SelectItem>
                      <SelectItem value="2025-04-02">Today</SelectItem>
                      <SelectItem value="2025-04-03">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Reservations</CardTitle>
                <CardDescription>
                  {filteredReservations.length} reservation{filteredReservations.length !== 1 ? "s" : ""} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Guest</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Room</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Date & Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Guests</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Table</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.map((reservation) => (
                        <tr key={reservation.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{reservation.id}</td>
                          <td className="py-3 px-4 text-sm">{reservation.guest}</td>
                          <td className="py-3 px-4 text-sm">{reservation.room}</td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(reservation.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            • {reservation.time}
                          </td>
                          <td className="py-3 px-4 text-sm">{reservation.guests}</td>
                          <td className="py-3 px-4 text-sm">{reservation.table}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(reservation.status))}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 text-xs"
                                onClick={() => viewReservationDetails(reservation)}
                              >
                                Details
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {reservation.status === "pending" && (
                                    <DropdownMenuItem
                                      className="text-green-600"
                                      onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      Confirm
                                    </DropdownMenuItem>
                                  )}
                                  {(reservation.status === "pending" || reservation.status === "confirmed") && (
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      Cancel
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="room-dining">
            <Card>
              <CardHeader>
                <CardTitle>In-Room Dining Orders</CardTitle>
                <CardDescription>Manage food and beverage orders for in-room dining</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Guest</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Room</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Items</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomDiningOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                          <td className="py-3 px-4 text-sm">{order.guest}</td>
                          <td className="py-3 px-4 text-sm">{order.room}</td>
                          <td className="py-3 px-4 text-sm">{order.time}</td>
                          <td className="py-3 px-4 text-sm">
                            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">${order.total}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(order.status))}>
                              {order.status
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                Details
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {order.status === "pending" && (
                                    <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "preparing")}>
                                      <Utensils className="mr-2 h-4 w-4" />
                                      Mark as Preparing
                                    </DropdownMenuItem>
                                  )}
                                  {order.status === "preparing" && (
                                    <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "out-for-delivery")}>
                                      <ArrowRight className="mr-2 h-4 w-4" />
                                      Mark as Out for Delivery
                                    </DropdownMenuItem>
                                  )}
                                  {order.status === "out-for-delivery" && (
                                    <DropdownMenuItem
                                      className="text-green-600"
                                      onClick={() => updateOrderStatus(order.id, "delivered")}
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      Mark as Delivered
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Order
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <CardTitle>Table Management</CardTitle>
                <CardDescription>Manage restaurant tables and their availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Table Status</h3>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      <span>Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span>Cleaning</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tables.map((table) => (
                      <div key={table.id} className="border rounded-lg p-3 text-center">
                        <div className={`w-6 h-6 rounded-full ${getTableStatusColor(table.status)} mx-auto mb-2`}></div>
                        <p className="font-medium">{table.name}</p>
                        <p className="text-sm text-gray-500">{table.seats} seats</p>
                        <p className="text-xs text-gray-500">{table.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsTableLayoutOpen(true)}>
                  View Table Layout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reservation Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
              <DialogDescription>
                {selectedReservation?.id} • {selectedReservation?.table}
              </DialogDescription>
            </DialogHeader>

            {selectedReservation && (
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Reservation Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date & Time</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(selectedReservation.date)} • {selectedReservation.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Guests</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedReservation.guests} {selectedReservation.guests === 1 ? "person" : "people"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Utensils className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Table</p>
                          <p className="text-sm text-muted-foreground">{selectedReservation.table}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Guest Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-sm text-muted-foreground">{selectedReservation.guest}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Contact</p>
                          <p className="text-sm text-muted-foreground">{selectedReservation.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Home className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Room</p>
                          <p className="text-sm text-muted-foreground">{selectedReservation.room}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedReservation.specialRequests && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Special Requests</h3>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm">{selectedReservation.specialRequests}</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReservation.status === "pending" && (
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          updateReservationStatus(selectedReservation.id, "confirmed")
                          setIsDetailsOpen(false)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Confirm Reservation
                      </Button>
                    )}
                    {(selectedReservation.status === "pending" || selectedReservation.status === "confirmed") && (
                      <Button
                        variant="outline"
                        className="text-red-600"
                        onClick={() => {
                          updateReservationStatus(selectedReservation.id, "cancelled")
                          setIsDetailsOpen(false)
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel Reservation
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

        {/* Table Layout Dialog */}
        <Dialog open={isTableLayoutOpen} onOpenChange={setIsTableLayoutOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Restaurant Table Layout</DialogTitle>
              <DialogDescription>Visual representation of table arrangement and status</DialogDescription>
            </DialogHeader>

            <div className="relative border border-dashed p-4 h-[500px] bg-gray-50 dark:bg-gray-800 rounded-md">
              {/* This would be a visual representation of the restaurant layout */}
              <div className="absolute top-4 left-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-xs">Entrance</div>

              {/* Windows */}
              <div className="absolute top-0 right-0 w-4 h-full bg-blue-100 dark:bg-blue-900/30"></div>

              {/* Tables */}
              {tables.map((table) => {
                // Position tables based on their location
                let position = {}
                if (table.location === "window") {
                  position = { right: "20px", top: `${(table.id * 60) % 400}px` }
                } else if (table.location === "bar") {
                  position = { left: "20px", top: `${(table.id * 60) % 400}px` }
                } else if (table.location === "corner") {
                  if (table.id % 2 === 0) {
                    position = { right: "60px", bottom: "20px" }
                  } else {
                    position = { right: "60px", top: "20px" }
                  }
                } else if (table.location === "private") {
                  position = { right: "150px", bottom: "20px" }
                } else {
                  // Center tables
                  const row = Math.floor(table.id / 3)
                  const col = table.id % 3
                  position = {
                    left: `${150 + col * 120}px`,
                    top: `${100 + row * 100}px`,
                  }
                }

                return (
                  <div
                    key={table.id}
                    className={`absolute border-2 rounded-md flex flex-col items-center justify-center p-2 ${
                      table.status === "reserved"
                        ? "border-amber-500"
                        : table.status === "occupied"
                          ? "border-red-500"
                          : table.status === "cleaning"
                            ? "border-blue-500"
                            : "border-green-500"
                    }`}
                    style={{
                      ...position,
                      width: table.seats > 4 ? "100px" : "80px",
                      height: table.seats > 4 ? "80px" : "60px",
                      backgroundColor:
                        table.status === "reserved"
                          ? "rgba(245, 158, 11, 0.1)"
                          : table.status === "occupied"
                            ? "rgba(239, 68, 68, 0.1)"
                            : table.status === "cleaning"
                              ? "rgba(59, 130, 246, 0.1)"
                              : "rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <span className="text-xs font-medium">{table.name}</span>
                    <span className="text-xs">{table.seats} seats</span>
                  </div>
                )
              })}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTableLayoutOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

