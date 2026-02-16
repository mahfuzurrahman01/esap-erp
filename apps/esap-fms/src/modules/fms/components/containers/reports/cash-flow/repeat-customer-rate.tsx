"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "rizzui"

import { cn } from "@/utils/cn"
import { useCashFlowSummary } from "@/modules/fms/hooks/use-cash-flow-summary"
import { useQueryParams } from "@/hooks/use-query-params"
import { CashFlowQueryOptions } from "@/modules/fms/types/cash-flow"

export default function RepeatCustomerRate({
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

  const { data: cashFlowSummary } = useCashFlowSummary(params?.companyId ? { companyId: params.companyId } : undefined)
  const monthlyData = cashFlowSummary?.[0]?.monthlyData || []
  const isTablet = useMedia("(max-width: 820px)", false)

  return (
    <WidgetCard
      title={"Chart"}
      description={
        <>
          <Badge renderAsDot className="ms-1 bg-primary" /> Operations
          <Badge renderAsDot className="me-1 ms-4 bg-orange" /> Investment
          <Badge renderAsDot className="me-1 ms-4 bg-secondary" /> Finance
        </>
      }
      descriptionClassName="text-gray-500 mt-1.5"
      className={cn(className, "border-transparent")}>
      <SimpleBar>
        <div className="h-[480px] w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: "700px" })}>
            <AreaChart
              data={monthlyData}
              margin={{
                left: -16,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
              <defs>
                <linearGradient id="assets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="8%" stopColor="#00A76F" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#00A76F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="liabilities" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFAB00" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#FFAB00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="equity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8E33FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8E33FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis axisLine={false} tickLine={false} className=" " />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="natural"
                dataKey="netOperations"
                stroke="#00A76F"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#assets)"
              />
              <Area
                type="natural"
                dataKey="netInvestment"
                stroke="#FFAB00"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#liabilities)"
              />
              <Area
                type="natural"
                dataKey="netFinance"
                stroke="#8E33FF"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#equity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  )
}
