"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Plus, Minus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

// Mock menu data
const menuCategories = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Available 6:30 AM - 11:00 AM",
    items: [
      {
        id: "item1",
        name: "Continental Breakfast",
        description: "Assorted pastries, fresh fruit, yogurt, and coffee or tea",
        price: 18,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian-option"],
      },
      {
        id: "item2",
        name: "American Breakfast",
        description: "Two eggs any style, bacon or sausage, toast, and breakfast potatoes",
        price: 22,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "item3",
        name: "Eggs Benedict",
        description: "Poached eggs on English muffin with Canadian bacon and hollandaise sauce",
        price: 24,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "item4",
        name: "Avocado Toast",
        description: "Multigrain toast with smashed avocado, poached egg, and microgreens",
        price: 20,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "all-day",
    name: "All-Day Dining",
    description: "Available 11:00 AM - 10:00 PM",
    items: [
      {
        id: "item5",
        name: "Caesar Salad",
        description: "Romaine lettuce, parmesan, croutons, and Caesar dressing",
        price: 16,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian-option"],
      },
      {
        id: "item6",
        name: "Club Sandwich",
        description: "Triple-decker with turkey, bacon, lettuce, tomato, and mayo",
        price: 24,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "item7",
        name: "Beef Burger",
        description: "8oz Angus beef patty with lettuce, tomato, onion, and special sauce",
        price: 26,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "item8",
        name: "Margherita Pizza",
        description: "Tomato sauce, fresh mozzarella, and basil",
        price: 22,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian"],
      },
      {
        id: "item9",
        name: "Pasta Primavera",
        description: "Seasonal vegetables, garlic, olive oil, and parmesan",
        price: 24,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Available all day",
    items: [
      {
        id: "item10",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 14,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian"],
      },
      {
        id: "item11",
        name: "New York Cheesecake",
        description: "Classic cheesecake with berry compote",
        price: 12,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Available all day",
    items: [
      {
        id: "item12",
        name: "Fresh Juice",
        description: "Orange, grapefruit, or apple",
        price: 8,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian", "vegan"],
      },
      {
        id: "item13",
        name: "Smoothie",
        description: "Banana, strawberry, or mixed berry",
        price: 10,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian", "vegan"],
      },
      {
        id: "item14",
        name: "Coffee",
        description: "Espresso, americano, cappuccino, or latte",
        price: 6,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian", "vegan-option"],
      },
      {
        id: "item15",
        name: "Tea",
        description: "English breakfast, earl grey, green, or chamomile",
        price: 5,
        image: "/placeholder.svg?height=120&width=200",
        tags: ["vegetarian", "vegan"],
      },
    ],
  },
]

export default function RoomDiningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([])
  const router = useRouter()
  const isMobile = useMobile()

  // Filter menu items based on search query
  const filterMenuItems = (items) => {
    if (!searchQuery) return items

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
    )
  }

  const addToCart = (itemId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem) {
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { id: itemId, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prev.filter((item) => item.id !== itemId)
      }
    })
  }

  const getItemQuantity = (itemId: string) => {
    const item = cart.find((item) => item.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      const menuItem = menuCategories.flatMap((cat) => cat.items).find((item) => item.id === cartItem.id)
      return total + (menuItem ? menuItem.price * cartItem.quantity : 0)
    }, 0)
  }

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    router.push("/checkout")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="In-Room Dining" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">In-Room Dining</h1>
          <p className="text-gray-500">Order delicious meals delivered directly to your room</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
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

            <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                {menuCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {menuCategories.map((category) => {
                const filteredItems = filterMenuItems(category.items)

                return (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold">{category.name}</h2>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>

                    {filteredItems.length > 0 ? (
                      <div className="space-y-4">
                        {filteredItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="w-full sm:w-2/3 p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium text-lg">{item.name}</h3>
                                      <p className="text-gray-600 mt-1 mb-2">{item.description}</p>
                                      {item.tags && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                          {item.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                              {tag.replace(/-/g, " ")}
                                            </Badge>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <span className="font-medium text-lg">${item.price}</span>
                                  </div>

                                  <div className="mt-4">
                                    {getItemQuantity(item.id) > 0 ? (
                                      <div className="flex items-center">
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-8 w-8 rounded-full"
                                          onClick={() => removeFromCart(item.id)}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="mx-3 font-medium">{getItemQuantity(item.id)}</span>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-8 w-8 rounded-full"
                                          onClick={() => addToCart(item.id)}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => addToCart(item.id)}
                                      >
                                        Add to Order
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No items found matching your search.</p>
                        {searchQuery && (
                          <Button variant="outline" onClick={() => setSearchQuery("")}>
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

          {/* Cart */}
          <div className="w-full md:w-1/3">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Your Order</h3>
                  <Badge variant="outline" className="px-2 py-1">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {getTotalItems()} items
                  </Badge>
                </div>

                {cart.length > 0 ? (
                  <div className="space-y-4">
                    <div className="divide-y">
                      {cart.map((cartItem) => {
                        const menuItem = menuCategories
                          .flatMap((cat) => cat.items)
                          .find((item) => item.id === cartItem.id)
                        if (!menuItem) return null

                        return (
                          <div key={cartItem.id} className="py-3 flex justify-between">
                            <div>
                              <div className="font-medium">{menuItem.name}</div>
                              <div className="text-sm text-gray-500">
                                ${menuItem.price} x {cartItem.quantity}
                              </div>
                            </div>
                            <div className="font-medium">${(menuItem.price * cartItem.quantity).toFixed(2)}</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Delivery Fee</span>
                        <span className="font-medium">$5.00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Service Charge (18%)</span>
                        <span className="font-medium">${(getTotalPrice() * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span>${(getTotalPrice() + 5 + getTotalPrice() * 0.18).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add items from the menu to start your order.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <div className="text-sm text-gray-500 w-full">
                  <p className="mb-2">Estimated delivery time: 30-45 minutes</p>
                  <p>Room service is available 24/7. Dial 0 from your room phone for assistance.</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

