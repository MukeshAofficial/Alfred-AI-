"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, Users, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

// Mock restaurant data
const restaurantData = {
  "the-grand-bistro": {
    id: "the-grand-bistro",
    name: "The Grand Bistro",
    description:
      "Experience fine dining with panoramic ocean views. Our award-winning chefs create exquisite dishes using locally sourced ingredients.",
    image: "/placeholder.svg?height=400&width=600",
    cuisine: "International",
    priceRange: "$$$$",
    tables: [
      { id: 1, name: "Table 1", seats: 2, status: "available" },
      { id: 2, name: "Table 2", seats: 2, status: "booked" },
      { id: 3, name: "Table 3", seats: 4, status: "available" },
      { id: 4, name: "Table 4", seats: 4, status: "cleaning" },
      { id: 5, name: "Table 5", seats: 6, status: "available" },
      { id: 6, name: "Table 6", seats: 6, status: "booked" },
      { id: 7, name: "Table 7", seats: 8, status: "available" },
      { id: 8, name: "Table 8", seats: 2, status: "booked" },
      { id: 9, name: "Table 9", seats: 4, status: "cleaning" },
      { id: 10, name: "Table 10", seats: 2, status: "available" },
      { id: 11, name: "Table 11", seats: 4, status: "available" },
      { id: 12, name: "Table 12", seats: 8, status: "booked" },
    ],
  },
  "seaside-grill": {
    id: "seaside-grill",
    name: "Seaside Grill",
    description: "Casual oceanfront dining featuring fresh seafood and grilled specialties.",
    image: "/placeholder.svg?height=400&width=600",
    cuisine: "Seafood & Grill",
    priceRange: "$$$",
    tables: [
      { id: 1, name: "Table 1", seats: 2, status: "available" },
      { id: 2, name: "Table 2", seats: 2, status: "available" },
      { id: 3, name: "Table 3", seats: 4, status: "booked" },
      { id: 4, name: "Table 4", seats: 4, status: "available" },
      { id: 5, name: "Table 5", seats: 6, status: "available" },
      { id: 6, name: "Table 6", seats: 6, status: "booked" },
    ],
  },
}

// Time slots for booking
const timeSlots = [
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
]

export default function RestaurantBookingPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string
  const [restaurant, setRestaurant] = useState(restaurantData[restaurantId])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedGuests, setSelectedGuests] = useState("2")
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [specialRequests, setSpecialRequests] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const isMobile = useMobile()

  // Filter tables based on guest count
  const filteredTables =
    restaurant?.tables.filter(
      (table) => table.seats >= Number.parseInt(selectedGuests) && table.status === "available",
    ) || []

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleConfirmBooking = () => {
    // In a real app, this would send the booking to an API
    setBookingConfirmed(true)

    // After a delay, redirect to the bookings page
    setTimeout(() => {
      router.push("/bookings")
    }, 3000)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString))
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Restaurant Booking" />
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the restaurant you're looking for. Please try again later.
            </p>
            <Button onClick={() => router.push("/restaurants")}>Browse Restaurants</Button>
          </div>
        </div>
        <Navigation />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Restaurant Booking" />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-500">Table Reservation</p>
          </div>
        </div>

        {bookingConfirmed ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="mx-auto bg-green-100 rounded-full p-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-center">Booking Confirmed!</CardTitle>
              <CardDescription className="text-center">
                Your reservation has been successfully confirmed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-t border-b py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Restaurant</p>
                      <p className="font-medium">{restaurant.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Table</p>
                      <p className="font-medium">
                        {restaurant.tables.find((t) => t.id.toString() === selectedTable)?.name || ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(selectedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="font-medium">{selectedGuests} people</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500">Redirecting to your bookings...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className={`flex-1 ${currentStep > 1 ? "text-primary" : ""}`}>
                  <div className="flex items-center">
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center ${
                        currentStep > 1 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      1
                    </div>
                    <span className="ml-2 hidden sm:inline">Details</span>
                  </div>
                </div>
                <div className="w-full max-w-[100px] h-1 bg-gray-200 mx-2">
                  <div className={`h-full bg-primary ${currentStep > 1 ? "w-full" : "w-0"}`}></div>
                </div>
                <div className={`flex-1 ${currentStep > 2 ? "text-primary" : ""}`}>
                  <div className="flex items-center">
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center ${
                        currentStep > 2
                          ? "bg-primary text-white"
                          : currentStep === 2
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                      }`}
                    >
                      2
                    </div>
                    <span className="ml-2 hidden sm:inline">Table Selection</span>
                  </div>
                </div>
                <div className="w-full max-w-[100px] h-1 bg-gray-200 mx-2">
                  <div className={`h-full bg-primary ${currentStep > 2 ? "w-full" : "w-0"}`}></div>
                </div>
                <div className={`flex-1 ${currentStep === 3 ? "text-primary" : ""}`}>
                  <div className="flex items-center">
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center ${
                        currentStep === 3 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      3
                    </div>
                    <span className="ml-2 hidden sm:inline">Confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Reservation Details</CardTitle>
                  <CardDescription>Select your preferred date, time, and party size</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        type="date"
                        id="date"
                        className="pl-10"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="time" className="w-full">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <SelectValue placeholder="Select time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={selectedGuests} onValueChange={setSelectedGuests}>
                      <SelectTrigger id="guests" className="w-full">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <SelectValue placeholder="Select number of guests" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5 People</SelectItem>
                        <SelectItem value="6">6 People</SelectItem>
                        <SelectItem value="7">7 People</SelectItem>
                        <SelectItem value="8">8+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Input
                      id="requests"
                      placeholder="E.g., Dietary restrictions, special occasions, etc."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNextStep} disabled={!selectedDate || !selectedTime || !selectedGuests}>
                    Next: Select Table
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Table</CardTitle>
                  <CardDescription>
                    Choose from available tables for {formatDate(selectedDate)} at {selectedTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Available Tables</h3>

                    {filteredTables.length > 0 ? (
                      <RadioGroup value={selectedTable} onValueChange={setSelectedTable}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredTables.map((table) => (
                            <div key={table.id} className="relative">
                              <RadioGroupItem
                                value={table.id.toString()}
                                id={`table-${table.id}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`table-${table.id}`}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <div className="mb-2 rounded-full bg-primary/10 p-2">
                                  <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{table.name}</div>
                                  <div className="text-sm text-muted-foreground">{table.seats} seats</div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-red-500 mb-4">No tables available for the selected criteria.</p>
                        <Button variant="outline" onClick={handlePreviousStep}>
                          Change Reservation Details
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!selectedTable}>
                    Next: Confirm Booking
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Confirm Your Reservation</CardTitle>
                  <CardDescription>Please review your booking details before confirming</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{restaurant.name}</h3>
                        <p className="text-sm text-gray-500">
                          {restaurant.cuisine} • {restaurant.priceRange}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-b py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{formatDate(selectedDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Guests</p>
                          <p className="font-medium">{selectedGuests} people</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Table</p>
                          <p className="font-medium">
                            {restaurant.tables.find((t) => t.id.toString() === selectedTable)?.name || ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {specialRequests && (
                      <div>
                        <p className="text-sm text-gray-500">Special Requests</p>
                        <p>{specialRequests}</p>
                      </div>
                    )}

                    <div className="bg-yellow-50 p-4 rounded-md">
                      <p className="text-sm text-yellow-800">
                        Please note that we hold your table for 15 minutes after the reservation time. If you need to
                        cancel or modify your reservation, please do so at least 2 hours in advance.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleConfirmBooking}>Confirm Reservation</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </div>

      <Navigation />
    </div>
  )
}

