"use client"

import { useState } from "react"
import ChatInterface from "@/components/chat-interface"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, History, Star, Settings } from "lucide-react"
// Add the missing import
import { cn } from "@/lib/utils"

export default function ConciergePage() {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="AI Concierge" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Sidebar for desktop */}
          {!isMobile && (
            <div className="w-1/4 hidden md:block">
              <Card className="h-full">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="space-y-1 mb-6">
                    <h2 className="text-xl font-bold">AI Concierge</h2>
                    <p className="text-sm text-gray-500">Your personal hotel assistant</p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant={activeTab === "chat" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("chat")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button
                      variant={activeTab === "history" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("history")}
                    >
                      <History className="mr-2 h-4 w-4" />
                      Chat History
                    </Button>
                    <Button
                      variant={activeTab === "favorites" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Favorites
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="text-xs text-gray-500">
                      <p>The AI Butler v1.0</p>
                      <p>© 2023 Luxury Hotel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main content */}
          <div className={cn("flex-1", isMobile ? "w-full" : "w-3/4")}>
            {isMobile ? (
              <ChatInterface />
            ) : (
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <Tabs defaultValue="chat" value={activeTab} className="h-full">
                    <TabsContent value="chat" className="h-full m-0">
                      <ChatInterface />
                    </TabsContent>
                    <TabsContent value="history" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Chat History</h2>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Room Service Request</h3>
                                <p className="text-sm text-gray-500">Yesterday, 8:30 PM</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Spa Booking</h3>
                                <p className="text-sm text-gray-500">May 10, 2023, 10:15 AM</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="favorites" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Favorites</h2>
                      <div className="text-center py-12">
                        <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
                        <p className="text-gray-500">Star your favorite conversations to find them here.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="settings" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Settings</h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Chat Notifications</span>
                              <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Booking Reminders</span>
                              <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Special Offers</span>
                              <input type="checkbox" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Language</h3>
                          <select className="w-full p-2 border rounded">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese</option>
                          </select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

