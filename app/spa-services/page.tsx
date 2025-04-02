"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, MapPin, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

// Mock data for spa services
const mockSpaServices = [
  {
    id: "1",
    name: "Serenity Spa & Wellness",
    category: "spa",
    location: "Wellness Center, Floor 2",
    rating: 4.9,
    reviews: 89,
    price: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Indulge in ultimate relaxation with our premium spa treatments. Our skilled therapists use luxury products and ancient techniques to provide a rejuvenating experience.",
    openingHours: "9:00 AM - 8:00 PM",
    specialties: ["Swedish Massage", "Hot Stone Therapy", "Aromatherapy", "Facials"],
    slug: "serenity-spa",
  },
  {
    id: "2",
    name: "Zen Wellness Center",
    category: "spa",
    location: "North Wing, Floor 3",
    rating: 4.7,
    reviews: 65,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Find your inner peace with our holistic wellness treatments and therapies.",
    openingHours: "8:00 AM - 7:00 PM",
    specialties: ["Meditation", "Yoga", "Zen Massage", "Reflexology"],
    slug: "zen-wellness",
  },
  {
    id: "3",
    name: "Aqua Therapy",
    category: "spa",
    location: "Pool Level, West Wing",
    rating: 4.8,
    reviews: 42,
    price: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Experience the healing power of water with our hydrotherapy treatments and mineral pools.",
    openingHours: "10:00 AM - 9:00 PM",
    specialties: ["Hydrotherapy", "Mineral Baths", "Underwater Massage", "Salt Scrubs"],
    slug: "aqua-therapy",
  },
  {
    id: "4",
    name: "Beauty Lounge",
    category: "beauty",
    location: "Main Building, Floor 1",
    rating: 4.6,
    reviews: 53,
    price: "$$",
    image: "/placeholder.svg?height=200&width=300",
    description: "Complete beauty services including hair styling, manicures, pedicures, and makeup application.",
    openingHours: "9:00 AM - 7:00 PM",
    specialties: ["Hair Styling", "Manicure", "Pedicure", "Makeup"],
    slug: "beauty-lounge",
  },
]

export default function SpaServicesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [priceFilter, setPriceFilter] = useState("all")

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setServices(mockSpaServices)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredServices = services.filter((service) => {
    // Filter by search term
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by price
    const matchesPrice = priceFilter === "all" || service.price === priceFilter

    return matchesSearch && matchesPrice
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Spa & Wellness" />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Spa & Wellness Services</h1>
          <p className="text-gray-600">Relax and rejuvenate with our premium spa and wellness treatments</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search spa services or treatments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="$">Budget ($)</SelectItem>
                  <SelectItem value="$$">Standard ($$)</SelectItem>
                  <SelectItem value="$$$">Premium ($$$)</SelectItem>
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
          {loading ? (
            // Skeleton loading state
            [...Array(4)].map((_, i) => (
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
                onClick={() => router.push(`/spa-services/${service.slug}`)}
              >
                <div className="h-40 relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-purple-100 text-purple-800 hover:bg-purple-100">
                    {service.price}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-lg">{service.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{service.openingHours}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {service.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-purple-50">
                        {specialty}
                      </Badge>
                    ))}
                    {service.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        +{service.specialties.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-500">{service.reviews} reviews</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    View Treatments
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No spa services found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setPriceFilter("all")
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

