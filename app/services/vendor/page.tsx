"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Star, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

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
  },
]

export default function VendorServicesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setServices(mockServices)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleServiceClick = (id: string, category: string) => {
    // Route to the appropriate service detail page based on category
    switch (category) {
      case "restaurant":
        router.push(`/restaurants/${id}`)
        break
      case "spa":
        router.push(`/spa/${id}`)
        break
      case "tour":
        router.push(`/excursions/${id}`)
        break
      case "transportation":
        router.push(`/taxi/${id}`)
        break
      default:
        router.push(`/services/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vendor Services</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Discover and book premium services from our trusted partners
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? // Skeleton loading state
                [...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-40 w-full mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-6">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-16" />
                    </CardFooter>
                  </Card>
                ))
              : // Display filtered services
                filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardContent className="p-6 flex-grow">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="rounded-md w-full h-40 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>

                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-2">
                          <MapPin className="h-4 w-4" />
                          {service.location}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                          <Clock className="h-4 w-4" />
                          {service.availability}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{service.price}</span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleServiceClick(service.id, service.category)}
                        >
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

