"use client";
import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users } from "lucide-react";

export default function SettingsPageComponent() {
  const searchParams = useSearchParams();
  const activeTabState = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(activeTabState);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const { workspaces } = useWorkspaceStore();

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

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
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="admin@charityseo.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Administrator" disabled />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="workspaces" className="space-y-4">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Workspace
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAddMemberOpen(true)}
              >
                <Users className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workspaces.map((workspace) => (
                <Card key={workspace.id} className="flex flex-col">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={workspace.image} alt={workspace.name} />
                      <AvatarFallback>
                        {workspace.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">
                        {workspace.name}
                      </CardTitle>
                      <CardDescription>
                        {workspace.members.length} Members
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase font-semibold">
                        Team Members
                      </Label>
                      {workspace.members.length > 0 ? (
                        <div className="space-y-2">
                          {workspace.members.slice(0, 3).map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-[10px]">
                                    {member.firstName[0]}
                                    {member.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  {member.firstName} {member.lastName}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {member.role}
                              </span>
                            </div>
                          ))}
                          {workspace.members.length > 3 && (
                            <p className="text-xs text-muted-foreground pt-1">
                              +{workspace.members.length - 3} more members
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
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full text-sm">
                      Manage Workspace
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what you want to be notified about.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label
                    htmlFor="new-reviews"
                    className="flex flex-col space-y-1"
                  >
                    <span>New Reviews</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive notifications when a new review is posted.
                    </span>
                  </Label>
                  <Switch id="new-reviews" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label
                    htmlFor="weekly-digest"
                    className="flex flex-col space-y-1"
                  >
                    <span>Weekly Digest</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Get a weekly summary of your review performance.
                    </span>
                  </Label>
                  <Switch id="weekly-digest" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label
                    htmlFor="marketing"
                    className="flex flex-col space-y-1"
                  >
                    <span>Marketing Emails</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive emails about new features and updates.
                    </span>
                  </Label>
                  <Switch id="marketing" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label
                    htmlFor="compact-mode"
                    className="flex flex-col space-y-1"
                  >
                    <span>Compact Mode</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Reduce the spacing between elements.
                    </span>
                  </Label>
                  <Switch id="compact-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
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
    </DashboardLayout>
  );
}
