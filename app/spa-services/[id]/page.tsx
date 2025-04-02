"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, Clock, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

// Mock spa data
const spaData = {
  "serenity-spa": {
    id: "serenity-spa",
    name: "Serenity Spa & Wellness",
    description:
      "Indulge in ultimate relaxation with our premium spa treatments. Our skilled therapists use luxury products and ancient techniques to provide a rejuvenating experience.",
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.9,
    reviews: 89,
    priceRange: "$$$",
    openingHours: "9:00 AM - 8:00 PM",
    location: "Wellness Center, Floor 2",
    treatments: [
      {
        id: "t1",
        name: "Swedish Massage",
        description: "A gentle full body massage designed to improve circulation and relieve tension.",
        duration: 60,
        price: 120,
        availability: true,
        category: "massage",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t2",
        name: "Deep Tissue Massage",
        description:
          "Targets the deeper layers of muscle and connective tissue to release chronic patterns of tension.",
        duration: 60,
        price: 140,
        availability: true,
        category: "massage",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t3",
        name: "Hot Stone Massage",
        description: "Heated stones are placed on specific areas of the body to warm and loosen tight muscles.",
        duration: 90,
        price: 160,
        availability: false,
        category: "massage",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t4",
        name: "Aromatherapy Massage",
        description: "Essential oils are added to a gentle massage to promote relaxation and well-being.",
        duration: 60,
        price: 130,
        availability: true,
        category: "massage",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t5",
        name: "Facial Treatment",
        description: "A customized facial to cleanse, exfoliate, and nourish the skin.",
        duration: 60,
        price: 110,
        availability: true,
        category: "facial",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t6",
        name: "Anti-Aging Facial",
        description: "Advanced treatment designed to reduce fine lines and improve skin elasticity.",
        duration: 75,
        price: 150,
        availability: true,
        category: "facial",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t7",
        name: "Body Scrub & Wrap",
        description: "Exfoliating scrub followed by a hydrating body wrap to rejuvenate the skin.",
        duration: 90,
        price: 170,
        availability: true,
        category: "body",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "t8",
        name: "Manicure & Pedicure",
        description: "Luxury nail care treatment for hands and feet.",
        duration: 90,
        price: 100,
        availability: true,
        category: "beauty",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  "zen-wellness": {
    id: "zen-wellness",
    name: "Zen Wellness Center",
    description: "Find your inner peace with our holistic wellness treatments and therapies.",
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.7,
    reviews: 65,
    priceRange: "$$",
    openingHours: "8:00 AM - 7:00 PM",
    location: "North Wing, Floor 3",
    treatments: [
      {
        id: "z1",
        name: "Zen Massage",
        description: "A balanced massage combining Eastern and Western techniques for total relaxation.",
        duration: 60,
        price: 110,
        availability: true,
        category: "massage",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "z2",
        name: "Meditation Session",
        description: "Guided meditation to reduce stress and promote mindfulness.",
        duration: 45,
        price: 80,
        availability: true,
        category: "wellness",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
}

// Available time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
]

export default function SpaServicePage() {
  const params = useParams()
  const router = useRouter()
  const spaId = params.id as string
  const [spa, setSpa] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (spaData[spaId]) {
        setSpa(spaData[spaId])
        setLoading(false)
      } else {
        setError(true)
        setLoading(false)
      }
    }, 500)
  }, [spaId])

  const handleBookTreatment = (treatment) => {
    setSelectedTreatment(treatment)
    setIsBookingDialogOpen(true)
  }

  const confirmBooking = () => {
    // In a real app, this would send the booking to an API
    setBookingConfirmed(true)
    setIsBookingDialogOpen(false)

    // Redirect to bookings page after a short delay
    setTimeout(() => {
      router.push("/bookings")
    }, 3000)
  }

  // Get all treatment categories
  const getCategories = () => {
    if (!spa) return []

    const categories = new Set(spa.treatments.map((t) => t.category))
    return ["all", ...Array.from(categories)]
  }

  // Filter treatments by category
  const getFilteredTreatments = () => {
    if (!spa) return []

    if (activeCategory === "all") {
      return spa.treatments
    }

    return spa.treatments.filter((t) => t.category === activeCategory)
  }

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Spa Services" />
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Spa Services" />
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Spa Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the spa you're looking for. Please try again later.</p>
            <Button onClick={() => router.push("/spa-services")}>Browse Spa Services</Button>
          </div>
        </div>
        <Navigation />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={spa.name} />

      <div className="container mx-auto px-4 py-6 flex-1 pb-20">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Spa Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{spa.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{spa.priceRange}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{spa.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({spa.reviews} reviews)</span>
              </div>
            </div>

            <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
              <img src={spa.images[0] || "/placeholder.svg"} alt={spa.name} className="w-full h-full object-cover" />
            </div>

            <p className="text-gray-700 mb-6">{spa.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Opening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{spa.openingHours}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{spa.location}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Treatments & Services</h2>

              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="mb-6">
                  {getCategories().map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeCategory} className="space-y-4">
                  {getFilteredTreatments().map((treatment) => (
                    <Card key={treatment.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                            <img
                              src={treatment.image || "/placeholder.svg"}
                              alt={treatment.name}
                              className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                            />
                          </div>
                          <div className="w-full sm:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-lg">{treatment.name}</h3>
                              <span className="font-medium text-lg">${treatment.price}</span>
                            </div>
                            <p className="text-gray-600 mt-1 mb-3">{treatment.description}</p>
                            <div className="flex flex-wrap items-center justify-between">
                              <div className="flex items-center text-gray-500 mb-2 sm:mb-0">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{treatment.duration} minutes</span>
                              </div>
                              <Button
                                className={
                                  treatment.availability
                                    ? "bg-purple-600 hover:bg-purple-700"
                                    : "bg-gray-400 cursor-not-allowed"
                                }
                                disabled={!treatment.availability}
                                onClick={() => handleBookTreatment(treatment)}
                              >
                                {treatment.availability ? "Book Now" : "Not Available"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Booking Information */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
                <CardDescription>Book your spa treatment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md text-purple-800 dark:text-purple-400 text-sm flex items-start">
                  <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Booking Policy</p>
                    <p>
                      Please arrive 15 minutes before your appointment. Cancellations must be made at least 24 hours in
                      advance.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Special Packages</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium">Couple's Retreat</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Enjoy a 60-minute massage for two, followed by a private jacuzzi session.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$250</span>
                        <Button size="sm" variant="outline">
                          Book Package
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium">Ultimate Relaxation</h4>
                      <p className="text-sm text-gray-600 mb-1">Full body massage, facial, and body scrub (3 hours).</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$320</span>
                        <Button size="sm" variant="outline">
                          Book Package
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Treatment</DialogTitle>
            <DialogDescription>
              {selectedTreatment && `Book ${selectedTreatment.name} (${selectedTreatment.duration} min)`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="booking-date">Select Date</Label>
              <div className="mt-1">
                <input
                  type="date"
                  id="booking-date"
                  className="w-full rounded-md border border-gray-300 p-2"
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="booking-time">Select Time</Label>
              <div className="mt-1">
                <select
                  id="booking-time"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium mb-2">Booking Summary</h4>
              {selectedTreatment && (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Treatment:</span>
                    <span>{selectedTreatment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{selectedTreatment.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>${selectedTreatment.price}</span>
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="flex justify-between">
                      <span>Appointment:</span>
                      <span>
                        {formatDate(selectedDate)} at {selectedTime}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={confirmBooking} disabled={!selectedTime}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation */}
      {bookingConfirmed && (
        <Dialog open={bookingConfirmed} onOpenChange={setBookingConfirmed}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Check className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
              <DialogDescription className="text-center">
                Your spa treatment has been booked successfully.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Booking Details</h4>
              {selectedTreatment && (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Treatment:</span>
                    <span>{selectedTreatment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{selectedTreatment.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>${selectedTreatment.price}</span>
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="flex justify-between">
                      <span>Appointment:</span>
                      <span>
                        {formatDate(selectedDate)} at {selectedTime}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span>
                      SPA-
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-sm text-gray-500 mt-2">Redirecting to your bookings page...</div>
          </DialogContent>
        </Dialog>
      )}

      <Navigation />
    </div>
  )
}

