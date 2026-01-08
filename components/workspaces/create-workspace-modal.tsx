"use client";
import { useState } from "react";
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
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
interface CreateWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceModal({
  open,
  onOpenChange,
}: CreateWorkspaceModalProps) {
  const { isLoading, createWorkspace, fetchWorkspaces } = useWorkspaceStore();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [isDefaultState, setIsDefaultState] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("Name and Slug are required");
      return;
    }

    try {
      const res = await createWorkspace({
        name,
        slug,
        is_default: isDefaultState ? 1 : 0,
        logo: logo || undefined,
      });
      if (res.status === "success" && res.workspace) {
        onOpenChange(false);
        setName("");
        setSlug("");
        setLogo(null);
        setIsDefaultState(false);
        await fetchWorkspaces();
      }
      toast.success(`${res.message}`);
    } catch (error: AxiosError | any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to create workspace. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Workspace Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Agency"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Workspace Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. my-agency"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="logo">Workspace Logo (Optional)</Label>
            <Input
              id="logo"
              type="file"
              onChange={(e) =>
                setLogo(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="default"
              checked={isDefaultState}
              onCheckedChange={(checked) =>
                setIsDefaultState(checked as boolean)
              }
            />
            <Label htmlFor="default">Set as default workspace</Label>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isLoading ? "Creating Workspace..." : "Create Workspace"}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
