"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Facebook,
  Globe,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import ListingService from "@/services/listings";
import { getListingsStatsResponse } from "@/types/types";

export function ListingsStats() {
  const [stats, setStats] = useState<getListingsStatsResponse["data"] | null>(
    null
  );

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await ListingService.getListingStats();
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch listing stats", error);
      }
    }
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_listings}</div>
          <p className="text-xs text-muted-foreground">
            Across {Object.keys(stats.by_platform).length} platforms
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Synced</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.by_status.synced + stats.by_status.active}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.recentyly_synced} synced recently
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Action Needed</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.with_discrepancies}</div>
          <p className="text-xs text-muted-foreground">
            Listings with discrepancies
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">By Platform</CardTitle>
          <Facebook className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Facebook</span>
              <span className="font-medium text-foreground">
                {stats.by_platform.facebook}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Google</span>
              <span className="font-medium text-foreground">
                {stats.by_platform.google}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bing</span>
              <span className="font-medium text-foreground">
                {stats.by_platform.bing}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
