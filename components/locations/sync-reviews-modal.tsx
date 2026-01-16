import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { listingDataType } from "@/types/types";
import { useState } from "react";
import ReviewService from "@/services/review";
import { toast } from "react-hot-toast";
import { Loader2, MessageSquare } from "lucide-react";

interface SyncReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: listingDataType;
}

export function SyncReviewsModal({
  isOpen,
  onClose,
  listing,
}: SyncReviewsModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      await ReviewService.syncReviewwithLocationId(listing.location_id);
      toast.success("Reviews synced successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync reviews");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync Reviews</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
            <MessageSquare className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p>Are you sure you want to sync reviews for this listing?</p>
              <p>
                This will fetch the latest reviews from{" "}
                <strong>{listing.platform}</strong> to your dashboard.
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Listing:</strong> {listing.name}
            </p>
            <p>
              <strong>Platform:</strong> {listing.platform}
            </p>
            <p>
              <strong>Current Rating:</strong>{" "}
              {listing.attributes.overall_star_rating} (
              {listing.attributes.rating_count} reviews)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSync} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              "Confirm Sync"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
