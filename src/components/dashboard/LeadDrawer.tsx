import { useEffect, useState } from 'react';
import type { LeadActivity } from '@/types/lead';
import type { LeadDrawerProps } from '@/types/dashboard';
import { leadsService } from '@/services/leads';
import { LeadStatusSelect } from './LeadStatusSelect';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  Building,
  User,
  Calendar,
  Clock,
  UserCircle,
  Loader2,
} from 'lucide-react';
import moment from 'moment';
import { cn } from '@/lib/utils';

const activityIcons: Record<LeadActivity['type'], React.ReactNode> = {
  created: <Calendar className="h-4 w-4" />,
  status_updated: <Clock className="h-4 w-4" />,
  agent_assigned: <User className="h-4 w-4" />,
  note_added: <Clock className="h-4 w-4" />,
};

export function LeadDrawer({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  isUpdating,
}: LeadDrawerProps) {
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  useEffect(() => {
    if (lead && isOpen) {
      setLoadingActivities(true);
      leadsService
        .getLeadActivities(lead.id)
        .then(setActivities)
        .finally(() => setLoadingActivities(false));
    }
  }, [isOpen]);

  if (!lead) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-5">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-xl">{lead.name}</SheetTitle>
              {lead.company && (
                <p className="text-sm text-muted-foreground">{lead.company}</p>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>

            {isUpdating ? (
              <div className="flex items-center gap-2 py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Updating status...
                </span>
              </div>
            ) : (
              <LeadStatusSelect
                value={lead.status}
                onChange={(status) => onStatusChange(lead.id, status)}
                className="w-full"
              />
            )}
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Information</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${lead.email}`}
                  className="text-primary hover:underline"
                >
                  {lead.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${lead.phone}`}
                  className="text-primary hover:underline"
                >
                  {lead.phone}
                </a>
              </div>

              {lead.company && (
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.company}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Assigned Agent */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Assigned Agent</h3>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <UserCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{lead.assignedAgent}</p>
                <p className="text-sm text-muted-foreground">Sales Agent</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Created Date */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Created</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {moment(lead.createdAt).format('MMMM D, YYYY [at] h:mm A')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {moment(lead.createdAt).fromNow()}
            </p>
          </div>

          {lead.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground">{lead.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Activity Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Activity Timeline</h3>

            {loadingActivities ? (
              <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading activities...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="relative flex gap-4">
                    {index !== activities.length - 1 && (
                      <div className="absolute left-[11px] top-6 h-full w-0.5 bg-border" />
                    )}

                    <div
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full',
                        'bg-muted text-muted-foreground'
                      )}
                    >
                      {activityIcons[activity.type]}
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {moment(activity.timestamp).format(
                          'MMM D, YYYY [at] h:mm A'
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {moment(activity.timestamp).fromNow()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
