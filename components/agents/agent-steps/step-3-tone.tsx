"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export function Step3Tone() {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Tone of Voice by Star Rating</h2>
        <p className="text-sm text-muted-foreground">
          Customize how the agent responds to different ratings.
        </p>
      </div>

      <div className="space-y-4 h-[400px] overflow-y-auto pr-2">
        {ratings.map((rating) => (
          <div key={rating} className="space-y-2">
            <Label className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span>{rating}-Star Response</span>
            </Label>
            <Textarea
              placeholder={`Enter response guidelines for ${rating}-star reviews...`}
              maxLength={600}
            />
            <p className="text-xs text-muted-foreground text-right">
              Max 600 chars
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
