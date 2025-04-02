"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface BookingFormProps {
  booking: {
    category: string
    option: {
      id: string
      name: string
      description: string
      image: string
      availability: string
    }
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function BookingForm({ booking, onSubmit, onCancel }: BookingFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("10:00")
  const [guests, setGuests] = useState("2")
  const [notes, setNotes] = useState("")

  // Generate time slots based on category
  const getTimeSlots = () => {
    if (booking.category === "spa") {
      return ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]
    } else if (booking.category === "dining") {
      return ["07:00", "08:00", "09:00", "10:00", "12:00", "13:00", "18:00", "19:00", "20:00", "21:00"]
    } else {
      return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) return

    onSubmit({
      bookingCategory: booking.category,
      bookingName: booking.option.name,
      date: date.toLocaleDateString(),
      time,
      guests,
      notes,
    })
  }

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <Button variant="ghost" size="icon" className="absolute top-2 left-2 h-8 w-8" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center pt-4">
          <div
            className="h-20 w-full rounded-md bg-cover bg-center mb-3"
            style={{ backgroundImage: `url(${booking.option.image})` }}
          />
          <CardTitle className="text-center">{booking.option.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1 text-center">{booking.option.description}</p>
          <p className="text-xs text-primary mt-2 text-center">{booking.option.availability}</p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => {
                // Disable dates in the past
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return date < today
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {getTimeSlots().map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Guests</label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <SelectItem key={g} value={g.toString()}>
                      {g} {g === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Special Requests (Optional)</label>
            <Input
              placeholder="Any special requests or preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!date}>
              Confirm Booking
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

