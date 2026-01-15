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
import { useState, useEffect } from "react";
import LocationService from "@/services/locations";
import { locationDataDetailsType } from "@/types/types";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PublishAllModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublishAllModal({ isOpen, onClose }: PublishAllModalProps) {
  const [locations, setLocations] = useState<locationDataDetailsType[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchLocations = async () => {
        setLoadingLocations(true);
        try {
          const res = await LocationService.getLocations();
          if (res.data) {
            setLocations(res.data);
          }
        } catch (error) {
          console.error("Error fetching locations:", error);
          toast.error("Failed to load locations");
        } finally {
          setLoadingLocations(false);
        }
      };
      fetchLocations();
    }
  }, [isOpen]);

  const handlePublish = async () => {
    if (!selectedLocationId) return;

    setPublishing(true);
    try {
      await LocationService.publishLocationToAllPlatforms({
        location_id: parseInt(selectedLocationId),
      });
      toast.success("Location published to all platforms");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish location");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish to All Platforms</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Select a location to publish. This will update all connected
            platforms with the local data from this location.
          </p>

          <div className="space-y-2">
            <Label>Select Location</Label>
            <Select
              value={selectedLocationId}
              onValueChange={setSelectedLocationId}
              disabled={loadingLocations}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a location..." />
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
          <Button variant="outline" onClick={onClose} disabled={publishing}>
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!selectedLocationId || publishing}
          >
            {publishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish All"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
