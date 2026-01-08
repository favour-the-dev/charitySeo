"use client";
import { useState, useEffect } from "react";
import { UserStats } from "@/components/admin/user-management/user-stats";
import { UsersTable } from "@/components/admin/user-management/users-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";
import { AddUserModal } from "@/components/admin/user-management/add-user-modal";
import AdminService from "@/services/Admin";
import { getAdminDashboardResponse } from "@/types/types";
import { toast } from "react-hot-toast";

export default function UserManagementPage() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboardData, setDashboardData] =
    useState<getAdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getAdminDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => setIsAddUserModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      {dashboardData && (
        <UserStats
          stats={
            dashboardData.stats || {
              total_users: 0,
              users_today: 0,
              users_this_week: 0,
            }
          }
        />
      )}

      <div className="flex items-center gap-4">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or role..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <UsersTable
        searchQuery={searchQuery}
        users={dashboardData?.users?.data || []}
        onDataChange={fetchDashboardData}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={fetchDashboardData}
      />
    </div>
  );
}
