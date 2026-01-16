import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ReviewsTable } from "@/components/reviews/reviews-table";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your reviews
            today.
          </p>
        </div>

        <StatsCards />

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold tracking-tight">
            Recent Reviews
          </h3>
          <ReviewsTable reviews={[]} isLoading={false} />
        </div>
      </div>
    </DashboardLayout>
  );
}
