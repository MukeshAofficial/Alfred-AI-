"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceType {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

interface ServiceRequestFormProps {
  service: ServiceType
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ServiceRequestForm({ service, onSubmit, onCancel }: ServiceRequestFormProps) {
  const [notes, setNotes] = useState("")
  const [time, setTime] = useState("asap")

  const Icon = service.icon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      serviceType: service.name,
      notes,
      time,
    })
  }

  const timeOptions = [
    { value: "asap", label: "As soon as possible" },
    { value: "30min", label: "Within 30 minutes" },
    { value: "1hour", label: "Within 1 hour" },
    { value: "2hours", label: "Within 2 hours" },
    { value: "today", label: "Later today" },
    { value: "tomorrow", label: "Tomorrow" },
  ]

  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <Button variant="ghost" size="icon" className="absolute top-2 left-2 h-8 w-8" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center pt-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-center">{service.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1 text-center">{service.description}</p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">When would you like this service?</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional notes or special requests</label>
            <Textarea
              placeholder="Please provide any specific details..."
              className="min-h-[100px] resize-none"
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
            <Button type="submit" className="flex-1">
              Submit Request
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

