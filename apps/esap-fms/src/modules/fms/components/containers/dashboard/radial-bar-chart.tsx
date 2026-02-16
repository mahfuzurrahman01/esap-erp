"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import { CompanyWiseProfitResponse } from "@/modules/fms/types/company-wise-profit"

interface RadialBarChartProps {
  companyWiseProfit: CompanyWiseProfitResponse | undefined
  isLoading?: boolean
}

export default function RadialBarChart({
  companyWiseProfit,
  isLoading = false,
}: RadialBarChartProps) {
  const percentage = companyWiseProfit?.profitPercentage ?? 0
  const isProfit = percentage >= 0
  const color = isProfit ? "#00A76F" : "#FF5630"
  const roundedPercentage = Math.round(Math.abs(percentage))

  // Create data for the gauge chart
  const data = [
    {
      name: `${roundedPercentage}%`,
      value: Math.abs(percentage),
      fill: color
    },
    {
      name: "remaining",
      value: 100 - Math.abs(percentage),
      fill: "url(#diagonalStripes)"
    }
  ]

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={200}
      className="[&_.recharts-default-legend]:flex [&_.recharts-default-legend]:flex-wrap [&_.recharts-default-legend]:justify-center [&_.recharts-legend-item-text]:text-3xl [&_.recharts-legend-item-text]:font-bold [&_.recharts-legend-item-text]:!text-title [&_.recharts-legend-item>.recharts-surface]:!hidden [&_.recharts-legend-item]:!ms-2.5 [&_.recharts-legend-item]:!block [&_.recharts-legend-wrapper]:!left-1/2 [&_.recharts-legend-wrapper]:!right-1/2 [&_.recharts-legend-wrapper]:!top-[95px] [&_.recharts-legend-wrapper]:!h-auto [&_.recharts-legend-wrapper]:!w-auto [&_.recharts-legend-wrapper_.legend-item-0]:!hidden [&_.recharts-legend-wrapper_.legend-item-1]:!hidden">
      <PieChart
        outerRadius="110%"
        startAngle={180}
        endAngle={0}
        data={data}
        className="rtl:[&_.recharts-legend-item>svg]:ml-1">
        <defs>
          <pattern
            id="diagonalStripes"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
            patternTransform="rotate(120)">
            <rect width="10" height="10" fill="#FFFFFF01" />
            <path d="M0 0h10v4.24H0z" fill="#919EAB50" />
          </pattern>
        </defs>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          stroke="none">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          content={() => (
            <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold text-title">
                {roundedPercentage}%
              </div>
            </div>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
