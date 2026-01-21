/**
 * Generic KPI Component Types
 * Reusable for any metrics (Sales KPIs, Support metrics, Reports, etc.)
 */

export type KPIVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  variant: KPIVariant;
  isLoading?: boolean;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  description?: string;
}

export interface KPIItem {
  id: string;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  variant: KPIVariant;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  description?: string;
}

export interface KPIGridProps {
  items: KPIItem[];
  isLoading?: boolean;
  columns?: 1 | 2 | 3 | 4 | 6;
}
