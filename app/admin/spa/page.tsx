"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Check,
  X,
  Filter,
  Search,
  ChevronDown,
  Plus,
  Edit,
  SpadeIcon as Spa,
  User,
  Phone,
  Home,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import AdminNavigation from "@/components/admin/admin-navigation"

export default function SpaManagementPage() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()

  // Mock data for spa appointments
  const appointments = [
    {
      id: "S1001",
      guest: "Emma Thompson",
      room: "507",
      date: "2025-04-02",
      time: "10:30 AM",
      service: "Swedish Massage",
      duration: "60 min",
      therapist: "Sarah Johnson",
      status: "confirmed",
      specialRequests: "Light to medium pressure",
      contact: "+1 (555) 123-4567",
    },
    {
      id: "S1002",
      guest: "Michael Chen",
      room: "312",
      date: "2025-04-02",
      time: "2:00 PM",
      service: "Deep Tissue Massage",
      duration: "90 min",
      therapist: "David Wilson",
      status: "confirmed",
      specialRequests: "Focus on lower back",
      contact: "+1 (555) 987-6543",
    },
    {
      id: "S1003",
      guest: "Jessica Davis",
      room: "415",
      date: "2025-04-02",
      time: "4:30 PM",
      service: "Facial Treatment",
      duration: "60 min",
      therapist: "Lisa Brown",
      status: "pending",
      specialRequests: "Sensitive skin",
      contact: "+1 (555) 456-7890",
    },
    {
      id: "S1004",
      guest: "Robert Miller",
      room: "621",
      date: "2025-04-03",
      time: "11:00 AM",
      service: "Hot Stone Massage",
      duration: "90 min",
      therapist: "Sarah Johnson",
      status: "confirmed",
      specialRequests: "",
      contact: "+1 (555) 234-5678",
    },
    {
      id: "S1005",
      guest: "Jennifer Lee",
      room: "218",
      date: "2025-04-03",
      time: "3:30 PM",
      service: "Aromatherapy Massage",
      duration: "60 min",
      therapist: "David Wilson",
      status: "cancelled",
      specialRequests: "Cancelled due to illness",
      contact: "+1 (555) 876-5432",
    },
  ]

  // Mock data for spa services
  const spaServices = [
    {
      id: 1,
      name: "Swedish Massage",
      description: "A gentle, relaxing massage that uses long strokes, kneading, and circular movements.",
      duration: "60 min",
      price: "$120",
      availability: "High",
    },
    {
      id: 2,
      name: "Deep Tissue Massage",
      description: "Targets the deeper layers of muscle and connective tissue to release chronic tension.",
      duration: "90 min",
      price: "$150",
      availability: "Medium",
    },
    {
      id: 3,
      name: "Hot Stone Massage",
      description: "Uses heated stones to warm and relax muscles, allowing for deeper pressure.",
      duration: "90 min",
      price: "$160",
      availability: "Low",
    },
    {
      id: 4,
      name: "Aromatherapy Massage",
      description: "Combines massage with essential oils to enhance relaxation and well-being.",
      duration: "60 min",
      price: "$130",
      availability: "High",
    },
    {
      id: 5,
      name: "Facial Treatment",
      description: "Cleanses, exfoliates, and nourishes the skin to promote a clear, well-hydrated complexion.",
      duration: "60 min",
      price: "$110",
      availability: "Medium",
    },
  ]

  // Mock data for therapists
  const therapists = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialties: ["Swedish Massage", "Hot Stone Massage", "Aromatherapy"],
      availability: "9:00 AM - 5:00 PM",
      status: "available",
    },
    {
      id: 2,
      name: "David Wilson",
      specialties: ["Deep Tissue Massage", "Sports Massage", "Aromatherapy"],
      availability: "10:00 AM - 6:00 PM",
      status: "busy",
    },
    {
      id: 3,
      name: "Lisa Brown",
      specialties: ["Facial Treatment", "Swedish Massage", "Reflexology"],
      availability: "8:00 AM - 4:00 PM",
      status: "available",
    },
    {
      id: 4,
      name: "James Taylor",
      specialties: ["Deep Tissue Massage", "Hot Stone Massage", "Thai Massage"],
      availability: "11:00 AM - 7:00 PM",
      status: "off-duty",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getAvailabilityColor = (availability) => {
    switch (availability.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "low":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getTherapistStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "busy":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "off-duty":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
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

  const updateAppointmentStatus = (id, newStatus) => {
    // In a real app, this would update the database
    toast({
      title: "Status updated",
      description: `Appointment ${id} has been ${newStatus}.`,
    })
  }

  const viewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsOpen(true)
  }

  // Filter appointments based on search query and filters
  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by search query
    if (
      searchQuery &&
      !appointment.guest.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.room.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.service.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter && appointment.status !== statusFilter) {
      return false
    }

    // Filter by date
    if (dateFilter && appointment.date !== dateFilter) {
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
            <h1 className="text-3xl font-bold">Spa Management</h1>
            <p className="text-muted-foreground">Manage spa appointments, services, and therapists</p>
          </div>

          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="therapists">Therapists</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by guest, ID, service, or room..."
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
                      <SelectItem value="completed">Completed</SelectItem>
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
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="2025-04-02">Today</SelectItem>
                      <SelectItem value="2025-04-03">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Spa Appointments</CardTitle>
                <CardDescription>
                  {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? "s" : ""} found
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
                        <th className="text-left py-3 px-4 text-sm font-medium">Service</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Therapist</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{appointment.id}</td>
                          <td className="py-3 px-4 text-sm">{appointment.guest}</td>
                          <td className="py-3 px-4 text-sm">{appointment.room}</td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(appointment.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            • {appointment.time}
                          </td>
                          <td className="py-3 px-4 text-sm">{appointment.service}</td>
                          <td className="py-3 px-4 text-sm">{appointment.therapist}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className={cn("font-normal", getStatusColor(appointment.status))}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 text-xs"
                                onClick={() => viewAppointmentDetails(appointment)}
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
                                  {appointment.status === "pending" && (
                                    <DropdownMenuItem
                                      className="text-green-600"
                                      onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      Confirm
                                    </DropdownMenuItem>
                                  )}
                                  {appointment.status === "confirmed" && (
                                    <DropdownMenuItem
                                      className="text-blue-600"
                                      onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                  {(appointment.status === "pending" || appointment.status === "confirmed") && (
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
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

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Spa Services</CardTitle>
                <CardDescription>Manage available spa services and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium">Service</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Duration</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Availability</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spaServices.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="py-3 px-4 text-sm font-medium">{service.name}</td>
                          <td className="py-3 px-4 text-sm max-w-xs truncate">{service.description}</td>
                          <td className="py-3 px-4 text-sm">{service.duration}</td>
                          <td className="py-3 px-4 text-sm">{service.price}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge
                              variant="outline"
                              className={cn("font-normal", getAvailabilityColor(service.availability))}
                            >
                              {service.availability}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="therapists">
            <Card>
              <CardHeader>
                <CardTitle>Therapists</CardTitle>
                <CardDescription>Manage spa therapists and their schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {therapists.map((therapist) => (
                    <Card key={therapist.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">{therapist.name}</h3>
                            <Badge
                              variant="outline"
                              className={cn("mt-1 font-normal", getTherapistStatusColor(therapist.status))}
                            >
                              {therapist.status.charAt(0).toUpperCase() + therapist.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{therapist.availability}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                              {therapist.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm">
                            View Schedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Therapist
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Appointment Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                {selectedAppointment?.id} • {selectedAppointment?.service}
              </DialogDescription>
            </DialogHeader>

            {selectedAppointment && (
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Appointment Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date & Time</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(selectedAppointment.date)} • {selectedAppointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Spa className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Service</p>
                          <p className="text-sm text-muted-foreground">{selectedAppointment.service}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">{selectedAppointment.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Therapist</p>
                          <p className="text-sm text-muted-foreground">{selectedAppointment.therapist}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Guest Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-sm text-muted-foreground">{selectedAppointment.guest}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Contact</p>
                          <p className="text-sm text-muted-foreground">{selectedAppointment.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Home className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Room</p>
                          <p className="text-sm text-muted-foreground">{selectedAppointment.room}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedAppointment.specialRequests && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Special Requests</h3>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm">{selectedAppointment.specialRequests}</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAppointment.status === "pending" && (
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          updateAppointmentStatus(selectedAppointment.id, "confirmed")
                          setIsDetailsOpen(false)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Confirm Appointment
                      </Button>
                    )}
                    {selectedAppointment.status === "confirmed" && (
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          updateAppointmentStatus(selectedAppointment.id, "completed")
                          setIsDetailsOpen(false)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    )}
                    {(selectedAppointment.status === "pending" || selectedAppointment.status === "confirmed") && (
                      <Button
                        variant="outline"
                        className="text-red-600"
                        onClick={() => {
                          updateAppointmentStatus(selectedAppointment.id, "cancelled")
                          setIsDetailsOpen(false)
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel Appointment
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
      </div>
    </div>
  )
}

