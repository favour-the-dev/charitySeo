"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { Workspace } from "@/types/types";
import { toast } from "react-hot-toast";

interface EditWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Workspace | null;
}

export function EditWorkspaceModal({
  open,
  onOpenChange,
  workspace,
}: EditWorkspaceModalProps) {
  const updateWorkspace = useWorkspaceStore((state) => state.updateWorkspace);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isDefaultState, setIsDefaultState] = useState(false);

  useEffect(() => {
    if (workspace) {
      setName(workspace.name);
      setSlug(workspace.slug);
      setIsDefaultState(workspace.is_default);
    }
  }, [workspace]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace) return;
    if (!name || !slug) {
      toast.error("Name and Slug are required");
      return;
    }

    try {
      await updateWorkspace({
        id: workspace.id,
        name,
        slug,
        is_default: isDefaultState ? 1 : 0,
      });

      toast.success("Workspace updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update workspace");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Workspace Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Agency"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-slug">Workspace Slug</Label>
            <Input
              id="edit-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. my-agency"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-default"
              checked={isDefaultState}
              onCheckedChange={(checked) =>
                setIsDefaultState(checked as boolean)
              }
            />
            <Label htmlFor="edit-default">Set as default workspace</Label>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
