import Header from "@/components/header"
import UserBookings from "@/components/user-bookings"
import Navigation from "@/components/navigation"

export default function BookingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="My Bookings" />
      <UserBookings />
      <Navigation /> 
    </div>
  )
}

