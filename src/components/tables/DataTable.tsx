import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,

} from '@tanstack/react-table';
import type {
   SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { DataTableProps } from '@/types/table';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataTablePagination } from './DataTablePagination';

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  onRowClick,
  emptyStateMessage = 'No data found',
  pageSize = 10,
  getRowId,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
 
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
    ...(getRowId && { getRowId }),
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="flex h-[400px] items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card shadow-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups?.()?.map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => (
                  <TableHead key={header?.id}>
                    {header?.isPlaceholder
                      ? null
                      : flexRender(header?.column?.columnDef?.header, header?.getContext?.())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel?.()?.rows?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span>{emptyStateMessage}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table?.getRowModel?.()?.rows?.map((row) => (
                <TableRow
                  key={row?.id}
                  onClick={() => onRowClick?.(row?.original)}
                  className={cn(
                    onRowClick && 'cursor-pointer transition-colors hover:bg-muted/50'
                  )}
                >
                  {row?.getVisibleCells?.()?.map((cell) => (
                    <TableCell key={cell?.id}>
                      {flexRender(cell?.column?.columnDef?.cell, cell?.getContext?.())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} filteredDataLength={table.getRowCount()} />
    </div>
  );
}
