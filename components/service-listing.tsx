"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/auth-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  provider_type: "hotel" | "vendor";
  provider_id: string;
}

interface Provider {
  id: string;
  name: string;
  business_name?: string;
  contact_email: string;
}

export default function ServiceListing() {
  const { session } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Record<string, Provider>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const fetchServices = async () => {
    try {
      // Fetch all services
      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("*");

      if (servicesError) throw servicesError;

      // Fetch all hotels and vendors
      const { data: hotelsData } = await supabase
        .from("hotels")
        .select("id, name, contact_email");

      const { data: vendorsData } = await supabase
        .from("vendors")
        .select("id, business_name, contact_email");

      // Create a map of providers
      const providersMap: Record<string, Provider> = {};
      hotelsData?.forEach((hotel) => {
        providersMap[hotel.id] = {
          id: hotel.id,
          name: hotel.name,
          contact_email: hotel.contact_email,
        };
      });

      vendorsData?.forEach((vendor) => {
        providersMap[vendor.id] = {
          id: vendor.id,
          name: vendor.business_name || "",
          business_name: vendor.business_name,
          contact_email: vendor.contact_email,
        };
      });

      setServices(servicesData || []);
      setProviders(providersMap);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleBookService = async (service: Service) => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          guest_id: session?.user?.id,
          service_id: service.id,
          booking_date: format(selectedDate, "yyyy-MM-dd"),
          booking_time: "09:00", // Default time, you might want to add time selection
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("Booking created successfully");
      setSelectedService(null);
      setSelectedDate(undefined);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const hotelServices = services.filter((service) => service.provider_type === "hotel");
  const vendorServices = services.filter((service) => service.provider_type === "vendor");

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="hotels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hotels">Hotel Services</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Services</TabsTrigger>
        </TabsList>

        <TabsContent value="hotels" className="space-y-4">
          {hotelServices.length === 0 ? (
            <p>No hotel services available.</p>
          ) : (
            hotelServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                provider={providers[service.provider_id]}
                onBook={() => setSelectedService(service)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          {vendorServices.length === 0 ? (
            <p>No vendor services available.</p>
          ) : (
            vendorServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                provider={providers[service.provider_id]}
                onBook={() => setSelectedService(service)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              Select a date to book {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
            <Button
              className="w-full"
              onClick={() => selectedService && handleBookService(selectedService)}
              disabled={!selectedDate}
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ServiceCard({
  service,
  provider,
  onBook,
}: {
  service: Service;
  provider: Provider;
  onBook: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>
          Provided by {provider?.name || "Unknown Provider"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{service.description}</p>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium">Price: ${service.price}</p>
              <p className="text-sm text-muted-foreground">
                Duration: {service.duration} minutes
              </p>
            </div>
            <Button onClick={onBook}>Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 