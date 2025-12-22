"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Step4Language() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Agent Languages & Response Variability
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure language settings and creativity levels.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Agent Language Mode</Label>
          <Select defaultValue="polylingual">
            <SelectTrigger>
              <SelectValue placeholder="Select language mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="polylingual">
                Polylingual (Respond in original language)
              </SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label>Response Variability (Temperature)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Higher values make output more random, lower values more
                      deterministic.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm font-medium">0.6</span>
          </div>
          <Slider
            defaultValue={[0.6]}
            max={1.2}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Deterministic (0.0)</span>
            <span>Creative (1.2)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
