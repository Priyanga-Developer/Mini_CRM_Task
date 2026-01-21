import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type {  ReactNode } from "react";
import type { Lead, LeadStatus, KPIData } from "@/types/lead";
import { leadsService } from "@/services/leads";
import { toast } from "sonner";

// Context Type
interface LeadsContextType {
  leads: Lead[];
  kpiData: KPIData;
  isLoading: boolean;
  selectedLead: Lead | null;
  isDrawerOpen: boolean;
  isCreateModalOpen: boolean;
  updatingLeadId: string | null;
  fetchLeads: () => Promise<void>;
  handleRowClick: (lead: Lead) => void;
  handleDrawerClose: () => void;
  handleStatusChange: (leadId: string, newStatus: LeadStatus) => Promise<void>;
  handleLeadCreated: () => void;
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

// Create Context
const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

// Provider Props
interface LeadsProviderProps {
  children: ReactNode;
}

// Provider Component
export function LeadsProvider({ children }: LeadsProviderProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [kpiData, setKpiData] = useState<KPIData>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    lostLeads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  /* =======================
     Fetch Leads
  ======================= */
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await leadsService.getLeads();
      setLeads(data);
      setKpiData(leadsService.getKPIData(data));
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  /* =======================
     Row Click
  ======================= */
  const handleRowClick = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedLead(null), 300);
  }, []);

  /* =======================
     Status Change (Optimistic)
  ======================= */
  const handleStatusChange = useCallback(
    async (leadId: string, newStatus: LeadStatus) => {
      const originalLeads = [...leads];
      const originalKpi = { ...kpiData };

      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      );

      setLeads(updatedLeads);
      setKpiData(leadsService.getKPIData(updatedLeads));

      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }

      setUpdatingLeadId(leadId);

      try {
        await leadsService.updateLeadStatus(leadId, newStatus);
        toast.success(`Lead status updated to ${newStatus}`);
      } catch (error) {
        setLeads(originalLeads);
        setKpiData(originalKpi);

        if (selectedLead?.id === leadId) {
          const originalLead = originalLeads.find((l) => l.id === leadId);
          if (originalLead) setSelectedLead(originalLead);
        }

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update lead status"
        );
      } finally {
        setUpdatingLeadId(null);
      }
    },
    [leads, kpiData, selectedLead]
  );

  const handleLeadCreated = useCallback(() => {
    fetchLeads();
  }, [fetchLeads]);

  /* =======================
     Context Value
  ======================= */
  const value: LeadsContextType = {
    leads,
    kpiData,
    isLoading,
    selectedLead,
    isDrawerOpen,
    isCreateModalOpen,
    updatingLeadId,
    fetchLeads,
    handleRowClick,
    handleDrawerClose,
    handleStatusChange,
    handleLeadCreated,
    setIsCreateModalOpen,
  };

  return (
    <LeadsContext.Provider value={value}>
      {children}
    </LeadsContext.Provider>
  );
}

// Custom Hook
export function useLeads() {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
}