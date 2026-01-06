"use client";

import { useWorkspaceStore } from "@/lib/workspace-store";
import { Loader2 } from "lucide-react";

export function GlobalLoader() {
  const { isLoading } = useWorkspaceStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
