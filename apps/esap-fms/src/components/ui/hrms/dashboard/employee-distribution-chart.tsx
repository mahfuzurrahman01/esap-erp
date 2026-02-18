"use client"



import { useTranslations } from "next-intl"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Skeleton } from "@/components/ui/skeleton"
import { useDepartmentStatistics } from "@/modules/hrms/hooks/dashboard/use-dashboard-report"

// Custom gradient bar component
const GradientBar = (props: any) => {
  const { fill, x, y, width, height } = props

  return (
    <g>
      <defs>
        <linearGradient
          id={`gradient-${fill.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={0.9} />
          <stop offset="100%" stopColor={fill} stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#gradient-${fill.replace("#", "")})`}
        rx={4}
        ry={4}
      />
    </g>
  )
}

export default function EmployeeDistributionChart() {
  const { data: departmentStats, isLoading: isDepartmentStatsLoading } =
    useDepartmentStatistics()

  const t = useTranslations()

  // Calculate the maximum value and set scale
  const maxValue =
    departmentStats?.reduce((max, item) => {
      const itemMax = Math.max(item.total, item.saudi, item.expat)
      return Math.max(max, itemMax)
    }, 0) || 0

  // Round up to nearest multiple of 5 and add buffer
  const yAxisMax = Math.ceil((maxValue * 1.2) / 5) * 5

  // Generate ticks based on max value
  const yAxisTicks = Array.from({ length: 6 }, (_, i) =>
    Math.round((yAxisMax / 5) * i)
  )

  // Skeleton loader component
  if (isDepartmentStatsLoading) {
    return (
      <div className="w-full max-w-[600px] px-5">
        {/* Title Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Chart Container Skeleton */}
        <div className="h-[280px] w-full rounded-3xl bg-gradient-to-b from-white via-white/80 to-transparent p-5 shadow-sm backdrop-blur-sm dark:from-gray-100/10 dark:via-gray-100/5 dark:to-transparent">
          <div className="flex h-full flex-col">
            <div className="relative flex h-full w-full">
              {/* Y-Axis Labels Skeleton */}
              <div className="flex flex-col justify-between py-2 pr-2">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-3 w-6" />
                ))}
              </div>

              {/* Bars Container */}
              <div className="relative flex-1">
                {/* Grid Lines Skeleton */}
                <div className="absolute inset-0 flex flex-col justify-between py-2">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="h-[1px] w-full bg-gray-100 opacity-60"
                    />
                  ))}
                </div>

                {/* Bars Skeleton */}
                <div className="relative flex h-full items-end justify-between px-2">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="group flex w-12 flex-col items-center gap-1">
                      <div className="flex w-full max-w-[24px] flex-col gap-1">
                        <Skeleton className="h-20 w-full rounded-sm" />
                        <Skeleton className="h-28 w-full rounded-sm" />
                        <Skeleton className="h-16 w-full rounded-sm" />
                      </div>
                      {/* X-Axis Label Skeleton */}
                      <Skeleton className="mt-2 h-3 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[600px] px-5">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700">
          {t("common.text-department-statistics")}
        </h3>
      </div>

      <div className="h-[280px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-white via-white/80 to-transparent p-5 shadow-sm backdrop-blur-sm transition-colors duration-200 dark:from-gray-100/10 dark:via-gray-100/5 dark:to-transparent">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentStats}
            margin={{
              top: 10,
              right: 10,
              bottom: 20,
              left: -20,
            }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              domain={[0, yAxisMax]}
              ticks={yAxisTicks}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                      <div className="mb-2 font-medium">
                        {payload[0]?.payload.name}
                      </div>
                      <div className="space-y-2">
                        {payload.map((item: any) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2">
                            <span
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: item.fill }}
                            />
                            <span className="text-sm text-gray-600">
                              {item.name}: {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              name="Total Employees"
              dataKey="total"
              fill="#86EFAC"
              shape={<GradientBar />}
              barSize={8}
            />
            <Bar
              name="Saudi Employees"
              dataKey="saudi"
              fill="#FCD34D"
              shape={<GradientBar />}
              barSize={8}
            />
            <Bar
              name="Expat Employees"
              dataKey="expat"
              fill="#93C5FD"
              shape={<GradientBar />}
              barSize={8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
