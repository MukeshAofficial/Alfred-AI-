"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, Edit, Trash2, Eye, Clock, DollarSign, Calendar, Star, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import VendorNavigation from "@/components/vendor/vendor-navigation"

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: string
  duration: string
  image: string
  status: "active" | "inactive" | "draft"
  bookings: number
  rating: number
}

export default function VendorServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Mock services data
  const [services, setServices] = useState<Service[]>([
    {
      id: "S001",
      name: "City Tour",
      category: "tours",
      description: "Guided tour of local attractions and landmarks",
      price: "$65.00",
      duration: "3 hours",
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
      bookings: 28,
      rating: 4.9,
    },
    {
      id: "S002",
      name: "Airport Transfer",
      category: "taxi",
      description: "Comfortable transportation to and from the airport",
      price: "$45.00 - $55.00",
      duration: "30-45 minutes",
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
      bookings: 15,
      rating: 4.7,
    },
    {
      id: "S003",
      name: "Wine Tasting Tour",
      category: "tours",
      description: "Visit to local vineyards with wine tasting",
      price: "$85.00",
      duration: "4 hours",
      image: "/placeholder.svg?height=200&width=300",
      status: "draft",
      bookings: 0,
      rating: 0,
    },
    {
      id: "S004",
      name: "Personal Fitness Training",
      category: "wellness",
      description: "One-on-one fitness training session",
      price: "$50.00",
      duration: "1 hour",
      image: "/placeholder.svg?height=200&width=300",
      status: "inactive",
      bookings: 3,
      rating: 4.3,
    },
  ])

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "taxi":
        return "Taxi & Transportation"
      case "tours":
        return "Tours & Activities"
      case "wellness":
        return "Wellness & Fitness"
      case "food":
        return "Food & Catering"
      case "events":
        return "Event Planning"
      default:
        return "Other Services"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "taxi":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "tours":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "wellness":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "food":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "events":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "inactive":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "draft":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id))

    toast({
      title: "Service deleted",
      description: "The service has been deleted successfully.",
    })
  }

  const toggleServiceStatus = (id: string) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          const newStatus = service.status === "active" ? "inactive" : "active"
          return { ...service, status: newStatus }
        }
        return service
      }),
    )

    toast({
      title: "Service status updated",
      description: "The service status has been updated successfully.",
    })
  }

  // Filter services based on search query and filters
  const filteredServices = services.filter((service) => {
    // Filter by search query
    if (
      searchQuery &&
      !service.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter && service.status !== statusFilter) {
      return false
    }

    // Filter by category
    if (categoryFilter && service.category !== categoryFilter) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground">Manage your service offerings</p>
          </div>

          <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/vendor/services/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="taxi">Taxi & Transportation</SelectItem>
                  <SelectItem value="tours">Tours & Activities</SelectItem>
                  <SelectItem value="wellness">Wellness & Fitness</SelectItem>
                  <SelectItem value="food">Food & Catering</SelectItem>
                  <SelectItem value="events">Event Planning</SelectItem>
                  <SelectItem value="other">Other Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Services Overview</CardTitle>
                  <CardDescription>
                    {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""} found
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredServices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No services found matching your filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("")
                      setCategoryFilter("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <div className="relative">
                        <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
                        <Badge
                          variant="outline"
                          className={cn("absolute top-2 right-2", getStatusColor(service.status))}
                        >
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{service.name}</h3>
                          <Badge variant="outline" className={cn(getCategoryColor(service.category))}>
                            {getCategoryLabel(service.category)}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{service.price}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{service.bookings} bookings</span>
                          </div>
                          {service.rating > 0 && (
                            <div className="flex items-center text-sm">
                              <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1">{service.rating}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => router.push(`/vendor/services/${service.id}`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => router.push(`/vendor/services/${service.id}/edit`)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toggleServiceStatus(service.id)}>
                                  {service.status === "active" ? "Deactivate" : "Activate"} Service
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 dark:text-red-400"
                                  onClick={() => deleteService(service.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Service
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}

