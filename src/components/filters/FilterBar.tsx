import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FilterBarProps } from '@/types/filter';

export function FilterBar({ filters, onFiltersChange, config }: FilterBarProps) {
  const handleSearch = (value: string) => {
    const searchConfig = config?.find((c) => c?.type === 'search');
    if (searchConfig) {
      onFiltersChange({ ...filters, [searchConfig?.id]: value });
    }
  };

  const handleSelectChange = (filterId: string, value: string) => {
    onFiltersChange({ ...filters, [filterId]: value });
  };

  const handleClearFilters = () => {
    const clearedFilters: Record<string, string | number | boolean> = {};
    config?.forEach((c) => {
      if (c?.type === 'search') {
        clearedFilters[c?.id] = '';
      } else {
        clearedFilters[c?.id] = c?.options?.[0]?.value || 'all';
      }
    });
    onFiltersChange(clearedFilters);
  };

  const searchConfig = config?.find((c) => c?.type === 'search');
  const selectConfigs = config?.filter((c) => c?.type === 'select') || [];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search Input */}
      {searchConfig && (
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchConfig?.placeholder || 'Search...'}
            value={(filters[searchConfig?.id] as string) || ''}
            onChange={(e) => handleSearch(e?.target?.value || '')}
            className="pl-9"
          />
        </div>
      )}

      {/* Select Filters */}
      <div className="flex items-center gap-2">
        {selectConfigs.length > 0 && (
          <Filter className="h-4 w-4 text-muted-foreground" />
        )}
        {selectConfigs?.map((config) => (
          <Select
            key={config?.id}
            value={(filters[config?.id] as string) || 'all'}
            onValueChange={(value) => handleSelectChange(config?.id, value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={config?.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {config?.label}</SelectItem>
              {config?.options?.map((option) => (
                <SelectItem key={option?.value} value={option?.value || ''}>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {/* Clear Filters Button */}
        {selectConfigs.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
