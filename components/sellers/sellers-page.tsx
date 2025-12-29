"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SellersStats } from "./sellers-stats";
import { SellersTable } from "./sellers-table";
import { CreateSellerModal } from "./create-seller-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Seller {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
}

export function SellersPageComponent() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([
    {
      id: "1",
      name: "Alice Smith",
      email: "alice@example.com",
      status: "Active",
    },
    {
      id: "2",
      name: "Bob Jones",
      email: "bob@example.com",
      status: "Inactive",
    },
  ]);

  const addSeller = (seller: Omit<Seller, "id">) => {
    const newSeller = {
      ...seller,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSellers([...sellers, newSeller]);
  };

  const deleteSeller = (id: string) => {
    setSellers(sellers.filter((s) => s.id !== id));
  };

  const updateSeller = (id: string, data: Partial<Seller>) => {
    setSellers(sellers.map((s) => (s.id === id ? { ...s, ...data } : s)));
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

        <SellersStats sellers={sellers} />

        <SellersTable
          sellers={sellers}
          onDelete={deleteSeller}
          onUpdate={updateSeller}
        />

        <CreateSellerModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAddSeller={addSeller}
        />
      </div>
    </DashboardLayout>
  );
}
