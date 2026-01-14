"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import LocationService from "@/services/locations";
import ListingService from "@/services/listings";
import { locationDataDetailsType } from "@/types/types";
import { toast } from "react-hot-toast";

interface SyncLocationModalProps {
  integrationId: string; // e.g. "facebook", "google"
  credentialId?: number; // e.g. Facebook page DB ID
  credentialName?: string; // For display
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function SyncLocationModal({
  integrationId,
  credentialId,
  credentialName,
  open,
  onOpenChange,
  onSuccess,
}: SyncLocationModalProps) {
  const [locations, setLocations] = useState<locationDataDetailsType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (open) {
      fetchLocations();
    }
  }, [open]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await LocationService.getLocations();
      if (res.data) {
        setLocations(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load locations");
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!selectedLocation) return;
    setIsSyncing(true);
    try {
      if (integrationId === "facebook" && credentialId) {
        await ListingService.syncFacebookListings({
          location_id: parseInt(selectedLocation),
          credential_id: credentialId,
        });
      } else {
        await ListingService.syncListByLocation({
          location_id: parseInt(selectedLocation),
          platforms: integrationId,
        });
      }
      toast.success("Sync initiated successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync listing");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync with Location</DialogTitle>
          <DialogDescription>
            {credentialName
              ? `Select a location to sync "${credentialName}" with.`
              : "Select a location to create a listing from this integration."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Location
            </label>
            <Select
              disabled={loading || isSyncing}
              onValueChange={setSelectedLocation}
              value={selectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id.toString()}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSyncing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSync}
            disabled={!selectedLocation || isSyncing}
          >
            {isSyncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sync
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
