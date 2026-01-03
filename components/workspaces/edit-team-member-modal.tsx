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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspaceStore, Role } from "@/lib/workspace-store";
import { TeamMember } from "@/services/TeamMember";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface EditTeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember | null;
}

export function EditTeamMemberModal({
  open,
  onOpenChange,
  member,
}: EditTeamMemberModalProps) {
  const { workspaces, updateTeamMember } = useWorkspaceStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Client");
  const [password, setPassword] = useState("");
  const [selectedWorkspaces, setSelectedWorkspaces] = useState<number[]>([]);

  useEffect(() => {
    if (member) {
      setFirstName(member.first_name);
      setLastName(member.last_name);
      setEmail(member.email);
      setRole(member.role);
      // Pre-select workspaces where user has access
      const accessIds =
        member.user_access
          ?.filter((access) => access.has_access)
          .map((access) => access.id) || [];
      setSelectedWorkspaces(accessIds);
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    if (!firstName || !lastName || !email) {
      toast.error("Name and Email are required");
      return;
    }
    if (selectedWorkspaces.length === 0) {
      toast.error("Please select at least one workspace");
      return;
    }

    try {
      await updateTeamMember({
        id: member.id,
        first_name: firstName,
        last_name: lastName,
        email,
        role,
        password: password || undefined, // Only send if provided
        user_access: workspaces.map((ws) => ({
          id: ws.id,
          has_access: selectedWorkspaces.includes(ws.id),
        })),
      });

      toast.success("Team member updated successfully");
      onOpenChange(false);
      setPassword(""); // Clear password field
    } catch (error) {
      toast.error("Failed to update team member");
    }
  };

  const toggleWorkspace = (id: number) => {
    setSelectedWorkspaces((prev) =>
      prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-firstName">First Name</Label>
              <Input
                id="edit-firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-lastName">Last Name</Label>
              <Input
                id="edit-lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-role">Role</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as Role)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Client">Client</SelectItem>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-password">New Password (Optional)</Label>
            <Input
              id="edit-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
            />
          </div>
          <div className="grid gap-2">
            <Label>Workspace Assignment</Label>
            <div className="border rounded-md p-4 space-y-2 max-h-[150px] overflow-y-auto">
              {workspaces.map((ws) => (
                <div key={ws.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-ws-${ws.id}`}
                    checked={selectedWorkspaces.includes(ws.id)}
                    onCheckedChange={() => toggleWorkspace(ws.id)}
                  />
                  <Label htmlFor={`edit-ws-${ws.id}`}>{ws.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
