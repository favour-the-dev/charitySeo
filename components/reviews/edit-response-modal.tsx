"use client";

import { useEffect, useMemo, useState } from "react";
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
import ReviewService from "@/services/review";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface EditResponseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ReviewsDataType | null;
  onSuccess?: () => void;
}

export function EditResponseModal({
  open,
  onOpenChange,
  review,
  onSuccess,
}: EditResponseModalProps) {
  const existing = useMemo(() => review?.response ?? null, [review]);
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open && existing) {
      setContent(existing.content || "");
    }
  }, [open, existing]);

  if (!review || !existing) return null;

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Response cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      await ReviewService.updateResponseToReview({
        review_id: review.id,
        payload: {
          content,
          status: existing.status || "public",
          ai_generated: !!existing.ai_generated,
        },
      });
      toast.success("Response updated");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to update response: ${(error as Error).message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle>Edit Response</DialogTitle>
          <DialogDescription>
            Update your reply to {review.author_name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-2">
          <label className="text-sm font-medium" htmlFor="edit-response">
            Response
          </label>
          <Textarea
            id="edit-response"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your response..."
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
