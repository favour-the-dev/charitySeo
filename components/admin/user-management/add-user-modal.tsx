"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AdminService from "@/services/Admin";
import { CreateUserPayload } from "@/types/types";
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
  role: string;
  status: "Active" | "Inactive";
  subscriptions: Record<string, "Active" | "Inactive">;
};

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded?: () => void;
  user?: User | null; // If provided, we are in Edit mode
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

const SUBSCRIPTION_MAPPINGS: Record<
  string,
  keyof CreateUserPayload["subscriptions"]
> = {
  "Front End Pro": "front_end",
  "Localmator Unlimited": "viralgenius_unlimited",
  "Localmator Sales Converter": "viralgenius_sales_converter",
  "Localmator Media Studio": "viralgenius_media_studio",
  "Localmator 25 Affiliate Offers": "viralgenius_affiliate_offer",
  "Localmator Agency": "viralgenius_agency",
  "Localmator Reseller": "reseller",
};

export function AddUserModal({
  isOpen,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(false);

  const createSubDetails = (isActive: boolean) => ({
    status: isActive,
    limit: -1, // Default limit
    start_date: new Date().toISOString(),
    end_date: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(), // 1 year default
    type: "yearly",
  });

  const [formData, setFormData] = useState<CreateUserPayload>({
    first_name: "",
    last_name: "",
    email: "",
    role: "member",
    is_active: true,
    subscriptions: Object.values(SUBSCRIPTION_MAPPINGS).reduce(
      (acc, key) => ({
        ...acc,
        [key]: createSubDetails(false),
      }),
      {} as CreateUserPayload["subscriptions"]
    ),
    password: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Create a clean payload without confirmPassword
      const { ...payload } = formData;

      const response = await AdminService.createUser(payload);

      if (response.status === "success") {
        toast.success("User created successfully");
        if (onUserAdded) onUserAdded();
        onClose();
      } else {
        toast.error(response.message || "Failed to create user");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to create user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = (
    subLabel: string,
    status: "Active" | "Inactive"
  ) => {
    const key = SUBSCRIPTION_MAPPINGS[subLabel];
    if (!key) return;

    setFormData((prev) => ({
      ...prev,
      subscriptions: {
        ...prev.subscriptions,
        [key]: createSubDetails(status === "Active"),
      },
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 py-4">
            <div className="space-y-4 p-4 h-[300px] overflow-y-auto">
              {SUBSCRIPTIONS.map((subLabel) => {
                const key = SUBSCRIPTION_MAPPINGS[subLabel];
                // Accessing using key, but Typescript might complain if key is string.
                // Cast to any or keyof SubscriptionsNew logic is improving.
                // subscription object is mapped by SUBSCRIPTION_MAPPINGS values which are keys of SubscriptionsNew
                const isActive = (formData.subscriptions as any)[key]?.status;

                return (
                  <div
                    key={subLabel}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <Label className="text-base">{subLabel}</Label>
                    <Select
                      value={isActive ? "Active" : "Inactive"}
                      onValueChange={(val: "Active" | "Inactive") =>
                        updateSubscription(subLabel, val)
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
                );
              })}
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
