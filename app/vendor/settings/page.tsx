"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Store,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Bell,
  Shield,
  CreditCard,
  Save,
  Upload,
  Calendar,
  Globe,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import VendorNavigation from "@/components/vendor/vendor-navigation"

export default function VendorSettingsPage() {
  const { toast } = useToast()
  const [logoPreview, setLogoPreview] = useState<string | null>("/placeholder.svg?height=100&width=100")

  // Mock data
  const [profileData, setProfileData] = useState({
    businessName: "City Tours & Transfers",
    description:
      "We provide high-quality city tours and airport transfers for tourists and business travelers. Our experienced guides and professional drivers ensure a comfortable and informative experience.",
    email: "info@citytours.example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Downtown, City, 12345",
    website: "https://citytours.example.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newBookings: true,
    bookingUpdates: true,
    bookingReminders: true,
    reviews: true,
    payments: true,
    marketing: false,
  })

  const [availabilitySettings, setAvailabilitySettings] = useState({
    monday: { open: true, start: "09:00", end: "17:00" },
    tuesday: { open: true, start: "09:00", end: "17:00" },
    wednesday: { open: true, start: "09:00", end: "17:00" },
    thursday: { open: true, start: "09:00", end: "17:00" },
    friday: { open: true, start: "09:00", end: "17:00" },
    saturday: { open: true, start: "10:00", end: "16:00" },
    sunday: { open: false, start: "10:00", end: "16:00" },
    autoAccept: true,
    bufferTime: "30",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    accountName: "City Tours LLC",
    accountNumber: "****6789",
    bankName: "First National Bank",
    routingNumber: "****4321",
    payoutFrequency: "monthly",
    taxId: "XX-XXXXXXX",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleAvailabilityChange = (day: string, field: "open" | "start" | "end", value: boolean | string) => {
    setAvailabilitySettings((prev) => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [field]: value },
    }))
  }

  const handleBufferTimeChange = (value: string) => {
    setAvailabilitySettings((prev) => ({ ...prev, bufferTime: value }))
  }

  const handleAutoAcceptChange = (value: boolean) => {
    setAvailabilitySettings((prev) => ({ ...prev, autoAccept: value }))
  }

  const handlePaymentChange = (name: string, value: string) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your business profile has been updated successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleSaveAvailability = () => {
    toast({
      title: "Availability settings updated",
      description: "Your availability schedule has been updated.",
    })
  }

  const handleSavePayment = () => {
    toast({
      title: "Payment settings updated",
      description: "Your payment information has been updated.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Business Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>Manage your business information visible to customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {logoPreview ? (
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Business logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Store className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <label
                        htmlFor="logo-upload"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white cursor-pointer"
                      >
                        <Upload className="h-4 w-4" />
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="Your Business Name"
                          className="pl-10"
                          value={profileData.businessName}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your business and services..."
                        className="min-h-[100px]"
                        value={profileData.description}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        value={profileData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Main St, City, State, ZIP"
                        className="pl-10"
                        value={profileData.address}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://example.com"
                        className="pl-10"
                        value={profileData.website}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability Settings</CardTitle>
                <CardDescription>Set your working hours and booking preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Working Hours</h3>
                  <div className="space-y-4">
                    {Object.entries(availabilitySettings)
                      .filter(([key]) => key !== "autoAccept" && key !== "bufferTime")
                      .map(([day, settings]) => (
                        <div key={day} className="flex items-center gap-4">
                          <div className="w-28">
                            <span className="text-sm font-medium capitalize">{day}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={settings.open}
                              onCheckedChange={(checked) => handleAvailabilityChange(day, "open", checked)}
                            />
                            <span className="text-sm">{settings.open ? "Open" : "Closed"}</span>
                          </div>
                          {settings.open && (
                            <div className="flex items-center gap-2">
                              <Input
                                type="time"
                                className="w-32"
                                value={settings.start}
                                onChange={(e) => handleAvailabilityChange(day, "start", e.target.value)}
                              />
                              <span className="text-sm">to</span>
                              <Input
                                type="time"
                                className="w-32"
                                value={settings.end}
                                onChange={(e) => handleAvailabilityChange(day, "end", e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Booking Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bufferTime">Buffer Time Between Bookings</Label>
                      <Select value={availabilitySettings.bufferTime} onValueChange={handleBufferTimeChange}>
                        <SelectTrigger id="bufferTime" className="w-full">
                          <SelectValue placeholder="Select buffer time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No buffer time</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Time needed between bookings to prepare for the next customer
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="autoAccept">Auto-Accept Bookings</Label>
                        <Switch
                          id="autoAccept"
                          checked={availabilitySettings.autoAccept}
                          onCheckedChange={handleAutoAcceptChange}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Automatically accept new bookings without manual approval
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Special Dates</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Set Vacation Days
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Set Special Hours
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveAvailability}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newBookings">New Bookings</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications when a new booking is made
                        </p>
                      </div>
                      <Switch
                        id="newBookings"
                        checked={notificationSettings.newBookings}
                        onCheckedChange={(checked) => handleNotificationChange("newBookings", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="bookingUpdates">Booking Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications when a booking is modified or cancelled
                        </p>
                      </div>
                      <Switch
                        id="bookingUpdates"
                        checked={notificationSettings.bookingUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("bookingUpdates", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="bookingReminders">Booking Reminders</Label>
                        <p className="text-xs text-muted-foreground">Receive reminders about upcoming bookings</p>
                      </div>
                      <Switch
                        id="bookingReminders"
                        checked={notificationSettings.bookingReminders}
                        onCheckedChange={(checked) => handleNotificationChange("bookingReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reviews">Reviews</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications when a new review is posted
                        </p>
                      </div>
                      <Switch
                        id="reviews"
                        checked={notificationSettings.reviews}
                        onCheckedChange={(checked) => handleNotificationChange("reviews", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payments">Payments</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications about payments and payouts
                        </p>
                      </div>
                      <Switch
                        id="payments"
                        checked={notificationSettings.payments}
                        onCheckedChange={(checked) => handleNotificationChange("payments", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing & Updates</Label>
                        <p className="text-xs text-muted-foreground">Receive news, updates, and promotional offers</p>
                      </div>
                      <Switch
                        id="marketing"
                        checked={notificationSettings.marketing}
                        onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Mobile Notifications</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Configure Mobile App Notifications
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Manage your payment information and payout preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Bank Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Holder Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="accountName"
                          placeholder="Account Holder Name"
                          className="pl-10"
                          value={paymentSettings.accountName}
                          onChange={(e) => handlePaymentChange("accountName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="bankName"
                          placeholder="Bank Name"
                          className="pl-10"
                          value={paymentSettings.bankName}
                          onChange={(e) => handlePaymentChange("bankName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="accountNumber"
                          placeholder="Account Number"
                          className="pl-10"
                          value={paymentSettings.accountNumber}
                          onChange={(e) => handlePaymentChange("accountNumber", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="routingNumber"
                          placeholder="Routing Number"
                          className="pl-10"
                          value={paymentSettings.routingNumber}
                          onChange={(e) => handlePaymentChange("routingNumber", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payout Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                      <Select
                        value={paymentSettings.payoutFrequency}
                        onValueChange={(value) => handlePaymentChange("payoutFrequency", value)}
                      >
                        <SelectTrigger id="payoutFrequency" className="w-full">
                          <SelectValue placeholder="Select payout frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / SSN</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="taxId"
                          placeholder="Tax ID or SSN"
                          className="pl-10"
                          value={paymentSettings.taxId}
                          onChange={(e) => handlePaymentChange("taxId", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Service Pricing</h3>
                  <Button variant="outline" className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Manage Service Pricing
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSavePayment}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-2">
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Set Up 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Account Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="text-amber-600 border-amber-600">
                      Deactivate Account
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-600">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

