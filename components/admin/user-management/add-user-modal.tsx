"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Member" | "Admin";
  status: "Active" | "Inactive";
  subscriptions: Record<string, "Active" | "Inactive">;
};

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null; // If provided, we are in Edit mode
}

const SUBSCRIPTIONS = [
  "Front End Pro",
  "CharitySEO Unlimited",
  "CharitySEO Sales Converter",
  "CharitySEO Media Studio",
  "CharitySEO 25 Affiliate Offers",
  "CharitySEO Agency",
  "CharitySEO Reseller",
];

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState<
    Partial<User> & { password?: string; confirmPassword?: string }
  >({
    name: "",
    email: "",
    role: "Member",
    status: "Active",
    subscriptions: SUBSCRIPTIONS.reduce(
      (acc, sub) => ({ ...acc, [sub]: "Inactive" }),
      {}
    ),
    password: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving user:", formData);
    onClose();
  };

  const updateSubscription = (sub: string, status: "Active" | "Inactive") => {
    setFormData((prev) => ({
      ...prev,
      subscriptions: {
        ...prev.subscriptions,
        [sub]: status,
      } as Record<string, "Active" | "Inactive">,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add User Account</DialogTitle>
          <DialogDescription>Create a new user account</DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val: "Member" | "Admin") =>
                    setFormData({ ...formData, role: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: "Active" | "Inactive") =>
                    setFormData({ ...formData, status: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 py-4">
            <div className="space-y-4 p-4 h-[300px] overflow-y-auto">
              {SUBSCRIPTIONS.map((sub) => (
                <div
                  key={sub}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <Label className="text-base">{sub}</Label>
                  <Select
                    value={formData.subscriptions?.[sub] || "Inactive"}
                    onValueChange={(val: "Active" | "Inactive") =>
                      updateSubscription(sub, val)
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active" className="text-green-600">
                        Active
                      </SelectItem>
                      <SelectItem
                        value="Inactive"
                        className="text-muted-foreground"
                      >
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
