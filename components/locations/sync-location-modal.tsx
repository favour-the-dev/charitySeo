import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import IntegrationService from "@/services/integrations";
import ListingService from "@/services/listings";
import { locationDataDetailsType, facebookDataType } from "@/types/types";
import { toast } from "react-hot-toast";
import { Loader2, Facebook } from "lucide-react";

interface SyncLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: locationDataDetailsType;
}

export function SyncLocationModal({
  isOpen,
  onClose,
  location,
}: SyncLocationModalProps) {
  const [platform, setPlatform] = useState("facebook");
  const [integrations, setIntegrations] = useState<facebookDataType[]>([]);
  const [loadingIntegrations, setLoadingIntegrations] = useState(false);
  const [selectedCredentialId, setSelectedCredentialId] = useState<string>("");
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchIntegrations = async () => {
        setLoadingIntegrations(true);
        try {
          const res = await IntegrationService.getUserIntegrations();
          if (platform === "facebook" && res.facebook_data) {
            // specific logic for facebook pages
            // Check if res.facebook_data are "pages" or "accounts"?
            // facebookDataType has metadata.page_id. It seems to be pages.
            setIntegrations(res.facebook_data.filter((i) => i.is_active));
          } else {
            setIntegrations([]);
          }
        } catch (error) {
          console.error("Error fetching integrations:", error);
          toast.error("Failed to load integrations");
        } finally {
          setLoadingIntegrations(false);
        }
      };
      fetchIntegrations();
    }
  }, [isOpen, platform]);

  const handleSync = async () => {
    if (!selectedCredentialId) return;

    setSyncing(true);
    try {
      if (platform === "facebook") {
        await ListingService.syncFacebookListings({
          location_id: location.id,
          credential_id: parseInt(selectedCredentialId),
        });
        toast.success("Location synced successfully");
        onClose();
      } else {
        toast.error("Sync not implemented for this platform yet");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync location");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync Location with Integration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                {/* Add other platforms here */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Active Integrations</Label>
            {loadingIntegrations ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : integrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No active integrations found for {platform}.
              </p>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-muted ${
                      selectedCredentialId === integration.id.toString()
                        ? "bg-muted border-primary"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCredentialId(integration.id.toString())
                    }
                  >
                    <div className="flex items-center gap-3">
                      {platform === "facebook" && (
                        <Facebook className="h-4 w-4 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {integration.metadata?.name || "Unknown Page"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {integration.metadata?.page_id}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={syncing}>
            Cancel
          </Button>
          <Button
            onClick={handleSync}
            disabled={!selectedCredentialId || syncing}
          >
            {syncing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              "Sync Location"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
