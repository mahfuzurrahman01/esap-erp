import React from "react"

import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useMonthlyLeadAnalytics } from "@/modules/crm/hooks/use-lead-analytics"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

export default function MonthlyLeadCreation() {
  const t = useTranslations("crm")
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { data: output, isLoading }: any = useMonthlyLeadAnalytics() || {}

  const revenueSummaryData =
    output?.data &&
    output?.data?.map((report: any) => ({
      day: report.month || t("text-unknown"),
      leads: report.recordCount || 0,
    }))

  if(isLoading){
    <SkeletonLoader />
  }

  return (
    <div className="h-[350px] mt-12">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueSummaryData}
          margin={{
            top: 22,
            left: -15,
          }}
          className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0 [&_.recharts-cartesian-axis-line]:stroke-gray-100 [&_.recharts-cartesian-axis-line]:dark:stroke-gray-700">
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={isDark ? 0.1 : 0.5} />
          <XAxis dataKey="day" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip formattedNumber />} />
          <Bar
            barSize={29.4}
            fill={"#007867"}
            dataKey={"leads"}
            radius={6}
            activeBar={<Rectangle fill="#ddd" stroke="#ddd" />}
            activeIndex={getActiveIndex(revenueSummaryData)}
            background={{
              fill: isDark ? "#28323d" : "#F1F1F2",
              radius: 6,
            }}>
            <LabelList dataKey="leads" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function renderCustomizedLabel(props: any) {
  const { x, y, index } = props
  let isActive = index === props.activeIndex

  return (
    <g>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
      </defs>
    </g>
  )
}

function getActiveIndex(revenueSummaryData: any) {
  let thisMonthName = new Date().toLocaleString("default", { month: "short" })
  let activeIndex = revenueSummaryData?.findIndex(
    (data: any) => data.day === thisMonthName
  )

  return activeIndex
}
