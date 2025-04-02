import HomeNavigation from "@/components/home/home-navigation"
import HeroSection from "@/components/home/hero-section"
import KeyFeaturesSection from "@/components/home/key-features-section"
import HowItWorksSection from "@/components/home/how-it-works-section"
import ServicesSection from "@/components/home/services-section"
import VendorPortalSection from "@/components/home/vendor-portal-section"
import FaqSection from "@/components/home/faq-section"
import Footer from "@/components/home/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavigation />
      <main>
        <HeroSection />
        <KeyFeaturesSection />
        <ServicesSection />
        <HowItWorksSection />
        <VendorPortalSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

