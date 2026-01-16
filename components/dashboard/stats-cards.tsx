"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { Star, MessageSquare, CheckCircle, Clock, Loader2 } from "lucide-react";
import ReviewService from "@/services/review";
import { ReviewsDataType } from "@/types/types";

export function StatsCards() {
  const { activeWorkspaceId } = useWorkspaceStore();
  const [reviews, setReviews] = useState<ReviewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      if (!activeWorkspaceId) return;
      setIsLoading(true);
      try {
        const response = await ReviewService.getAllReviewsInWorkspace();
        setReviews(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews for stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [activeWorkspaceId]);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const respondedCount = reviews.filter((r) => r.response !== null).length;
  const pendingCount = reviews.filter((r) => r.response === null).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">{totalReviews}</div>
          )}
          <p className="text-xs text-muted-foreground">Lifetime reviews</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">{averageRating}</div>
          )}
          <p className="text-xs text-muted-foreground">
            Based on {totalReviews} reviews
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Responded</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">{respondedCount}</div>
          )}
          <p className="text-xs text-muted-foreground">Replied reviews</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">{pendingCount}</div>
          )}
          <p className="text-xs text-muted-foreground">Requires attention</p>
        </CardContent>
      </Card>
    </div>
  );
}
