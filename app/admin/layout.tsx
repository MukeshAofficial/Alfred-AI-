import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AdminNavigation from "@/components/admin/admin-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard | The AI Butler",
  description: "Hotel management dashboard for The AI Butler platform",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${inter.className} flex flex-col min-h-screen bg-background`}>
      <AdminNavigation />
      <main className="flex-1">{children}</main>
    </div>
  )
}

