import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            View detailed insights about your reviews and ratings.
          </p>
        </div>
        <div className="flex items-center justify-center h-[400px] border rounded-lg border-dashed">
          <p className="text-muted-foreground">
            Analytics charts coming soon...
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
