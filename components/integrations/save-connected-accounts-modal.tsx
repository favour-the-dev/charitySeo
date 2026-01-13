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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import IntegrationService from "@/services/integrations";
import { facebookPage } from "@/types/types";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

interface SaveConnectedAccountsModalProps {
  workspaceId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export function SaveConnectedAccountsModal({
  workspaceId,
  open,
  onOpenChange,
  onSaved,
}: SaveConnectedAccountsModalProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pages, setPages] = useState<facebookPage[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && workspaceId) {
      fetchPages();
    }
  }, [open, workspaceId]);

  const fetchPages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await IntegrationService.getConnectedFacebookPages(
        workspaceId
      );
      if (response.pages) {
        setPages(response.pages);
        // Pre-select all by default if desired, or none. Let's select none.
      } else {
        setPages([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load connected pages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePage = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleSave = async () => {
    if (selectedPages.length === 0) {
      toast.error("Please select at least one page to save.");
      return;
    }

    setSaving(true);
    try {
      const pagesToSave = pages.filter((p) => selectedPages.includes(p.id));
      await IntegrationService.saveFacebookPages({ pages: pagesToSave });
      toast.success("Connected accounts saved successfully!");
      onSaved();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save accounts.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Save Connected Accounts</DialogTitle>
          <DialogDescription>
            Select the Facebook Pages you want to connect to your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-6 text-center text-destructive gap-2">
              <AlertCircle className="h-8 w-8" />
              <p>{error}</p>
              <Button variant="outline" size="sm" onClick={fetchPages}>
                Retry
              </Button>
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pages found connected to this Facebook account.
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      id={`page-${page.id}`}
                      checked={selectedPages.includes(page.id)}
                      onCheckedChange={() => handleTogglePage(page.id)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none w-full">
                      <label
                        htmlFor={`page-${page.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {page.name}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {page.category}
                        {page.fan_count !== undefined &&
                          ` • ${page.fan_count} likes`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || loading || pages.length === 0}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Accounts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
