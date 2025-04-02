"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Filter, ChevronDown } from "lucide-react"

interface VendorService {
  id: string
  name: string
  vendor: string
  category: string
  description: string
  price: string
  duration: string
  rating: number
  reviews: number
  location: string
  image: string
}

export default function VendorServices() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortOption, setSortOption] = useState("recommended")

  // Mock vendor services data
  const vendorServices: VendorService[] = [
    {
      id: "vs1",
      name: "City Tour",
      vendor: "City Tours & Transfers",
      category: "tours",
      description: "Explore the city's landmarks and hidden gems with our expert local guide.",
      price: "$65",
      duration: "3 hours",
      rating: 4.9,
      reviews: 128,
      location: "Pickup from hotel",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "vs2",
      name: "Airport Transfer",
      vendor: "City Tours & Transfers",
      category: "taxi",
      description: "Comfortable and reliable transportation to and from the airport.",
      price: "$45",
      duration: "30-45 minutes",
      rating: 4.7,
      reviews: 95,
      location: "Pickup from hotel",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "vs3",
      name: "Wine Tasting Tour",
      vendor: "Wine Country Excursions",
      category: "tours",
      description: "Visit local vineyards and taste premium wines with expert commentary.",
      price: "$85",
      duration: "4 hours",
      rating: 4.8,
      reviews: 76,
      location: "Pickup from hotel",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "vs4",
      name: "Yoga Session",
      vendor: "Wellness Retreat",
      category: "wellness",
      description: "Rejuvenate with a private yoga session tailored to your experience level.",
      price: "$50",
      duration: "1 hour",
      rating: 4.6,
      reviews: 42,
      location: "Hotel spa",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "vs5",
      name: "Private Chef Experience",
      vendor: "Gourmet Delights",
      category: "food",
      description: "Enjoy a customized gourmet meal prepared by a professional chef in your room.",
      price: "$150",
      duration: "2-3 hours",
      rating: 4.9,
      reviews: 38,
      location: "In-room service",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "vs6",
      name: "Photography Session",
      vendor: "Capture Memories",
      category: "other",
      description: "Professional photography session to capture your vacation memories.",
      price: "$120",
      duration: "2 hours",
      rating: 4.7,
      reviews: 29,
      location: "Hotel or city locations",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "taxi":
        return "Transportation"
      case "tours":
        return "Tours & Activities"
      case "wellness":
        return "Wellness & Fitness"
      case "food":
        return "Food & Dining"
      case "events":
        return "Event Planning"
      default:
        return "Other Services"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "taxi":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "tours":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "wellness":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "food":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "events":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  // Filter and sort services
  let filteredServices = [...vendorServices]

  // Apply category filter
  if (categoryFilter) {
    filteredServices = filteredServices.filter((service) => service.category === categoryFilter)
  }

  // Apply search filter
  if (searchQuery) {
    filteredServices = filteredServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.vendor.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Apply sorting
  switch (sortOption) {
    case "price-low":
      filteredServices.sort(
        (a, b) =>
          Number.parseFloat(a.price.replace(/[^0-9.]/g, "")) - Number.parseFloat(b.price.replace(/[^0-9.]/g, "")),
      )
      break
    case "price-high":
      filteredServices.sort(
        (a, b) =>
          Number.parseFloat(b.price.replace(/[^0-9.]/g, "")) - Number.parseFloat(a.price.replace(/[^0-9.]/g, "")),
      )
      break
    case "rating":
      filteredServices.sort((a, b) => b.rating - a.rating)
      break
    case "duration":
      filteredServices.sort((a, b) => {
        const aDuration = Number.parseInt(a.duration.split(" ")[0])
        const bDuration = Number.parseInt(b.duration.split(" ")[0])
        return aDuration - bDuration
      })
      break
    // Default is "recommended"
    default:
      break
  }

  return (
    <div className="space-y-6">
      {/* Search and filter section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              onClick={() => {
                // Toggle dropdown
              }}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {/* Filter dropdown would go here */}
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              onClick={() => {
                // Toggle dropdown
              }}
            >
              <span>Sort: {sortOption.replace("-", " ")}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {/* Sort dropdown would go here */}
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryFilter === ""
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
          onClick={() => setCategoryFilter("")}
        >
          All
        </button>
        <button
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryFilter === "taxi"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
          onClick={() => setCategoryFilter("taxi")}
        >
          Transportation
        </button>
        <button
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryFilter === "tours"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
          onClick={() => setCategoryFilter("tours")}
        >
          Tours & Activities
        </button>
        <button
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryFilter === "wellness"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
          onClick={() => setCategoryFilter("wellness")}
        >
          Wellness & Fitness
        </button>
        <button
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryFilter === "food"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
          onClick={() => setCategoryFilter("food")}
        >
          Food & Dining
        </button>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            onClick={() => router.push(`/services/${service.category}/${service.id}`)}
          >
            <div className="relative h-48 w-full">
              <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
              <div className="absolute bottom-2 left-2">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(service.category)}`}>
                  {getCategoryLabel(service.category)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{service.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">by {service.vendor}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{service.price}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{service.duration}</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 text-sm font-medium text-gray-900 dark:text-gray-100">{service.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({service.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No services found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

