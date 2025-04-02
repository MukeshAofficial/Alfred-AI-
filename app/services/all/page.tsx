"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Utensils, Car, SpadeIcon as Spa, Map, Coffee, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for services
const services = [
  {
    id: "1",
    name: "Fine Dining Restaurant",
    category: "restaurant",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=300",
    description: "Experience exquisite cuisine with our award-winning chefs.",
    price: "$$$$",
    location: "Main Building, Floor 1",
    availability: true,
  },
  {
    id: "2",
    name: "Luxury Spa Treatment",
    category: "spa",
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    description: "Relax and rejuvenate with our premium spa services.",
    price: "$$$",
    location: "Wellness Center, Floor 2",
    availability: true,
  },
  {
    id: "3",
    name: "Airport Transfer",
    category: "taxi",
    rating: 4.7,
    reviews: 56,
    image: "/placeholder.svg?height=200&width=300",
    description: "Comfortable and reliable transportation to and from the airport.",
    price: "$$",
    location: "Hotel Entrance",
    availability: true,
  },
  {
    id: "4",
    name: "City Tour",
    category: "excursion",
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=200&width=300",
    description: "Explore the city with our knowledgeable guides.",
    price: "$$",
    location: "Hotel Lobby",
    availability: false,
  },
  {
    id: "5",
    name: "Breakfast Buffet",
    category: "restaurant",
    rating: 4.5,
    reviews: 112,
    image: "/placeholder.svg?height=200&width=300",
    description: "Start your day with our extensive breakfast selection.",
    price: "$$",
    location: "Main Restaurant, Floor 1",
    availability: true,
  },
  {
    id: "6",
    name: "Souvenir Shop",
    category: "shopping",
    rating: 4.3,
    reviews: 45,
    image: "/placeholder.svg?height=200&width=300",
    description: "Find the perfect memento of your stay.",
    price: "$$",
    location: "Main Building, Floor G",
    availability: true,
  },
]

// Category icons mapping
const categoryIcons = {
  restaurant: <Utensils className="h-5 w-5" />,
  spa: <Spa className="h-5 w-5" />,
  taxi: <Car className="h-5 w-5" />,
  excursion: <Map className="h-5 w-5" />,
  cafe: <Coffee className="h-5 w-5" />,
  shopping: <ShoppingBag className="h-5 w-5" />,
}

export default function AllServicesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recommended")

  // Filter services based on search query and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Sort services based on selected option
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "price-low") return a.price.length - b.price.length
    if (sortBy === "price-high") return b.price.length - a.price.length
    // Default: recommended (no specific sort)
    return 0
  })

  const handleServiceClick = (service) => {
    router.push(`/${service.category}/${service.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Services</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="spa">Spa</SelectItem>
              <SelectItem value="taxi">Transportation</SelectItem>
              <SelectItem value="excursion">Excursions</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={service.availability ? "default" : "destructive"}>
                  {service.availability ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categoryIcons[service.category]}
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{service.name}</span>
                <span className="text-sm font-normal text-gray-500">{service.price}</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-sm text-gray-500 mb-2">Location: {service.location}</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{service.rating}</span>
                <span className="text-gray-500">({service.reviews} reviews)</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => handleServiceClick(service)} disabled={!service.availability}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {sortedServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No services found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

