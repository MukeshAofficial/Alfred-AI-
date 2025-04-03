"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, ShoppingCart, Plus, Check, Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { supabase } from '@/lib/supabase';

export default function AddOnsPage() {
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAddOns() {
      const { data, error } = await supabase.from('services').select('*');
      if (error) console.error(error);
      else setAddOns(data);
      setLoading(false);
    }
    fetchAddOns();
  }, []);

// Mock add-ons data
const mockAddOns = [
  {
    id: "1",
    name: "Champagne & Strawberries",
    category: "food",
    price: 75,
    image: "/placeholder.svg?height=200&width=300",
    description: "A bottle of premium champagne with chocolate-dipped strawberries, perfect for celebrations.",
    availability: true,
    popular: true,
    rating: 4.8,
    reviews: 32,
  },
  {
    id: "2",
    name: "Flower Arrangement",
    category: "decor",
    price: 60,
    image: "/placeholder.svg?height=200&width=300",
    description: "Beautiful seasonal flower arrangement to brighten your room.",
    availability: true,
    popular: true,
    rating: 4.7,
    reviews: 28,
  },
  {
    id: "3",
    name: "Breakfast in Bed",
    category: "food",
    price: 45,
    image: "/placeholder.svg?height=200&width=300",
    description: "Enjoy a delicious breakfast delivered to your room at your preferred time.",
    availability: true,
    popular: true,
    rating: 4.9,
    reviews: 45,
  },
  {
    id: "4",
    name: "Spa Gift Basket",
    category: "wellness",
    price: 85,
    image: "/placeholder.svg?height=200&width=300",
    description: "Luxury spa products including bath salts, body scrub, and scented candles.",
    availability: true,
    popular: false,
    rating: 4.6,
    reviews: 19,
  },
  {
    id: "5",
    name: "Wine Selection",
    category: "food",
    price: 65,
    image: "/placeholder.svg?height=200&width=300",
    description: "Selection of three premium wines (red, white, and rosé) for your enjoyment.",
    availability: true,
    popular: false,
    rating: 4.5,
    reviews: 23,
  },
  {
    id: "6",
    name: "Birthday Decoration",
    category: "decor",
    price: 50,
    image: "/placeholder.svg?height=200&width=300",
    description: "Surprise decoration package including balloons, banner, and a small cake.",
    availability: true,
    popular: false,
    rating: 4.8,
    reviews: 31,
  },
  {
    id: "7",
    name: "Late Check-out",
    category: "service",
    price: 40,
    image: "/placeholder.svg?height=200&width=300",
    description: "Extend your check-out time until 3:00 PM (subject to availability).",
    availability: false,
    popular: true,
    rating: 4.7,
    reviews: 38,
  },
  {
    id: "8",
    name: "Premium Wi-Fi",
    category: "tech",
    price: 15,
    image: "/placeholder.svg?height=200&width=300",
    description: "Upgrade to our premium high-speed Wi-Fi for faster streaming and downloads.",
    availability: true,
    popular: false,
    rating: 4.3,
    reviews: 27,
  },
]

