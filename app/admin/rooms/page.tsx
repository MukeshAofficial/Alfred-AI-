"use client"

import { useState } from "react"
import { Search, Filter, User, Calendar, Clock, Coffee, Bell, ChevronDown, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Room {
  number: string
  type: string
  status: "occupied" | "vacant" | "maintenance" | "cleaning"
  guest?: {
    name: string
    email: string
    checkIn: string
    checkOut: string
    adults: number
    children: number
    preferences: string[]
    requests: {
      id: string
      type: string
      status: "pending" | "completed" | "in-progress"
      time: string
    }[]
  }
}

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const { toast } = useToast()

  // Mock rooms data
  const [rooms, setRooms] = useState<Room[]>([
    {
      number: "101",
      type: "Standard",
      status: "occupied",
      guest: {
        name: "John Smith",
        email: "john.smith@example.com",
        checkIn: "2025-03-28",
        checkOut: "2025-04-01",
        adults: 1,
        children: 0,
        preferences: ["Non-smoking", "High floor"],
        requests: [
          {
            id: "R1001",
            type: "Extra towels",
            status: "completed",
            time: "2025-03-29 10:15 AM",
          },
        ],
      },
    },
    {
      number: "102",
      type: "Standard",
      status: "vacant",
    },
    {
      number: "103",
      type: "Standard",
      status: "cleaning",
    },
    {
      number: "201",
      type: "Deluxe",
      status: "occupied",
      guest: {
        name: "Emma Johnson",
        email: "emma.johnson@example.com",
        checkIn: "2025-03-29",
        checkOut: "2025-04-03",
        adults: 2,
        children: 1,
        preferences: ["King bed", "City view", "Quiet room"],
        requests: [
          {
            id: "R1002",
            type: "Room service",
            status: "completed",
            time: "2025-03-29 7:30 PM",
          },
          {
            id: "R1003",
            type: "Wake-up call",
            status: "pending",
            time: "2025-03-30 6:00 AM",
          },
        ],
      },
    },
    {
      number: "202",
      type: "Deluxe",
      status: "occupied",
      guest: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        checkIn: "2025-03-27",
        checkOut: "2025-04-02",
        adults: 2,
        children: 0,
        preferences: ["Non-smoking", "Extra pillows"],
        requests: [],
      },
    },
    {
      number: "203",
      type: "Deluxe",
      status: "maintenance",
    },
    {
      number: "301",
      type: "Suite",
      status: "occupied",
      guest: {
        name: "Sarah Davis",
        email: "sarah.davis@example.com",
        checkIn: "2025-03-30",
        checkOut: "2025-04-05",
        adults: 2,
        children: 2,
        preferences: ["Connecting rooms", "Crib", "Early check-in"],
        requests: [
          {
            id: "R1004",
            type: "Extra bed",
            status: "completed",
            time: "2025-03-30 3:00 PM",
          },
          {
            id: "R1005",
            type: "Housekeeping",
            status: "in-progress",
            time: "2025-03-31 11:00 AM",
          },
        ],
      },
    },
    {
      number: "302",
      type: "Suite",
      status: "occupied",
      guest: {
        name: "Robert Wilson",
        email: "robert.wilson@example.com",
        checkIn: "2025-03-28",
        checkOut: "2025-04-04",
        adults: 2,
        children: 0,
        preferences: ["High floor", "Late check-out", "Anniversary celebration"],
        requests: [
          {
            id: "R1006",
            type: "Champagne delivery",
            status: "completed",
            time: "2025-03-28 8:00 PM",
          },
        ],
      },
    },
    {
      number: "303",
      type: "Suite",
      status: "vacant",
    },
    {
      number: "401",
      type: "Presidential",
      status: "occupied",
      guest: {
        name: "Jennifer Lee",
        email: "jennifer.lee@example.com",
        checkIn: "2025-03-29",
        checkOut: "2025-04-06",
        adults: 2,
        children: 0,
        preferences: ["Privacy", "No disturbance", "Dietary restrictions"],
        requests: [
          {
            id: "R1007",
            type: "Special meal",
            status: "pending",
            time: "2025-03-31 7:00 PM",
          },
        ],
      },
    },
    {
      number: "402",
      type: "Presidential",
      status: "vacant",
    },
    {
      number: "507",
      type: "Deluxe",
      status: "occupied",
      guest: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        checkIn: "2025-03-28",
        checkOut: "2025-04-02",
        adults: 2,
        children: 0,
        preferences: ["Vegetarian", "No Dairy", "22°C"],
        requests: [
          {
            id: "R1008",
            type: "Extra towels",
            status: "completed",
            time: "2025-03-29 2:30 PM",
          },
        ],
      },
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "vacant":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "maintenance":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "cleaning":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "in-progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "Standard":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
      case "Deluxe":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "Suite":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "Presidential":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const updateRoomStatus = (roomNumber: string, status: "occupied" | "vacant" | "maintenance" | "cleaning") => {
    setRooms((prev) => prev.map((room) => (room.number === roomNumber ? { ...room, status } : room)))

    toast({
      title: "Room status updated",
      description: `Room ${roomNumber} status changed to ${status}`,
    })
  }

  const updateRequestStatus = (
    roomNumber: string,
    requestId: string,
    status: "pending" | "completed" | "in-progress",
  ) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.number === roomNumber && room.guest) {
          return {
            ...room,
            guest: {
              ...room.guest,
              requests: room.guest.requests.map((request) =>
                request.id === requestId ? { ...request, status } : request,
              ),
            },
          }
        }
        return room
      }),
    )

    toast({
      title: "Request status updated",
      description: `Request ${requestId} status changed to ${status}`,
    })
  }

  // Filter rooms based on search query and filters
  const filteredRooms = rooms.filter((room) => {
    // Filter by search query
    if (
      searchQuery &&
      !room.number.includes(searchQuery) &&
      !(room.guest && room.guest.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by status
    if (statusFilter && room.status !== statusFilter) {
      return false
    }

    // Filter by type
    if (typeFilter && room.type !== typeFilter) {
      return false
    }

    return true
  })

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="text-muted-foreground">Manage and monitor all hotel rooms and guest information</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by room number or guest name..."
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
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-40">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Room Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Deluxe">Deluxe</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
                <SelectItem value="Presidential">Presidential</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <Card
            key={room.number}
            className={cn(
              "overflow-hidden",
              room.status === "maintenance" && "border-red-200 dark:border-red-800",
              room.status === "cleaning" && "border-amber-200 dark:border-amber-800",
            )}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Room {room.number}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Badge variant="outline" className={cn("mr-2", getRoomTypeColor(room.type))}>
                      {room.type}
                    </Badge>
                    <Badge variant="outline" className={cn(getStatusColor(room.status))}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                  </CardDescription>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => updateRoomStatus(room.number, "vacant")}
                    >
                      Mark as Vacant
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-amber-600 dark:text-amber-400"
                      onClick={() => updateRoomStatus(room.number, "cleaning")}
                    >
                      Mark for Cleaning
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400"
                      onClick={() => updateRoomStatus(room.number, "maintenance")}
                    >
                      Mark for Maintenance
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-2">
              {room.guest ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer hover:bg-muted/50 rounded-md p-2 -mx-2 transition-colors">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{room.guest.name}</p>
                          <p className="text-xs text-muted-foreground">{room.guest.email}</p>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Check-in: {formatDate(room.guest.checkIn).split(",")[0]}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Check-out: {formatDate(room.guest.checkOut).split(",")[0]}</span>
                        </div>
                      </div>

                      {room.guest.requests.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium mb-1">Recent Requests:</p>
                          <div className="space-y-1">
                            {room.guest.requests.slice(0, 2).map((request) => (
                              <div key={request.id} className="flex items-center justify-between">
                                <span className="text-xs">{request.type}</span>
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs px-1.5 py-0", getRequestStatusColor(request.status))}
                                >
                                  {request.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Guest Details - Room {room.number}</DialogTitle>
                      <DialogDescription>Complete information about the guest and their stay</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{room.guest.name}</h3>
                          <p className="text-sm text-muted-foreground">{room.guest.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border rounded-md p-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Check-in</p>
                          <p className="font-medium">{formatDate(room.guest.checkIn)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Check-out</p>
                          <p className="font-medium">{formatDate(room.guest.checkOut)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nights</p>
                          <p className="font-medium">{calculateNights(room.guest.checkIn, room.guest.checkOut)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Guests</p>
                          <p className="font-medium">
                            {room.guest.adults} Adults, {room.guest.children} Children
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Room Type</p>
                          <p className="font-medium">{room.type}</p>
                        </div>
                      </div>

                      <div className="border rounded-md p-3">
                        <h4 className="font-medium mb-2">Guest Preferences</h4>
                        <div className="flex flex-wrap gap-2">
                          {room.guest.preferences.map((pref, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border rounded-md p-3">
                        <h4 className="font-medium mb-2">Service Requests</h4>
                        {room.guest.requests.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No service requests</p>
                        ) : (
                          <div className="space-y-3">
                            {room.guest.requests.map((request) => (
                              <div key={request.id} className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-sm">{request.type}</p>
                                  <p className="text-xs text-muted-foreground">{request.time}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={cn(getRequestStatusColor(request.status))}>
                                    {request.status}
                                  </Badge>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                        <ChevronDown className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        className="text-blue-600 dark:text-blue-400"
                                        onClick={() => updateRequestStatus(room.number, request.id, "in-progress")}
                                      >
                                        <Clock className="h-4 w-4 mr-2" />
                                        Mark In Progress
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-green-600 dark:text-green-400"
                                        onClick={() => updateRequestStatus(room.number, request.id, "completed")}
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Mark Completed
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button variant="outline" className="flex-1">
                        <Coffee className="mr-2 h-4 w-4" />
                        Add Breakfast
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Clock className="mr-2 h-4 w-4" />
                        Late Checkout
                      </Button>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Bell className="mr-2 h-4 w-4" />
                        Send Assistant
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No guest assigned</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Assign Guest
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

