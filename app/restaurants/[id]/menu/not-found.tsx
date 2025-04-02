import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Navigation from "@/components/navigation"

export default function RestaurantMenuNotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Menu Not Found" />
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Menu Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the menu you're looking for. The restaurant may not exist or the menu is temporarily
            unavailable.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/restaurants">Browse Restaurants</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}

