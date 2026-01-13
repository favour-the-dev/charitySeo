"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { locationDataDetailsType } from "@/types/types";
import { MapPin, Globe, Phone, Clock, Calendar } from "lucide-react";
import Image from "next/image";

interface ViewLocationModalProps {
  location: locationDataDetailsType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewLocationModal({
  location,
  open,
  onOpenChange,
}: ViewLocationModalProps) {
  if (!location) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{location.name}</DialogTitle>
          <DialogDescription>Location Details</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Main Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Address</p>
                <p className="text-sm text-muted-foreground text-wrap">
                  {location.address}
                  {location.address2 && `, ${location.address2}`}
                  <br />
                  {location.city}, {location.state} {location.postal_code}
                  <br />
                  {location.country}
                </p>
              </div>
            </div>

            {location.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {location.phone}
                  </p>
                </div>
              </div>
            )}

            {location.website && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Website</p>
                  <a
                    href={location.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {location.website}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 relative mt-0.5">
                {/* Placeholder Google Logo */}
                <Image
                  src="/authorized/Google.png"
                  alt="Google"
                  fill
                  className="object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                    (e.currentTarget.style.display = "none")
                  }
                />
              </div>
              <div>
                <p className="font-medium text-sm">Connections</p>
                <p className="text-sm text-muted-foreground">
                  Google (Placeholder)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Created At</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(location.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
