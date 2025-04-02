import Header from "@/components/header"
import LocalExperiences from "@/components/local-experiences"
import Navigation from "@/components/navigation"

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Local Experiences" />
      <LocalExperiences />
      <Navigation /> 
    </div>
  )
}

