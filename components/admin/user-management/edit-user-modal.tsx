"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminService from "@/services/Admin";
import {
  User,
  udpateUserPayload,
  UpdateUserSubscriptionsPayload,
  updateUserPasswordPayload,
} from "@/types/types";
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

const SUBSCRIPTION_MAP = {
  "Front End Pro": "front_end",
  "Localmator Unlimited": "viralgenius_unlimited",
  "Localmator Sales Converter": "viralgenius_sales_converter",
  "Localmator Media Studio": "viralgenius_media_studio",
  "Localmator 25 Affiliate Offers": "viralgenius_affiliate_offer",
  "Localmator Agency": "viralgenius_agency",
  "Localmator Reseller": "reseller",
} as const satisfies Record<string, keyof User["subscriptions"]>;

type SubscriptionLabel = keyof typeof SUBSCRIPTION_MAP;
type SubscriptionKey = keyof User["subscriptions"];

export function EditUserModal({
  isOpen,
  onClose,
  onUserUpdated,
  user,
}: EditUserModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(false);

  const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  const getApiErrorMessage = (error: unknown, fallback: string) => {
    const maybeError = error as {
      response?: { data?: unknown };
      message?: unknown;
    };
    const data = maybeError.response?.data;

    if (
      isRecord(data) &&
      typeof data.message === "string" &&
      data.message.trim()
    ) {
      return data.message;
    }

    if (isRecord(data) && isRecord(data.errors)) {
      const firstKey = Object.keys(data.errors)[0];
      const firstVal = firstKey ? data.errors[firstKey] : undefined;
      if (Array.isArray(firstVal) && typeof firstVal[0] === "string")
        return firstVal[0];
      if (typeof firstVal === "string") return firstVal;
    }

    if (typeof maybeError.message === "string" && maybeError.message.trim()) {
      return maybeError.message;
    }

    return fallback;
  };

  // Form states
  const [formData, setFormData] = useState<Omit<udpateUserPayload, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    role: "member",
    is_active: true,
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [subscriptionData, setSubscriptionData] = useState<
    Partial<Record<SubscriptionKey, boolean>>
  >({});

  useEffect(() => {
    if (isOpen) setActiveTab("details");
    if (user) {
      // 1. Details
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        role: user.role || "member",
        is_active: !!user.is_active,
        password: "",
      });

      // 2. Subscriptions
      // Map user subscriptions to our local state
      const newSubs: Partial<Record<SubscriptionKey, boolean>> = {};
      (Object.keys(SUBSCRIPTION_MAP) as SubscriptionLabel[]).forEach(
        (label) => {
          const key = SUBSCRIPTION_MAP[label];
          const sub = user.subscriptions[key];
          newSubs[key] = !!sub?.status;
        }
      );
      setSubscriptionData(newSubs);

      // 3. Password reset
      setPasswordData({ password: "", confirmPassword: "" });
    }
  }, [user, isOpen]);

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // 1. Update Details
      if (activeTab === "details") {
        const payload: udpateUserPayload = {
          id: user.id,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email,
          role: formData.role,
          is_active: !!formData.is_active,
        };
        const response = await AdminService.updateUser(payload);
        if (response.status === "success") {
          toast.success(
            response.message || "User details updated successfully"
          );
          if (onUserUpdated) onUserUpdated();
          onClose();
          return;
        }
        toast.error(response.message || "Failed to update user details");
        return;
      }

      // 2. Update Subscriptions
      else if (activeTab === "subscriptions") {
        // Construct payload
        // Note: The payload structure in types.ts is nested: { subscriptions: { [key]: { id, status } } }
        // But we only have flat status here. We might need IDs if the API requires them.
        // types.ts says: subscriptions: { front_end: { id: number, status: boolean } ... }
        // We need to try to preserve IDs from the original user object if possible.

        const subsPayload: UpdateUserSubscriptionsPayload["subscriptions"] = {
          front_end: {
            id: Number(user.subscriptions.front_end?.id) || 0,
            status: !!subscriptionData.front_end,
          },
          viralgenius_unlimited: {
            id: Number(user.subscriptions.viralgenius_unlimited?.id) || 0,
            status: !!subscriptionData.viralgenius_unlimited,
          },
          viralgenius_media_studio: {
            id: Number(user.subscriptions.viralgenius_media_studio?.id) || 0,
            status: !!subscriptionData.viralgenius_media_studio,
          },
          reseller: {
            id: Number(user.subscriptions.reseller?.id) || 0,
            status: !!subscriptionData.reseller,
          },
          viralgenius_agency: {
            id: Number(user.subscriptions.viralgenius_agency?.id) || 0,
            status: !!subscriptionData.viralgenius_agency,
          },
          viralgenius_affiliate_offer: {
            id: Number(user.subscriptions.viralgenius_affiliate_offer?.id) || 0,
            status: !!subscriptionData.viralgenius_affiliate_offer,
          },
          viralgenius_sales_converter: {
            id: Number(user.subscriptions.viralgenius_sales_converter?.id) || 0,
            status: !!subscriptionData.viralgenius_sales_converter,
          },
        };

        const payload: UpdateUserSubscriptionsPayload = {
          user_id: user.id,
          subscriptions: subsPayload,
        };

        const res = await AdminService.updateUserSubscriptions(payload);
        if (res.status === "success") {
          toast.success(res.message || "Subscriptions updated successfully");
          if (onUserUpdated) onUserUpdated();
          onClose();
          return;
        }
        toast.error(res.message || "Failed to update subscriptions");
        return;
      }

      // 3. Update Password
      else if (activeTab === "password") {
        if (!passwordData.password) {
          toast.error("Password cannot be empty");
          return;
        }
        if (passwordData.password !== passwordData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const payload: updateUserPasswordPayload = {
          user_id: user.id,
          password: passwordData.password,
          password_confirmation: passwordData.confirmPassword,
        };

        const res = await AdminService.updateUserPassword(payload);
        if (res.status === "success") {
          toast.success(res.message || "Password updated successfully");
          setPasswordData({ password: "", confirmPassword: "" });
          if (onUserUpdated) onUserUpdated();
          onClose();
          return;
        }

        toast.error(res.message || "Failed to update password");
        return;
      }
    } catch (error: unknown) {
      console.error("Error updating user:", error);
      toast.error(getApiErrorMessage(error, "Failed to update user"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
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
            <div className="space-y-4 p-4 h-75 overflow-y-auto">
              {(Object.keys(SUBSCRIPTION_MAP) as SubscriptionLabel[]).map(
                (label) => {
                  const key = SUBSCRIPTION_MAP[label];
                  return (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b pb-2 last:border-0"
                    >
                      <Label className="text-base">{label}</Label>
                      <Select
                        value={subscriptionData[key] ? "Active" : "Inactive"}
                        onValueChange={(val) =>
                          setSubscriptionData((prev) => ({
                            ...prev,
                            [key]: val === "Active",
                          }))
                        }
                      >
                        <SelectTrigger className="w-30">
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
                  );
                }
              )}
            </div>
          </TabsContent>

          <TabsContent value="password" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
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
