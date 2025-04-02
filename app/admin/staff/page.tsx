"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Search, Filter, User, Clock, Check, X, ChevronDown, FileText, MessageSquare, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface WorkOrder {
  id: string
  type: "housekeeping" | "maintenance" | "food" | "concierge"
  title: string
  description: string
  room: string
  guest: string
  status: "open" | "in-progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo?: string
  createdAt: string
  completedAt?: string
}

interface Staff {
  id: string
  name: string
  role: string
  department: string
  avatar: string
  status: "available" | "busy" | "offline"
}

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState("work-orders")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const { toast } = useToast()

  // Mock work orders data
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: "WO1001",
      type: "housekeeping",
      title: "Room Cleaning",
      description: "Regular daily cleaning service",
      room: "201",
      guest: "Emma Johnson",
      status: "completed",
      priority: "medium",
      assignedTo: "Maria Garcia",
      createdAt: "2025-03-31T08:30:00",
      completedAt: "2025-03-31T09:45:00",
    },
    {
      id: "WO1002",
      type: "maintenance",
      title: "AC Not Working",
      description: "Guest reports that the air conditioning is not cooling properly",
      room: "305",
      guest: "David Wilson",
      status: "in-progress",
      priority: "high",
      assignedTo: "Robert Chen",
      createdAt: "2025-03-31T10:15:00",
    },
    {
      id: "WO1003",
      type: "food",
      title: "Room Service Order",
      description: "Breakfast order: Continental breakfast for 2",
      room: "507",
      guest: "Alex Johnson",
      status: "open",
      priority: "medium",
      createdAt: "2025-03-31T07:45:00",
    },
    {
      id: "WO1004",
      type: "concierge",
      title: "Airport Transfer",
      description: "Arrange airport pickup for guest arriving at 3:30 PM",
      room: "412",
      guest: "Sarah Miller",
      status: "open",
      priority: "high",
      createdAt: "2025-03-31T09:00:00",
    },
    {
      id: "WO1005",
      type: "housekeeping",
      title: "Extra Towels",
      description: "Guest requested additional towels",
      room: "203",
      guest: "Michael Brown",
      status: "completed",
      priority: "low",
      assignedTo: "Maria Garcia",
      createdAt: "2025-03-31T11:20:00",
      completedAt: "2025-03-31T11:45:00",
    },
    {
      id: "WO1006",
      type: "maintenance",
      title: "TV Not Working",
      description: "Guest reports issues with the television",
      room: "118",
      guest: "Jennifer Lee",
      status: "open",
      priority: "medium",
      createdAt: "2025-03-31T13:10:00",
    },
    {
      id: "WO1007",
      type: "food",
      title: "Dinner Reservation",
      description: "Table for 4 at the main restaurant at 8:00 PM",
      room: "301",
      guest: "Sarah Davis",
      status: "in-progress",
      priority: "medium",
      assignedTo: "Carlos Rodriguez",
      createdAt: "2025-03-31T14:30:00",
    },
    {
      id: "WO1008",
      type: "concierge",
      title: "Tour Booking",
      description: "Book city tour for tomorrow morning",
      room: "402",
      guest: "Robert Wilson",
      status: "completed",
      priority: "low",
      assignedTo: "Emily Wong",
      createdAt: "2025-03-31T10:45:00",
      completedAt: "2025-03-31T11:30:00",
    },
  ])

  // Mock staff data
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: "S001",
      name: "Maria Garcia",
      role: "Housekeeping Supervisor",
      department: "Housekeeping",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available",
    },
    {
      id: "S002",
      name: "Robert Chen",
      role: "Maintenance Technician",
      department: "Maintenance",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "busy",
    },
    {
      id: "S003",
      name: "Carlos Rodriguez",
      role: "F&B Manager",
      department: "Food & Beverage",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available",
    },
    {
      id: "S004",
      name: "Emily Wong",
      role: "Concierge",
      department: "Front Office",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
    },
    {
      id: "S005",
      name: "James Smith",
      role: "Housekeeping Attendant",
      department: "Housekeeping",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "available",
    },
    {
      id: "S006",
      name: "Sophia Johnson",
      role: "Front Desk Agent",
      department: "Front Office",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "busy",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "housekeeping":
        return <User className="h-4 w-4" />
      case "maintenance":
        return <Settings className="h-4 w-4" />
      case "food":
        return <FileText className="h-4 w-4" />
      case "concierge":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "housekeeping":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "maintenance":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "food":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "concierge":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "in-progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "medium":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "high":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "urgent":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "busy":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "offline":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const updateWorkOrderStatus = (id: string, status: "open" | "in-progress" | "completed" | "cancelled") => {
    setWorkOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const updated = {
            ...order,
            status,
            completedAt: status === "completed" ? new Date().toISOString() : order.completedAt,
          }
          return updated
        }
        return order
      }),
    )

    toast({
      title: "Work order updated",
      description: `Work order ${id} status changed to ${status}`,
    })
  }

  const assignWorkOrder = (orderId: string, staffId: string, staffName: string) => {
    setWorkOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            assignedTo: staffName,
            status: order.status === "open" ? "in-progress" : order.status,
          }
        }
        return order
      }),
    )

    toast({
      title: "Work order assigned",
      description: `Work order ${orderId} assigned to ${staffName}`,
    })
  }

  // Filter work orders based on search query and filters
  const filteredWorkOrders = workOrders.filter((order) => {
    // Filter by search query
    if (
      searchQuery &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.room.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.guest.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter && order.status !== statusFilter) {
      return false
    }

    // Filter by type
    if (typeFilter && order.type !== typeFilter) {
      return false
    }

    return true
  })

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Staff Tools</h1>
          <p className="text-muted-foreground">
            Manage work orders, staff assignments, and standard operating procedures
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="sop">SOP Library</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="work-orders" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, title, room, or guest..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-40">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="concierge">Concierge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Work Orders</CardTitle>
                  <CardDescription>
                    {filteredWorkOrders.length} order{filteredWorkOrders.length !== 1 ? "s" : ""} found
                  </CardDescription>
                </div>
                <Button>Create Work Order</Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredWorkOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No work orders found matching your filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("")
                      setTypeFilter("")
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
                        <th className="text-left py-3 px-4 text-sm font-medium">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Title</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Room</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Guest</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Priority</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Assigned To</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Created</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWorkOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge
                              variant="outline"
                              className={cn("flex items-center gap-1", getTypeColor(order.type))}
                            >
                              {getTypeIcon(order.type)}
                              <span>{order.type.charAt(0).toUpperCase() + order.type.slice(1)}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link" className="p-0 h-auto text-left font-normal">
                                  {order.title}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Work Order Details</DialogTitle>
                                  <DialogDescription>
                                    {order.id} - {order.title}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Type</p>
                                      <Badge variant="outline" className={cn("mt-1", getTypeColor(order.type))}>
                                        {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                                      </Badge>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Status</p>
                                      <Badge variant="outline" className={cn("mt-1", getStatusColor(order.status))}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Room</p>
                                      <p className="font-medium">{order.room}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Guest</p>
                                      <p className="font-medium">{order.guest}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Priority</p>
                                      <Badge variant="outline" className={cn("mt-1", getPriorityColor(order.priority))}>
                                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                                      </Badge>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Assigned To</p>
                                      <p className="font-medium">{order.assignedTo || "Unassigned"}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm text-muted-foreground">Description</p>
                                    <p className="mt-1">{order.description}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Created</p>
                                      <p className="font-medium">{formatDateTime(order.createdAt)}</p>
                                    </div>
                                    {order.completedAt && (
                                      <div>
                                        <p className="text-sm text-muted-foreground">Completed</p>
                                        <p className="font-medium">{formatDateTime(order.completedAt)}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                                  <Select
                                    onValueChange={(value) =>
                                      assignWorkOrder(order.id, value, staff.find((s) => s.id === value)?.name || "")
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Assign to staff" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {staff.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                          {s.name} ({s.role})
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      className="flex-1"
                                      onClick={() => updateWorkOrderStatus(order.id, "cancelled")}
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      Cancel
                                    </Button>
                                    <Button
                                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                                      onClick={() => updateWorkOrderStatus(order.id, "completed")}
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      Complete
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </td>
                          <td className="py-3 px-4 text-sm">{order.room}</td>
                          <td className="py-3 px-4 text-sm">{order.guest}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className={cn(getPriorityColor(order.priority))}>
                              {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className={cn(getStatusColor(order.status))}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {order.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                          </td>
                          <td className="py-3 px-4 text-sm">{formatDateTime(order.createdAt)}</td>
                          <td className="py-3 px-4 text-sm">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-blue-600 dark:text-blue-400"
                                  onClick={() => updateWorkOrderStatus(order.id, "in-progress")}
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  Mark In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-green-600 dark:text-green-400"
                                  onClick={() => updateWorkOrderStatus(order.id, "completed")}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Mark Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 dark:text-red-400"
                                  onClick={() => updateWorkOrderStatus(order.id, "cancelled")}
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
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Staff Directory</CardTitle>
                  <CardDescription>Manage staff and their assignments</CardDescription>
                </div>
                <Button>Add Staff Member</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staff.map((member) => (
                  <Card key={member.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className={cn("text-xs", getStaffStatusColor(member.status))}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="border-t p-3 bg-muted/20">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{member.department}</span>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sop" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Standard Operating Procedures</CardTitle>
              <CardDescription>Access training materials and standard procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Housekeeping Procedures</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Standard procedures for room cleaning and maintenance
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Document
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Guest Service Standards</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Guidelines for providing exceptional guest service</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Document
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Emergency Procedures</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Protocols for handling emergencies and safety incidents
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Document
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Configuration</CardTitle>
              <CardDescription>Customize the AI Butler's responses and capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Chatbot Prompts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize how the AI responds to common guest inquiries
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Welcome Message</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Service Descriptions</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Booking Confirmations</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Available Services</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Control which services are available through the AI Butler
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Room Service</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Spa Bookings</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Local Recommendations</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Analytics & Insights</h3>
                  <p className="text-sm text-muted-foreground mb-4">View usage statistics and common guest requests</p>
                  <Button className="w-full">View Analytics Dashboard</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

