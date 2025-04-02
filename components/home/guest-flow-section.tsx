"use client"

import { motion } from "framer-motion"
import { QrCode, MousePointerClick, CreditCard, MapPin, Star } from "lucide-react"

export default function GuestFlowSection() {
  const steps = [
    {
      icon: <QrCode className="h-6 w-6 text-primary" />,
      title: "Scan QR Code or Log In",
      description: "Guests scan a QR code or log in via the website.",
      delay: 0.1,
    },
    {
      icon: <MousePointerClick className="h-6 w-6 text-primary" />,
      title: "Browse & Select Services",
      description: "Guests filter and book dining, taxis, spa, or room service.",
      delay: 0.2,
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "One-Click Booking & Payment",
      description: "Confirm booking and pay securely.",
      delay: 0.3,
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Real-Time Order Tracking",
      description: "Get live updates & AI assistance.",
      delay: 0.4,
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Enjoy & Rate Service",
      description: "Leave feedback and earn loyalty points.",
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
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Guest Flow</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience a seamless journey from booking to service
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

