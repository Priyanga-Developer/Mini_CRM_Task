import { Badge } from '@/components/ui/badge';
import type { LeadStatus } from '@/types/lead';
import type { StatusBadgeProps } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-status-new text-status-new-foreground',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-status-contacted text-status-contacted-foreground',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-status-qualified text-status-qualified-foreground',
  },
  lost: {
    label: 'Lost',
    className: 'bg-status-lost text-status-lost-foreground',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      className={cn(
        'rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
