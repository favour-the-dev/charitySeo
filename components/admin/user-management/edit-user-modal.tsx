"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminService from "@/services/Admin";
import { User, udpateUserPayload } from "@/types/types";
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

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated?: () => void;
  user: User | null;
}

const SUBSCRIPTIONS = [
  "Front End Pro",
  "Localmator Unlimited",
  "Localmator Sales Converter",
  "Localmator Media Studio",
  "Localmator 25 Affiliate Offers",
  "Localmator Agency",
  "Localmator Reseller",
];

export function EditUserModal({
  isOpen,
  onClose,
  onUserUpdated,
  user,
}: EditUserModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<Omit<udpateUserPayload, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    role: "member",
    is_active: true,
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        role: user.role || "member",
        is_active: !!user.is_active,
        password: "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    if (formData.password && formData.password) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { ...data } = formData;
      const payload: udpateUserPayload = {
        id: typeof user.id === "string" ? parseInt(user.id) : user.id,
        ...data,
      };

      const response = await AdminService.updateUser(payload);

      if (response.status === "success") {
        toast.success("User updated successfully");
        if (onUserUpdated) onUserUpdated();
        onClose();
      } else {
        toast.error(response.message || "Failed to update user");
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to update user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Account</DialogTitle>
          <DialogDescription>
            Make changes to the user account here.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="password">Update Password</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val: string) =>
                    setFormData({ ...formData, role: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="client_member" disabled>
                      Client
                    </SelectItem>
                    <SelectItem value="team_member" disabled>
                      Manager
                    </SelectItem>
                    <SelectItem value="admin_team_member" disabled>
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.is_active ? "active" : "inactive"}
                  onValueChange={(val: "active" | "inactive") =>
                    setFormData({ ...formData, is_active: val === "active" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 py-4">
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md mb-2 text-sm border border-yellow-200">
              Subscription updates are not supported in this version.
            </div>
            <div className="space-y-4 p-4 h-[300px] overflow-y-auto opacity-50 pointer-events-none">
              {SUBSCRIPTIONS.map((sub) => (
                <div
                  key={sub}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <Label className="text-base">{sub}</Label>
                  <Select value="Inactive" disabled>
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

          <TabsContent value="password" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