export default function AddOnsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [addOns, setAddOns] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [cart, setCart] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedAddOn, setSelectedAddOn] = useState<any>(null)
  const [isAddOnDialogOpen, setIsAddOnDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setAddOns(mockAddOns)
      setLoading(false)
    }, 1000)
  }, [])

  const addToCart = (addOn) => {
    const existingItem = cart.find((item) => item.id === addOn.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === addOn.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...addOn, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const viewAddOnDetails = (addOn) => {
    setSelectedAddOn(addOn)
    setIsAddOnDialogOpen(true)
  }

  const filteredAddOns = addOns.filter((addOn) => {
    // Filter by search term
    const matchesSearch =
      addOn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addOn.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by category
    const matchesCategory = categoryFilter === "all" || addOn.category === categoryFilter

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "popular" && addOn.popular) ||
      (activeTab === "available" && addOn.availability)

    return matchesSearch && matchesCategory && matchesTab
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Add-Ons Marketplace" />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Add-Ons Marketplace</h1>
            <p className="text-gray-600">Enhance your stay with our premium add-on services</p>
          </div>

          <Button variant="outline" className="flex items-center gap-2 relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search add-ons..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="decor">Decoration</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
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
            <TabsTrigger value="all">All Add-Ons</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="available">Available Now</TabsTrigger>
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
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : // Display filtered add-ons
          filteredAddOns.length > 0 ? (
            filteredAddOns.map((addOn) => (
              <Card key={addOn.id} className="overflow-hidden">
                <div className="h-40 relative">
                  <img
                    src={addOn.image || "/placeholder.svg"}
                    alt={addOn.name}
                    className="w-full h-full object-cover"
                  />
                  {addOn.popular && (
                    <Badge className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Popular
                    </Badge>
                  )}
                  {!addOn.availability && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">Currently Unavailable</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-lg">{addOn.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{addOn.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{addOn.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">${addOn.price}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => viewAddOnDetails(addOn)}>
                        Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={!addOn.availability || cart.some((item) => item.id === addOn.id)}
                        onClick={() => addToCart(addOn)}
                      >
                        {cart.some((item) => item.id === addOn.id) ? (
                          <Check className="h-4 w-4 mr-1" />
                        ) : (
                          <Plus className="h-4 w-4 mr-1" />
                        )}
                        {cart.some((item) => item.id === addOn.id) ? "Added" : "Add"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No add-ons found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setActiveTab("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Add-On Detail Dialog */}
      <Dialog open={isAddOnDialogOpen} onOpenChange={setIsAddOnDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedAddOn?.name}</DialogTitle>
            <DialogDescription>Add-on details and information</DialogDescription>
          </DialogHeader>

          {selectedAddOn && (
            <div className="space-y-4">
              <div className="h-48 rounded-md overflow-hidden">
                <img
                  src={selectedAddOn.image || "/placeholder.svg"}
                  alt={selectedAddOn.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between items-center">
                <Badge className="capitalize">
                  {selectedAddOn.category === "food"
                    ? "Food & Beverages"
                    : selectedAddOn.category === "decor"
                      ? "Decoration"
                      : selectedAddOn.category === "wellness"
                        ? "Wellness"
                        : selectedAddOn.category === "service"
                          ? "Services"
                          : selectedAddOn.category === "tech"
                            ? "Technology"
                            : selectedAddOn.category}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{selectedAddOn.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({selectedAddOn.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-gray-600">{selectedAddOn.description}</p>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price</span>
                  <span className="font-medium">${selectedAddOn.price}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Availability</span>
                  <span className={selectedAddOn.availability ? "text-green-600" : "text-red-600"}>
                    {selectedAddOn.availability ? "Available" : "Currently Unavailable"}
                  </span>
                </div>
              </div>

              {selectedAddOn.category === "food" && (
                <div className="bg-blue-50 p-4 rounded-md flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Please note that food and beverage items require at least 2 hours advance notice for preparation.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsAddOnDialogOpen(false)}>
              Close
            </Button>
            {selectedAddOn && (
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={!selectedAddOn.availability || cart.some((item) => item.id === selectedAddOn.id)}
                onClick={() => {
                  addToCart(selectedAddOn)
                  setIsAddOnDialogOpen(false)
                }}
              >
                {cart.some((item) => item.id === selectedAddOn.id) ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Shopping Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>Review your selected add-ons</DialogDescription>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some items to your cart to enhance your stay.</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                Browse Add-Ons
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">${item.price} each</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <span>-</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <span className="sr-only">Increase quantity</span>
                          <span>+</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <span className="sr-only">Remove item</span>
                        <span>×</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service Fee</span>
                  <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setIsCartOpen(false)
                    router.push("/checkout")
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Navigation />
    </div>
  )
}

