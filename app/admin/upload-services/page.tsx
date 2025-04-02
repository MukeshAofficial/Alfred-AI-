"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Plus, Trash2, Clock, DollarSign, ImageIcon, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ServiceItem {
  id: string
  title: string
  description: string
  price: string
  availability: string
  image: string
}

const categories = [
  { id: "spa", name: "Spa & Wellness" },
  { id: "dining", name: "Dining" },
  { id: "activities", name: "Activities" },
  { id: "transport", name: "Transportation" },
]

export default function UploadServicesPage() {
  const [activeCategory, setActiveCategory] = useState("spa")
  const [services, setServices] = useState<Record<string, ServiceItem[]>>({
    spa: [],
    dining: [],
    activities: [],
    transport: [],
  })
  const [newItem, setNewItem] = useState<ServiceItem>({
    id: "",
    title: "",
    description: "",
    price: "",
    availability: "",
    image: "/placeholder.svg?height=200&width=300",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setNewItem((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const addNewService = () => {
    if (!newItem.title || !newItem.description) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the title and description.",
        variant: "destructive",
      })
      return
    }

    const newId = Date.now().toString()
    const updatedServices = {
      ...services,
      [activeCategory]: [...services[activeCategory], { ...newItem, id: newId }],
    }

    setServices(updatedServices)

    // Reset form
    setNewItem({
      id: "",
      title: "",
      description: "",
      price: "",
      availability: "",
      image: "/placeholder.svg?height=200&width=300",
    })
    setImagePreview(null)

    toast({
      title: "Service added",
      description: `${newItem.title} has been added to ${getCategoryName(activeCategory)}.`,
    })
  }

  const removeService = (categoryId: string, serviceId: string) => {
    setServices((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((item) => item.id !== serviceId),
    }))

    toast({
      title: "Service removed",
      description: "The service has been removed.",
    })
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || categoryId
  }

  const handleFinish = () => {
    // Check if at least one service has been added
    const hasServices = Object.values(services).some((categoryServices) => categoryServices.length > 0)

    if (!hasServices) {
      toast({
        title: "No services added",
        description: "Please add at least one service before proceeding.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Setup complete",
        description: "Your hotel services have been saved. Redirecting to dashboard...",
      })

      // Redirect to dashboard
      router.push("/admin/dashboard")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Set Up Your Hotel Services</h1>
          <p className="text-muted-foreground">
            Add the services and amenities your hotel offers to display them in the AI Butler
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-4 mb-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add New {category.name} Service</CardTitle>
                      <CardDescription>Fill in the details below to add a new service</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <Label htmlFor="image-upload" className="block mb-2">
                            Service Image
                          </Label>
                          <div className="aspect-video relative rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                            {imagePreview ? (
                              <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${imagePreview})` }}
                              />
                            ) : (
                              <div className="text-center p-4">
                                <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground mt-2">Upload image</p>
                              </div>
                            )}
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <Label htmlFor="title">Service Title</Label>
                            <Input
                              id="title"
                              name="title"
                              placeholder={`e.g., ${
                                category.id === "spa"
                                  ? "Swedish Massage"
                                  : category.id === "dining"
                                    ? "Fine Dining Restaurant"
                                    : category.id === "activities"
                                      ? "City Tour"
                                      : "Airport Transfer"
                              }`}
                              value={newItem.title}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Describe the service..."
                              rows={3}
                              value={newItem.description}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="price">Price</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="price"
                                  name="price"
                                  placeholder="99.00"
                                  className="pl-10"
                                  value={newItem.price}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="availability">Availability</Label>
                              <Select
                                value={newItem.availability}
                                onValueChange={(value) => handleSelectChange("availability", value)}
                              >
                                <SelectTrigger id="availability">
                                  <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekdays">Weekdays Only</SelectItem>
                                  <SelectItem value="weekends">Weekends Only</SelectItem>
                                  <SelectItem value="limited">Limited Availability</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={addNewService} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                      </Button>
                    </CardFooter>
                  </Card>

                  {services[category.id].length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Added {category.name} Services</CardTitle>
                        <CardDescription>{services[category.id].length} service(s) added</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services[category.id].map((service) => (
                            <div key={service.id} className="flex border rounded-lg overflow-hidden">
                              <div
                                className="w-1/3 bg-cover bg-center"
                                style={{ backgroundImage: `url(${service.image})` }}
                              />
                              <div className="w-2/3 p-3 relative">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-1 right-1 h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeService(category.id, service.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>

                                <h3 className="font-medium text-sm line-clamp-1 pr-7">{service.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</p>

                                <div className="flex items-center mt-2 text-xs">
                                  {service.price && (
                                    <div className="flex items-center mr-3 text-blue-600">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      <span>{service.price}</span>
                                    </div>
                                  )}

                                  {service.availability && (
                                    <div className="flex items-center text-muted-foreground">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{service.availability}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Service Preview</CardTitle>
                  <CardDescription>How your services will appear in the AI Butler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border overflow-hidden">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-b">
                        <h3 className="font-medium text-sm">Service Categories</h3>
                      </div>
                      <div className="p-3">
                        <div className="grid grid-cols-2 gap-2">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className={cn(
                                "p-2 rounded-md text-center text-sm border",
                                services[category.id].length > 0
                                  ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
                                  : "bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800/20 dark:border-gray-700",
                              )}
                            >
                              <div className="flex items-center justify-center">
                                <span>{category.name}</span>
                                {services[category.id].length > 0 && (
                                  <div className="ml-1 w-4 h-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                                    <Check className="h-3 w-3" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-b">
                        <h3 className="font-medium text-sm">Service Count</h3>
                      </div>
                      <div className="p-3">
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex justify-between items-center">
                              <span className="text-sm">{category.name}</span>
                              <span className="text-sm font-medium">{services[category.id].length}</span>
                            </div>
                          ))}
                          <div className="pt-2 mt-2 border-t flex justify-between items-center">
                            <span className="text-sm font-medium">Total Services</span>
                            <span className="text-sm font-medium">
                              {Object.values(services).reduce((acc, curr) => acc + curr.length, 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleFinish} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Finish Setup
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

