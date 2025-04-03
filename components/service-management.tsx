"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/auth-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export default function ServiceManagement() {
  const { session } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  const fetchServices = async () => {
    try {
      // First, get the user's role and provider ID
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session?.user?.id)
        .single();

      if (!profileData) throw new Error("Profile not found");

      let providerId;
      if (profileData.role === "hotel") {
        const { data: hotelData } = await supabase
          .from("hotels")
          .select("id")
          .eq("user_id", session?.user?.id)
          .single();
        providerId = hotelData?.id;
      } else if (profileData.role === "vendor") {
        const { data: vendorData } = await supabase
          .from("vendors")
          .select("id")
          .eq("user_id", session?.user?.id)
          .single();
        providerId = vendorData?.id;
      }

      if (!providerId) throw new Error("Provider not found");

      // Then fetch the services
      const { data: servicesData, error } = await supabase
        .from("services")
        .select("*")
        .eq("provider_id", providerId)
        .eq("provider_type", profileData.role);

      if (error) throw error;
      setServices(servicesData || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchServices();
    }
  }, [session?.user?.id]);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get provider details
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session?.user?.id)
        .single();

      if (!profileData) throw new Error("Profile not found");

      let providerId;
      if (profileData.role === "hotel") {
        const { data: hotelData } = await supabase
          .from("hotels")
          .select("id")
          .eq("user_id", session?.user?.id)
          .single();
        providerId = hotelData?.id;
      } else if (profileData.role === "vendor") {
        const { data: vendorData } = await supabase
          .from("vendors")
          .select("id")
          .eq("user_id", session?.user?.id)
          .single();
        providerId = vendorData?.id;
      }

      if (!providerId) throw new Error("Provider not found");

      const { error } = await supabase.from("services").insert([
        {
          provider_id: providerId,
          provider_type: profileData.role,
          name: newService.name,
          description: newService.description,
          price: parseFloat(newService.price),
          duration: parseInt(newService.duration),
        },
      ]);

      if (error) throw error;

      toast.success("Service added successfully");
      setNewService({ name: "", description: "", price: "", duration: "" });
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId);

      if (error) throw error;

      toast.success("Service deleted successfully");
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>Create a new service for your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddService} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit">Add Service</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Manage your existing services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.length === 0 ? (
              <p>No services found. Add your first service above.</p>
            ) : (
              services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="mt-2 space-x-4">
                          <span className="text-sm">Price: ${service.price}</span>
                          <span className="text-sm">Duration: {service.duration} minutes</span>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 