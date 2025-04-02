"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Star, Users, ChevronLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock spa data
const spaData = {
  id: "1",
  name: "Serenity Spa & Wellness",
  description:
    "Indulge in ultimate relaxation with our premium spa treatments. Our skilled therapists use luxury products and ancient techniques to provide a rejuvenating experience.",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  rating: 4.9,
  reviews: 89,
  priceRange: "$$$",
  openingHours: "9:00 AM - 8:00 PM",
  location: "Wellness Center, Floor 2",
  treatments: [
    {
      id: 1,
      name: "Swedish Massage",
      description: "A gentle full body massage designed to improve circulation and relieve tension.",
      duration: 60,
      price: 120,
      availability: true,
    },
    {
      id: 2,
      name: "Deep Tissue Massage",
      description: "Targets the deeper layers of muscle and connective tissue to release chronic patterns of tension.",
      duration: 60,
      price: 140,
      availability: true,
    },
    {
      id: 3,
      name: "Hot Stone Massage",
      description: "Heated stones are placed on specific areas of the body to warm and loosen tight muscles.",
      duration: 90,
      price: 160,
      availability: false,
    },
    {
      id: 4,
      name: "Aromatherapy Massage",
      description: "Essential oils are added to a gentle massage to promote relaxation and well-being.",
      duration: 60,
      price: 130,
      availability: true,
    },
    {
      id: 5,
      name: "Facial Treatment",
      description: "A customized facial to cleanse, exfoliate, and nourish the skin for a radiant complexion.",
      duration: 45,
      price: 110,
      availability: true,
    },
  ],
  amenities: [
    "Private treatment rooms",
    "Steam room",
    "Sauna",
    "Relaxation lounge",
    "Complimentary herbal tea",
    "Luxury shower facilities",
    "Plush robes and slippers",
  ],
}

export default function SpaDetailPage() {
  const router = useRouter()
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const handleBooking = () => {
    if (selectedTreatment !== null && selectedDate && selectedTime) {
      // In a real app, this would send the booking data to an API
      console.log("Booking:", {
        treatmentId: selectedTreatment,
        date: selectedDate,
        time: selectedTime,
      })

      // Redirect to bookings page
      router.push("/bookings")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Button variant="ghost" className="mb-4 pl-0" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <Image src={spaData.images[0] || "/placeholder.svg"} alt={spaData.name} fill className="object-cover" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{spaData.name}</h1>
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-medium mr-1">{spaData.rating}</span>
              <span className="text-gray-500">({spaData.reviews} reviews)</span>
              <Badge variant="outline" className="ml-3">
                {spaData.priceRange}
              </Badge>
            </div>
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{spaData.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{spaData.openingHours}</span>
            </div>
          </div>

          <Tabs defaultValue="treatments">
            <TabsList className="mb-4">
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="treatments" className="space-y-4">
              {spaData.treatments.map((treatment) => (
                <Card
                  key={treatment.id}
                  className={`cursor-pointer transition-all ${selectedTreatment === treatment.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => (treatment.availability ? setSelectedTreatment(treatment.id) : null)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{treatment.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{treatment.description}</p>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{treatment.duration} min</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${treatment.price}</div>
                        {!treatment.availability && (
                          <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200">
                            Unavailable
                          </Badge>
                        )}
                        {selectedTreatment === treatment.id && (
                          <div className="mt-2">
                            <Check className="h-5 w-5 text-primary ml-auto" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="about">
              <p className="text-gray-700">{spaData.description}</p>
              <p className="text-gray-700 mt-4">
                Our spa offers a tranquil escape from the hustle and bustle of everyday life. Each treatment is
                personalized to meet your specific needs, ensuring a truly bespoke experience. Our therapists are highly
                trained professionals who are dedicated to providing exceptional service.
              </p>
              <p className="text-gray-700 mt-4">
                We use only the finest organic and natural products that are kind to your skin and the environment. Our
                spa facilities are designed to create a serene atmosphere where you can unwind and rejuvenate.
              </p>
            </TabsContent>

            <TabsContent value="amenities">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {spaData.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500 text-white font-bold rounded p-2 mr-3">{spaData.rating}</div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(spaData.rating) ? "text-yellow-500" : "text-gray-300"}`}
                          fill={i < Math.floor(spaData.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Based on {spaData.reviews} reviews</p>
                  </div>
                </div>

                <p className="text-gray-500 italic">
                  Reviews are coming soon. Be the first to leave a review after your treatment!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book Your Treatment</h2>

              {selectedTreatment === null ? (
                <p className="text-gray-500 mb-4">Please select a treatment from the list</p>
              ) : (
                <div className="mb-4">
                  <p className="font-medium">{spaData.treatments.find((t) => t.id === selectedTreatment)?.name}</p>
                  <p className="text-gray-500 text-sm">
                    {spaData.treatments.find((t) => t.id === selectedTreatment)?.duration} min | $
                    {spaData.treatments.find((t) => t.id === selectedTreatment)?.price}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2 border rounded-md"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <select
                      className="w-full pl-10 pr-3 py-2 border rounded-md appearance-none"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <select className="w-full pl-10 pr-3 py-2 border rounded-md appearance-none" defaultValue="1">
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Treatment</span>
                    <span>
                      $
                      {selectedTreatment !== null
                        ? spaData.treatments.find((t) => t.id === selectedTreatment)?.price
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      $
                      {selectedTreatment !== null
                        ? spaData.treatments.find((t) => t.id === selectedTreatment)?.price
                        : 0}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={selectedTreatment === null || !selectedDate || !selectedTime}
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

