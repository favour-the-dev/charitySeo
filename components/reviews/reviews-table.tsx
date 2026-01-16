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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
  Star,
  MessageSquare,
  Facebook,
  MapPin,
  UploadCloud,
} from "lucide-react";
import { format } from "date-fns";
import { ReviewDialog } from "./review-dialog";
import { ReviewsDataType } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import ReviewService from "@/services/review";
import { toast } from "react-hot-toast";
import { EditResponseModal } from "./edit-response-modal";

interface ReviewsTableProps {
  reviews: ReviewsDataType[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export function ReviewsTable({
  reviews,
  isLoading,
  onRefresh,
}: ReviewsTableProps) {
  const [selectedReview, setSelectedReview] = useState<ReviewsDataType | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const getPlatformIcon = (platform: string | undefined) => {
    switch (platform?.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case "google":
        return <MapPin className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleDeleteResponse = async () => {
    if (!selectedReview) return;
    setIsDeleting(true);
    try {
      await ReviewService.deleteResponseToReview(selectedReview.id);
      toast.success("Response deleted successfully");
      setIsDeleteOpen(false);
      onRefresh?.();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete response: ${(error as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePublishResponse = async (review: ReviewsDataType) => {
    if (!review.response) return;
    setIsPublishing(true);
    try {
      await ReviewService.updateResponseToReview({
        review_id: review.id,
        payload: {
          content: review.response.content,
          status: "public",
          ai_generated: !!review.response.ai_generated,
        },
      });
      toast.success("Response published");
      onRefresh?.();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to publish response: ${(error as Error).message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-17.5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading reviews...
                  </div>
                </TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => {
                const hasResponse = !!review.response;
                const isPublished =
                  hasResponse &&
                  ((review.response?.status || "").toLowerCase() === "public" ||
                    !!review.response?.published_at);
                return (
                  <TableRow key={review.id} className="group">
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={review.author_image || ""} />
                            <AvatarFallback>
                              {review.author_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">
                            {review.author_name}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-[320px]">
                          {review.content}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(review.rating)
                                ? "fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {hasResponse ? (
                        <Badge
                          variant="default"
                          className="bg-green-600 text-white hover:bg-green-600"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Responded
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not responded</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {!hasResponse ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : isPublished ? (
                        <Badge
                          variant="default"
                          className="bg-green-600 text-white hover:bg-green-600"
                        >
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not published</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(review.platform)}
                        <span className="capitalize text-sm">
                          {review.platform || "Direct"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(
                        new Date(review.published_at || review.created_at),
                        "MMM d, yyyy"
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isPublishing}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedReview(review);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>

                          {!hasResponse ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedReview(review);
                                setIsDialogOpen(true);
                              }}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Respond
                            </DropdownMenuItem>
                          ) : (
                            <>
                              <DropdownMenuItem
                                disabled={isPublished || isPublishing}
                                onClick={() => {
                                  if (isPublished) return;
                                  handlePublishResponse(review);
                                }}
                              >
                                <UploadCloud className="mr-2 h-4 w-4" />
                                Publish Response
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                disabled={isPublished}
                                onClick={() => {
                                  if (isPublished) return;
                                  setSelectedReview(review);
                                  setIsEditOpen(true);
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Response
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  setSelectedReview(review);
                                  setIsDeleteOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Response
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {selectedReview && (
        <ReviewDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          review={selectedReview}
          onSuccess={onRefresh}
        />
      )}

      <EditResponseModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        review={selectedReview}
        onSuccess={onRefresh}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Response"
        description="Are you sure you want to delete this response? This will remove your reply from the review."
        onConfirm={handleDeleteResponse}
        isLoading={isDeleting}
        confirmText="Delete"
        loadingText="Deleting..."
      />
    </>
  );
}
