import type { Lead, LeadActivity, CreateLeadInput, LeadStatus, KPIData } from '@/types/lead';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random failure simulation (10% chance)
const shouldFail = () => Math.random() < 0.1;

// Mock data
const agents = ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'James Wilson', 'Lisa Anderson'];

const generateMockLeads = (): Lead[] => {
  const statuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost'];
  const companies = ['TechCorp', 'InnovateLabs', 'DataDrive', 'CloudScale', 'WebFlow', 'StartupXYZ', 'GrowthCo', 'ScaleUp Inc'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 60));
    
    return {
      id: `lead-${i + 1}`,
      name: [
        'John Smith', 'Jane Doe', 'Robert Brown', 'Maria Garcia', 'David Lee',
        'Sarah Williams', 'Michael Johnson', 'Jennifer Martinez', 'Christopher Davis', 'Amanda Wilson',
        'Matthew Anderson', 'Ashley Thomas', 'Daniel Jackson', 'Emily White', 'Andrew Harris',
        'Stephanie Martin', 'Joshua Thompson', 'Nicole Garcia', 'Ryan Robinson', 'Megan Clark'
      ][i % 20],
      email: `lead${i + 1}@${companies[i % companies.length].toLowerCase().replace(/\s/g, '')}.com`,
      phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignedAgent: agents[Math.floor(Math.random() * agents.length)],
      createdAt,
      company: companies[i % companies.length],
      notes: i % 3 === 0 ? 'High priority lead from trade show' : undefined,
    };
  });
};

let mockLeads = generateMockLeads();

const generateActivities = (lead: Lead): LeadActivity[] => {
  const activities: LeadActivity[] = [
    {
      id: `activity-${lead.id}-1`,
      leadId: lead.id,
      type: 'created',
      description: 'Lead was created',
      timestamp: lead.createdAt,
    },
  ];

  if (lead.status !== 'new') {
    const statusDate = new Date(lead.createdAt);
    statusDate.setDate(statusDate.getDate() + Math.floor(Math.random() * 5) + 1);
    activities.push({
      id: `activity-${lead.id}-2`,
      leadId: lead.id,
      type: 'status_updated',
      description: `Status updated to ${lead.status}`,
      timestamp: statusDate,
      metadata: { newStatus: lead.status },
    });
  }

  const agentDate = new Date(lead.createdAt);
  agentDate.setHours(agentDate.getHours() + Math.floor(Math.random() * 24));
  activities.push({
    id: `activity-${lead.id}-3`,
    leadId: lead.id,
    type: 'agent_assigned',
    description: `Assigned to ${lead.assignedAgent}`,
    timestamp: agentDate,
    metadata: { agent: lead.assignedAgent },
  });

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const leadsService = {
  async getLeads(): Promise<Lead[]> {
    await delay(800);
    return [...mockLeads];
  },

  async getLead(id: string): Promise<Lead | undefined> {
    await delay(300);
    return mockLeads.find(lead => lead.id === id);
  },

  async getLeadActivities(leadId: string): Promise<LeadActivity[]> {
    await delay(400);
    const lead = mockLeads.find(l => l.id === leadId);
    if (!lead) return [];
    return generateActivities(lead);
  },

  async createLead(input: CreateLeadInput): Promise<Lead> {
    await delay(600);
    
    if (shouldFail()) {
      throw new Error('Failed to create lead. Please try again.');
    }

    // Check for duplicate email
    if (mockLeads.some(lead => lead.email.toLowerCase() === input.email.toLowerCase())) {
      throw new Error('A lead with this email already exists.');
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      ...input,
      createdAt: new Date(),
    };

    mockLeads = [newLead, ...mockLeads];
    return newLead;
  },

  async updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
    await delay(800);
    
    if (shouldFail()) {
      throw new Error('Failed to update lead status. Please try again.');
    }

    const index = mockLeads.findIndex(lead => lead.id === id);
    if (index === -1) {
      throw new Error('Lead not found');
    }

    mockLeads[index] = { ...mockLeads[index], status };
    return mockLeads[index];
  },

  async deleteLead(id: string): Promise<void> {
    await delay(500);
    
    if (shouldFail()) {
      throw new Error('Failed to delete lead. Please try again.');
    }

    mockLeads = mockLeads.filter(lead => lead.id !== id);
  },

  getKPIData(leads: Lead[]): KPIData {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      totalLeads: leads.length,
      newLeads: leads.filter(lead => lead.createdAt >= thisMonth).length,
      qualifiedLeads: leads.filter(lead => lead.status === 'qualified').length,
      lostLeads: leads.filter(lead => lead.status === 'lost').length,
    };
  },

  getAgents(): string[] {
    return [...agents];
  },
};
