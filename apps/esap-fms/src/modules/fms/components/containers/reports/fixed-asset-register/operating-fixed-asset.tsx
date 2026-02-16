"use client"

import { useMemo } from "react"

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
import { FixedAssetRegisterList } from "@/modules/fms/types"

const COLORS = ["#00A76F", "#FFAB00"]

interface OperatingFixedAssetProps {
  className?: string
  data: FixedAssetRegisterList[]
}

export default function OperatingFixedAsset({
  className,
  data,
}: OperatingFixedAssetProps) {
  const isTab = useMedia("(max-width: 768px)", false)

  const chartData = useMemo(() => {
    if (!data?.length) return []

    // Group data by company and calculate totals
    const companyData = data.reduce((acc: any, item) => {
      if (!acc[item.companyName]) {
        acc[item.companyName] = {
          label: item.companyName,
          asset: 0,
          depreciatedAmount: 0,
        }
      }
      acc[item.companyName].asset += item.grossPurchaseAmount
      acc[item.companyName].depreciatedAmount += item.assetValue
      return acc
    }, {})

    return Object.values(companyData)
  }, [data])

  const totalAssetValue = useMemo(() => {
    return data?.reduce((sum, item) => sum + item.grossPurchaseAmount, 0) || 0
  }, [data])

  const totalDepreciatedValue = useMemo(() => {
    return data?.reduce((sum, item) => sum + item.assetValue, 0) || 0
  }, [data])

  const growthRate = useMemo(() => {
    if (!totalAssetValue || !totalDepreciatedValue) return 0
    return ((totalDepreciatedValue - totalAssetValue) / totalAssetValue) * 100
  }, [totalAssetValue, totalDepreciatedValue])

  return (
    <WidgetCard
      title="Fixed Asset Register"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={cn("min-h-[28rem] border-transparent", className)}
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="me-2 font-semibold">
            ${(totalAssetValue / 1000).toFixed(2)}k
          </Title>
          <Text className="flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                "me-2 inline-flex items-center font-medium",
                growthRate >= 0 ? "text-green" : "text-red"
              )}>
              <TrendingUpIcon className="me-1 h-4 w-4" />
              {growthRate.toFixed(2)}%
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
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />

              <defs>
                <linearGradient
                  id="assetGradient"
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
                  id="depreciatedAmountGradient"
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
                dataKey="asset"
                fill="url(#assetGradient)"
                stroke={COLORS[0]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="depreciatedAmount"
                fill="url(#depreciatedAmountGradient)"
                stroke={COLORS[1]}
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
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: COLORS[0] }}
        />
        <span>Gross Purchase Amount</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: COLORS[1] }}
        />
        <span>Asset Value</span>
      </div>
    </div>
  )
}
