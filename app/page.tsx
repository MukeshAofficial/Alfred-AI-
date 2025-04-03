"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ServiceManagement from "@/components/service-management";
import ServiceListing from "@/components/service-listing";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { session } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserRole() {
      if (session?.user?.id) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (error) throw error;
          setUserRole(data?.role || null);
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    getUserRole();
  }, [session?.user?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Hotel Service Platform</h1>
            <div className="space-x-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Create Account</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Welcome to Our Hotel Service Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with hotels and vendors to access exclusive services and make your stay memorable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">For Guests</h3>
                <p className="text-muted-foreground">
                  Book hotel services, spa treatments, and local experiences all in one place.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">For Hotels</h3>
                <p className="text-muted-foreground">
                  Manage your services and connect with guests efficiently.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">For Vendors</h3>
                <p className="text-muted-foreground">
                  Offer your services to hotel guests and grow your business.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hotel Service Platform</h1>
          <Button
            variant="outline"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {userRole === "guest" ? (
          <ServiceListing />
        ) : userRole === "hotel" || userRole === "vendor" ? (
          <ServiceManagement />
        ) : (
          <div>Invalid user role</div>
        )}
      </main>
    </div>
  );
}

