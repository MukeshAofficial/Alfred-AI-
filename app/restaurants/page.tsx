"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Star, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

// Mock restaurant data
const restaurants = [
  {
    id: "the-grand-bistro",
    name: "The Grand Bistro",
    description:
      "Experience fine dining with panoramic ocean views. Our award-winning chefs create exquisite dishes using locally sourced ingredients.",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "International",
    priceRange: "$$$$",
    rating: 4.8,
    reviews: 124,
    openingHours: {
      breakfast: "7:00 AM - 10:30 AM",
      lunch: "12:00 PM - 3:00 PM",
      dinner: "6:30 PM - 10:30 PM",
    },
    location: "Main Building, Floor 1",
  },
  {
    id: "seaside-grill",
    name: "Seaside Grill",
    description: "Casual oceanfront dining featuring fresh seafood and grilled specialties.",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "Seafood & Grill",
    priceRange: "$$$",
    rating: 4.6,
    reviews: 98,
    openingHours: {
      breakfast: "7:00 AM - 10:30 AM",
      lunch: "12:00 PM - 3:00 PM",
      dinner: "6:30 PM - 10:30 PM",
    },
    location: "Beach Level, South Wing",
  },
  {
    id: "asian-fusion",
    name: "Lotus Asian Fusion",
    description: "Modern Asian cuisine with a creative twist, featuring sushi, dim sum, and wok specialties.",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "Asian Fusion",
    priceRange: "$$$",
    rating: 4.7,
    reviews: 86,
    openingHours: {
      lunch: "12:00 PM - 3:00 PM",
      dinner: "6:00 PM - 10:00 PM",
    },
    location: "Main Building, Floor 2",
  },
  {
    id: "italian-trattoria",
    name: "Bella Trattoria",
    description: "Authentic Italian cuisine with homemade pasta, wood-fired pizzas, and an extensive wine selection.",
    image: "/placeholder.svg?height=200&width=300",
    cuisine: "Italian",
    priceRange: "$$$",
    rating: 4.5,
    reviews: 72,
    openingHours: {
      lunch: "12:00 PM - 3:00 PM",
      dinner: "6:00 PM - 10:00 PM",
    },
    location: "Garden Level, East Wing",
  },
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const router = useRouter()
  const isMobile = useMobile()

  // Filter restaurants based on search query and cuisine filter
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCuisine = selectedCuisine === "All" || restaurant.cuisine === selectedCuisine

    return matchesSearch && matchesCuisine
  })

  // Get unique cuisines for filter
  const cuisines = ["All", ...new Set(restaurants.map((r) => r.cuisine))]

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Restaurants" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hotel Restaurants</h1>
          <p className="text-gray-500">Explore our dining options and make reservations</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search restaurants..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCuisine(cuisine)}
                className="whitespace-nowrap"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video relative">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white text-black">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {restaurant.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{restaurant.name}</h3>
                      <Badge variant="outline">{restaurant.priceRange}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{restaurant.cuisine}</Badge>
                      <span className="text-sm text-gray-500">{restaurant.reviews} reviews</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{restaurant.description}</p>
                    <div className="flex flex-col space-y-1 mb-4">
                      <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                        <span>{restaurant.location}</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <Clock className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                        <div>
                          {restaurant.openingHours.dinner && <div>Dinner: {restaurant.openingHours.dinner}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => router.push(`/restaurants/${restaurant.id}`)}>
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.push(`/restaurants/${restaurant.id}/booking`)}
                      >
                        Reserve Table
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No Restaurants Found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCuisine("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  )
}

