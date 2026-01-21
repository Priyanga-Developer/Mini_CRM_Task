export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  assignedAgent: string;
  createdAt: Date;
  company?: string;
  notes?: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'created' | 'status_updated' | 'agent_assigned' | 'note_added';
  description: string;
  timestamp: Date;
  metadata?: Record<string, string>;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  assignedAgent: string;
  status: LeadStatus;
  company?: string;
  notes?: string;
}

export interface LeadFilters {
  status?: LeadStatus | 'all';
  search?: string;
}

export interface KPIData {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  lostLeads: number;
}
