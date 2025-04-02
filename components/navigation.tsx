"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Bell, Calendar, Compass, User, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Concierge", href: "/concierge", icon: MessageSquare },
    { name: "Services", href: "/services", icon: Bell },
    { name: "Bookings", href: "/bookings", icon: Calendar },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Profile", href: "/profile", icon: User },
  ]

  // Mobile Navigation
  if (isMobile) {
    return (
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 border-t bg-background/80 backdrop-blur-md",
          isScrolled ? "shadow-lg" : "",
        )}
      >
        <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
                    isActive && "bg-primary/10",
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-all", isActive && "scale-110")} />
                </div>
                <span className="text-xs mt-0.5">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    )
  }

  // Desktop Navigation
  return (
    <>
      {/* Top Navigation Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-md h-16",
          isScrolled ? "shadow-md" : "",
        )}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link href="/" className="font-bold text-xl">
            The AI Butler
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                    isActive
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-md transition-all",
                          isActive
                            ? "text-primary bg-primary/10 font-medium"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Spacer for fixed top navigation */}
      <div className="h-16"></div>
    </>
  )
}

