"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Search, Star, Clock, DollarSign, Utensils, Wine, IceCream } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    menu: {
      starters: [
        {
          id: "item1",
          name: "Caprese Salad",
          description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
          price: 14,
          tags: ["vegetarian", "gluten-free"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "item2",
          name: "Lobster Bisque",
          description: "Creamy lobster soup with a touch of brandy",
          price: 16,
          tags: ["seafood", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "item3",
          name: "Beef Carpaccio",
          description: "Thinly sliced raw beef with arugula, capers, and parmesan",
          price: 18,
          tags: ["raw", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      mains: [
        {
          id: "item4",
          name: "Grilled Salmon",
          description: "Fresh Atlantic salmon, grilled to perfection with lemon herb butter",
          price: 28,
          tags: ["seafood", "gluten-free", "healthy"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "item5",
          name: "Beef Tenderloin",
          description: "Prime cut tenderloin with red wine reduction and truffle mashed potatoes",
          price: 34,
          tags: ["meat", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "item6",
          name: "Mushroom Risotto",
          description: "Creamy arborio rice with wild mushrooms and parmesan",
          price: 24,
          tags: ["vegetarian", "gluten-free"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      desserts: [
        {
          id: "item7",
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
          price: 12,
          tags: ["vegetarian", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "item8",
          name: "Tiramisu",
          description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
          price: 10,
          tags: ["vegetarian", "contains-alcohol"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      drinks: [
        {
          id: "item9",
          name: "Espresso Martini",
          description: "Vodka, coffee liqueur, and fresh espresso",
          price: 14,
          tags: ["alcoholic", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "item10",
          name: "French 75",
          description: "Gin, champagne, lemon juice, and simple syrup",
          price: 16,
          tags: ["alcoholic", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
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
    menu: {
      starters: [
        {
          id: "sg-item1",
          name: "Shrimp Cocktail",
          description: "Chilled jumbo shrimp with cocktail sauce",
          price: 16,
          tags: ["seafood", "gluten-free"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "sg-item2",
          name: "Calamari",
          description: "Crispy fried calamari with marinara sauce",
          price: 14,
          tags: ["seafood"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      mains: [
        {
          id: "sg-item3",
          name: "Grilled Mahi Mahi",
          description: "Fresh mahi mahi with mango salsa and coconut rice",
          price: 26,
          tags: ["seafood", "gluten-free"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "sg-item4",
          name: "Ribeye Steak",
          description: "12oz ribeye with garlic butter and roasted potatoes",
          price: 32,
          tags: ["meat", "gluten-free"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      desserts: [
        {
          id: "sg-item5",
          name: "Key Lime Pie",
          description: "Classic key lime pie with whipped cream",
          price: 10,
          tags: ["vegetarian"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      drinks: [
        {
          id: "sg-item6",
          name: "Piña Colada",
          description: "Rum, coconut cream, and pineapple juice",
          price: 12,
          tags: ["alcoholic", "signature"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
  },
}

export default function RestaurantMenuPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string
  const [restaurant, setRestaurant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("starters")

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
        <Header title="Restaurant Menu" />
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
        <Header title="Restaurant Menu" />
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Menu Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the menu you're looking for. Please try again later.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
        <Navigation />
      </div>
    )
  }

  // Filter menu items based on search query
  const filterMenuItems = (items) => {
    if (!searchQuery) return items

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  // Get all menu categories that have items
  const menuCategories = Object.keys(restaurant.menu).filter(
    (category) => restaurant.menu[category] && restaurant.menu[category].length > 0,
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={restaurant.name} />

      <div className="container mx-auto px-4 py-6 flex-1 pb-20">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name} Menu</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>
                {restaurant.rating} ({restaurant.reviews} reviews)
              </span>
              <span className="mx-2">•</span>
              <span>{restaurant.cuisine}</span>
              <span className="mx-2">•</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search menu..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <Tabs defaultValue={menuCategories[0]} value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-6">
                {menuCategories.map((category) => {
                  let icon
                  switch (category) {
                    case "starters":
                      icon = <Utensils className="h-4 w-4 mr-1" />
                      break
                    case "mains":
                      icon = <Utensils className="h-4 w-4 mr-1" />
                      break
                    case "desserts":
                      icon = <IceCream className="h-4 w-4 mr-1" />
                      break
                    case "drinks":
                      icon = <Wine className="h-4 w-4 mr-1" />
                      break
                    default:
                      icon = <Utensils className="h-4 w-4 mr-1" />
                  }

                  return (
                    <TabsTrigger key={category} value={category} className="flex items-center">
                      {icon}
                      <span className="capitalize">{category}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {menuCategories.map((category) => {
                const filteredItems = filterMenuItems(restaurant.menu[category])

                return (
                  <TabsContent key={category} value={category} className="space-y-4">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-0">
                            <div className="flex flex-col sm:flex-row">
                              <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                                />
                              </div>
                              <div className="w-full sm:w-2/3 p-4">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium text-lg">{item.name}</h3>
                                  <span className="font-medium text-lg">${item.price}</span>
                                </div>
                                <p className="text-gray-600 mt-1 mb-3">{item.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No items found matching your search.</p>
                        {searchQuery && (
                          <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                            Clear Search
                          </Button>
                        )}
                      </div>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>

          <div className="w-full md:w-1/4 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-4">Make a Reservation</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Reserve a table at {restaurant.name} to enjoy our delicious menu.
                </p>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 mb-2"
                  onClick={() => router.push(`/restaurants/${restaurantId}/booking`)}
                >
                  Reserve a Table
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push("/room-dining")}>
                  Order In-Room Dining
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Restaurant Information</h3>
                <p className="text-sm text-gray-600 mb-4">{restaurant.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-gray-500">Breakfast: 7:00 AM - 10:30 AM</p>
                      <p className="text-gray-500">Lunch: 12:00 PM - 3:00 PM</p>
                      <p className="text-gray-500">Dinner: 6:30 PM - 10:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <p className="font-medium">Price Range</p>
                      <p className="text-gray-500">{restaurant.priceRange}</p>
                    </div>
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

