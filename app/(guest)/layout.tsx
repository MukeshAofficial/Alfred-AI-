import type React from "react"
import Navigation from "@/components/navigation"

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 pb-16">{children}</main>
      <Navigation />
    </div>
  )
}

