"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock data for taxi service
const taxiService = {
  id: "1",
  name: "Premium Airport Transfer",
  description: "Luxury airport transfer service with professional drivers and premium vehicles.",
  longDescription:
    "Our premium airport transfer service offers a seamless travel experience with professional drivers and luxury vehicles. Enjoy a comfortable ride to or from the airport with our reliable and punctual service. All our drivers are experienced professionals who know the best routes to avoid traffic and ensure you reach your destination on time.",
  image: "/placeholder.svg?height=400&width=600",
  price: 75,
  currency: "USD",
  rating: 4.8,
  reviews: 124,
  location: "Airport & City Center",
  duration: "45-60 min",
  capacity: "1-4 passengers",
  amenities: ["Free Wi-Fi", "Bottled Water", "Air Conditioning", "Luggage Assistance"],
  availableTimes: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  cancellationPolicy: "Free cancellation up to 24 hours before scheduled pickup",
  provider: {
    name: "Luxury Transfers Inc.",
    image: "/placeholder.svg?height=50&width=50",
    rating: 4.9,
    verified: true,
  },
}

// Reviews data
const reviews = [
  {
    id: "1",
    user: "John D.",
    rating: 5,
    date: "2023-10-15",
    comment: "Excellent service! The driver was on time and very professional. The car was clean and comfortable.",
  },
  {
    id: "2",
    user: "Sarah M.",
    rating: 4,
    date: "2023-10-10",
    comment: "Good service overall. The driver was friendly and got us to the airport on time.",
  },
  {
    id: "3",
    user: "Robert K.",
    rating: 5,
    date: "2023-10-05",
    comment: "Outstanding experience! The vehicle was luxurious and the driver was extremely courteous.",
  },
]

export default function TaxiServicePage() {
  const params = useParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [passengers, setPassengers] = useState<number>(1)

  const handleBooking = () => {
    // In a real app, you would save the booking details to a database
    // For now, we'll just navigate to the bookings page
    router.push("/bookings")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <Image src={taxiService.image || "/placeholder.svg"} alt={taxiService.name} fill className="object-cover" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">{taxiService.name}</h1>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-medium mr-1">{taxiService.rating}</span>
            <span className="text-gray-500 mr-4">({taxiService.reviews} reviews)</span>
            <MapPin className="h-5 w-5 text-gray-500 mr-1" />
            <span className="text-gray-500">{taxiService.location}</span>
          </div>

          <Tabs defaultValue="details" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">{taxiService.longDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-gray-500">{taxiService.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p className="text-gray-500">{taxiService.capacity}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Cancellation</p>
                        <p className="text-gray-500 text-sm">Free up to 24h before</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {taxiService.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        {amenity}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Cancellation Policy</h3>
                    <p className="text-gray-500">{taxiService.cancellationPolicy}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold mr-2">{taxiService.rating}</span>
                    <span className="text-gray-500">({taxiService.reviews} reviews)</span>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="pb-4 border-b border-gray-200 last:border-0">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{review.user}</span>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4 mr-0.5",
                                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300",
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book Your Transfer</CardTitle>
              <CardDescription>Select date, time and passengers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Select a time</option>
                    {taxiService.availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Passengers</label>
                  <div className="flex items-center">
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      -
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center border-t border-b">{passengers}</div>
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                      onClick={() => setPassengers(Math.min(4, passengers + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex justify-between w-full mb-4">
                <span className="text-gray-500">Price</span>
                <span className="font-bold">${taxiService.price.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

