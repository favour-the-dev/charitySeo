"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export function Step2Content() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Universal Agent Content & Instructions
        </h2>
        <p className="text-sm text-muted-foreground">
          Define the core behavior and knowledge base for your agent.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="instructions">
            Global Instructions (max 4000 characters)
          </Label>
          <Textarea
            id="instructions"
            placeholder="Enter content applied to every prompt..."
            className="min-h-[200px]"
            maxLength={4000}
          />
          <p className="text-xs text-muted-foreground text-right">
            0/4000 characters
          </p>
        </div>

        <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Location Content (optional)</Label>
            <p className="text-sm text-muted-foreground">
              Incorporate location-level listing data into responses.
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}
