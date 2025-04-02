"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, MapPin, Star, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

// Mock data for vendor services
const mockServices = [
  {
    id: "1",
    name: "Gourmet Dining Experience",
    category: "restaurant",
    vendor: "Le Petit Bistro",
    location: "Main Hotel, Ground Floor",
    rating: 4.8,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Experience fine dining with our award-winning chef. Featuring local ingredients and seasonal specialties.",
    availability: "Daily, 6:00 PM - 10:00 PM",
    slug: "the-grand-bistro",
  },
  {
    id: "2",
    name: "Relaxation Massage",
    category: "spa",
    vendor: "Serenity Spa",
    location: "East Wing, 3rd Floor",
    rating: 4.9,
    price: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Unwind with our signature massage therapy designed to relieve stress and tension.",
    availability: "Daily, 9:00 AM - 8:00 PM",
    slug: "serenity-spa",
  },
  {
    id: "3",
    name: "City Tour",
    category: "tour",
    vendor: "Urban Explorers",
    location: "Hotel Lobby",
    rating: 4.7,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Discover the city's hidden gems with our expert local guides. Tours last approximately 3 hours.",
    availability: "Mon-Sat, 10:00 AM & 2:00 PM",
    slug: "urban-explorers",
  },
  {
    id: "4",
    name: "Airport Transfer",
    category: "transportation",
    vendor: "Premium Rides",
    location: "Hotel Entrance",
    rating: 4.6,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Comfortable and reliable transportation to and from the airport in luxury vehicles.",
    availability: "24/7, Advance booking required",
    slug: "premium-rides",
  },
  {
    id: "5",
    name: "Wine Tasting",
    category: "entertainment",
    vendor: "Vineyard Delights",
    location: "Hotel Bar, Mezzanine",
    rating: 4.8,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Sample exquisite wines from around the world with our sommelier.",
    availability: "Fri-Sun, 5:00 PM - 7:00 PM",
    slug: "vineyard-delights",
  },
  {
    id: "6",
    name: "Yoga Session",
    category: "spa",
    vendor: "Mindful Movement",
    location: "Garden Pavilion",
    rating: 4.7,
    price: "$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Start your day with rejuvenating yoga sessions suitable for all experience levels.",
    availability: "Daily, 7:00 AM & 5:00 PM",
    slug: "zen-wellness",
  },
  {
    id: "7",
    name: "Sunset Cruise",
    category: "tour",
    vendor: "Ocean Voyages",
    location: "Marina (10 min from hotel)",
    rating: 4.9,
    price: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Sail along the coast and enjoy breathtaking views of the sunset with champagne service.",
    availability: "Daily, Departure at 5:30 PM",
    slug: "ocean-voyages",
  },
  {
    id: "8",
    name: "Artisan Gift Shop",
    category: "retail",
    vendor: "Local Treasures",
    location: "West Wing, Ground Floor",
    rating: 4.5,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Unique handcrafted souvenirs and gifts made by local artisans.",
    availability: "Daily, 9:00 AM - 9:00 PM",
    slug: "local-treasures",
  },
]

export default function ServicesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setServices(mockServices)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredServices = services.filter((service) => {
    // Filter by search term
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by category
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && service.rating >= 4.8) ||
      (activeTab === "new" && service.id > "5")

    return matchesSearch && matchesCategory && matchesTab
  })

  const handleServiceClick = (service) => {
    // Route to the appropriate service detail page based on category
    switch (service.category) {
      case "restaurant":
        router.push(`/restaurants/${service.slug}`)
        break
      case "spa":
        router.push(`/spa-services/${service.slug}`)
        break
      case "tour":
        router.push(`/excursions/${service.slug}`)
        break
      case "transportation":
        router.push(`/taxi/${service.slug}`)
        break
      default:
        router.push(`/services/${service.slug}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Hotel Services" />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Explore Services</h1>
          <p className="text-gray-600">Discover premium services from our trusted partners</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search services or vendors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="restaurant">Restaurants</SelectItem>
                  <SelectItem value="spa">Spa & Wellness</SelectItem>
                  <SelectItem value="tour">Tours & Excursions</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton loading state
            [...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : // Display filtered services
          filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleServiceClick(service)}
              >
                <div className="h-40 relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 capitalize">{service.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-lg">{service.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{service.vendor}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{service.availability}</span>
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
                  <span className="text-gray-700">{service.price}</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Book Now <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No services found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setActiveTab("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  )
}

