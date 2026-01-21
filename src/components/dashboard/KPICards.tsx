import type { KPICardsProps } from '@/types/dashboard';
import type { KPIItem } from '@/types/kpi';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import { KPIGrid } from '@/components/kpi/KPIGrid';

export function KPICards({ data, isLoading }: KPICardsProps) {
  const kpiItems: KPIItem[] = [
    {
      id: 'total-leads',
      title: 'Total Leads',
      value: data.totalLeads,
      icon: <Users className="h-6 w-6" />,
      variant: 'primary',
    },
    {
      id: 'new-leads',
      title: 'New This Month',
      value: data.newLeads,
      icon: <UserPlus className="h-6 w-6" />,
      variant: 'info',
    },
    {
      id: 'qualified-leads',
      title: 'Qualified',
      value: data.qualifiedLeads,
      icon: <UserCheck className="h-6 w-6" />,
      variant: 'success',
    },
    {
      id: 'lost-leads',
      title: 'Lost',
      value: data.lostLeads,
      icon: <UserX className="h-6 w-6" />,
      variant: 'danger',
    },
  ];

  return <KPIGrid items={kpiItems} isLoading={isLoading} columns={4} />;
}
