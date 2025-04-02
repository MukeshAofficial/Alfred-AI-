"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import BookingFlow from "@/components/booking/booking-flow"

interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    price: string
    image: string
    availability: string
    category: string
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <Card
        className={cn("overflow-hidden cursor-pointer transition-all", "hover:shadow-md hover:border-primary/30")}
        onClick={() => setIsBookingOpen(true)}
      >
        <div className="flex">
          <div className="w-1/3 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
          <CardContent className="w-2/3 p-3">
            <h3 className="font-medium text-sm">{service.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-primary flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {service.availability}
              </p>
              <p className="text-sm font-medium">${service.price}</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 rounded-full text-xs">
              Book Now
            </Button>
          </CardContent>
        </div>
      </Card>

      <BookingFlow service={service} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}

