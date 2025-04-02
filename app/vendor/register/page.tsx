"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Building2, Mail, Phone, User, MapPin, Globe, FileText, ImageIcon, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VendorRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/vendor/dashboard")
      }, 2000)
    }, 1500)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-950 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Portal</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/vendor/dashboard")}
                  className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/vendor/services")}
                  className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Services
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/vendor/bookings")}
                  className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Bookings
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/")}
                  className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Home
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-orange-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Vendor Registration</CardTitle>
              <CardDescription className="text-orange-100 text-lg">
                Join our network of premium service providers
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {success ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Successful!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your vendor account has been created. Redirecting to your dashboard...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-1/3 h-2 rounded-full mx-1 ${
                            i < step ? "bg-orange-500" : i === step ? "bg-orange-300" : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 px-1">
                      <span>Business Info</span>
                      <span>Services</span>
                      <span>Documents</span>
                    </div>
                  </div>

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="businessName" placeholder="Your Business Name" className="pl-10" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Person</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="contactName" placeholder="Full Name" className="pl-10" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="email" type="email" placeholder="email@example.com" className="pl-10" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10" required />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Business Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input id="address" placeholder="Street Address" className="pl-10" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="City" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" placeholder="State/Province" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zip">Postal Code</Label>
                          <Input id="zip" placeholder="Postal/ZIP Code" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input id="website" placeholder="https://www.example.com" className="pl-10" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Category</Label>
                        <Select defaultValue="restaurant">
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="spa">Spa & Wellness</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="tour">Tours & Excursions</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Service Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your services in detail..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Pricing Structure</Label>
                        <Tabs defaultValue="fixed">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="fixed">Fixed Price</TabsTrigger>
                            <TabsTrigger value="hourly">Hourly Rate</TabsTrigger>
                            <TabsTrigger value="custom">Custom Quote</TabsTrigger>
                          </TabsList>
                          <TabsContent value="fixed" className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="basePrice">Base Price ($)</Label>
                                <Input id="basePrice" type="number" placeholder="0.00" min="0" step="0.01" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Select defaultValue="usd">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="usd">USD ($)</SelectItem>
                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                    <SelectItem value="gbp">GBP (£)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="hourly" className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                                <Input id="hourlyRate" type="number" placeholder="0.00" min="0" step="0.01" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="minHours">Minimum Hours</Label>
                                <Input id="minHours" type="number" placeholder="1" min="1" />
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="custom" className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="customPricing">Custom Pricing Details</Label>
                              <Textarea
                                id="customPricing"
                                placeholder="Explain your pricing structure..."
                                className="min-h-[80px]"
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekdays">Weekdays Only</SelectItem>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="custom">Custom Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="businessLicense">Business License/Registration</Label>
                        <div className="flex items-center gap-4">
                          <div className="relative flex-1">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="businessLicense"
                              placeholder="Upload business license"
                              className="pl-10"
                              disabled
                            />
                          </div>
                          <Button type="button" variant="outline">
                            Browse...
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Accepted formats: PDF, JPG, PNG (Max: 5MB)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="insurance">Liability Insurance (Optional)</Label>
                        <div className="flex items-center gap-4">
                          <div className="relative flex-1">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="insurance" placeholder="Upload insurance document" className="pl-10" disabled />
                          </div>
                          <Button type="button" variant="outline">
                            Browse...
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="photos">Service Photos</Label>
                        <div className="flex items-center gap-4">
                          <div className="relative flex-1">
                            <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="photos" placeholder="Upload service photos" className="pl-10" disabled />
                          </div>
                          <Button type="button" variant="outline">
                            Browse...
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Upload up to 5 high-quality images (Max: 2MB each)
                        </p>
                      </div>

                      <div className="space-y-2 pt-4">
                        <Label className="text-base font-medium">Terms & Conditions</Label>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-[200px] overflow-y-auto text-sm text-gray-600 dark:text-gray-300">
                          <p className="mb-4">By submitting this registration, you agree to the following terms:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>All information provided is accurate and complete.</li>
                            <li>You have the legal right to offer the services described.</li>
                            <li>You will maintain appropriate insurance and licenses.</li>
                            <li>You will respond to booking requests within 24 hours.</li>
                            <li>You will honor all confirmed bookings at the agreed price.</li>
                            <li>The platform will charge a 10% commission on all bookings.</li>
                            <li>Payments will be processed within 7 days of service completion.</li>
                          </ul>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            required
                          />
                          <Label htmlFor="terms" className="text-sm font-normal">
                            I agree to the terms and conditions
                          </Label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </CardContent>

            {!success && (
              <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => router.push("/")}>
                    Cancel
                  </Button>
                )}

                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {loading ? "Processing..." : "Submit Registration"}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

