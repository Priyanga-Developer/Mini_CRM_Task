import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { Lead } from "@/types/lead"

interface LeadStatusChartProps {
  leads: Lead[]
}

export function LeadCharts({ leads }: LeadStatusChartProps) {
  const chartData = [
    { status: "New", value: leads.filter(l => l.status === "new").length },
    { status: "Contacted", value: leads.filter(l => l.status === "contacted").length },
    { status: "Qualified", value: leads.filter(l => l.status === "qualified").length },
    { status: "Lost", value: leads.filter(l => l.status === "lost").length },
  ]

  /* REQUIRED by ChartContainer */
  const chartConfig = {
    value: {
      label: "Leads",
    },
  }

  const COLORS = [
    "hsl(var(--chart-1))", // New
    "hsl(var(--chart-2))", // Contacted
    "hsl(var(--chart-3))", // Qualified
    "hsl(var(--chart-4))", // Lost
  ]

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[230px] w-full"
    >
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />

        <XAxis
          dataKey="status"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
        />

        <ChartTooltip content={<ChartTooltipContent />} />

        <Bar dataKey="value" radius={4}>
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
