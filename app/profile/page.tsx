"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Settings, CreditCard, LogOut, Calendar } from "lucide-react"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const isMobile = useMobile()

  // Mock user data
  const userData = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    roomNumber: "Suite 402",
    checkIn: "May 12, 2023",
    checkOut: "May 19, 2023",
    loyaltyPoints: 2450,
    loyaltyTier: "Gold",
    profileImage: "/placeholder.svg?height=100&width=100",
    preferences: {
      roomTemperature: "72°F",
      pillowType: "Memory Foam",
      dietaryRestrictions: "None",
      wakeUpCalls: "No",
      newspaperDelivery: "Yes - The New York Times",
    },
    paymentMethods: [
      {
        id: "card1",
        type: "Visa",
        last4: "4242",
        expiry: "05/25",
        isDefault: true,
      },
      {
        id: "card2",
        type: "Mastercard",
        last4: "8888",
        expiry: "09/24",
        isDefault: false,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="My Profile" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Summary */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userData.profileImage} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-500 mb-2">{userData.email}</p>
                  <Badge className="mb-4">{userData.loyaltyTier} Member</Badge>

                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">{userData.loyaltyPoints} points • 550 points to Platinum</p>

                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Room:</span>
                      <span className="font-medium">{userData.roomNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check-in:</span>
                      <span className="font-medium">{userData.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check-out:</span>
                      <span className="font-medium">{userData.checkOut}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Card className="mt-6">
                <CardContent className="p-0">
                  <div className="divide-y">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "profile" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Personal Information
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "preferences" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("preferences")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "payment" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "bookings" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start rounded-none h-12 text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            {isMobile ? (
              <Tabs defaultValue="profile">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="profile" className="flex-1">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex-1">
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex-1">
                    Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your personal details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={userData.phone} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stay Preferences</CardTitle>
                      <CardDescription>Customize your stay experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Room Temperature</Label>
                        <Input id="temperature" defaultValue={userData.preferences.roomTemperature} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pillow">Pillow Type</Label>
                        <select id="pillow" className="w-full p-2 border rounded">
                          <option>Memory Foam</option>
                          <option>Feather</option>
                          <option>Firm</option>
                          <option>Soft</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietary">Dietary Restrictions</Label>
                        <Input id="dietary" defaultValue={userData.preferences.dietaryRestrictions} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wakeup">Wake-up Calls</Label>
                        <input
                          type="checkbox"
                          id="wakeup"
                          defaultChecked={userData.preferences.wakeUpCalls === "Yes"}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newspaper">Newspaper Delivery</Label>
                        <input
                          type="checkbox"
                          id="newspaper"
                          defaultChecked={userData.preferences.newspaperDelivery.startsWith("Yes")}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="payment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.paymentMethods.map((card) => (
                          <div key={card.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center">
                              <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
                              <div>
                                <p className="font-medium">
                                  {card.type} •••• {card.last4}
                                </p>
                                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {card.isDefault && (
                                <Badge variant="outline" className="mr-2">
                                  Default
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add Payment Method</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div>
                {activeTab === "profile" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your personal details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={userData.phone} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "preferences" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Stay Preferences</CardTitle>
                      <CardDescription>Customize your stay experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Room Temperature</Label>
                        <Input id="temperature" defaultValue={userData.preferences.roomTemperature} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pillow">Pillow Type</Label>
                        <select id="pillow" className="w-full p-2 border rounded">
                          <option>Memory Foam</option>
                          <option>Feather</option>
                          <option>Firm</option>
                          <option>Soft</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietary">Dietary Restrictions</Label>
                        <Input id="dietary" defaultValue={userData.preferences.dietaryRestrictions} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wakeup">Wake-up Calls</Label>
                        <input
                          type="checkbox"
                          id="wakeup"
                          defaultChecked={userData.preferences.wakeUpCalls === "Yes"}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newspaper">Newspaper Delivery</Label>
                        <input
                          type="checkbox"
                          id="newspaper"
                          defaultChecked={userData.preferences.newspaperDelivery.startsWith("Yes")}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "payment" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.paymentMethods.map((card) => (
                          <div key={card.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center">
                              <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
                              <div>
                                <p className="font-medium">
                                  {card.type} •••• {card.last4}
                                </p>
                                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {card.isDefault && (
                                <Badge variant="outline" className="mr-2">
                                  Default
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add Payment Method</Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "bookings" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>My Bookings</CardTitle>
                      <CardDescription>View and manage your reservations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">The Grand Bistro</h3>
                              <p className="text-sm text-gray-500">Dinner Reservation</p>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>May 15, 2023 • 7:30 PM</span>
                              </div>
                            </div>
                            <Badge>Confirmed</Badge>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 border rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Deep Tissue Massage</h3>
                              <p className="text-sm text-gray-500">Spa Treatment</p>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>May 16, 2023 • 2:00 PM</span>
                              </div>
                            </div>
                            <Badge>Confirmed</Badge>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">View All Bookings</Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

