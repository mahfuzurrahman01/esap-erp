"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { CustomYAxisTick } from "@core/components/charts/custom-yaxis-tick"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { formatNumber } from "@core/utils/format-number"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useCashFlowSummary } from "@/modules/fms/hooks/use-cash-flow-summary"
import { useTranslations } from "next-intl"

export default function CashFlowChart({ className }: { className?: string }) {
  const t = useTranslations("form")

  const { data: cashFlowSummary } : any = useCashFlowSummary({ companyId: 1 })
  const monthlyData = cashFlowSummary?.[0]?.monthlyData || []
  const summary = cashFlowSummary?.[0]?.summary

  return (
    <WidgetCard
      title="Cash Flow"
      className={cn(
        "col-span-full border-transparent p-6 !shadow-none @container @7xl:rounded-[40px] lg:p-10 2xl:p-12",
        className
      )}
      titleClassName="font-semibold sm:text-[32px] font-bold"
      headerClassName="flex-col @2xl:flex-row @4xl:flex-col @5xl:flex-row gap-3"
      actionClassName="ps-0"
      action={
        <div className="flex items-center gap-5">
          <div className="flex flex-wrap items-start gap-3 lg:gap-4">
            <div className="flex flex-col items-end gap-2">
              <span className="block text-2xl font-bold text-title @7xl:text-[32px]">
                {formatNumber(summary?.totalNetOperations || 0)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span>Net Operations</span>
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="block text-2xl font-bold text-title @7xl:text-[32px]">
                {formatNumber(summary?.totalNetInvestment || 0)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                <span>Net Investment</span>
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="block text-2xl font-bold text-title @7xl:text-[32px]">
                {formatNumber(summary?.totalNetFinance || 0)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red" />
                <span>Net Finance</span>
              </span>
            </div>
          </div>
        </div>
      }>
      <SimpleBar className="mt-8">
        <div className="h-[32rem]">
          <ResponsiveContainer
            width={1600}
            height="100%"
            className="[&_.recharts-wrapper]:!min-w-0">
            <BarChart
              data={monthlyData}
              margin={{
                left: -6,
              }}
              barGap={12}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  }
                  return <CustomYAxisTick prefix={"$"} payload={pl} {...rest} />
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />
              <defs>
                <pattern
                  id="cashFlowStripes"
                  patternUnits="userSpaceOnUse"
                  width="6"
                  height="6"
                  patternTransform="rotate(-120)">
                  <rect width="6" height="6" fill="#919EAB50" />
                  <path d="M0 0h6v4.24H0z" className="fill-paper" />
                </pattern>
              </defs>
              <Bar
                fill="#00A76F"
                background={{ fill: "url(#cashFlowStripes)", radius: 8 }}
                strokeOpacity={0}
                dataKey="netOperations"
                barSize={28}
                radius={[8, 8, 0, 0]}
              />
              <Bar
                background={{ fill: "url(#cashFlowStripes)", radius: 8 }}
                fill="#8E33FF"
                dataKey="netInvestment"
                barSize={28}
                radius={[8, 8, 0, 0]}
              />
              <Bar
                background={{ fill: "url(#cashFlowStripes)", radius: 8 }}
                fill="#FF5630"
                dataKey="netFinance"
                barSize={28}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  )
}

// const renderCustomLabel = (props: any) => {
//   const { x, y, width, height, value, className } = props

//   return (
//     <g>
//       <text
//         x={x + width / 2}
//         y={y + height / 2} // Adjusted to center vertically
//         fill="currentColor"
//         className={cn("text-xs font-semibold", className)}
//         textAnchor="middle"
//         dominantBaseline="middle">
//         ${formatNumber(value)}
//       </text>
//     </g>
//   )
// }