"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Step5Confirmation() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Confirmation</h2>
        <p className="text-sm text-muted-foreground">
          Review your agent details before creating.
        </p>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium border-b pb-2">Agent Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p>Support Bot Alpha</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p>Handles general inquiries and FAQs.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium border-b pb-2">Content Settings</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">
                  Location Content
                </Label>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  Global Instructions
                </Label>
                <p className="truncate">
                  Act as a helpful support assistant...
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium border-b pb-2">Language & Tone</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Language Mode</Label>
                <p>Polylingual</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Temperature</Label>
                <p>0.6</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium border-b pb-2">Tone Configuration</h3>
            <div className="text-sm text-muted-foreground">
              <p>Custom responses configured for 5, 4, 3, 2, 1 star ratings.</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
