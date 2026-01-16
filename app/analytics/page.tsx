"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReviewService from "@/services/review";
import ListingService from "@/services/listings";
import LocationService from "@/services/locations";
import type {
  getListingsStatsResponse,
  getReviewsStatsResponse,
} from "@/types/types";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ReviewsStatsData = getReviewsStatsResponse["data"];
type ListingsStatsData = getListingsStatsResponse["data"];

function titleCase(word: string) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsStats, setReviewsStats] = useState<ReviewsStatsData | null>(
    null
  );
  const [listingsStats, setListingsStats] = useState<ListingsStatsData | null>(
    null
  );
  const [totalLocations, setTotalLocations] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [reviewsRes, listingsRes, locationsRes] =
          await Promise.allSettled([
            ReviewService.getReviewsStats(),
            ListingService.getListingStats(),
            LocationService.getLocations(),
          ]);

        if (cancelled) return;

        if (reviewsRes.status === "fulfilled") {
          setReviewsStats(reviewsRes.value.data ?? null);
        } else {
          setError("Failed to load review stats");
        }

        if (listingsRes.status === "fulfilled") {
          setListingsStats(listingsRes.value.data ?? null);
        } else {
          setError((prev) => prev ?? "Failed to load listing stats");
        }

        if (locationsRes.status === "fulfilled") {
          setTotalLocations(locationsRes.value.data?.length ?? 0);
        } else {
          setError((prev) => prev ?? "Failed to load location stats");
        }
      } catch (e) {
        if (!cancelled) setError("Failed to load analytics");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalReviews = reviewsStats?.total_reviews ?? 0;
  const averageRating = reviewsStats?.average_rating ?? 0;
  const totalListings = listingsStats?.total_listings ?? 0;

  const ratingDistribution = useMemo(() => {
    const dist = reviewsStats?.rating_distribution;
    if (!dist || dist.length === 0)
      return [] as { name: string; value: number }[];
    const normalized = dist.length === 5 ? dist : [0, 0, 0, 0, 0];
    const desc = normalized.slice(0, 5).reverse();

    return [5, 4, 3, 2, 1].map((star, idx) => ({
      name: `${star} Stars`,
      value: desc[idx] ?? 0,
    }));
  }, [reviewsStats]);

  const reviewsByPlatform = useMemo(() => {
    const byPlatform = reviewsStats?.by_platform;
    if (!byPlatform)
      return [] as { name: string; reviews: number; averageRating?: number }[];
    return Object.entries(byPlatform)
      .map(([platform, stats]) => ({
        name: titleCase(platform),
        reviews: stats?.count ?? 0,
        averageRating: stats?.average_rating ?? 0,
      }))
      .sort((a, b) => b.reviews - a.reviews);
  }, [reviewsStats]);

  const listingsByPlatform = useMemo(() => {
    const byPlatform = listingsStats?.by_platform;
    if (!byPlatform)
      return [] as { name: string; value: number; color?: string }[];

    const colors: Record<string, string> = {
      facebook: "var(--chart-1)",
      google: "var(--chart-5)",
      bing: "var(--chart-2)",
    };

    return Object.entries(byPlatform).map(([platform, value]) => ({
      name: titleCase(platform),
      value,
      color: colors[platform],
    }));
  }, [listingsStats]);

  const listingsByStatus = useMemo(() => {
    const byStatus = listingsStats?.by_status;
    if (!byStatus) return [] as { name: string; value: number }[];
    return Object.entries(byStatus).map(([status, value]) => ({
      name: titleCase(status),
      value,
    }));
  }, [listingsStats]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Deep dive into your review performance and customer sentiment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  totalReviews.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all platforms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  averageRating.toFixed(1)
                )}
              </div>
              <p className="text-xs text-muted-foreground">Tenant-wide</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  totalListings.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Connected listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  totalLocations.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">Managed locations</p>
            </CardContent>
          </Card>
        </div>

        {error ? <div className="text-sm text-destructive">{error}</div> : null}

        <AnalyticsCharts
          isLoading={isLoading}
          reviewsByPlatform={reviewsByPlatform}
          ratingDistribution={ratingDistribution}
          listingsByPlatform={listingsByPlatform}
          listingsByStatus={listingsByStatus}
        />
      </div>
    </DashboardLayout>
  );
}
