import { KPICard } from './KPICard';
import type { KPIGridProps } from '@/types/kpi';

const gridColsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

export function KPIGrid({ items, isLoading, columns = 4 }: KPIGridProps) {
  return (
    <div className={`grid gap-4 ${gridColsMap[columns]}`}>
      {items?.map((item) => (
        <KPICard
          key={item?.id}
          title={item?.title || ''}
          value={item?.value || 0}
          icon={item?.icon}
          variant={item?.variant || 'primary'}
          isLoading={isLoading}
          trend={item?.trend}
          description={item?.description}
        />
      ))}
    </div>
  );
}
