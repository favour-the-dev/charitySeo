import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { listingDataType, facebookDataType } from "@/types/types";
import { useState, useEffect } from "react";
import LocationService from "@/services/locations";
import IntegrationService from "@/services/integrations";
import { toast } from "react-hot-toast";
import { AlertTriangle, Info, Loader2 } from "lucide-react";

interface PublishListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: listingDataType;
  onViewDiscrepancy: () => void;
}

export function PublishListingModal({
  isOpen,
  onClose,
  listing,
  onViewDiscrepancy,
}: PublishListingModalProps) {
  const [loading, setLoading] = useState(false);
  const [fetchingCreds, setFetchingCreds] = useState(false);
  const [credentialId, setCredentialId] = useState<string | null>(null);

  // Identify the integration credential for this listing
  useEffect(() => {
    if (isOpen && listing) {
      const findCredential = async () => {
        setFetchingCreds(true);
        try {
          const res = await IntegrationService.getUserIntegrations();
          // Assuming we currently handle Facebook. Expand logic for other platforms as needed.
          if (
            listing.platform.toLowerCase() === "facebook" &&
            res.facebook_data
          ) {
            const matchedCred = res.facebook_data.find(
              (creds) => creds.metadata?.page_id === listing.externalId
            );

            if (matchedCred) {
              setCredentialId(matchedCred.id.toString());
            } else {
              // If not found by ID, maybe we just pick the first one or ask user?
              // For now, if no credential found, we can't publish.
              console.warn(
                "No matching credential found for listing external ID"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching integrations:", error);
        } finally {
          setFetchingCreds(false);
        }
      };

      findCredential();
    }
  }, [isOpen, listing]);

  const handlePublish = async () => {
    // If we couldn't resolve a credential ID, we might need a fallback (e.g. user select).
    // But for this implementation, let's assume valid state or fail.
    if (!credentialId) {
      toast.error(
        "Could not find connected integration credentials for this listing."
      );
      return;
    }

    setLoading(true);
    try {
      await LocationService.publishLocation({
        location_id: listing.location_id,
        platforms: [listing.platform.toLowerCase()],
        platform_credential_id: credentialId,
      });
      toast.success("Listing published successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Listing</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p>
                Are you sure you want to publish the local changes to{" "}
                <strong>{listing.platform}</strong>?
              </p>
              <p>
                This will overwrite the information currently on the platform
                with your local data.
              </p>
            </div>
          </div>

          {listing.has_discrepancies && (
            <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-md">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Discrepancies Detected</p>
                <p>
                  There are differences between your local data and the platform
                  data. It is recommended to review them before publishing.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-amber-800 dark:text-amber-200 underline"
                  onClick={onViewDiscrepancy}
                >
                  View Discrepancies
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={loading || fetchingCreds || !credentialId}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Confirm Publish"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
