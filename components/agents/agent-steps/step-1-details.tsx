"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export function Step1Details() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Create a New AI Agent</h2>
        <p className="text-sm text-muted-foreground">
          Basic identification (internal use only)
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Agent Icon (optional)</Label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPEG, GIF (max 2MB)
            </p>
            <p className="text-xs text-muted-foreground">
              Min: 64x64, Recommended: 512x512
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Agent Name (required)</Label>
          <Input id="name" placeholder="e.g. Support Bot Alpha" />
          <p className="text-xs text-muted-foreground">
            Short internal identifier
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Agent Description (optional)</Label>
          <Textarea
            id="description"
            placeholder="Short description of brand or location group"
          />
        </div>
      </div>
    </div>
  );
}
