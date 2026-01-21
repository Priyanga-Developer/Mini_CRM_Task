import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users } from 'lucide-react';

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <div className="flex min-h-screen items-center justify-center p-4 pt-16 lg:p-8 lg:pt-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Leads & Customers</h1>
          <p className="text-muted-foreground">
            This page is a placeholder. Full lead management functionality is available on the Dashboard.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
