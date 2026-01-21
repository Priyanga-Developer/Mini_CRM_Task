/**
 * Component Types Index
 * Central export point for all component-related types
 * 
 * Import structure:
 * - Dashboard: @/types/dashboard
 * - Tables: @/types/table
 * - KPI: @/types/kpi
 * - Filters: @/types/filter
 */

// Dashboard component types
export type {
  LeadTableProps,
  LeadTableFiltersProps,
  LeadFilters,
  StatusSelectCellProps,
  UseLeadTableColumnsProps,
  LeadDrawerProps,
  CreateLeadModalProps,
  FormErrors,
  KPICardsProps,
  KPIData,
} from './dashboard';

// Generic table component types
export type {
  DataTableFilters,
  DataTableProps,
  DataTablePaginationProps,
  TablePaginationControlsProps,
} from './table';

// Generic KPI component types
export type { KPIVariant, KPICardProps, KPIItem, KPIGridProps } from './kpi';

// Generic filter component types
export type { FilterOption, FilterConfig, FilterBarProps } from './filter';
