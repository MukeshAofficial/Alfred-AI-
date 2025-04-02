"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showNotification?: boolean
  showSearch?: boolean
}

export default function Header({
  title,
  showBackButton = false,
  showNotification = false,
  showSearch = false,
}: HeaderProps) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // If not mobile, we don't need to show the header since we have the desktop navigation
  if (!isMobile) {
    return (
      <div className="py-4 px-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 bg-background/80 backdrop-blur-md",
        isScrolled ? "shadow-sm" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          )}
          {showNotification && (
            <Button variant="ghost" size="icon" onClick={() => router.push("/notifications")}>
              <Bell className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

