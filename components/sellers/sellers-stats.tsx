"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, TrendingUp } from "lucide-react";

interface Seller {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface SellersStatsProps {
  sellers: Seller[];
}

export function SellersStats({ sellers }: SellersStatsProps) {
  // Simulated stats
  const totalUsers = sellers.length * 15 + 120; // Just some fake math based on sellers
  const newUsersToday = 12;
  const newUsersThisWeek = 45;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-muted-foreground">Across all resellers</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{newUsersToday}</div>
          <p className="text-xs text-muted-foreground">+10% from yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            New Users This Week
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{newUsersThisWeek}</div>
          <p className="text-xs text-muted-foreground">+5% from last week</p>
        </CardContent>
      </Card>
    </div>
  );
}
