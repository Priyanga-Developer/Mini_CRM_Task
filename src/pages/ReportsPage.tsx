import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex min-h-screen items-center justify-center p-4 pt-16 lg:p-8 lg:pt-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            This page is a placeholder. Reporting and analytics features coming soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
