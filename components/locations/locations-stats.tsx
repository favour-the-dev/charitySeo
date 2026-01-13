"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Store, Chrome } from "lucide-react";
import Image from "next/image";

interface LocationsStatsProps {
  totalLocations: number;
}

export function LocationsStats({ totalLocations }: LocationsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Locations</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLocations}</div>
          <p className="text-xs text-muted-foreground">
            Total active locations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Listings</CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">Active listings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Google</CardTitle>
          <div className="h-4 w-4 relative">
            {/* Fallback to icon if image not available, but assuming standard path or icon */}
            <Image
              src="/authorized/Google.png"
              alt="Google"
              fill
              className="object-contain"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0">
              <Chrome className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">Connected locations</p>
        </CardContent>
      </Card>
    </div>
  );
}
