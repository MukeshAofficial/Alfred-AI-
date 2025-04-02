"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import BookingCalendar from "@/components/booking-calendar"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

type MessageType = "text" | "buttons" | "cards" | "carousel" | "calendar" | "food"
type SenderType = "user" | "ai"

interface Message {
  id: string
  content: string
  sender: SenderType
  type: MessageType
  timestamp: Date
  options?: string[]
  items?: {
    title: string
    description: string
    image: string
    action?: string
  }[]
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to The AI Butler. How may I assist you today?",
      sender: "ai",
      type: "buttons",
      timestamp: new Date(),
      options: ["Book Spa", "Order Food", "Room Service", "Local Recommendations"],
    },
  ])
  const [input, setInput] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [showFoodMenu, setShowFoodMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const router = useRouter()
  const isMobile = useMobile()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      type: "text",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")

    // Simulate AI response based on user input
    setTimeout(() => {
      let aiResponse: Message

      if (input.toLowerCase().includes("spa") || input.toLowerCase().includes("book spa")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Would you like to book a spa appointment? Please select a date and time:",
          sender: "ai",
          type: "calendar",
          timestamp: new Date(),
        }
        setShowCalendar(true)
      } else if (input.toLowerCase().includes("food") || input.toLowerCase().includes("order food")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Here are some dining options available for in-room dining:",
          sender: "ai",
          type: "carousel",
          timestamp: new Date(),
          items: [
            {
              title: "Breakfast Menu",
              description: "Available 6:30 AM - 11:00 AM",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Menu",
            },
            {
              title: "All-Day Dining",
              description: "Available 11:00 AM - 10:00 PM",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Menu",
            },
            {
              title: "Late Night",
              description: "Available 10:00 PM - 6:30 AM",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Menu",
            },
          ],
        }
        setShowFoodMenu(true)
      } else if (input.toLowerCase().includes("restaurant") || input.toLowerCase().includes("dining")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Here are our restaurants. Would you like to make a reservation?",
          sender: "ai",
          type: "cards",
          timestamp: new Date(),
          items: [
            {
              title: "The Grand Bistro",
              description: "Fine dining with panoramic ocean views",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Restaurant",
            },
            {
              title: "Seaside Grill",
              description: "Casual oceanfront dining with fresh seafood",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Restaurant",
            },
          ],
        }
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "I'd be happy to help with that. Is there anything specific you'd like to know?",
          sender: "ai",
          type: "buttons",
          timestamp: new Date(),
          options: ["Room Service", "Hotel Amenities", "Local Attractions", "Special Requests"],
        }
      }

      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleButtonClick = (option: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: option,
      sender: "user",
      type: "text",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    // Simulate AI response based on button clicked
    setTimeout(() => {
      let aiResponse: Message

      if (option === "Book Spa") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Please select a date and time for your spa appointment:",
          sender: "ai",
          type: "calendar",
          timestamp: new Date(),
        }
        setShowCalendar(true)
      } else if (option === "Order Food") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Here are our dining options:",
          sender: "ai",
          type: "carousel",
          timestamp: new Date(),
          items: [
            {
              title: "Breakfast Menu",
              description: "Available 6:30 AM - 11:00 AM",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Menu",
            },
            {
              title: "All-Day Dining",
              description: "Available 11:00 AM - 10:00 PM",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Menu",
            },
            {
              title: "Late Night",
              description: "Available 10:00 PM - 6:30 AM",
              image: "/placeholder.svg?height=120&width=200",
              action: "View Menu",
            },
          ],
        }
        setShowFoodMenu(true)
      } else if (option === "Room Service") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "What type of room service would you like to request?",
          sender: "ai",
          type: "buttons",
          timestamp: new Date(),
          options: ["Housekeeping", "Extra Amenities", "Maintenance", "Other"],
        }
      } else if (option === "Local Recommendations") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Here are some popular attractions near the hotel:",
          sender: "ai",
          type: "cards",
          timestamp: new Date(),
          items: [
            {
              title: "City Museum",
              description: "A world-renowned collection of art and artifacts, just 10 minutes away.",
              image: "/placeholder.svg?height=120&width=200",
              action: "Get Directions",
            },
            {
              title: "Waterfront Park",
              description: "Beautiful gardens and walking paths along the river, 15 minutes by foot.",
              image: "/placeholder.svg?height=120&width=200",
              action: "Learn More",
            },
          ],
        }
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: `I'll help you with "${option}". Could you provide more details about what you need?`,
          sender: "ai",
          type: "text",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleCalendarConfirm = (date: Date) => {
    setShowCalendar(false)

    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })

    const newAiMessage: Message = {
      id: Date.now().toString(),
      content: `Your spa appointment has been confirmed for ${formattedDate}. We look forward to seeing you!`,
      sender: "ai",
      type: "text",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newAiMessage])

    toast({
      title: "Booking Confirmed",
      description: `Spa appointment scheduled for ${formattedDate}`,
      duration: 5000,
    })
  }

  const handleFoodMenuSelect = (item: string) => {
    setShowFoodMenu(false)

    const newAiMessage: Message = {
      id: Date.now().toString(),
      content: `You've selected the ${item}. Would you like to place an order now?`,
      sender: "ai",
      type: "buttons",
      timestamp: new Date(),
      options: ["Yes, Order Now", "View Full Menu", "Cancel"],
    }

    setMessages((prev) => [...prev, newAiMessage])
  }

  const handleCardAction = (title: string, action: string) => {
    if (title === "The Grand Bistro" || title === "Seaside Grill") {
      const restaurantId = title === "The Grand Bistro" ? "the-grand-bistro" : "seaside-grill"
      router.push(`/restaurants/${restaurantId}`)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className={cn("flex flex-col h-full", isMobile ? "max-w-md mx-auto px-4 pb-4" : "w-full")}>
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
            {message.sender === "ai" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Butler" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}

            <div className={cn("max-w-[80%]", message.type === "carousel" && "max-w-full w-full")}>
              {message.type === "text" && (
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <p>{message.content}</p>
                  <div
                    className={cn("text-xs mt-1 opacity-70", message.sender === "user" ? "text-right" : "text-left")}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              )}

              {message.type === "buttons" && (
                <div className="space-y-3">
                  <div className={cn("rounded-2xl px-4 py-2.5 text-sm bg-muted")}>
                    <p>{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {message.options?.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-sm border-primary/30 hover:bg-primary/10 hover:text-primary"
                        onClick={() => handleButtonClick(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {message.type === "cards" && (
                <div className="space-y-3">
                  <div className={cn("rounded-2xl px-4 py-2.5 text-sm bg-muted")}>
                    <p>{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {message.items?.map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 rounded-full"
                            onClick={() => handleCardAction(item.title, item.action || "")}
                          >
                            {item.action}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {message.type === "carousel" && (
                <div className="space-y-3 w-full">
                  <div className={cn("rounded-2xl px-4 py-2.5 text-sm bg-muted")}>
                    <p>{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</div>
                  </div>

                  <div className="flex overflow-x-auto pb-2 gap-3 w-full scrollbar-hide">
                    {message.items?.map((item, index) => (
                      <Card key={index} className="min-w-[200px] flex-shrink-0">
                        <div className="h-[120px] relative">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 rounded-full text-xs"
                            onClick={() => handleFoodMenuSelect(item.title)}
                          >
                            {item.action}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {message.type === "calendar" && (
                <div className="space-y-3">
                  <div className={cn("rounded-2xl px-4 py-2.5 text-sm bg-muted")}>
                    <p>{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              )}
            </div>

            {message.sender === "user" && (
              <Avatar className="h-8 w-8 ml-2 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {showCalendar && (
          <div className="mx-auto w-full max-w-sm">
            <BookingCalendar onConfirm={handleCalendarConfirm} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="pt-2 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image className="h-5 w-5 text-muted-foreground" />
          </Button>

          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend()
              }
            }}
            className="rounded-full border-muted bg-muted/50 focus-visible:ring-primary/30"
          />

          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/voice">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Link>
          </Button>

          <Button variant="default" size="icon" className="rounded-full" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

