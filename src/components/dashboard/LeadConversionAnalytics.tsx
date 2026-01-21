import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Lead } from "@/types/lead"

interface LeadFunnelAnalyticsProps {
  leads: Lead[]
}

export function LeadFunnelAnalytics({ leads }: LeadFunnelAnalyticsProps) {
  const total = leads.length
  const newLeads = leads.filter(l => l.status === "new").length
  const contacted = leads.filter(l => l.status === "contacted").length
  const qualified = leads.filter(l => l.status === "qualified").length
  const lost = leads.filter(l => l.status === "lost").length

  const conversionRate =
    total > 0 ? Math.round((qualified / total) * 100) : 0

  return (
    <Card className="h-[240px]">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
        <CardTitle className="text-sm font-semibold">
          Lead Funnel
        </CardTitle>

        {/* Conversion Badge */}
        <div className="rounded-md bg-primary/10 px-2 py-1 text-center">
          <p className="text-[10px] leading-none text-muted-foreground">
            Conv.
          </p>
          <p className="text-sm font-bold text-primary leading-tight">
            {conversionRate}%
          </p>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 py-2">
        <div className="grid grid-cols-2 gap-2">
          <FunnelCell label="Total" value={total} />
          <FunnelCell label="New" value={newLeads} />
          <FunnelCell label="Contacted" value={contacted} />
          <FunnelCell label="Qualified" value={qualified} />
          <FunnelCell label="Lost" value={lost} />
        </div>
      </CardContent>
    </Card>
  )
}

/* -------- Compact Grid Cell -------- */

function FunnelCell({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="flex items-center justify-between rounded-sm bg-muted/30 px-2 py-1.5">
      <span className="text-xs text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold">
        {value}
      </span>
    </div>
  )
}
