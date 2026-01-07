"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";
import { CreateTeamMemberModal } from "@/components/workspaces/create-team-member-modal";
import { EditWorkspaceModal } from "@/components/workspaces/edit-workspace-modal";
import { EditTeamMemberModal } from "@/components/workspaces/edit-team-member-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Edit, Trash2, Loader2 } from "lucide-react";
import { Workspace } from "@/services/Workspace";
import { TeamMemberType } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/lib/user-store";
import UserService from "@/services/User";

export default function SettingsPageComponent() {
  const searchParams = useSearchParams();
  const activeTabState = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(activeTabState);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Edit/Delete State
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null
  );
  const [deletingWorkspace, setDeletingWorkspace] = useState<Workspace | null>(
    null
  );
  const [editingTeamMember, setEditingTeamMember] =
    useState<TeamMemberType | null>(null);
  const [deletingTeamMember, setDeletingTeamMember] =
    useState<TeamMemberType | null>(null);

  const {
    workspaces,
    teamMembers,
    fetchWorkspaces,
    fetchTeamMembers,
    deleteWorkspace,
    deleteTeamMember,
    isLoading,
  } = useWorkspaceStore();

  const { user, updateUser } = useUserStore();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isConfirmNameOpen, setIsConfirmNameOpen] = useState(false);
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [isConfirmPasswordOpen, setIsConfirmPasswordOpen] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
    fetchTeamMembers();
  }, [fetchWorkspaces, fetchTeamMembers]);

  useEffect(() => {
    setFullName(
      user ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() : ""
    );
    setEmail(user?.email ?? "");
  }, [user]);

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");

  useEffect(() => {
    if (workspaces.length > 0 && !selectedWorkspaceId) {
      setSelectedWorkspaceId(String(workspaces[0].id));
    }
  }, [workspaces, selectedWorkspaceId]);

  // Password Change State
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const openConfirmName = () => {
    const next = fullName.trim();
    if (!next) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsConfirmNameOpen(true);
  };

  const handleConfirmNameUpdate = async () => {
    const next = fullName.trim();
    if (!next) {
      toast.error("Name cannot be empty");
      return;
    }

    const parts = next.split(/\s+/).filter(Boolean);
    const nextFirstName = parts[0] ?? "";
    const nextLastName =
      parts.length > 1 ? parts.slice(1).join(" ") : user?.last_name ?? "";

    setIsUpdatingName(true);
    try {
      const res = await UserService.UpdateUserName({
        first_name: nextFirstName,
        last_name: nextLastName,
      });

      // Keep local state and store in sync
      updateUser({
        first_name: res.user?.first_name ?? nextFirstName,
        last_name: res.user?.last_name ?? nextLastName,
      });
      setFullName(
        `${res.user?.first_name ?? nextFirstName} ${
          res.user?.last_name ?? nextLastName
        }`.trim()
      );

      toast.success(res.message || "Profile updated successfully");
      setIsConfirmNameOpen(false);
    } catch (error) {
      toast.error("Failed to update name");
    } finally {
      setIsUpdatingName(false);
    }
  };

  const openConfirmPassword = () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!newPassword) {
      toast.error("Password cannot be empty");
      return;
    }
    setIsConfirmPasswordOpen(true);
  };

  const handleConfirmPasswordUpdate = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!newPassword) {
      toast.error("Password cannot be empty");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await UserService.UpdateUserPassword({
        password: newPassword,
        password_confirmation: confirmNewPassword,
      });

      toast.success(res.message || "Password updated successfully");
      setIsConfirmPasswordOpen(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  const handleDeleteWorkspace = async () => {
    if (!deletingWorkspace) return;
    try {
      await deleteWorkspace(deletingWorkspace.id);
      toast.success("Workspace deleted successfully");
      setDeletingWorkspace(null);
    } catch (error) {
      toast.error("Failed to delete workspace");
    }
  };

  const handleDeleteTeamMember = async () => {
    if (!deletingTeamMember) return;
    try {
      await deleteTeamMember(deletingTeamMember.id);
      toast.success("Team member deleted successfully");
      setDeletingTeamMember(null);
    } catch (error) {
      toast.error("Failed to delete team member");
    }
  };
  const selectedWorkspace =
    workspaces.find((w) => String(w.id) === selectedWorkspaceId) ||
    workspaces[0];

  const getWorkspaceMembers = (workspaceId: number) => {
    return teamMembers.filter((m) =>
      m.all_user_workspaces?.some((ws) => ws.work_space_id === workspaceId)
    );
  };

  const currentWorkspaceMembers = selectedWorkspace
    ? getWorkspaceMembers(selectedWorkspace.id)
    : [];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="w-full h-full grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-center">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="team-members">Team Members</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and email address.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    defaultValue={user?.parsed_role || user?.role || ""}
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={openConfirmName} disabled={isUpdatingName}>
                  {isUpdatingName ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="workspaces" className="space-y-4">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Workspace
              </Button>
              {/* <Button
                variant="outline"
                onClick={() => setIsAddMemberOpen(true)}
              >
                <Users className="mr-2 h-4 w-4" />
                Add Team Member
              </Button> */}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workspaces.map((workspace) => {
                  const members = getWorkspaceMembers(workspace.id);
                  return (
                    <Card key={workspace.id} className="flex flex-col">
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={workspace.logo || ""}
                            alt={workspace.name}
                          />
                          <AvatarFallback>
                            {workspace.name &&
                              workspace.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <CardTitle className="text-lg">
                            {workspace.name}
                          </CardTitle>
                          <CardDescription>
                            {members.length} Members
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground uppercase font-semibold">
                            Team Members
                          </Label>
                          {members.length > 0 ? (
                            <div className="space-y-2">
                              {members.slice(0, 3).map((member) => (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-[10px]">
                                        {member.first_name[0]}
                                        {member.last_name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>
                                      {member.first_name} {member.last_name}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {member.role}
                                  </span>
                                </div>
                              ))}
                              {members.length > 3 && (
                                <p className="text-xs text-muted-foreground pt-1">
                                  +{members.length - 3} more members
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">
                              No members yet
                            </p>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 text-sm"
                          onClick={() => setEditingWorkspace(workspace)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => setDeletingWorkspace(workspace)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="password" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={openConfirmPassword}
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="team-members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage members within a specific workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-[300px]">
                    <Label htmlFor="workspace-select" className="mb-2 block">
                      Select Workspace
                    </Label>
                    <Select
                      value={selectedWorkspaceId}
                      onValueChange={setSelectedWorkspaceId}
                    >
                      <SelectTrigger id="workspace-select">
                        <SelectValue placeholder="Select a workspace" />
                      </SelectTrigger>
                      <SelectContent>
                        {workspaces.map((ws) => (
                          <SelectItem key={ws.id} value={String(ws.id)}>
                            {ws.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsAddMemberOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>

                <div className="rounded-md border">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentWorkspaceMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {member.first_name[0]}
                                    {member.last_name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                {member.first_name} {member.last_name}
                              </div>
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingTeamMember(member)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setDeletingTeamMember(member)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {currentWorkspaceMembers.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center h-24 text-muted-foreground"
                            >
                              No members found in this workspace.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateWorkspaceModal
        open={isCreateWorkspaceOpen}
        onOpenChange={setIsCreateWorkspaceOpen}
      />

      <CreateTeamMemberModal
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
      />

      <EditWorkspaceModal
        open={!!editingWorkspace}
        onOpenChange={(open) => !open && setEditingWorkspace(null)}
        workspace={editingWorkspace}
      />

      <EditTeamMemberModal
        open={!!editingTeamMember}
        onOpenChange={(open) => !open && setEditingTeamMember(null)}
        member={editingTeamMember}
      />

      <ConfirmDialog
        open={!!deletingWorkspace}
        onOpenChange={(open) => !open && setDeletingWorkspace(null)}
        title="Delete Workspace"
        description={`Are you sure you want to delete "${deletingWorkspace?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteWorkspace}
      />

      <ConfirmDialog
        open={!!deletingTeamMember}
        onOpenChange={(open) => !open && setDeletingTeamMember(null)}
        title="Delete Team Member"
        description={`Are you sure you want to delete "${deletingTeamMember?.first_name} ${deletingTeamMember?.last_name}"? This action cannot be undone.`}
        onConfirm={handleDeleteTeamMember}
      />

      <ConfirmDialog
        open={isConfirmNameOpen}
        onOpenChange={setIsConfirmNameOpen}
        title="Confirm Profile Update"
        description={`Are you sure you want to update your name to "${fullName.trim()}"?`}
        onConfirm={handleConfirmNameUpdate}
        isLoading={isUpdatingName}
        confirmText="Update Name"
        confirmVariant="default"
        loadingText="Updating..."
      />

      <ConfirmDialog
        open={isConfirmPasswordOpen}
        onOpenChange={setIsConfirmPasswordOpen}
        title="Confirm Password Update"
        description="Are you sure you want to update your password?"
        onConfirm={handleConfirmPasswordUpdate}
        isLoading={isUpdatingPassword}
        confirmText="Update Password"
        confirmVariant="default"
        loadingText="Updating..."
      />
    </DashboardLayout>
  );
}
