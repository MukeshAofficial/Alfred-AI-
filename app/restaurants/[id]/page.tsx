"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, ArrowLeft, Star, MapPin, Menu, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

// Mock restaurant data
const restaurantData = {
  "the-grand-bistro": {
    id: "the-grand-bistro",
    name: "The Grand Bistro",
    description:
      "Experience fine dining with panoramic ocean views. Our award-winning chefs create exquisite dishes using locally sourced ingredients.",
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.8,
    reviews: 124,
    cuisine: "International",
    priceRange: "$$$$",
    openingHours: {
      breakfast: "7:00 AM - 10:30 AM",
      lunch: "12:00 PM - 3:00 PM",
      dinner: "6:30 PM - 10:30 PM",
    },
    location: "Main Building, Floor 1",
  },
  "seaside-grill": {
    id: "seaside-grill",
    name: "Seaside Grill",
    description: "Casual oceanfront dining featuring fresh seafood and grilled specialties.",
    images: ["/placeholder.svg?height=400&width=600"],
    rating: 4.6,
    reviews: 98,
    cuisine: "Seafood & Grill",
    priceRange: "$$$",
    openingHours: {
      breakfast: "7:00 AM - 10:30 AM",
      lunch: "12:00 PM - 3:00 PM",
      dinner: "6:30 PM - 10:30 PM",
    },
    location: "Beach Level, South Wing",
  },
}

export default function RestaurantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string
  const [restaurant, setRestaurant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (restaurantData[restaurantId]) {
        setRestaurant(restaurantData[restaurantId])
        setLoading(false)
      } else {
        setError(true)
        setLoading(false)
      }
    }, 500)
  }, [restaurantId])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Restaurant" />
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
        <Header title="Restaurant Not Found" />
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
      <Header title={restaurant.name} />

      <div className="container mx-auto px-4 py-6 flex-1 pb-20">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Restaurant Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge>{restaurant.cuisine}</Badge>
              <Badge variant="outline">{restaurant.priceRange}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{restaurant.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({restaurant.reviews} reviews)</span>
              </div>
            </div>

            <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
              <img
                src={restaurant.images[0] || "/placeholder.svg"}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-700 mb-6">{restaurant.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Opening Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Breakfast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{restaurant.openingHours.breakfast}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Lunch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{restaurant.openingHours.lunch}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Dinner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{restaurant.openingHours.dinner}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                <p>{restaurant.location}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => router.push(`/restaurants/${restaurantId}/menu`)}
              >
                <Menu className="mr-2 h-4 w-4" />
                View Menu
              </Button>
              <Button className="flex-1" onClick={() => router.push(`/restaurants/${restaurantId}/booking`)}>
                <Calendar className="mr-2 h-4 w-4" />
                Reserve a Table
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push("/room-dining")}>
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Order In-Room Dining
              </Button>
            </div>
          </div>

          {/* Booking Section */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reservation</CardTitle>
                <CardDescription>Book your table at {restaurant.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <input type="date" id="date" className="w-full pl-10 py-2 border rounded-md" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <select id="time" className="w-full py-2 border rounded-md">
                      <option value="">Select time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <select id="guests" className="w-full py-2 border rounded-md">
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6 People</option>
                      <option value="7">7 People</option>
                      <option value="8">8+ People</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => router.push(`/restaurants/${restaurantId}/booking`)}
                >
                  Check Availability
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Special Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                    <h4 className="font-medium text-red-800">Happy Hour</h4>
                    <p className="text-sm text-red-700">Enjoy 20% off all drinks from 5PM to 7PM daily.</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <h4 className="font-medium text-blue-800">Weekend Brunch</h4>
                    <p className="text-sm text-blue-700">Special brunch menu available on weekends from 10AM to 2PM.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

