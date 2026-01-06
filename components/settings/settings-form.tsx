"use client";
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

export function SettingsForm() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your dashboard preferences and display settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" defaultValue="Localmator" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" defaultValue="https://app.localmator.com/" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information and password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Update Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive alerts and updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="new-reviews" className="flex flex-col space-y-1">
                <span>New Reviews</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive an email when a new review is posted.
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
                <span className="font-normal leading-snug text-muted-foreground">
                  Get a weekly summary of your review performance.
                </span>
              </Label>
              <Switch id="weekly-digest" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
