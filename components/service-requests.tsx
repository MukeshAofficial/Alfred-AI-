"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, UtensilsCrossed, Wrench, Car, Shirt, ShoppingBag, Wifi, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import ServiceRequestForm from "@/components/service-request-form"
import { useToast } from "@/hooks/use-toast"

interface ServiceType {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

export default function ServiceRequests() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const { toast } = useToast()

  const services: ServiceType[] = [
    {
      id: "housekeeping",
      name: "Housekeeping",
      icon: Bed,
      description: "Request room cleaning, fresh towels, or bed turndown service",
    },
    {
      id: "dining",
      name: "In-Room Dining",
      icon: UtensilsCrossed,
      description: "Order food and beverages to your room",
    },
    {
      id: "maintenance",
      name: "Maintenance",
      icon: Wrench,
      description: "Report issues with room facilities or appliances",
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: Car,
      description: "Request taxi, airport shuttle, or car rental",
    },
    {
      id: "laundry",
      name: "Laundry",
      icon: Shirt,
      description: "Request laundry or dry cleaning services",
    },
    {
      id: "amenities",
      name: "Extra Amenities",
      icon: ShoppingBag,
      description: "Request additional toiletries, pillows, or other items",
    },
    {
      id: "tech",
      name: "Tech Support",
      icon: Wifi,
      description: "Get help with Wi-Fi, TV, or other technology",
    },
    {
      id: "other",
      name: "Other Requests",
      icon: HelpCircle,
      description: "Any other service not listed above",
    },
  ]

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service)
  }

  const handleRequestSubmit = (data: any) => {
    setSelectedService(null)

    // Simulate request submission
    toast({
      title: "Service Request Submitted",
      description: `Your ${data.serviceType} request has been received. ETA: 15-20 minutes.`,
      duration: 5000,
    })
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      {selectedService ? (
        <div className={cn("animate-in fade-in-50 slide-in-from-bottom-5 duration-300")}>
          <ServiceRequestForm
            service={selectedService}
            onSubmit={handleRequestSubmit}
            onCancel={() => setSelectedService(null)}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">How can we assist you?</h2>
          <p className="text-sm text-muted-foreground">Select a service to make a request</p>

          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <Card
                  key={service.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md hover:border-primary/30",
                    "hover:bg-primary/5",
                  )}
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm">{service.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

