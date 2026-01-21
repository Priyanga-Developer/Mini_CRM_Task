import type { DashboardLayoutProps } from '@/types/dashboard'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-2 ml-0 md:ml-48">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}