import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KPICardProps, KPIVariant } from '@/types/kpi';
import { Skeleton } from "@/components/ui/skeleton"

// export function SkeletonDemo() {
//   return (
//     <div className="flex items-center gap-4">
//       <Skeleton className="h-12 w-12 rounded-full" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px]" />
//         <Skeleton className="h-4 w-[200px]" />
//       </div>
//     </div>
//   )
// }



const variantStyles: Record<
  KPIVariant,
  { bg: string; text: string; icon: string }
> = {
  primary: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-900 dark:text-blue-100',
    icon: 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-900 dark:text-green-100',
    icon: 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-900 dark:text-yellow-100',
    icon: 'bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300',
  },
  danger: {
    bg: 'bg-red-50 dark:bg-red-950',
    text: 'text-red-900 dark:text-red-100',
    icon: 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300',
  },
  info: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    text: 'text-purple-900 dark:text-purple-100',
    icon: 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300',
  },
};

export function KPICard({
  title,
  value,
  icon,
  variant,
  isLoading,
  trend,
  description,
}: KPICardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200 hover:shadow-lg h-32',
        styles.bg,
        styles.text
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90">{title}</p>

            {isLoading ? (
                <Skeleton className="h-8 w-16 " />
              // <div className="mt-2 h-8 w-16 animate-pulse rounded bg-current opacity-30" />
            ) : (
              <>
                <p className="mt-2 text-3xl font-bold">{value}</p>
                {description && (
                  <p className="mt-1 text-xs opacity-75">{description}</p>
                )}
              </>
            )}
          </div>

          <div className={cn('rounded-full p-3', styles.icon)}>
            {icon}
          </div>
        </div>

        {trend && (
          <div className="mt-4 text-xs font-semibold">
            <span
              className={
                trend.direction === 'up'
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </span>
          </div>
        )}

        {/* Decorative bubble */}
        <div className="absolute top-0 left-0  opacity-10">
          <div className="h-24 w-24 rounded-full bg-current" />
        </div>
      </CardContent>
    </Card>
  );
}
