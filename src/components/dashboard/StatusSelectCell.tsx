import type { LeadStatus } from '@/types/lead';
import type { StatusSelectCellProps } from '@/types/dashboard';
import { LeadStatusSelect } from './LeadStatusSelect';
import { Loader2 } from 'lucide-react';

export function StatusSelectCell({
  lead,
  isUpdating,
  onStatusChange,
}: StatusSelectCellProps) {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {isUpdating ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Updating...</span>
        </div>
      ) : (
        <LeadStatusSelect
          value={lead.status}
          onChange={(status: LeadStatus) =>
            onStatusChange(
              { stopPropagation: () => {} } as React.MouseEvent,
              lead.id,
              status
            )
          }
          className="w-full"
        />
      )}
    </div>
  );
}
