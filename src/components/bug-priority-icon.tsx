import type { BugPriority } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronsUp, AlertTriangle, ArrowDown } from 'lucide-react';

type BugPriorityIconProps = {
  priority: BugPriority;
  showLabel?: boolean;
};

const priorityConfig = {
    Low: { icon: ArrowDown, color: 'text-gray-500' },
    Medium: { icon: ChevronUp, color: 'text-yellow-500' },
    High: { icon: ChevronsUp, color: 'text-orange-500' },
    Critical: { icon: AlertTriangle, color: 'text-red-500' },
};


export function BugPriorityIcon({ priority, showLabel = false }: BugPriorityIconProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
    <div className={cn('flex items-center gap-2', config.color)}>
        <Icon className="h-4 w-4" />
        {showLabel && <span className="text-sm">{priority}</span>}
    </div>
  );
}
