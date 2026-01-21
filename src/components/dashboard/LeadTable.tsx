import { useMemo, useState } from 'react';
import type {  LeadFilters } from '@/types/lead';
import type { LeadTableProps } from '@/types/dashboard';
import { LeadTableFilters } from './LeadTableFilters';
import { useLeadTableColumns } from './useLeadTableColumns';
import { DataTable } from '@/components/tables/DataTable';

export function LeadTable({
  leads,
  isLoading,
  onRowClick,
  onStatusChange,
  updatingLeadId,
}: LeadTableProps) {
  const [filters, setFilters] = useState<LeadFilters>({ status: 'all', search: '' });

  const columns = useLeadTableColumns({
    updatingLeadId,
    onStatusChange,
  });

  const filteredData = useMemo(() => {
    let result = leads;

    if (filters.status && filters.status !== 'all') {
      result = result.filter((lead) => lead.status === filters.status);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search) ||
          lead.email.toLowerCase().includes(search)
      );
    }

    return result;
  }, [leads, filters]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4">
        <LeadTableFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        onRowClick={onRowClick}
        emptyStateMessage="No leads found"
        pageSize={10}
      />
    </div>
  );
}
