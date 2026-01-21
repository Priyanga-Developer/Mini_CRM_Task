import { useLeads } from "@/contexts/LeadsContext";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICards } from "@/components/dashboard/KPICards";
import { LeadTable } from "@/components/dashboard/LeadTable";
import { LeadDrawer } from "@/components/dashboard/LeadDrawer";
import { LeadCharts } from "@/components/dashboard/LeadCharts";
import { LeadFunnelAnalytics } from "@/components/dashboard/LeadConversionAnalytics";
import { CreateLeadModal } from "@/components/dashboard/CreateLeadModal";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const {
    leads,
    kpiData,
    isLoading,
    selectedLead,
    isDrawerOpen,
    isCreateModalOpen,
    updatingLeadId,
    handleRowClick,
    handleDrawerClose,
    handleStatusChange,
    handleLeadCreated,
    setIsCreateModalOpen,
  } = useLeads();

  /* =======================
     UI
  ======================= */
  return (
    <DashboardLayout>
      <div className="p-4 pt-16 lg:p-4 lg:pt-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track your leads effectively
            </p>
          </div>

          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <KPICards data={kpiData} isLoading={isLoading} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <LeadCharts leads={leads} />
          <LeadFunnelAnalytics leads={leads} />
        </div>

        {/* Scroll Hint */}
        <div className="mt-6 flex flex-col items-center text-muted-foreground">
          <span className="text-sm">Scroll to view all leads</span>
          <span className="mt-1 animate-bounce text-lg">↓</span>
        </div>

        {/* Lead Table */}
        <div className="mt-10">
          <h2 className="sticky top-0 z-10 mb-4 bg-background py-2 text-lg font-semibold">
            All Leads
          </h2>

          <LeadTable
            leads={leads}
            isLoading={isLoading}
            onRowClick={handleRowClick}
            onStatusChange={handleStatusChange}
            updatingLeadId={updatingLeadId}
          />
        </div>
      </div>

      {/* Drawer */}
      <LeadDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onStatusChange={handleStatusChange}
        isUpdating={updatingLeadId === selectedLead?.id}
      />

      {/* Create Modal */}
      <CreateLeadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleLeadCreated}
      />
    </DashboardLayout>
  );
}