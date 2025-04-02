"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface BookingCalendarProps {
  onConfirm: (date: Date) => void
}

export default function BookingCalendar({ onConfirm }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>("10:00")

  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const handleConfirm = () => {
    if (!date) return

    const [hours, minutes] = time.split(":").map(Number)
    const bookingDate = new Date(date)
    bookingDate.setHours(hours, minutes)

    onConfirm(bookingDate)
  }

  return (
    <Card
      className={cn("w-full border border-primary/20", "animate-in fade-in-50 slide-in-from-bottom-5 duration-300")}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Select Date & Time</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
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

        <div className="mt-4">
          <label className="text-sm font-medium mb-1 block">Select Time</label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {times.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1" onClick={() => onConfirm(new Date(0))}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleConfirm} disabled={!date}>
            Confirm Booking
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

