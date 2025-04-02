"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Edit, Trash2, Star, MapPin, Clock, DollarSign, Users, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock service data - in a real app, this would come from an API call
const mockService = {
  id: "1",
  name: "City Tour Experience",
  category: "Excursion",
  description:
    "Explore the beautiful city with our expert guides. Visit historical landmarks, cultural sites, and enjoy local cuisine.",
  price: 89.99,
  duration: "4 hours",
  location: "Hotel Lobby",
  capacity: 12,
  rating: 4.8,
  reviews: 124,
  image: "/placeholder.svg?height=400&width=600",
  isActive: true,
  availableDates: [
    { date: "2023-08-15", slots: ["09:00", "14:00"] },
    { date: "2023-08-16", slots: ["09:00", "14:00"] },
    { date: "2023-08-17", slots: ["09:00", "14:00"] },
  ],
  amenities: [
    "Air-conditioned transportation",
    "Professional guide",
    "Entrance fees",
    "Bottled water",
    "Lunch at local restaurant",
  ],
  bookings: [
    { id: "b1", guestName: "John Smith", date: "2023-08-15", time: "09:00", guests: 2, status: "confirmed" },
    { id: "b2", guestName: "Emma Johnson", date: "2023-08-16", time: "14:00", guests: 4, status: "pending" },
    { id: "b3", guestName: "Michael Brown", date: "2023-08-17", time: "09:00", guests: 1, status: "cancelled" },
  ],
}

export default function AdminServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [service, setService] = useState(mockService)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedService, setEditedService] = useState(service)

  // In a real app, fetch the service data based on the ID
  // useEffect(() => {
  //   const fetchService = async () => {
  //     const response = await fetch(`/api/services/${params.id}`)
  //     const data = await response.json()
  //     setService(data)
  //     setEditedService(data)
  //   }
  //   fetchService()
  // }, [params.id])

  const handleEditSubmit = () => {
    // In a real app, send a PUT request to update the service
    setService(editedService)
    setIsEditDialogOpen(false)
  }

  const handleDeleteService = () => {
    // In a real app, send a DELETE request to remove the service
    router.push("/admin/services")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedService({
      ...editedService,
      [name]: value,
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setEditedService({
      ...editedService,
      isActive: checked,
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" onClick={() => router.push("/admin/services")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
        <h1 className="text-2xl font-bold flex-1">{service.name}</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge>{service.category}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                    <span>${service.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1" />
                    <span>Max {service.capacity} people</span>
                  </div>
                  <Badge variant={service.isActive ? "success" : "destructive"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="mt-4">
                    <p>{service.description}</p>
                  </TabsContent>
                  <TabsContent value="amenities" className="mt-4">
                    <ul className="space-y-2">
                      {service.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="availability" className="mt-4">
                    <div className="space-y-4">
                      {service.availableDates.map((dateInfo, index) => (
                        <Card key={index}>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm font-medium flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(dateInfo.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-2">
                            <div className="flex flex-wrap gap-2">
                              {dateInfo.slots.map((slot, slotIndex) => (
                                <Badge key={slotIndex} variant="outline">
                                  {slot}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="bookings" className="mt-4">
                    <div className="space-y-4">
                      {service.bookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{booking.guestName}</h3>
                                <p className="text-sm text-gray-500">
                                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                                </p>
                                <p className="text-sm">Guests: {booking.guests}</p>
                              </div>
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "success"
                                    : booking.status === "pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Service Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-bold">{service.bookings.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Confirmed Bookings</p>
                  <p className="text-2xl font-bold">
                    {service.bookings.filter((b) => b.status === "confirmed").length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Bookings</p>
                  <p className="text-2xl font-bold">{service.bookings.filter((b) => b.status === "pending").length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cancelled Bookings</p>
                  <p className="text-2xl font-bold">
                    {service.bookings.filter((b) => b.status === "cancelled").length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    $
                    {(
                      service.price *
                      service.bookings.filter((b) => b.status === "confirmed").reduce((acc, b) => acc + b.guests, 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Make changes to the service details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" name="name" value={editedService.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={editedService.category} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" name="price" type="number" value={editedService.price} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" value={editedService.duration} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="capacity">Max Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={editedService.capacity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={editedService.location} onChange={handleInputChange} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedService.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={editedService.isActive} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteService}>
              Delete Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

