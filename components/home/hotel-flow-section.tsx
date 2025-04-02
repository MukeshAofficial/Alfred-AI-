"use client"

import { motion } from "framer-motion"
import { ClipboardList, LayoutGrid, BarChart3, Bot, TrendingUp } from "lucide-react"

export default function HotelFlowSection() {
  const steps = [
    {
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      title: "Register & Create Hotel Profile",
      description: "Upload details, images, and descriptions of hotel services.",
      delay: 0.1,
    },
    {
      icon: <LayoutGrid className="h-6 w-6 text-primary" />,
      title: "List Hotel Services",
      description: "Add dining, spa, housekeeping, and other offerings for guests.",
      delay: 0.2,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Monitor Bookings & Availability",
      description: "View bookings, free slots, and room statuses in a dashboard.",
      delay: 0.3,
    },
    {
      icon: <Bot className="h-6 w-6 text-primary" />,
      title: "AI & Chatbot Integration",
      description: "Automate guest support with an AI-powered chatbot.",
      delay: 0.4,
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Track Analytics & Revenue",
      description: "Get insights on guest bookings and earnings.",
      delay: 0.5,
    },
  ]

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Hotel Flow</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Streamline your hotel operations with our comprehensive management system
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

        {/* Steps */}
        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-6 md:gap-10`}
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center z-10">
                  {step.icon}
                </div>
                <div className="absolute h-20 w-20 rounded-full border border-primary/30 animate-ping opacity-20" />
              </div>

              <div className="w-full md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

