import { Link, useRouterState } from '@tanstack/react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leads', label: 'Leads / Customers', icon: Users },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
];

export function AppSidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="h-16 border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">MiniCRM</span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive =
              currentPath === item.path ||
              currentPath.startsWith(`${item.path}/`);

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.path}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Mini CRM Dashboard</p>
          <p className="text-xs text-muted-foreground/70">v1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
