import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AlertTriangle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <DashboardLayout>
      <div className="flex min-h-screen items-center justify-center p-4 pt-16 lg:p-8 lg:pt-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
