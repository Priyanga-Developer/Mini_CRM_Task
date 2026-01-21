import { useMemo, useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Lead, LeadStatus } from '@/types/lead';
import type { UseLeadTableColumnsProps } from '@/types/dashboard';
import  { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { StatusSelectCell } from './StatusSelectCell';
import type { MouseEvent } from 'react';

export function useLeadTableColumns({
  updatingLeadId,
  onStatusChange,
}: UseLeadTableColumnsProps) {
  const handleStatusChange = useCallback(
    (e: MouseEvent, leadId: string, status: LeadStatus) => {
      e.stopPropagation();
      console.log('Status change requested for leadId:', leadId, 'to status:', status);
      onStatusChange(leadId, status);
    },
    [onStatusChange]
  );

  return useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 hover:bg-transparent"
          >
            Lead Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.name}</div>
            {row.original.company && (
              <div className="text-sm text-muted-foreground">{row.original.company}</div>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.email}</span>
        ),
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.phone}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusSelectCell
            lead={row.original}
            isUpdating={updatingLeadId === row.original.id}
            onStatusChange={handleStatusChange}
          />
        ),
        filterFn: (row, _, filterValue) => {
          if (filterValue === 'all') return true;
          return row.original.status === filterValue;
        },
      },
      {
        accessorKey: 'assignedAgent',
        header: 'Assigned Agent',
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.assignedAgent}</span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 hover:bg-transparent"
          >
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {format(new Date(row.original.createdAt), 'MMM d, yyyy')}
          </span>
        ),
        sortingFn: 'datetime',
      },
    ],
    [updatingLeadId, handleStatusChange]
  );
}
