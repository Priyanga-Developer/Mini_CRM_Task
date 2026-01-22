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
        <div className='flex justify-between'>
           <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
          
        </header>
           <div className='sticky top-0 z-10 flex items-start  '>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track your leads effectively
            </p>
          </div>
        </div>
       

         

        <main className="flex-1 overflow-y-auto p-6 md:p-2 ml-0 md:ml-48">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}