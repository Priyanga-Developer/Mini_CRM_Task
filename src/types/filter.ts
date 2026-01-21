/**
 * Generic Filter Component Types
 * Reusable search and filter controls for any list view
 */

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  type: 'search' | 'select' | 'date';
  label?: string;
  placeholder?: string;
  options?: FilterOption[];
}

export interface FilterBarProps {
  filters: Record<string, string | number | boolean>;
  onFiltersChange: (filters: Record<string, string | number | boolean>) => void;
  config: FilterConfig[];
}
