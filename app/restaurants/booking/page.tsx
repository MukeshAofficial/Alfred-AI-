"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Users, ChevronRight, Check, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

export default function RestaurantBookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState("2")
  const [selectedTable, setSelectedTable] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [bookingComplete, setBookingComplete] = useState(false)

  // Mock data for restaurant tables
  const tables = [
    { id: "1", name: "Table 1", seats: 2, status: "available", location: "window" },
    { id: "2", name: "Table 2", seats: 2, status: "reserved", location: "window" },
    { id: "3", name: "Table 3", seats: 4, status: "available", location: "center" },
    { id: "4", name: "Table 4", seats: 4, status: "occupied", location: "center" },
    { id: "5", name: "Table 5", seats: 2, status: "available", location: "window" },
    { id: "6", name: "Table 6", seats: 6, status: "available", location: "corner" },
    { id: "7", name: "Table 7", seats: 8, status: "reserved", location: "corner" },
    { id: "8", name: "Table 8", seats: 4, status: "available", location: "center" },
    { id: "9", name: "Table 9", seats: 2, status: "available", location: "bar" },
    { id: "10", name: "Table 10", seats: 2, status: "available", location: "bar" },
    { id: "11", name: "Table 11", seats: 4, status: "cleaning", location: "center" },
    { id: "12", name: "Table 12", seats: 4, status: "reserved", location: "window" },
  ]

  // Available time slots
  const timeSlots = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]

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

  const handleNextStep = () => {
    if (step === 1 && (!date || !time || !guests)) {
      alert("Please fill in all required fields")
      return
    }

    if (step === 2 && !selectedTable) {
      alert("Please select a table")
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit booking
      setBookingComplete(true)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const filteredTables = tables.filter((table) => {
    // Filter by availability
    if (table.status !== "available") {
      return false
    }

    // Filter by number of guests
    if (table.seats < Number.parseInt(guests)) {
      return false
    }

    return true
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Restaurant Booking" />

      <main className="flex-1 container max-w-md mx-auto p-4 pb-20">
        {!bookingComplete ? (
          <Card>
            <CardHeader>
              <CardTitle>Book a Table</CardTitle>
              <CardDescription>Reserve your table at The Grand Bistro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      1
                    </div>
                    <span className="ml-2 font-medium">Details</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      2
                    </div>
                    <span className="ml-2 font-medium">Table</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 3 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                    <span className="ml-2 font-medium">Confirm</span>
                  </div>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select value={time} onValueChange={setTime} required>
                      <SelectTrigger id="time" className="w-full">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <SelectValue placeholder="Select time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests} onValueChange={setGuests} required>
                      <SelectTrigger id="guests" className="w-full">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-gray-500" />
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
                    <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any special requests or dietary requirements?"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Select a Table</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/restaurants/the-grand-bistro/menu")}
                    >
                      View Menu
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="text-sm">Occupied</span>
                    </div>
                  </div>

                  <div className="relative border border-dashed p-4 h-[300px] bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
                    {/* This is a visual representation of the restaurant layout */}
                    <div className="absolute top-4 left-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-xs">
                      Entrance
                    </div>

                    {/* Windows */}
                    <div className="absolute top-0 right-0 w-4 h-full bg-blue-100 dark:bg-blue-900/30"></div>

                    {/* Tables */}
                    {tables.map((table) => {
                      // Position tables based on their location
                      let position = {}
                      if (table.location === "window") {
                        position = { right: "20px", top: `${(Number.parseInt(table.id) * 60) % 240}px` }
                      } else if (table.location === "bar") {
                        position = { left: "20px", top: `${(Number.parseInt(table.id) * 60) % 240}px` }
                      } else if (table.location === "corner") {
                        if (Number.parseInt(table.id) % 2 === 0) {
                          position = { right: "60px", bottom: "20px" }
                        } else {
                          position = { right: "60px", top: "20px" }
                        }
                      } else {
                        // Center tables
                        const row = Math.floor(Number.parseInt(table.id) / 3)
                        const col = Number.parseInt(table.id) % 3
                        position = {
                          left: `${100 + col * 80}px`,
                          top: `${80 + row * 80}px`,
                        }
                      }

                      return (
                        <div
                          key={table.id}
                          className={`absolute border-2 rounded-md flex flex-col items-center justify-center p-2 cursor-pointer ${
                            table.status === "available"
                              ? selectedTable === table.id
                                ? "border-red-600 bg-red-100 dark:bg-red-900/30"
                                : "border-green-500 bg-green-100/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
                              : "border-gray-300 bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
                          }`}
                          style={{
                            ...position,
                            width: table.seats > 4 ? "70px" : "60px",
                            height: table.seats > 4 ? "60px" : "50px",
                          }}
                          onClick={() => {
                            if (table.status === "available") {
                              setSelectedTable(table.id)
                            }
                          }}
                        >
                          <span className="text-xs font-medium">{table.name}</span>
                          <span className="text-xs">{table.seats} seats</span>
                        </div>
                      )
                    })}
                  </div>

                  {filteredTables.length === 0 && (
                    <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-md text-amber-800 dark:text-amber-400 text-sm flex items-start">
                      <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">No tables available</p>
                        <p>
                          There are no tables available that match your criteria. Please try a different time or date,
                          or reduce the number of guests.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Label className="text-sm font-medium">Selected Table</Label>
                    <p className="text-sm mt-1">
                      {selectedTable
                        ? `${tables.find((t) => t.id === selectedTable)?.name} (${tables.find((t) => t.id === selectedTable)?.seats} seats)`
                        : "No table selected"}
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Confirm Your Booking</h3>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-sm font-medium">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Time:</span>
                      <span className="text-sm font-medium">{time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Guests:</span>
                      <span className="text-sm font-medium">
                        {guests} {Number.parseInt(guests) === 1 ? "person" : "people"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Table:</span>
                      <span className="text-sm font-medium">
                        {tables.find((t) => t.id === selectedTable)?.name} (
                        {tables.find((t) => t.id === selectedTable)?.location})
                      </span>
                    </div>
                    {specialRequests && (
                      <div>
                        <span className="text-sm text-gray-500">Special Requests:</span>
                        <p className="text-sm mt-1">{specialRequests}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-blue-800 dark:text-blue-400 text-sm flex items-start">
                    <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Booking Policy</p>
                      <p>
                        Please arrive on time. We hold reservations for 15 minutes after the scheduled time.
                        Cancellations should be made at least 2 hours in advance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={() => router.push("/restaurants/the-grand-bistro")}>
                  Cancel
                </Button>
              )}
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleNextStep}>
                {step < 3 ? "Continue" : "Confirm Booking"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                <Check className="h-6 w-6" />
              </div>
              <CardTitle>Booking Confirmed!</CardTitle>
              <CardDescription>Your table has been reserved successfully</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Booking Reference:</span>
                  <span className="text-sm font-medium">
                    RES-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="text-sm font-medium">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Time:</span>
                  <span className="text-sm font-medium">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Guests:</span>
                  <span className="text-sm font-medium">
                    {guests} {Number.parseInt(guests) === 1 ? "person" : "people"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Table:</span>
                  <span className="text-sm font-medium">{tables.find((t) => t.id === selectedTable)?.name}</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  A confirmation has been sent to your room. You can view and manage your booking in the "My Bookings"
                  section.
                </p>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => router.push("/restaurants/the-grand-bistro/menu")}
                >
                  View Menu
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/profile/bookings")}>
                  My Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Navigation />
    </div>
  )
}

