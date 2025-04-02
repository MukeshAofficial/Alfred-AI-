"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, CreditCard, Check, ArrowRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface BookingFlowProps {
  service: {
    id: string
    title: string
    description: string
    price: string
    image: string
    category: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function BookingFlow({ service, isOpen, onClose }: BookingFlowProps) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState("2")
  const [roomNumber, setRoomNumber] = useState("507")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [paymentError, setPaymentError] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const resetForm = () => {
    setStep(1)
    setDate(new Date())
    setTime("")
    setGuests("2")
    setRoomNumber("507")
    setPaymentMethod("card")
    setCardNumber("")
    setCardName("")
    setCardExpiry("")
    setCardCvc("")
    setIsLoading(false)
    setBookingId("")
    setPaymentError(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleContinue = () => {
    if (step === 1) {
      if (!date || !time) {
        toast({
          title: "Missing information",
          description: "Please select a date and time for your booking",
          variant: "destructive",
        })
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (paymentMethod === "card" && (!cardNumber || !cardName || !cardExpiry || !cardCvc)) {
        toast({
          title: "Missing payment information",
          description: "Please fill in all payment details",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false)

        // Randomly simulate payment failure (10% chance)
        if (Math.random() < 0.1) {
          setPaymentError(true)
          return
        }

        // Generate a random booking ID
        const randomId = Math.floor(10000 + Math.random() * 90000).toString()
        setBookingId(randomId)

        setStep(3)

        toast({
          title: "Booking confirmed!",
          description: `Your ${service.title} has been booked successfully.`,
        })
      }, 2000)
    }
  }

  const handleRetryPayment = () => {
    setPaymentError(false)
    setIsLoading(true)

    // Simulate payment processing again
    setTimeout(() => {
      setIsLoading(false)

      // Always succeed on retry
      const randomId = Math.floor(10000 + Math.random() * 90000).toString()
      setBookingId(randomId)

      setStep(3)

      toast({
        title: "Booking confirmed!",
        description: `Your ${service.title} has been booked successfully.`,
      })
    }, 2000)
  }

  const handleAddToBookings = () => {
    toast({
      title: "Added to My Bookings",
      description: "You can view and manage this booking in your profile.",
    })
    handleClose()
    router.push("/profile")
  }

  const formatDate = (date?: Date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTimeSlots = () => {
    return [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
    ]
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCardNumber(formatCardNumber(value))
  }

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      let formatted = value
      if (value.length > 2) {
        formatted = value.slice(0, 2) + "/" + value.slice(2)
      }
      setCardExpiry(formatted)
    }
  }

  const calculateTotal = () => {
    const basePrice = Number.parseFloat(service.price) || 0
    const numGuests = Number.parseInt(guests) || 1

    // Simple calculation based on number of guests
    const total = basePrice * numGuests

    // Add tax (10%)
    const tax = total * 0.1

    return {
      subtotal: total.toFixed(2),
      tax: tax.toFixed(2),
      total: (total + tax).toFixed(2),
    }
  }

  const { subtotal, tax, total } = calculateTotal()

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Book {service.title}</DialogTitle>
              <DialogDescription>Select your preferred date and time</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <CalendarComponent
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
                  <Label htmlFor="time">Select Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time">
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
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger id="guests">
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
                <Label htmlFor="room">Room Number</Label>
                <Input
                  id="room"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="Enter your room number"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleContinue}>
                Continue to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Complete your booking by providing payment information</DialogDescription>
            </DialogHeader>

            {paymentError ? (
              <div className="py-6">
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 text-center">
                  <X className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-red-700 dark:text-red-400">Payment Failed</h3>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                    Your payment could not be processed. Please try again or use a different payment method.
                  </p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={handleRetryPayment}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium mb-2">Booking Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{service.title}</span>
                        <span>${service.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Date</span>
                        <span>{formatDate(date)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time</span>
                        <span>{time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Guests</span>
                        <span>{guests}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (10%)</span>
                        <span>${tax}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        className={cn("justify-start", paymentMethod === "card" && "bg-blue-600 hover:bg-blue-700")}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "room" ? "default" : "outline"}
                        className={cn("justify-start", paymentMethod === "room" && "bg-blue-600 hover:bg-blue-700")}
                        onClick={() => setPaymentMethod("room")}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Charge to Room
                      </Button>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Smith"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            maxLength={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input
                            id="cardCvc"
                            placeholder="123"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "room" && (
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm">
                        The total amount of <span className="font-medium">${total}</span> will be charged to your room (
                        {roomNumber}). This will appear on your final bill upon checkout.
                      </p>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleContinue} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Booking Confirmed!</DialogTitle>
              <DialogDescription>Your booking has been successfully confirmed</DialogDescription>
            </DialogHeader>

            <div className="py-6 text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>

              <h3 className="text-lg font-medium mb-2">Your {service.title} is booked!</h3>

              <div className="rounded-lg bg-muted p-4 text-left mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reference ID:</span>
                    <span className="font-medium">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span>{formatDate(date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time:</span>
                    <span>{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Guests:</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Room:</span>
                    <span>{roomNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Paid:</span>
                    <span className="font-medium">${total}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                A confirmation has been sent to your email and is available in your profile.
              </p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Back to Home
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddToBookings}>
                View My Bookings
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

