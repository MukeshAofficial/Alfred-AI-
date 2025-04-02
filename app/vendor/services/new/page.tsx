"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Store, Clock, DollarSign, Tag, FileText, Upload, Save, ArrowLeft, Calendar, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import VendorNavigation from "@/components/vendor/vendor-navigation"

export default function AddServicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [serviceData, setServiceData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    maxGuests: "10",
    location: "hotel",
    isActive: true,
  })

  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setServiceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setServiceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setServiceData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAdditionalImages((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setAdditionalFeatures((prev) => [...prev, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setAdditionalFeatures((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !serviceData.name ||
      !serviceData.category ||
      !serviceData.description ||
      !serviceData.price ||
      !serviceData.duration
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!imagePreview) {
      toast({
        title: "Missing image",
        description: "Please upload a main image for your service.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Service created",
        description: "Your service has been created successfully.",
      })

      // Redirect to services page
      router.push("/vendor/services")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <Button variant="ghost" className="mb-2 -ml-4 text-muted-foreground" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
            <h1 className="text-3xl font-bold">Add New Service</h1>
            <p className="text-muted-foreground">Create a new service offering for your customers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide the essential details about your service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Service Name</Label>
                    <div className="relative">
                      <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., City Tour, Airport Transfer"
                        className="pl-10"
                        value={serviceData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Service Category</Label>
                    <Select
                      value={serviceData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger id="category" className="pl-10 relative">
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="taxi">Taxi & Transportation</SelectItem>
                        <SelectItem value="tours">Tours & Activities</SelectItem>
                        <SelectItem value="wellness">Wellness & Fitness</SelectItem>
                        <SelectItem value="food">Food & Catering</SelectItem>
                        <SelectItem value="events">Event Planning</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Service Description</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your service in detail..."
                        className="pl-10 min-h-[150px]"
                        value={serviceData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          name="price"
                          placeholder="e.g., 49.99"
                          className="pl-10"
                          value={serviceData.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="duration"
                          name="duration"
                          placeholder="e.g., 2 hours, 30 minutes"
                          className="pl-10"
                          value={serviceData.duration}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxGuests">Maximum Guests</Label>
                      <Select
                        value={serviceData.maxGuests}
                        onValueChange={(value) => handleSelectChange("maxGuests", value)}
                      >
                        <SelectTrigger id="maxGuests">
                          <SelectValue placeholder="Select maximum guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 25, 30].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "guest" : "guests"}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Service Location</Label>
                      <Select
                        value={serviceData.location}
                        onValueChange={(value) => handleSelectChange("location", value)}
                      >
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">At Hotel</SelectItem>
                          <SelectItem value="vendor">At Vendor Location</SelectItem>
                          <SelectItem value="pickup">Pickup from Hotel</SelectItem>
                          <SelectItem value="virtual">Virtual / Online</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="isActive">Active Status</Label>
                      <p className="text-xs text-muted-foreground">Make this service available for booking</p>
                    </div>
                    <Switch
                      id="isActive"
                      checked={serviceData.isActive}
                      onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Features</CardTitle>
                  <CardDescription>Highlight what's included in your service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Add a feature or inclusion..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addFeature()
                          }
                        }}
                      />
                    </div>
                    <Button type="button" onClick={addFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {additionalFeatures.length > 0 ? (
                    <div className="space-y-2">
                      {additionalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-md">
                          <span className="text-sm">{feature}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No features added yet. Add features to highlight what's included in your service.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Set when this service is available for booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Set Available Days
                    </Button>
                    <Button type="button" variant="outline" className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Set Available Hours
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By default, your service will use your general availability settings. Use the buttons above to set
                    specific availability for this service.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Images</CardTitle>
                  <CardDescription>Upload images of your service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="main-image">Main Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Service preview"
                            className="mx-auto h-48 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
                            onClick={() => setImagePreview(null)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2">
                            <Label
                              htmlFor="main-image-upload"
                              className="cursor-pointer text-sm text-blue-600 hover:text-blue-700"
                            >
                              Upload an image
                            </Label>
                            <Input
                              id="main-image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Additional Images</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {additionalImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Additional image ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
                            onClick={() => removeAdditionalImage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {additionalImages.length < 4 && (
                        <div className="border-2 border-dashed border-gray-300 rounded-md h-24 flex flex-col items-center justify-center">
                          <Label
                            htmlFor="additional-image-upload"
                            className="cursor-pointer text-sm text-blue-600 hover:text-blue-700"
                          >
                            <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                            Add Image
                          </Label>
                          <Input
                            id="additional-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAdditionalImageUpload}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publish Service</CardTitle>
                  <CardDescription>Make your service available to customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Service Status</Label>
                      <p className="text-xs text-muted-foreground">
                        {serviceData.isActive ? "Active and available for booking" : "Inactive (draft mode)"}
                      </p>
                    </div>
                    <div
                      className={`h-3 w-3 rounded-full ${serviceData.isActive ? "bg-green-500" : "bg-amber-500"}`}
                    ></div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Creating Service...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Service
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/vendor/services")}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

