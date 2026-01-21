import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import Dashboard from '@/pages/Dashboard';
import LeadsPage from '@/pages/LeadsPage';
import ReportsPage from '@/pages/ReportsPage';
import NotFound from '@/pages/NotFound';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFound,
});

// Dashboard route (index)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

// Leads route
const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leads',
  component: LeadsPage,
});

// Reports route
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports',
  component: ReportsPage,
});

// Route tree
const routeTree = rootRoute.addChildren([indexRoute, leadsRoute, reportsRoute]);

// Create router - using type assertion to work with non-strict mode
export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
} as any);

// Type registration for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
