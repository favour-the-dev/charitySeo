"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import LocationsTable from "@/components/locations/locations-table";
import { LocationsStats } from "@/components/locations/locations-stats";
import { useState, useEffect } from "react";
import LocationService from "@/services/locations";

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

        <LocationsStats totalLocations={totalLocations} />

        <LocationsTable />
      </div>
    </DashboardLayout>
  );
}
