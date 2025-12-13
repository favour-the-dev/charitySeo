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
import { Review } from "@/lib/mock-data";
import { useReviewsStore } from "@/lib/store";
import { toast } from "react-hot-toast";
import { Star } from "lucide-react";

interface ReviewDialogProps {
  review: Review | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewDialog({
  review,
  open,
  onOpenChange,
}: ReviewDialogProps) {
  const [response, setResponse] = useState("");
  const respondToReview = useReviewsStore((state) => state.respondToReview);

  if (!review) return null;

  const handleRespond = () => {
    if (!response.trim()) return;
    respondToReview(review.id, response);
    toast.success("Response sent successfully!");
    setResponse("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            Review from {review.customerName} on {review.platform}
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
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm">{review.content}</p>

          {review.status === "responded" && review.response ? (
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                Your Response:
              </p>
              <p className="text-sm">{review.response}</p>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {review.status !== "responded" && (
            <Button onClick={handleRespond}>Send Response</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
