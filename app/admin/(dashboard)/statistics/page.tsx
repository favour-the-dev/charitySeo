import { StatisticsCards } from "@/components/admin/statistics/statistics-cards";

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
      </div>
      <StatisticsCards />
    </div>
  );
}
