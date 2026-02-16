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
import { useProfitAndLoss } from "@/modules/fms/hooks/use-profit-and-loss"

export default function ProfitAndLossRate({
  className,
}: {
  className?: string
}) {
  const isTablet = useMedia("(max-width: 820px)", false)
  const { data } = useProfitAndLoss()

  const chartData = data ? [
    {
      year: new Date().getFullYear().toString(),
      income: data.totalIncome,
      expenses: data.totalExpense,
      profit: data.profit,
    }
  ] : []

  return (
    <WidgetCard
      title={"Profit and Loss Chart"}
      description={
        <>
          <Badge renderAsDot className="ms-1 bg-primary" /> Income
          <Badge renderAsDot className="me-1 ms-4 bg-orange" /> Expenses
          <Badge renderAsDot className="me-1 ms-4 bg-secondary" /> Profit
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
              data={chartData}
              margin={{
                left: -16,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="8%" stopColor="#00A76F" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#00A76F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFAB00" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#FFAB00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8E33FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8E33FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis axisLine={false} tickLine={false} className=" " />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="natural"
                dataKey="income"
                stroke="#00A76F"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#income)"
              />
              <Area
                type="natural"
                dataKey="expenses"
                stroke="#FFAB00"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#expenses)"
              />
              <Area
                type="natural"
                dataKey="profit"
                stroke="#8E33FF"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#profit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  )
}