"\"use client"

import { useState } from "react"
import { Search, Utensils, Wine, IceCream } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: string
  tags: string[]
  image: string
}

interface RestaurantMenuProps {
  restaurantId: string
  onBookTable: () => void
}

export function RestaurantMenu({ restaurantId, onBookTable }: RestaurantMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Mock menu data
  const menuItems: MenuItem[] = [
    {
      id: "item1",
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon, grilled to perfection with lemon herb butter",
      price: "$28",
      category: "mains",
      tags: ["seafood", "gluten-free", "healthy"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item2",
      name: "Beef Tenderloin",
      description: "Prime cut tenderloin with red wine reduction and truffle mashed potatoes",
      price: "$34",
      category: "mains",
      tags: ["meat", "signature"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item3",
      name: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
      price: "$14",
      category: "starters",
      tags: ["vegetarian", "gluten-free"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item4",
      name: "Lobster Bisque",
      description: "Creamy lobster soup with a touch of brandy",
      price: "$16",
      category: "starters",
      tags: ["seafood", "signature"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item5",
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
      price: "$12",
      category: "desserts",
      tags: ["vegetarian", "signature"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item6",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
      price: "$10",
      category: "desserts",
      tags: ["vegetarian", "contains-alcohol"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item7",
      name: "Espresso Martini",
      description: "Vodka, coffee liqueur, and fresh espresso",
      price: "$14",
      category: "drinks",
      tags: ["alcoholic", "signature"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "item8",
      name: "French 75",
      description: "Gin, champagne, lemon juice, and simple syrup",
      price: "$16",
      category: "drinks",
      tags: ["alcoholic", "signature"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = [
    { id: "all", name: "All", icon: <Utensils className="h-4 w-4" /> },
    { id: "starters", name: "Starters", icon: <Utensils className="h-4 w-4" /> },
    { id: "mains", name: "Main Courses", icon: <Utensils className="h-4 w-4" /> },
    { id: "desserts", name: "Desserts", icon: <IceCream className="h-4 w-4" /> },
    { id: "drinks", name: "Drinks", icon: <Wine className="h-4 w-4" /> },
  ]

  // Filter menu items based on search query and active category
  const filteredItems = menuItems.filter((item) => {
    // Filter by search query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700" onClick={onBookTable}>
          Book a Table
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              {category.icon}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="h-48 md:h-auto md:w-1/3 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-medium text-orange-600">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div key="no-items" className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No menu items found matching your search.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

