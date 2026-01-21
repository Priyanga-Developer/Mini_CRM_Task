/**
 * Generic Table Component Types
 * Reusable for any data entity (Leads, Accounts, Opportunities, etc.)
 */

import { ColumnDef, Table } from '@tanstack/react-table';

export interface DataTableFilters {
  [key: string]: string | number | boolean;
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  emptyStateMessage?: string;
  onFiltersChange?: (filters: DataTableFilters) => void;
  currentFilters?: DataTableFilters;
  pageSize?: number;
  getRowId?: (row: TData) => string;
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  filteredDataLength: number;
}

export interface TablePaginationControlsProps<TData> {
  table: Table<TData>;
  filteredDataLength: number;
}
