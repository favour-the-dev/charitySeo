import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ReviewsTable } from "@/components/reviews/reviews-table";

export default function ReviewsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage and respond to all your customer reviews.
          </p>
        </div>
        <ReviewsTable />
      </div>
    </DashboardLayout>
  );
}
