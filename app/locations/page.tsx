"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import LocationsTable from "@/components/locations/locations-table";
import { LocationsStats } from "@/components/locations/locations-stats";
import { ListingsStats } from "@/components/locations/listings-stats";
import ListingsTable from "@/components/locations/listings-table";
import { useState, useEffect } from "react";
import LocationService from "@/services/locations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [totalLocations, setTotalLocations] = useState(0);

  useEffect(() => {
    // Quick fetch for stats
    const fetchStats = async () => {
      try {
        const res = await LocationService.getLocations();
        if (res.data) {
          setTotalLocations(res.data.length);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Locations</h2>
          <p className="text-muted-foreground">
            See and manage all your business locations in one place.
          </p>
        </div>

        <Tabs defaultValue="locations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-4">
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="locations" className="space-y-6">
            <LocationsStats totalLocations={totalLocations} />
            <LocationsTable />
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <ListingsStats />
            <ListingsTable />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
