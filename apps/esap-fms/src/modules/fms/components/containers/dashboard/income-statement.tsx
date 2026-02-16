"use client"

import { MonthlyIncome } from "@/modules/fms/types/income-expenses-profit"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { CustomYAxisTick } from "@core/components/charts/custom-yaxis-tick"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import { formatNumber } from "@core/utils/format-number"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function IncomeStatementChart({ monthlyIncome }: { monthlyIncome: MonthlyIncome[] }) {
  const isMobile = useMedia("(max-width: 767px)", false)
  function barSize() {
    return 68
  }

  return (
    <SimpleBar className="">
      <div className="h-[18rem] w-full">
        <ResponsiveContainer
          width={isMobile ? 600 : 1300}
          height="100%"
          className="[&_.recharts-wrapper]:!min-w-0">
          <BarChart
            data={monthlyIncome}
            margin={{
              left: -6,
              right: 10,
            }}
            barGap={30}
            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
            <CartesianGrid strokeDasharray="8 10" strokeOpacity={20} />
            <XAxis dataKey="monthName" axisLine={false} tickLine={false} />
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
                id="incomeStatementStripes"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(-120)">
                <rect width="10" height="10" fill="#919EAB50" />
                <path d="M0 0h10v4.24H0z" className="fill-paper" />
              </pattern>
            </defs>
            <Bar
              fill="url(#incomeStatementStripes)"
              background={{ fill: "transparent", radius: 14 }}
              strokeOpacity={0}
              dataKey="monthlyIncome"
              barSize={barSize()}
              radius={[12, 12, 0, 0]}
              activeBar={<Rectangle fill="#00A76F" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SimpleBar>
  )
}