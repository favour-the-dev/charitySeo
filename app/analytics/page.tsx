import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AnalyticsCharts } from "@/components/analytics/analytics-charts";

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
        <AnalyticsCharts />
      </div>
    </DashboardLayout>
  );
}
