"use client";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAutomationsStore } from "@/lib/automations-store";
import { toast } from "react-hot-toast";
import { AutomationCenter } from "@/components/automations/automation-center";
import { RuleBuilder } from "@/components/automations/rule-builder";

export default function AutomationsPage() {
  const { automations, addAutomation, toggleAutomation, deleteAutomation } =
    useAutomationsStore();
  const [activeTab, setActiveTab] = useState("center");

  const handleSaveAutomation = (
    automation: Parameters<typeof addAutomation>[0]
  ) => {
    addAutomation(automation);
    toast.success("Automation created successfully");
    setActiveTab("center");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Automations</h2>
          <p className="text-muted-foreground">
            Create and manage automated rules for your workspace.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:max-w-[400px]">
            <TabsTrigger value="center">Automation Center</TabsTrigger>
            <TabsTrigger value="create">Create Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="center" className="mt-6 space-y-6">
            <AutomationCenter
              automations={automations}
              onToggle={toggleAutomation}
              onDelete={deleteAutomation}
              onCreateClick={() => setActiveTab("create")}
            />
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <RuleBuilder
              onSave={handleSaveAutomation}
              onCancel={() => setActiveTab("center")}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
