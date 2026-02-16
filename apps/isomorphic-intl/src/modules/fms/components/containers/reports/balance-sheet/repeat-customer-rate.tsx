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

const data = [
  {
    month: "Jan",
    assets: 2000,
    liabilities: 1000,
    equity: 1000,
  },
  {
    month: "Feb",
    assets: 4200,
    liabilities: 2798,
    equity: 1402,
  },
  {
    month: "Mar",
    assets: 5000,
    liabilities: 4000,
    equity: 1000,
  },
  {
    month: "Apr",
    assets: 5780,
    liabilities: 3908,
    equity: 1872,
  },
  {
    month: "May",
    assets: 4890,
    liabilities: 2500,
    equity: 2390,
  },
  {
    month: "Jun",
    assets: 8000,
    liabilities: 5200,
    equity: 2800,
  },
  {
    month: "Jul",
    assets: 4890,
    liabilities: 6500,
    equity: 2390,
  },
  {
    month: "Aug",
    assets: 3780,
    liabilities: 4908,
    equity: 2390,
  },
  {
    month: "Sep",
    assets: 7800,
    liabilities: 2800,
    equity: 2390,
  },
  {
    month: "Oct",
    assets: 5780,
    liabilities: 1908,
    equity: 2390,
  },
  {
    month: "Nov",
    assets: 2780,
    liabilities: 3908,
    equity: 2390,
  },
  {
    month: "Dec",
    assets: 7500,
    liabilities: 3000,
    equity: 2390,
  },
]

export default function RepeatCustomerRate({
  className,
}: {
  className?: string
}) {
  const isTablet = useMedia("(max-width: 820px)", false)

  return (
    <WidgetCard
      title={"Chart"}
      description={
        <>
          <Badge renderAsDot className="ms-1 bg-primary" /> Assets
          <Badge renderAsDot className="me-1 ms-4 bg-orange" /> Liabilities
          <Badge renderAsDot className="me-1 ms-4 bg-secondary" /> Equity
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
              data={data}
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
                dataKey="assets"
                stroke="#00A76F"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#assets)"
              />
              <Area
                type="natural"
                dataKey="liabilities"
                stroke="#FFAB00"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#liabilities)"
              />
              <Area
                type="natural"
                dataKey="equity"
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
