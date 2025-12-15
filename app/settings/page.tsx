"use client";

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

export default function SettingsPage() {
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

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
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
    </DashboardLayout>
  );
}
