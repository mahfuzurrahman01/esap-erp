"use client"

import { useState, useEffect, useMemo } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { CustomYAxisTick } from "@core/components/charts/custom-yaxis-tick"
import TrendingUpIcon from "@core/components/icons/trending-up"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { Text, Title } from "rizzui"
import { ChartSkeleton } from "@/components/ui"
import { Skeleton } from "@/components/ui"
import { BudgetSummary } from "@/modules/fms/types/budget-summary"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const COLORS = ["#00A76F", "#FFAB00", "#FF5630", "#6554C0", "#36B37E"]

interface Props {
  className?: string
  data?: BudgetSummary[]
}

export default function OperatingBudgetSummary({ className, data = [] }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const isTab = useMedia("(max-width: 768px)", false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(() => {
    if (!data.length) return []

    return MONTHS.map((month) => {
      const monthData: any = {
        month: month.substring(0, 3),
      }

      data.forEach((budget, budgetIndex) => {
        const distribution = budget.budgetDistribution.find(d => d.month === month)
        const amount = budget.totalBudgetAmount * (distribution?.percentage || 0) / 100
        monthData[`budget${budgetIndex + 1}`] = Math.round(amount)
      })

      return monthData
    })
  }, [data])

  const totalBudget = data.reduce((sum, budget) => sum + budget.totalBudgetAmount, 0)
  const totalActual = chartData.reduce((sum, item) => {
    return sum + Object.keys(item)
      .filter(key => key.startsWith('budget'))
      .reduce((itemSum, key) => itemSum + (item[key] || 0), 0)
  }, 0)
  const percentageChange = ((totalActual - totalBudget) / totalBudget * 100).toFixed(2)

  return (
    <WidgetCard
      title="Budget Summary Overview"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={cn("min-h-[28rem] border-transparent", className)}
      description={
        isLoading ? (
          <div className="flex items-center justify-start">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="ml-2 h-6 w-20" />
          </div>
        ) : (
          <div className="flex items-center justify-start">
            <Title as="h2" className="me-2 font-semibold">
              ${totalBudget.toLocaleString()}
            </Title>
            <Text className="flex items-center leading-none text-gray-500">
              <Text
                as="span"
                className={cn(
                  "me-2 inline-flex items-center font-medium",
                  Number(percentageChange) >= 0 ? "text-green" : "text-red-500"
                )}>
                <TrendingUpIcon className="me-1 h-4 w-4" />
                {percentageChange}%
              </Text>
            </Text>
          </div>
        )
      }
      action={
        <div className="flex items-center gap-5">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : (
            <>
              <Legend className="hidden @2xl:flex" />
            </>
          )}
        </div>
      }>
      {!isLoading && <Legend className="mt-2 flex @2xl:hidden" />}
      <SimpleBar>
        <div className="h-[28rem] w-full pt-6 @lg:pt-8">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTab && { minWidth: "1100px" })}>
              <ComposedChart
                data={chartData}
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
                <Legend />

                {data.map((budget, index) => (
                  <Bar
                    key={budget.budgetName}
                    dataKey={`budget${index + 1}`}
                    name={budget.budgetName}
                    fill={COLORS[index % COLORS.length]}
                    stackId="a"
                    barSize={28}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </SimpleBar>
    </WidgetCard>
  )
}
