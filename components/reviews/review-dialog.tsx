"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReviewsDataType } from "@/types/types";
import { toast } from "react-hot-toast";
import { Star, Loader2 } from "lucide-react";
import ReviewService from "@/services/review";

interface ReviewDialogProps {
  review: ReviewsDataType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ReviewDialog({
  review,
  open,
  onOpenChange,
  onSuccess,
}: ReviewDialogProps) {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!review) return null;

  const handleRespond = async () => {
    if (!response.trim()) return;

    setIsSubmitting(true);
    try {
      await ReviewService.respondToReview({
        review_id: review.id,
        payload: {
          content: response,
          status: "public",
          ai_generated: false,
        },
      });
      toast.success("Response sent successfully!");
      onSuccess?.();
      setResponse("");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to send response: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            Review from {review.author_name} on {review.platform}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(
                review.published_at || review.created_at
              ).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm">{review.content}</p>

          {review.response ? (
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                Your Response:
              </p>
              <p className="text-sm">{review.response.content}</p>
            </div>
          ) : (
            <div className="grid gap-2">
              <label htmlFor="response" className="text-sm font-medium">
                Reply to customer
              </label>
              <Textarea
                id="response"
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Close
          </Button>
          {!review.response && (
            <Button onClick={handleRespond} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Response"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
