import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your dashboard preferences.
          </p>
        </div>
        <div className="flex items-center justify-center h-[400px] border rounded-lg border-dashed">
          <p className="text-muted-foreground">Settings coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
