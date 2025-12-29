"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReviewsStore } from "@/lib/store";
import { Review, ReviewStatus } from "@/lib/mock-data";
import { ReviewDialog } from "./review-dialog";
import { Star, Search, Filter } from "lucide-react";

export function ReviewsTable() {
  const {
    getFilteredReviews,
    setFilterStatus,
    setFilterRating,
    setSearchQuery,
    filterStatus,
    filterRating,
  } = useReviewsStore();

  const reviews = getFilteredReviews();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowClick = (review: Review) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case "new":
        return "default";
      case "responded":
        return "secondary";
      case "archived":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              className="pl-8 w-full sm:w-[250px]"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filterStatus}
              onValueChange={(val) =>
                setFilterStatus(val as ReviewStatus | "all")
              }
            >
              <SelectTrigger className="w-[140px] sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterRating.toString()}
              onValueChange={(val) =>
                setFilterRating(val === "all" ? "all" : parseInt(val))
              }
            >
              <SelectTrigger className="w-[140px] sm:w-[150px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="w-[400px]">Review</TableHead>
              <TableHead className="hidden md:table-cell">Platform</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow
                  key={review.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(review)}
                >
                  <TableCell className="font-medium">
                    {review.customerName}
                    {review.customerEmail && (
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {review.customerEmail}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {review.rating}
                    </div>
                  </TableCell>
                  <TableCell className="truncate max-w-[200px] sm:max-w-[400px]">
                    {review.content}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {review.platform}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(review.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(review.status)}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ReviewDialog
        review={selectedReview}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
