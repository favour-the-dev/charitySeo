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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspaceStore, Role } from "@/lib/workspace-store";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateTeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTeamMemberModal({
  open,
  onOpenChange,
}: CreateTeamMemberModalProps) {
  const { workspaces, createTeamMember } = useWorkspaceStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("team_member");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedWorkspaces, setSelectedWorkspaces] = useState<number[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    // if (password.length < 8) {
    //   toast.error("Password must be at least 8 characters long");
    //   return;
    // }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (selectedWorkspaces.length === 0) {
      toast.error("Please select at least one workspace");
      return;
    }

    const res = await createTeamMember({
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      password,
      user_access: selectedWorkspaces.map((id) => ({ id, has_access: true })),
    });

    console.log("res", res);

    // if (res.status === "success") {
    //   toast.success("Team member added successfully");
    // } else {
    //   toast.error(`${res.message}`);
    // }
    if (res.status === "error" && res.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        toast.error(`${field}: ${messages.join(", ")}`);
      });

      onOpenChange(true);
    } else if (res.status === "success") {
      onOpenChange(false);
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("team_member");
      setPassword("");
      setConfirmPassword("");
      setSelectedWorkspaces([]);
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
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as Role)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team_member">Client</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Workspace Assignment</Label>
            <div className="border rounded-md p-4 space-y-2 max-h-[150px] overflow-y-auto">
              {workspaces.map((ws) => (
                <div key={ws.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ws-${ws.id}`}
                    checked={selectedWorkspaces.includes(ws.id)}
                    onCheckedChange={() => toggleWorkspace(ws.id)}
                  />
                  <Label htmlFor={`ws-${ws.id}`}>{ws.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
