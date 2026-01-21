import type { LeadStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LeadStatusSelectProps {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
  disabled?: boolean;
  className?: string;
}

export function LeadStatusSelect({
  value,
  onChange,
  disabled = false,
  className,
}: LeadStatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as LeadStatus)}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">
          <StatusBadge status="new" />
        </SelectItem>
        <SelectItem value="contacted">
          <StatusBadge status="contacted" />
        </SelectItem>
        <SelectItem value="qualified">
          <StatusBadge status="qualified" />
        </SelectItem>
        <SelectItem value="lost">
          <StatusBadge status="lost" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
