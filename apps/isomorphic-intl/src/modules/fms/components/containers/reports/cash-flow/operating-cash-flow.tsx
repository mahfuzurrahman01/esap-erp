"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { CustomYAxisTick } from "@core/components/charts/custom-yaxis-tick"
import TrendingUpIcon from "@core/components/icons/trending-up"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { formatNumber } from "@core/utils/format-number"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Text, Title } from "rizzui"

import { useCashFlowSummary } from "@/modules/fms/hooks/use-cash-flow-summary"
import { useQueryParams } from "@/hooks/use-query-params"
import { CashFlowQueryOptions } from "@/modules/fms/types/cash-flow"

const ticketStatus = [
  { name: "Operations" },
  { name: "Investing" },
  { name: "Financing" },
]
const COLORS = ["#00A76F", "#FFAB00", "#00B8D9"]

const viewOptions = [
  {
    value: "Yearly",
    label: "Yearly",
  },
  {
    value: "Monthly",
    label: "Monthly",
  },
]

export default function OperatingCashFlow({
  className,
}: {
  className?: string
}) {
  const { params } = useQueryParams<CashFlowQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data: cashFlowSummary } : any = useCashFlowSummary(params?.companyId ? { companyId: params.companyId } : undefined)
  const monthlyData = cashFlowSummary?.[0]?.monthlyData || []
  const summary = cashFlowSummary?.[0]?.summary
  const isTab = useMedia("(max-width: 768px)", false)

  return (
    <WidgetCard
      title="Operating Cash Flow"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={cn("min-h-[28rem] border-transparent", className)}
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="me-2 font-semibold">
            {formatNumber(summary?.totalNetOperations || 0)}
          </Title>
          <Text className="flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                "me-2 inline-flex items-center font-medium text-green"
              )}>
              <TrendingUpIcon className="me-1 h-4 w-4" />
              {((summary?.totalNetOperations || 0) / 100).toFixed(2)}%
            </Text>
          </Text>
        </div>
      }
      action={
        <div className="flex items-center gap-5">
          <Legend className="hidden @2xl:flex" />
        </div>
      }>
      <Legend className="mt-2 flex @2xl:hidden" />
      <SimpleBar>
        <div className="h-[28rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTab && { minWidth: "1100px" })}>
            <ComposedChart
              data={monthlyData}
              margin={{
                left: -25,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12">
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />

              <defs>
                <linearGradient
                  id="incomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00A76F" />
                  <stop offset="0.8" stopColor="#00A76F" />
                  <stop offset="1" stopColor="#00A76F" />
                </linearGradient>
              </defs>

              <defs>
                <linearGradient
                  id="cosGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FFAB00" />
                  <stop offset="0.8" stopColor="#FFAB00" />
                  <stop offset="1" stopColor="#FFAB00" />
                </linearGradient>
              </defs>

              <defs>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00B8D9" />
                  <stop offset="0.8" stopColor="#00B8D9" />
                  <stop offset="1" stopColor="#00B8D9" />
                </linearGradient>
              </defs>

              <Bar
                dataKey="netOperations"
                fill="url(#incomeGradient)"
                stroke={COLORS[0]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="netInvestment"
                fill="url(#cosGradient)"
                stroke={COLORS[1]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="netFinance"
                fill="url(#expenseGradient)"
                stroke={COLORS[2]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  )
}

function Legend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-start gap-3 lg:gap-4", className)}>
      {ticketStatus.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}