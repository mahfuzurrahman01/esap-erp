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
} from "recharts"
import { Text, Title } from "rizzui"
import { Skeleton } from "@/components/ui"
import { AssetDepreciationLedgerList } from "@/modules/fms/types"
import dayjs from "dayjs"

const COLORS = ["#00A76F", "#FFAB00"]

const ticketStatus = [
  { name: "Purchase Amount" },
  { name: "Depreciation Amount" }
]

interface OperatingAssetDepreciationProps {
  data: AssetDepreciationLedgerList[]
  className?: string
}

export default function OperatingAssetDepreciation({
  data,
  className,
}: OperatingAssetDepreciationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const isTab = useMedia("(max-width: 768px)", false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const monthlyData = useMemo(() => {
    // Get current date and date 12 months ago
    const currentDate = dayjs()
    const twelveMonthsAgo = currentDate.subtract(11, 'month').startOf('month')

    // Filter and transform data
    const monthlyGroups = data.reduce((acc, item) => {
      const scheduleDate = dayjs(item.scheduleDate)

      // Only include data from last 12 months
      if (scheduleDate.isBefore(twelveMonthsAgo)) {
        return acc
      }

      const month = scheduleDate.format('MMM YYYY')
      if (!acc[month]) {
        acc[month] = {
          month,
          purchaseAmount: 0,
          depreciationAmount: 0,
          accumulatedDepreciationAmount: 0
        }
      }
      acc[month].purchaseAmount += item.purchaseAmount
      acc[month].depreciationAmount += item.depreciationAmount
      acc[month].accumulatedDepreciationAmount = Math.max(
        acc[month].accumulatedDepreciationAmount,
        item.accumulatedDepreciationAmount
      )
      return acc
    }, {} as Record<string, {
      month: string
      purchaseAmount: number
      depreciationAmount: number
      accumulatedDepreciationAmount: number
    }>)

    // Fill in missing months with zero values
    for (let i = 0; i < 12; i++) {
      const monthDate = currentDate.subtract(i, 'month')
      const monthKey = monthDate.format('MMM YYYY')
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = {
          month: monthKey,
          purchaseAmount: 0,
          depreciationAmount: 0,
          accumulatedDepreciationAmount: 0
        }
      }
    }

    // Sort by date
    return Object.values(monthlyGroups)
      .sort((a, b) => dayjs(a.month, 'MMM YYYY').valueOf() - dayjs(b.month, 'MMM YYYY').valueOf())
      .slice(-12) // Ensure we only have the last 12 months
  }, [data])

  const totalPurchaseAmount = data.reduce((sum, item) => sum + item.purchaseAmount, 0)
  const totalDepreciationAmount = data.reduce((sum, item) => sum + item.depreciationAmount, 0)
  const growthRate = ((totalDepreciationAmount - totalPurchaseAmount) / totalPurchaseAmount) * 100

  return (
    <WidgetCard
      title="Asset Depreciation Ledger"
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
              ${totalPurchaseAmount.toLocaleString()}
            </Title>
            <Text className="flex items-center leading-none text-gray-500">
              <Text
                as="span"
                className={cn(
                  "me-2 inline-flex items-center font-medium text-green"
                )}>
                <TrendingUpIcon className="me-1 h-4 w-4" />
                {growthRate.toFixed(2)}%
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
            <div className="h-full w-full animate-pulse bg-gray-100" />
          ) : (
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
                    id="purchaseAmountGradient"
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
                    id="depreciationAmountGradient"
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

                <Bar
                  dataKey="purchaseAmount"
                  fill="url(#purchaseAmountGradient)"
                  stroke={COLORS[0]}
                  barSize={28}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  type="natural"
                  dataKey="depreciationAmount"
                  fill="url(#depreciationAmountGradient)"
                  stroke={COLORS[1]}
                  barSize={28}
                  radius={[4, 4, 0, 0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
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
