"use client"

import type React from "react"

import { motion } from "framer-motion"
import { MessageSquare, Mic, QrCode, Smartphone, Globe, UserPlus, Home, BarChart3 } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-start"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

export default function KeyFeaturesSection() {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Chat Assistant",
      description: "Personalised AI-powered chat assistant tailored to your hotel services.",
      delay: 0.1,
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice AI Assistance",
      description: "Voice-enabled AI platform to streamline guest requests and hotel operations.",
      delay: 0.2,
    },
    {
      icon: <QrCode className="h-8 w-8" />,
      title: "QR Code Room Bind",
      description: "QR scan enables seamless access to digital experiences.",
      delay: 0.3,
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "No App Installation",
      description: "The service works on mobile browser without app install.",
      delay: 0.4,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "140+ Languages",
      description: "Real time translation into 140+ languages.",
      delay: 0.5,
    },
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: "No Guest Signup",
      description: "Managers can monitor live orders and change prices.",
      delay: 0.6,
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Order from Home/Office",
      description: "AI Butler allows convenient delivery ordering for customers.",
      delay: 0.7,
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Reports and Analytics",
      description: "Insights and analytics for comprehensive reporting.",
      delay: 0.8,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Elevate your business standards with AI Butler's key features, setting a new benchmark for excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

