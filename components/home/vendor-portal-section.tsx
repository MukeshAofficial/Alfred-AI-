"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus, ListPlus, Bell, CreditCard, Star, BarChart2, Calendar, Package } from "lucide-react"

export default function VendorPortalSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-red-900 to-red-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vendor Portal</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Join our network of service providers and grow your business by connecting with hotel guests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold mb-4">For Service Providers</h3>
            <p className="mb-6">
              Register your business and offer your services directly to hotel guests through our AI-powered platform.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Easy Registration</h4>
                  <p className="text-sm text-white/80">
                    Simple sign-up process with business details, service descriptions, and pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <ListPlus className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Service Management</h4>
                  <p className="text-sm text-white/80">
                    Add, edit, and manage your service offerings with flexible scheduling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Booking Notifications</h4>
                  <p className="text-sm text-white/80">Get instant alerts when guests book your services.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Secure Payments</h4>
                  <p className="text-sm text-white/80">Receive payments directly through our secure payment system.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Vendor Dashboard</h3>
            <p className="mb-6">
              A comprehensive dashboard to manage your business, track bookings, and analyze performance.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <Calendar className="h-8 w-8 mb-2 text-white/80" />
                <h4 className="font-semibold">Booking Management</h4>
                <p className="text-sm text-white/80">View and manage all your upcoming and past bookings.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <Package className="h-8 w-8 mb-2 text-white/80" />
                <h4 className="font-semibold">Service Listings</h4>
                <p className="text-sm text-white/80">Create and update your service offerings with rich details.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <BarChart2 className="h-8 w-8 mb-2 text-white/80" />
                <h4 className="font-semibold">Analytics</h4>
                <p className="text-sm text-white/80">Track performance metrics and revenue statistics.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <Star className="h-8 w-8 mb-2 text-white/80" />
                <h4 className="font-semibold">Reviews & Ratings</h4>
                <p className="text-sm text-white/80">Monitor customer feedback to improve your services.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-white text-red-800 hover:bg-white/90 rounded-full" asChild>
            <Link href="/vendor/register">Register as a Vendor</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

