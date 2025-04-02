"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Building, Lock, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Header from "@/components/header"

// Mock cart data (in a real app, this would come from state or context)
const mockCart = [
  {
    id: "1",
    name: "Champagne & Strawberries",
    price: 75,
    quantity: 1,
  },
  {
    id: "2",
    name: "Flower Arrangement",
    price: 60,
    quantity: 1,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    roomNumber: "304",
    specialInstructions: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setOrderComplete(true)
    }, 1500)
  }

  const calculateSubtotal = () => {
    return mockCart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateServiceFee = () => {
    return calculateSubtotal() * 0.1
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Checkout" />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 pb-20">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {!orderComplete ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Checkout</CardTitle>
                  <CardDescription>Complete your add-on purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          1
                        </div>
                        <span className="ml-2 font-medium">Delivery Details</span>
                      </div>
                      <div className="flex-1 mx-4 h-px bg-gray-200"></div>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          2
                        </div>
                        <span className="ml-2 font-medium">Payment</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="roomNumber">Room Number</Label>
                          <Input
                            id="roomNumber"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                          <textarea
                            id="specialInstructions"
                            name="specialInstructions"
                            className="w-full min-h-[100px] p-2 border rounded-md"
                            placeholder="Any special requests or delivery instructions"
                            value={formData.specialInstructions}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md flex items-start">
                          <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-700">
                            Your add-ons will be delivered to your room. Please ensure someone is present to receive
                            them.
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={() => setStep(2)}>
                            Continue to Payment
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <Label>Payment Method</Label>
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="credit-card" id="credit-card" />
                              <Label htmlFor="credit-card" className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Credit Card
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="room-charge" id="room-charge" />
                              <Label htmlFor="room-charge" className="flex items-center">
                                <Building className="h-4 w-4 mr-2" />
                                Charge to Room
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {paymentMethod === "credit-card" && (
                          <div className="space-y-4 mt-4">
                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input
                                id="cardName"
                                name="cardName"
                                placeholder="John Smith"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <div className="relative">
                                <Input
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  value={formData.cardNumber}
                                  onChange={handleInputChange}
                                  required
                                />
                                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  name="expiry"
                                  placeholder="MM/YY"
                                  value={formData.expiry}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  name="cvc"
                                  placeholder="123"
                                  value={formData.cvc}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between mt-6">
                          <Button type="button" variant="outline" onClick={() => setStep(1)}>
                            Back
                          </Button>
                          <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                            {loading ? "Processing..." : "Complete Order"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Subtotal</p>
                        <p>${calculateSubtotal().toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Service Fee</p>
                        <p>${calculateServiceFee().toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4">
                        <p>Total</p>
                        <p>${calculateTotal().toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Order Complete!</h2>
                  <p className="text-gray-600 mb-6">
                    Your order has been placed successfully. Your add-ons will be delivered to room{" "}
                    {formData.roomNumber}.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h3 className="font-medium mb-2">Order Details</h3>
                    <div className="space-y-2">
                      {mockCart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-x-4">
                    <Button onClick={() => router.push("/receipts")} variant="outline">
                      View Receipt
                    </Button>
                    <Button onClick={() => router.push("/")} className="bg-red-600 hover:bg-red-700">
                      Return Home
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

