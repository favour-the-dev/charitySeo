"use client";
import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SellersStats } from "./sellers-stats";
import { SellersTable } from "./sellers-table";
import { CreateSellerModal } from "./create-seller-modal";
import { EditSellerModal } from "./edit-seller-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ResellerService, {
  AddResellerPayload,
  UpdateResellerPayload,
  updateResellerPasswordPayload,
} from "@/services/Reseller";
import { User } from "@/types/types";
import { toast } from "react-hot-toast";
import { useWorkspaceStore } from "@/lib/workspace-store";

export function SellersPageComponent() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<User | null>(null);

  const [sellers, setSellers] = useState<User[]>([]);
  // Local loading state for fetching table data to avoid full screen loader flicker
  // Use global loader mainly for blocking actions
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    newUsersThisWeek: 0,
  });

  const {
    isLoading: isGlobalLoading,
    isInitializing: isGlobalInitializing,
    setIsInitializing,
  } = useWorkspaceStore();

  // Manually manage a loading state that syncs with the store logic if needed
  // or just use store's setIsInitializing(true/false) for global blocking
  const setGlobalLoading = (loading: boolean) => {
    setIsInitializing(loading);
  };

  const fetchResellers = useCallback(async () => {
    try {
      if (sellers.length === 0) setIsTableLoading(true);
      const data = await ResellerService.getAllResellers();
      setSellers(data.users);
      setStats({
        totalUsers: data.sumOfUsers,
        newUsersToday: data.sumOfUsersToday,
        newUsersThisWeek: data.sumOfUsersThisWeek,
      });
    } catch (error) {
      toast.error("Failed to fetch resellers");
    } finally {
      setIsTableLoading(false);
    }
  }, []); // Remove sellers.length dependency to avoid loop

  useEffect(() => {
    setGlobalLoading(true);
    fetchResellers().finally(() => setGlobalLoading(false));
  }, [fetchResellers]);

  const addSeller = async (seller: AddResellerPayload) => {
    try {
      setGlobalLoading(true);
      await ResellerService.AddReseller(seller);
      await fetchResellers();
      toast.success("Reseller added successfully");
    } catch (error) {
      toast.error("Failed to add reseller");
    } finally {
      setGlobalLoading(false);
    }
  };

  const deleteSeller = async (id: number) => {
    if (!confirm("Are you sure you want to delete this reseller?")) return;
    try {
      setGlobalLoading(true);
      await ResellerService.DeleteReseller({ id });
      setSellers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Reseller deleted successfully");
      await fetchResellers(); // refresh stats
    } catch (error) {
      toast.error("Failed to delete reseller");
    } finally {
      setGlobalLoading(false);
    }
  };

  const updateSellerDetails = async (data: UpdateResellerPayload) => {
    try {
      setGlobalLoading(true);
      await ResellerService.UpdateReseller(data);
      await fetchResellers();
      toast.success("Reseller details updated");
    } catch (error) {
      toast.error("Failed to update reseller details");
    } finally {
      setGlobalLoading(false);
    }
  };

  const updateSellerPassword = async (data: updateResellerPasswordPayload) => {
    try {
      setGlobalLoading(true);
      await ResellerService.UpdateResellerPassword(data);
      toast.success("Reseller password updated");
    } catch (error) {
      toast.error("Failed to update reseller password");
    } finally {
      setGlobalLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedSeller(user);
    setIsEditModalOpen(true);
  };

  const toggleStatus = async (user: User) => {
    try {
      // Just optimistic update + background api call for simpler UX?
      // Or block? Using global loader here might be too intrusive for a toggle.
      // Let's use local blocking or just background.
      // User asked to use global loader "when update".
      setGlobalLoading(true);

      const newStatus = !user.is_active;
      await ResellerService.UpdateReseller({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_active: newStatus,
      });

      setSellers((prev) =>
        prev.map((s) =>
          s.id === user.id ? { ...s, is_active: newStatus ? 1 : 0 } : s
        )
      );
      toast.success("Reseller status updated");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Resellers</h2>
            <p className="text-muted-foreground">
              Manage your resellers and view their performance.
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Reseller
          </Button>
        </div>

        <SellersStats
          totalUsers={stats.totalUsers}
          newUsersToday={stats.newUsersToday}
          newUsersThisWeek={stats.newUsersThisWeek}
        />

        <SellersTable
          sellers={sellers}
          onDelete={deleteSeller}
          onToggleStatus={toggleStatus}
          onEdit={openEditModal}
        />

        <CreateSellerModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAddSeller={addSeller}
          isLoading={isGlobalInitializing}
        />

        <EditSellerModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          seller={selectedSeller}
          onUpdateDetails={updateSellerDetails}
          onUpdatePassword={updateSellerPassword}
          isLoading={isGlobalInitializing}
        />
      </div>
    </DashboardLayout>
  );
}
