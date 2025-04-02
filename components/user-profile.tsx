"use client"

import { useState } from "react"
import { User, Calendar, Clock, Edit, Save, Utensils, AlertCircle, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  roomNumber: string
  checkIn: string
  checkOut: string
  avatar: string
  preferences: {
    dietaryRestrictions: string[]
    housekeepingTime: string
    allergies: string
    doNotDisturb: boolean
    temperaturePreference: string
  }
}

interface PastInteraction {
  id: string
  type: "service" | "booking"
  title: string
  date: string
  status: "completed" | "upcoming" | "cancelled"
  details: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    roomNumber: "507",
    checkIn: "2025-03-28",
    checkOut: "2025-04-02",
    avatar: "/placeholder.svg?height=200&width=200",
    preferences: {
      dietaryRestrictions: ["Vegetarian", "No Dairy"],
      housekeepingTime: "morning",
      allergies: "Peanuts, Shellfish",
      doNotDisturb: false,
      temperaturePreference: "22°C",
    },
  })

  const [pastInteractions, setPastInteractions] = useState<PastInteraction[]>([
    {
      id: "1",
      type: "service",
      title: "Extra Towels",
      date: "2025-03-29 14:30",
      status: "completed",
      details: "Requested extra towels for the bathroom",
    },
    {
      id: "2",
      type: "booking",
      title: "Dinner Reservation",
      date: "2025-03-29 19:00",
      status: "upcoming",
      details: "Table for 2 at the Main Restaurant",
    },
    {
      id: "3",
      type: "booking",
      title: "Spa Appointment",
      date: "2025-03-30 15:00",
      status: "upcoming",
      details: "60-minute Signature Massage",
    },
    {
      id: "4",
      type: "service",
      title: "Room Cleaning",
      date: "2025-03-29 10:00",
      status: "completed",
      details: "Regular housekeeping service",
    },
    {
      id: "5",
      type: "booking",
      title: "Airport Transfer",
      date: "2025-04-02 11:00",
      status: "upcoming",
      details: "Private car to International Airport",
    },
  ])

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPreferences, setIsEditingPreferences] = useState(false)
  const [newAvatar, setNewAvatar] = useState<string | null>(null)
  const { toast } = useToast()

  const handleProfileSave = () => {
    setIsEditingProfile(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    })
  }

  const handlePreferencesSave = () => {
    setIsEditingPreferences(false)
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been updated successfully.",
      duration: 3000,
    })
  }

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll just set a different placeholder
    const newAvatarUrl = `/placeholder.svg?height=200&width=200&text=${Math.random().toString(36).substring(7)}`
    setNewAvatar(newAvatarUrl)

    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated successfully.",
      duration: 3000,
    })
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 space-y-4">
          <Card className="border border-primary/20">
            <CardHeader className="pb-2 text-center">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={newAvatar || userData.avatar} alt={userData.name} />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background border-primary/20"
                    onClick={handleAvatarChange}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{userData.name}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">Room Number</span>
                  </div>

                  {isEditingProfile ? (
                    <Input
                      value={userData.roomNumber}
                      onChange={(e) => setUserData({ ...userData, roomNumber: e.target.value })}
                      className="max-w-[120px] h-8 text-right"
                    />
                  ) : (
                    <span className="font-medium">{userData.roomNumber}</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Check-in Date</span>
                  </div>

                  {isEditingProfile ? (
                    <Input
                      type="date"
                      value={userData.checkIn}
                      onChange={(e) => setUserData({ ...userData, checkIn: e.target.value })}
                      className="max-w-[160px] h-8 text-right"
                    />
                  ) : (
                    <span className="font-medium">{formatDate(userData.checkIn)}</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Check-out Date</span>
                  </div>

                  {isEditingProfile ? (
                    <Input
                      type="date"
                      value={userData.checkOut}
                      onChange={(e) => setUserData({ ...userData, checkOut: e.target.value })}
                      className="max-w-[160px] h-8 text-right"
                    />
                  ) : (
                    <span className="font-medium">{formatDate(userData.checkOut)}</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t">
                <h3 className="text-sm font-medium mb-2">Stay Summary</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-primary/10 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Nights</p>
                    <p className="font-medium">5</p>
                  </div>
                  <div className="bg-primary/10 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="font-medium">2</p>
                  </div>
                  <div className="bg-primary/10 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Room Type</p>
                    <p className="font-medium">Deluxe</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              {isEditingProfile && <Button onClick={handleProfileSave}>Save Changes</Button>}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/profile/bookings">
                    <Calendar className="h-4 w-4 mr-2" />
                    My Bookings
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Late Check-out
                </Button>
                <Button variant="outline" className="justify-start">
                  <Utensils className="h-4 w-4 mr-2" />
                  Breakfast
                </Button>
                <Button variant="outline" className="justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Assistance
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-0">
          <Card className="border border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">My Preferences</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                >
                  {isEditingPreferences ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>Customize your stay experience</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="dietary">Dietary Restrictions</Label>
                  {isEditingPreferences ? (
                    <Select
                      value={userData.preferences.dietaryRestrictions.join(", ")}
                      onValueChange={(value) =>
                        setUserData({
                          ...userData,
                          preferences: {
                            ...userData.preferences,
                            dietaryRestrictions: value.split(", "),
                          },
                        })
                      }
                    >
                      <SelectTrigger id="dietary">
                        <SelectValue placeholder="Select dietary restrictions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Gluten-Free">Gluten-Free</SelectItem>
                        <SelectItem value="Vegetarian, No Dairy">Vegetarian, No Dairy</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userData.preferences.dietaryRestrictions.map((diet, index) => (
                        <div
                          key={index}
                          className="bg-primary/10 text-primary-foreground px-2 py-1 rounded-full text-xs"
                        >
                          {diet}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="housekeeping">Preferred Housekeeping Time</Label>
                  {isEditingPreferences ? (
                    <Select
                      value={userData.preferences.housekeepingTime}
                      onValueChange={(value) =>
                        setUserData({
                          ...userData,
                          preferences: {
                            ...userData.preferences,
                            housekeepingTime: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger id="housekeeping">
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 3PM)</SelectItem>
                        <SelectItem value="evening">Evening (3PM - 6PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {userData.preferences.housekeepingTime === "morning" && "Morning (9AM - 12PM)"}
                        {userData.preferences.housekeepingTime === "afternoon" && "Afternoon (12PM - 3PM)"}
                        {userData.preferences.housekeepingTime === "evening" && "Evening (3PM - 6PM)"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="allergies">Allergies</Label>
                  {isEditingPreferences ? (
                    <Textarea
                      id="allergies"
                      value={userData.preferences.allergies}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          preferences: {
                            ...userData.preferences,
                            allergies: e.target.value,
                          },
                        })
                      }
                      placeholder="List any allergies..."
                      className="resize-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.preferences.allergies || "None"}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dnd">Do Not Disturb</Label>
                    <p className="text-sm text-muted-foreground">Activate to prevent housekeeping visits</p>
                  </div>
                  <Switch
                    id="dnd"
                    checked={userData.preferences.doNotDisturb}
                    onCheckedChange={(checked) =>
                      setUserData({
                        ...userData,
                        preferences: {
                          ...userData.preferences,
                          doNotDisturb: checked,
                        },
                      })
                    }
                    disabled={!isEditingPreferences}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="temperature">Room Temperature Preference</Label>
                  {isEditingPreferences ? (
                    <Select
                      value={userData.preferences.temperaturePreference}
                      onValueChange={(value) =>
                        setUserData({
                          ...userData,
                          preferences: {
                            ...userData.preferences,
                            temperaturePreference: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger id="temperature">
                        <SelectValue placeholder="Select temperature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20°C">20°C (68°F) - Cool</SelectItem>
                        <SelectItem value="22°C">22°C (72°F) - Moderate</SelectItem>
                        <SelectItem value="24°C">24°C (75°F) - Warm</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <span>{userData.preferences.temperaturePreference}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              {isEditingPreferences && <Button onClick={handlePreferencesSave}>Save Preferences</Button>}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Past Interactions</CardTitle>
              <CardDescription>Your service requests and bookings</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {pastInteractions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className={cn(
                      "p-3 rounded-lg border",
                      interaction.status === "upcoming" && "border-primary/30 bg-primary/5",
                      interaction.status === "completed" && "border-muted",
                      interaction.status === "cancelled" && "border-destructive/30 bg-destructive/5",
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {interaction.type === "service" ? (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-sm">{interaction.title}</h3>
                          <p className="text-xs text-muted-foreground">{interaction.date}</p>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          interaction.status === "upcoming" && "bg-primary/20 text-primary",
                          interaction.status === "completed" && "bg-muted text-muted-foreground",
                          interaction.status === "cancelled" && "bg-destructive/20 text-destructive",
                        )}
                      >
                        {interaction.status.charAt(0).toUpperCase() + interaction.status.slice(1)}
                      </div>
                    </div>

                    <p className="text-sm ml-10">{interaction.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

