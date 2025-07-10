import { Badge } from '@/components/ui/badge';
import type { BugStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

type BugStatusBadgeProps = {
  status: BugStatus;
};

export function BugStatusBadge({ status }: BugStatusBadgeProps) {
  const statusColors: Record<BugStatus, string> = {
    New: 'bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/30',
    'In Progress': 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-500/30',
    Fixed: 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/30',
    Closed: 'bg-gray-500/20 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-500/30',
  };

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', statusColors[status])}
    >
      {status}
    </Badge>
  );
}
