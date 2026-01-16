"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewsTable } from "@/components/reviews/reviews-table";
import ReviewService from "@/services/review";
import ListingService from "@/services/listings";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { ReviewsDataType, listingDataType } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { SyncReviewsModal } from "@/components/locations/sync-reviews-modal";

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("all-reviews");
  const { activeWorkspaceId } = useWorkspaceStore();
  // All Reviews State
  const [allReviews, setAllReviews] = useState<ReviewsDataType[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  // Reviews by Location State
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [availableListings, setAvailableListings] = useState<listingDataType[]>(
    []
  );
  const [selectedListingId, setSelectedListingId] = useState<string>("");
  const [locationReviews, setLocationReviews] = useState<ReviewsDataType[]>([]);
  const [loadingLocReviews, setLoadingLocReviews] = useState(false);
  const [isSyncReviewsOpen, setIsSyncReviewsOpen] = useState(false);

  // Fetch all reviews
  useEffect(() => {
    async function fetchAllReviews() {
      if (!activeWorkspaceId) return;
      setLoadingAll(true);
      try {
        const response = await ReviewService.getAllReviewsInWorkspace();
        setAllReviews(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAll(false);
      }
    }

    if (activeTab === "all-reviews") {
      fetchAllReviews();
    } else {
      // Reset state when switching to reviews-by-location
      // setLocationReviews([]);
    }
  }, [activeWorkspaceId, activeTab]);

  const refreshAllReviews = async () => {
    if (!activeWorkspaceId) return;
    setLoadingAll(true);
    try {
      const response = await ReviewService.getAllReviewsInWorkspace();
      setAllReviews(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAll(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "reviews-by-location") {
      setLocationReviews([]);
      setSelectedPlatform("");
      setSelectedListingId("");
      setAvailableListings([]);
    }
  };

  const handlePlatformChange = async (platform: string) => {
    setSelectedPlatform(platform);
    setSelectedListingId("");
    setAvailableListings([]);
    setLocationReviews([]); // Clear table on platform change

    try {
      const response = await ListingService.getAllListings();
      const listings = response.data || [];

      // Filter listings by platform and required attributes
      const filtered = listings.filter((l) => {
        const matchesPlatform =
          l.platform.toLowerCase() === platform.toLowerCase();
        const hasReviews =
          (l.attributes?.overall_star_rating &&
            l.attributes.overall_star_rating > 0) ||
          (l.attributes?.rating_count && l.attributes.rating_count > 0);
        return matchesPlatform && hasReviews;
      });

      setAvailableListings(filtered);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleListingChange = async (listingId: string) => {
    setSelectedListingId(listingId);
    const listing = availableListings.find(
      (l) => l.id.toString() === listingId
    );

    if (listing) {
      setLoadingLocReviews(true);
      try {
        const response = await ReviewService.getreviewsByLocation({
          location_id: listing.location_id,
        });
        setLocationReviews(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLocReviews(false);
      }
    }
  };

  const selectedListing = availableListings.find(
    (l) => l.id.toString() === selectedListingId
  );

  const refreshLocationReviews = async () => {
    if (!selectedListing) return;
    setLoadingLocReviews(true);
    try {
      const response = await ReviewService.getreviewsByLocation({
        location_id: selectedListing.location_id,
      });
      setLocationReviews(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLocReviews(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage and respond to customer reviews across all your locations.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-100 mb-4">
            <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
            <TabsTrigger value="reviews-by-location">
              Reviews by Location
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Workspace Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewsTable
                  reviews={allReviews}
                  isLoading={loadingAll}
                  onRefresh={refreshAllReviews}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews-by-location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filter Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="grid gap-4 w-full sm:w-auto sm:flex-1 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Platform
                      </label>
                      <Select
                        value={selectedPlatform}
                        onValueChange={handlePlatformChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="bing">Bing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Location
                      </label>
                      <Select
                        value={selectedListingId}
                        onValueChange={handleListingChange}
                        disabled={!selectedPlatform}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableListings.map((listing) => (
                            <SelectItem
                              key={listing.id}
                              value={listing.id.toString()}
                            >
                              {listing.name} - {listing.address || "No Address"}
                            </SelectItem>
                          ))}
                          {availableListings.length === 0 &&
                            selectedPlatform && (
                              <SelectItem value="no-listings" disabled>
                                No listings found with reviews
                              </SelectItem>
                            )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={refreshLocationReviews}
                      disabled={!selectedListing || loadingLocReviews}
                      className="w-full sm:w-auto"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSyncReviewsOpen(true)}
                      disabled={!selectedListing}
                      className="w-full sm:w-auto"
                    >
                      Sync Reviews
                    </Button>
                  </div>
                </div>

                <ReviewsTable
                  reviews={locationReviews}
                  isLoading={loadingLocReviews}
                  onRefresh={refreshLocationReviews}
                />
              </CardContent>
            </Card>

            {selectedListing && (
              <SyncReviewsModal
                isOpen={isSyncReviewsOpen}
                onClose={() => setIsSyncReviewsOpen(false)}
                listing={selectedListing}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
