"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Plus } from "lucide-react";
import { AgentsTable } from "@/components/agents/agents-table";
import { CreateAgentModal } from "@/components/agents/create-agent-modal";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AgentsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">
            Manage AI Agents
          </h2>

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="rounded-xl"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Agent
              </Button>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <AgentsTable searchQuery={searchQuery} />

        <CreateAgentModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>
    </DashboardLayout>
  );
}
