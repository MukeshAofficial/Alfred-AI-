"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpadeIcon as Spa, UtensilsCrossed, Car, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import BookingForm from "@/components/booking-form"
import ServiceCard from "@/components/booking/service-card"
import { useToast } from "@/hooks/use-toast"

interface BookingCategory {
  id: string
  name: string
  icon: React.ElementType
  options: {
    id: string
    name: string
    description: string
    image: string
    availability: string
    price: string
  }[]
}

export default function BookingReservations() {
  const [selectedBooking, setSelectedBooking] = useState<{
    category: string
    option: any
  } | null>(null)
  const { toast } = useToast()

  const bookingCategories: BookingCategory[] = [
    {
      id: "spa",
      name: "Spa",
      icon: Spa,
      options: [
        {
          id: "massage",
          name: "Signature Massage",
          description: "60-minute relaxing full body massage",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available daily 10:00 AM - 8:00 PM",
          price: "120.00",
        },
        {
          id: "facial",
          name: "Luxury Facial",
          description: "Rejuvenating facial treatment with premium products",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available daily 10:00 AM - 6:00 PM",
          price: "150.00",
        },
        {
          id: "body",
          name: "Body Treatment",
          description: "Exfoliating scrub and hydrating wrap",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available daily 12:00 PM - 7:00 PM",
          price: "180.00",
        },
      ],
    },
    {
      id: "dining",
      name: "Dining",
      icon: UtensilsCrossed,
      options: [
        {
          id: "restaurant",
          name: "Main Restaurant",
          description: "Fine dining with international cuisine",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Breakfast: 6:30-10:30 AM, Dinner: 6:00-10:00 PM",
          price: "85.00",
        },
        {
          id: "lounge",
          name: "Lounge Bar",
          description: "Cocktails and light bites in an elegant setting",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Open daily 11:00 AM - 12:00 AM",
          price: "45.00",
        },
        {
          id: "poolbar",
          name: "Pool Bar & Grill",
          description: "Casual dining by the pool",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Open daily 11:00 AM - 6:00 PM",
          price: "35.00",
        },
      ],
    },
    {
      id: "transport",
      name: "Transport",
      icon: Car,
      options: [
        {
          id: "airport",
          name: "Airport Transfer",
          description: "Private car service to/from the airport",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available 24/7 with advance booking",
          price: "75.00",
        },
        {
          id: "taxi",
          name: "Taxi Service",
          description: "On-demand taxi for local travel",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available 24/7",
          price: "25.00",
        },
        {
          id: "rental",
          name: "Car Rental",
          description: "Luxury vehicles available for daily rental",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available with 24-hour advance notice",
          price: "150.00",
        },
      ],
    },
    {
      id: "activities",
      name: "Activities",
      icon: Compass,
      options: [
        {
          id: "tour",
          name: "City Tour",
          description: "Guided tour of local attractions",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Daily departures at 9:00 AM and 2:00 PM",
          price: "65.00",
        },
        {
          id: "yacht",
          name: "Yacht Excursion",
          description: "Private yacht cruise along the coast",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available daily, weather permitting",
          price: "250.00",
        },
        {
          id: "golf",
          name: "Golf Experience",
          description: "Tee time at the nearby championship course",
          image: "/placeholder.svg?height=120&width=200",
          availability: "Available daily 7:00 AM - 4:00 PM",
          price: "120.00",
        },
      ],
    },
  ]

  const handleBookingSelect = (categoryId: string, option: any) => {
    setSelectedBooking({
      category: categoryId,
      option,
    })
  }

  const handleBookingSubmit = (data: any) => {
    setSelectedBooking(null)

    // Simulate booking confirmation
    toast({
      title: "Booking Confirmed",
      description: `Your ${data.bookingName} has been confirmed for ${data.date} at ${data.time}.`,
      duration: 5000,
    })
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      {selectedBooking ? (
        <div className={cn("animate-in fade-in-50 slide-in-from-bottom-5 duration-300")}>
          <BookingForm
            booking={selectedBooking}
            onSubmit={handleBookingSubmit}
            onCancel={() => setSelectedBooking(null)}
          />
        </div>
      ) : (
        <Tabs defaultValue="spa" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            {bookingCategories.map((category) => {
              const Icon = category.icon

              return (
                <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center py-2 px-0">
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{category.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {bookingCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">{category.name} Reservations</h2>
                <p className="text-sm text-muted-foreground">Select an option to make a booking</p>

                <div className="space-y-3">
                  {category.options.map((option) => (
                    <ServiceCard
                      key={option.id}
                      service={{
                        id: option.id,
                        title: option.name,
                        description: option.description,
                        image: option.image,
                        availability: option.availability,
                        price: option.price,
                        category: category.id,
                      }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}

