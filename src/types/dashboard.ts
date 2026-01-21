/**
 * Dashboard Component Types
 * Lead management dashboard specific interfaces
 */

import type { ReactNode } from 'react';
import type { Lead, LeadStatus } from './lead';

export interface LeadTableProps {
  leads: Lead[];
  isLoading?: boolean;
  onRowClick: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void; // ✅ FIXED
  updatingLeadId?: string | null;
}

export interface LeadTableFiltersProps {
  filters: LeadFilters;
  onFiltersChange: (filters: LeadFilters) => void;
}

export interface LeadFilters {
  status?: LeadStatus | 'all';
  search?: string;
}

export interface StatusSelectCellProps {
  lead: Lead;
  isUpdating: boolean;
  onStatusChange: (e: React.MouseEvent, leadId: string, status: LeadStatus) => void;
}

export interface UseLeadTableColumnsProps {
  updatingLeadId?: string | null;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}

export interface LeadDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  isUpdating?: boolean;
}

export interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  assignedAgent?: string;
}

export interface KPICardsProps {
  data: KPIData;
  isLoading?: boolean;
}

export interface KPIData {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  lostLeads: number;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}
