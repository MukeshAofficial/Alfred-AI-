"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  QrCode,
  MousePointerClick,
  CreditCard,
  MapPin,
  Star,
  ClipboardList,
  LayoutGrid,
  BarChart3,
  Bot,
  TrendingUp,
  UserPlus,
  ListPlus,
  Bell,
  CreditCardIcon,
  StarIcon,
} from "lucide-react"

interface ProcessCardProps {
  icon: React.ReactNode
  title: string
  steps: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
  delay: number
  color: string
}

function ProcessCard({ icon, title, steps, delay, color }: ProcessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className={`p-6 ${color} text-white`}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">{icon}</div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className={`h-8 w-8 rounded-full ${color} text-white flex items-center justify-center`}>
                  {step.icon}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const processes = [
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "For Hotels",
      color: "bg-blue-600",
      steps: [
        {
          icon: <ClipboardList className="h-4 w-4" />,
          title: "Register & Create Hotel Profile",
          description: "Upload details, images, and descriptions of hotel services.",
        },
        {
          icon: <LayoutGrid className="h-4 w-4" />,
          title: "List Hotel Services",
          description: "Add dining, spa, housekeeping, and other offerings for guests.",
        },
        {
          icon: <BarChart3 className="h-4 w-4" />,
          title: "Monitor Bookings & Availability",
          description: "View bookings, free slots, and room statuses in a dashboard.",
        },
        {
          icon: <Bot className="h-4 w-4" />,
          title: "AI & Chatbot Integration",
          description: "Automate guest support with an AI-powered chatbot.",
        },
        {
          icon: <TrendingUp className="h-4 w-4" />,
          title: "Track Analytics & Revenue",
          description: "Get insights on guest bookings and earnings.",
        },
      ],
      delay: 0.1,
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "For Guests",
      color: "bg-primary",
      steps: [
        {
          icon: <QrCode className="h-4 w-4" />,
          title: "Scan QR Code or Log In",
          description: "Guests scan a QR code or log in via the website.",
        },
        {
          icon: <MousePointerClick className="h-4 w-4" />,
          title: "Browse & Select Services",
          description: "Guests filter and book dining, taxis, spa, or room service.",
        },
        {
          icon: <CreditCard className="h-4 w-4" />,
          title: "One-Click Booking & Payment",
          description: "Confirm booking and pay securely.",
        },
        {
          icon: <MapPin className="h-4 w-4" />,
          title: "Real-Time Order Tracking",
          description: "Get live updates & AI assistance.",
        },
        {
          icon: <Star className="h-4 w-4" />,
          title: "Enjoy & Rate Service",
          description: "Leave feedback and earn loyalty points.",
        },
      ],
      delay: 0.2,
    },
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "For Vendors",
      color: "bg-red-600",
      steps: [
        {
          icon: <UserPlus className="h-4 w-4" />,
          title: "Sign Up & Register as Vendor",
          description: "Taxi, laundry, tour guides, etc., create a vendor profile.",
        },
        {
          icon: <ListPlus className="h-4 w-4" />,
          title: "List Services & Set Prices",
          description: "Upload images, descriptions, and service categories.",
        },
        {
          icon: <Bell className="h-4 w-4" />,
          title: "Receive & Manage Bookings",
          description: "Vendors get notified and manage guest requests.",
        },
        {
          icon: <CreditCardIcon className="h-4 w-4" />,
          title: "Deliver Service & Get Paid",
          description: "Provide service and receive payments securely.",
        },
        {
          icon: <StarIcon className="h-4 w-4" />,
          title: "Rate & Get Reviews",
          description: "Vendors get guest feedback to improve services.",
        },
      ],
      delay: 0.3,
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A seamless experience for hotels, guests, and vendors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <ProcessCard
              key={index}
              icon={process.icon}
              title={process.title}
              steps={process.steps}
              delay={process.delay}
              color={process.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

