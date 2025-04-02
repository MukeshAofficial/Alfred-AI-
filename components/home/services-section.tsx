"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed, Wine, SpadeIcon as Spa, Shirt, Car, Compass, Building2, Wrench } from "lucide-react"

interface ServiceIconProps {
  icon: React.ReactNode
  title: string
  delay: number
}

function ServiceIcon({ icon, title, delay }: ServiceIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center mb-4 border-4 border-white shadow-lg">
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-center font-medium">{title}</h3>
    </motion.div>
  )
}

export default function ServicesSection() {
  const services = [
    {
      icon: <UtensilsCrossed className="h-10 w-10" />,
      title: "Dining",
      delay: 0.1,
    },
    {
      icon: <Wine className="h-10 w-10" />,
      title: "Mini-bar",
      delay: 0.2,
    },
    {
      icon: <Shirt className="h-10 w-10" />,
      title: "Laundry and Repair",
      delay: 0.3,
    },
    {
      icon: <Spa className="h-10 w-10" />,
      title: "Spa/Massage",
      delay: 0.4,
    },
    {
      icon: <Car className="h-10 w-10" />,
      title: "Car Rental/Taxi",
      delay: 0.5,
    },
    {
      icon: <Compass className="h-10 w-10" />,
      title: "Tour Package",
      delay: 0.6,
    },
    {
      icon: <Building2 className="h-10 w-10" />,
      title: "Executive Lounge",
      delay: 0.7,
    },
    {
      icon: <Wrench className="h-10 w-10" />,
      title: "Room Support",
      delay: 0.8,
    },
  ]

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Superbutler's online platform is designed to uplift your hotel business, tailoring solutions to enhance your
            existing services.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceIcon key={index} icon={service.icon} title={service.title} delay={service.delay} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full" asChild>
            <Link href="/services">Learn more »</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

