import  type { Lead } from '@/types/lead';
import  type { TablePaginationControlsProps } from '@/types/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TablePaginationControls({
  table,
  filteredDataLength,
}: TablePaginationControlsProps<Lead>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, filteredDataLength);

  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {filteredDataLength} leads
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
