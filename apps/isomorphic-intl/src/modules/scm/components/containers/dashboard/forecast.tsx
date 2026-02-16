"use client";

import { useState } from "react";



import { CustomTooltip } from "@core/components/charts/custom-tooltip";
import { useMedia } from "@core/hooks/use-media";
import SimpleBar from "@core/ui/simplebar";
import cn from "@core/utils/class-names";
import { useTranslations } from "next-intl";
import { useDebounce } from "react-use";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Text } from "rizzui";



import Dropdown from "@/components/ui/scm/dropdown";
// import { monthlyForecastData } from "@/modules/scm/data/dashboard-data";
import { MonthlyForecast, MonthlyForecastQueryOptions } from "@/modules/scm/types/dashboard/monthly-forecast-types";





export default function Forecast({
  className,
  data,
  params,
  updateParams,
}: {
  className?: string
  data: MonthlyForecast[]
  params?: MonthlyForecastQueryOptions
  updateParams?: (newParams: Partial<MonthlyForecastQueryOptions>) => void
}) {
  const isTablet = useMedia("(max-width: 800px)", false)
  const t = useTranslations("common")

  const [selectedYear, setSelectedYear] = useState(
    params?.forecastYear || String(new Date().getFullYear())
  )
  // Check if all data entries have zero values for forecastedDemand and pastSalesData
  const isDataEmpty = data.every(
    (entry) => entry.forecastedDemand === 0 && entry.pastSalesData === 0
  )
  const chartData =
    data && data.length > 0 && !isDataEmpty ? data : []

  useDebounce(
    () => {
      updateParams?.({ forecastYear: selectedYear })
    },
    500,
    [selectedYear]
  )

  const handleYearChange = (option: any) => {
   const yearValue = typeof option === "object" ? option.value : option
   setSelectedYear(yearValue)
   updateParams?.({ forecastYear: yearValue, pageIndex: 1 })
  }

  // Add function to generate year options
  const getYearOptions = (
    numberOfYears: number = 5
  ): { label: string; value: string }[] => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: numberOfYears }, (_, index) => ({
      label: String(currentYear - index),
      value: String(currentYear - index),
    }))
  }

  return (
    <div className={className}>
      <Legend className="mt-2 flex @2xl:hidden @3xl:flex @5xl:hidden" />

      <div className="mr-5 mt-3 flex items-start justify-end 2xl:mt-5">
        <div className="flex items-center">
          <div className="me-3">
            <Text>{t("text-sort-by")}</Text>
          </div>
          <div>
            <Dropdown
              value={selectedYear}
              className="font-semibold"
              onChange={handleYearChange}
              options={getYearOptions()}
            />
          </div>
        </div>
      </div>
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: "700px" })}>
            <AreaChart
              data={chartData ?? []}
              margin={{
                left: -10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
              <defs>
                <linearGradient
                  id="forecastedDemand"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1">
                  <stop offset="5%" stopColor="#FF5630" stopOpacity={0.1} />
                  <stop offset="50%" stopColor="#FF5630" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pastSalesData" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8E33FF" stopOpacity={0.1} />
                  <stop offset="50%" stopColor="#8E33FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} /> */}
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis tickLine={false} className="" axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                activeDot={{
                  r: 8,
                  className: "fill-gray-300 shadow-xl",
                  stroke: "#fefefe",
                  strokeWidth: 3,
                }}
                dataKey="forecastedDemand"
                stroke="#FF5630"
                className="bg-gray-300/50"
                strokeWidth={5}
                fillOpacity={2}
                fill="url(#forecastedDemand)"
              />
              <Area
                type="monotone"
                activeDot={{
                  r: 8,
                  className: "fill-gray-300 shadow-xl",
                  stroke: "#fefefe",
                  strokeWidth: 3,
                }}
                dataKey="pastSalesData"
                stroke="#8E33FF"
                strokeWidth={5}
                fillOpacity={2}
                fill="url(#pastSalesData)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </div>
  )
}

function Legend({ className }: { className?: string }) {
  const t = useTranslations("common")
  return (
    <div className={cn("flex flex-wrap items-start gap-3 lg:gap-4", className)}>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#00D1FF]" />
        <span>{t("text-forecasted-demand")}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
        <span>{t("text-past-sales-data")}</span>
      </span>
    </div>
  )
}