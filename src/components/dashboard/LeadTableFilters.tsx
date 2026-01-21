import type { LeadStatus } from '@/types/lead';
import type { LeadTableFiltersProps } from '@/types/dashboard';
import type { FilterConfig } from '@/types/filter';
import { FilterBar } from '@/components/filters/FilterBar';

export function LeadTableFilters({ filters, onFiltersChange }: LeadTableFiltersProps) {
  const filterConfig: FilterConfig[] = [
    {
      id: 'search',
      type: 'search',
      placeholder: 'Search by name or email...',
    },
    {
      id: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'lost', label: 'Lost' },
      ],
    },
  ];

  const handleFiltersChange = (newFilters: Record<string, string | number | boolean>) => {
    onFiltersChange({
      search: (newFilters.search as string) || '',
      status: (newFilters.status as LeadStatus | 'all') || 'all',
    });
  };

  return (
    <FilterBar
      filters={{
        search: filters.search || '',
        status: filters.status || 'all',
      }}
      onFiltersChange={handleFiltersChange}
      config={filterConfig}
    />
  );
}
