import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsForm } from "@/components/settings/settings-form";

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
        <SettingsForm />
      </div>
    </DashboardLayout>
  );
}
