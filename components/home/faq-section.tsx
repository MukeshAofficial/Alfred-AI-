"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "Booking a service is simple. Log in to your guest account, browse available services, select the one you need, choose your preferred time slot, and confirm your booking. You'll receive an instant confirmation and can track your service in real-time.",
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes, all payments are processed through our secure payment gateway that uses industry-standard encryption. We never store your full credit card details on our servers, ensuring maximum security for all transactions.",
    },
    {
      question: "How can I register my hotel?",
      answer:
        "To register your hotel, click on the 'Register Your Hotel' button on our homepage. You'll need to provide details about your property, upload images, and set up your service offerings. Our team will review your application and get back to you within 48 hours.",
    },
    {
      question: "What services can vendors offer?",
      answer:
        "Vendors can offer a wide range of services including transportation (taxis, airport shuttles), tours and activities, laundry services, food delivery, equipment rental, and more. Each vendor can customize their offerings, pricing, and availability through their dedicated dashboard.",
    },
    {
      question: "Can I modify or cancel my booking?",
      answer:
        "Yes, you can modify or cancel your booking through your guest account. Most services allow free cancellation up to 24 hours before the scheduled time. Some services may have different cancellation policies, which will be clearly displayed before you confirm your booking.",
    },
    {
      question: "How does the AI assistant help guests?",
      answer:
        "Our AI assistant helps guests by providing instant responses to common questions, recommending services based on preferences, assisting with bookings, providing real-time service updates, and offering personalized suggestions to enhance your stay.",
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

