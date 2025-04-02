"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck, MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Experience {
  id: string
  name: string
  description: string
  image: string
  distance: string
  rating: number
  category: string
  saved: boolean
}

export default function LocalExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "museum",
      name: "City Art Museum",
      description: "World-renowned collection featuring classical and modern art exhibitions",
      image: "/placeholder.svg?height=150&width=300",
      distance: "1.2 km",
      rating: 4.8,
      category: "attractions",
      saved: false,
    },
    {
      id: "park",
      name: "Waterfront Park",
      description: "Beautiful gardens and walking paths along the river with stunning views",
      image: "/placeholder.svg?height=150&width=300",
      distance: "0.8 km",
      rating: 4.6,
      category: "attractions",
      saved: true,
    },
    {
      id: "market",
      name: "Local Market",
      description: "Vibrant market with local produce, crafts, and street food",
      image: "/placeholder.svg?height=150&width=300",
      distance: "1.5 km",
      rating: 4.5,
      category: "attractions",
      saved: false,
    },
    {
      id: "restaurant1",
      name: "Seaside Grill",
      description: "Fresh seafood with ocean views and outdoor seating",
      image: "/placeholder.svg?height=150&width=300",
      distance: "1.0 km",
      rating: 4.7,
      category: "dining",
      saved: false,
    },
    {
      id: "restaurant2",
      name: "Authentic Local Cuisine",
      description: "Traditional dishes prepared with locally-sourced ingredients",
      image: "/placeholder.svg?height=150&width=300",
      distance: "1.8 km",
      rating: 4.9,
      category: "dining",
      saved: false,
    },
    {
      id: "cafe",
      name: "Artisan Coffee House",
      description: "Specialty coffee and pastries in a cozy atmosphere",
      image: "/placeholder.svg?height=150&width=300",
      distance: "0.5 km",
      rating: 4.4,
      category: "dining",
      saved: true,
    },
    {
      id: "theater",
      name: "Historic Theater",
      description: "Performances in a beautifully restored historic venue",
      image: "/placeholder.svg?height=150&width=300",
      distance: "2.0 km",
      rating: 4.6,
      category: "culture",
      saved: false,
    },
    {
      id: "gallery",
      name: "Contemporary Art Gallery",
      description: "Rotating exhibitions of cutting-edge contemporary art",
      image: "/placeholder.svg?height=150&width=300",
      distance: "1.3 km",
      rating: 4.3,
      category: "culture",
      saved: false,
    },
    {
      id: "music",
      name: "Live Music Venue",
      description: "Local and international artists in an intimate setting",
      image: "/placeholder.svg?height=150&width=300",
      distance: "1.7 km",
      rating: 4.5,
      category: "nightlife",
      saved: false,
    },
    {
      id: "bar",
      name: "Craft Cocktail Bar",
      description: "Innovative cocktails made with premium spirits and fresh ingredients",
      image: "/placeholder.svg?height=150&width=300",
      distance: "0.9 km",
      rating: 4.7,
      category: "nightlife",
      saved: false,
    },
  ])

  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")

  const toggleSaved = (id: string) => {
    setExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...exp, saved: !exp.saved } : exp)))

    const experience = experiences.find((exp) => exp.id === id)
    if (experience) {
      toast({
        title: experience.saved ? "Removed from My Plan" : "Added to My Plan",
        description: experience.saved
          ? `${experience.name} has been removed from your plan`
          : `${experience.name} has been added to your plan`,
        duration: 3000,
      })
    }
  }

  const filteredExperiences =
    activeTab === "all"
      ? experiences
      : activeTab === "saved"
        ? experiences.filter((exp) => exp.saved)
        : experiences.filter((exp) => exp.category === activeTab)

  return (
    <div className="container max-w-md mx-auto p-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
          <TabsTrigger value="saved">My Plan</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {activeTab === "all"
                  ? "Explore Local Experiences"
                  : activeTab === "saved"
                    ? "My Saved Experiences"
                    : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredExperiences.length} {filteredExperiences.length === 1 ? "result" : "results"}
              </p>
            </div>

            <div className="space-y-4">
              {filteredExperiences.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No experiences found</p>
                  {activeTab === "saved" && (
                    <Button variant="outline" className="mt-4" onClick={() => setActiveTab("all")}>
                      Browse Experiences
                    </Button>
                  )}
                </div>
              ) : (
                filteredExperiences.map((experience) => (
                  <Card key={experience.id} className="overflow-hidden">
                    <div className="relative">
                      <div
                        className="h-40 bg-cover bg-center"
                        style={{ backgroundImage: `url(${experience.image})` }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm",
                          experience.saved ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => toggleSaved(experience.id)}
                      >
                        {experience.saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{experience.name}</h3>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm ml-1">{experience.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{experience.description}</p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{experience.distance}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full text-xs">
                            Directions
                          </Button>
                          <Button variant="default" size="sm" className="rounded-full text-xs">
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

