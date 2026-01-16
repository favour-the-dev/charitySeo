"use client";
import type { CSSProperties } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export type AnalyticsChartsProps = {
  isLoading?: boolean;
  reviewsByPlatform: {
    name: string;
    reviews: number;
    averageRating?: number;
  }[];
  ratingDistribution: { name: string; value: number }[];
  listingsByPlatform: { name: string; value: number; color?: string }[];
  listingsByStatus: { name: string; value: number }[];
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const DEFAULT_PLATFORM_COLORS = CHART_COLORS;

function gradientId(prefix: string, index: number) {
  return `${prefix}-grad-${index}`;
}

function getStatusColor(statusName: string) {
  const status = statusName.toLowerCase();
  if (
    status.includes("active") ||
    status.includes("connected") ||
    status.includes("live")
  ) {
    return CHART_COLORS[1];
  }
  if (
    status.includes("inactive") ||
    status.includes("disconnected") ||
    status.includes("paused")
  ) {
    return CHART_COLORS[2];
  }
  if (
    status.includes("pending") ||
    status.includes("review") ||
    status.includes("sync")
  ) {
    return CHART_COLORS[3];
  }
  return CHART_COLORS[0];
}

function tooltipContentStyle(): CSSProperties {
  return {
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
  };
}

export function AnalyticsCharts({
  isLoading,
  reviewsByPlatform,
  ratingDistribution,
  listingsByPlatform,
  listingsByStatus,
}: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Reviews by Platform</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] w-full">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading…
              </div>
            ) : reviewsByPlatform.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reviewsByPlatform}>
                  <defs>
                    {CHART_COLORS.map((color, idx) => (
                      <linearGradient
                        key={gradientId("reviews-platform", idx)}
                        id={gradientId("reviews-platform", idx)}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={color}
                          stopOpacity={0.95}
                        />
                        <stop
                          offset="100%"
                          stopColor={color}
                          stopOpacity={0.65}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={tooltipContentStyle()}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar
                    dataKey="reviews"
                    fill={`url(#${gradientId("reviews-platform", 0)})`}
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  >
                    {reviewsByPlatform.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}-${index}`}
                        fill={`url(#${gradientId(
                          "reviews-platform",
                          index % CHART_COLORS.length
                        )})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading…
              </div>
            ) : ratingDistribution.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingDistribution} layout="vertical">
                  <defs>
                    {CHART_COLORS.map((color, idx) => (
                      <linearGradient
                        key={gradientId("rating", idx)}
                        id={gradientId("rating", idx)}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="0%"
                          stopColor={color}
                          stopOpacity={0.75}
                        />
                        <stop
                          offset="100%"
                          stopColor={color}
                          stopOpacity={0.98}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    className="stroke-muted"
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={70}
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={tooltipContentStyle()}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar
                    dataKey="value"
                    fill={`url(#${gradientId("rating", 0)})`}
                    radius={[0, 4, 4, 0]}
                    barSize={32}
                  >
                    {ratingDistribution.map((entry, index) => {
                      const name = entry.name.toLowerCase();
                      const star = name.includes("5")
                        ? 4
                        : name.includes("4")
                        ? 3
                        : name.includes("3")
                        ? 1
                        : name.includes("2")
                        ? 2
                        : 0;

                      return (
                        <Cell
                          key={`cell-${entry.name}-${index}`}
                          fill={`url(#${gradientId("rating", star)})`}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Listings by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading…
              </div>
            ) : listingsByStatus.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={listingsByStatus}>
                  <defs>
                    {CHART_COLORS.map((color, idx) => (
                      <linearGradient
                        key={gradientId("listing-status", idx)}
                        id={gradientId("listing-status", idx)}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                        <stop
                          offset="100%"
                          stopColor={color}
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={tooltipContentStyle()}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar
                    dataKey="value"
                    fill={`url(#${gradientId("listing-status", 0)})`}
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  >
                    {listingsByStatus.map((entry, index) => {
                      const color = getStatusColor(entry.name);
                      const colorIndex = Math.max(
                        0,
                        CHART_COLORS.findIndex((c) => c === color)
                      );

                      return (
                        <Cell
                          key={`cell-${entry.name}-${index}`}
                          fill={`url(#${gradientId(
                            "listing-status",
                            colorIndex
                          )})`}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Listings by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading…
              </div>
            ) : listingsByPlatform.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={listingsByPlatform}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="var(--background)"
                    strokeWidth={2}
                  >
                    {listingsByPlatform.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.color ??
                          DEFAULT_PLATFORM_COLORS[
                            index % DEFAULT_PLATFORM_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipContentStyle()}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          {listingsByPlatform.length > 0 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {listingsByPlatform.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        entry.color ??
                        DEFAULT_PLATFORM_COLORS[
                          index % DEFAULT_PLATFORM_COLORS.length
                        ],
                    }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
