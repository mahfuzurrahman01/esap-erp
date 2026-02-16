import React from "react"

import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useSalesReportList } from "@/modules/crm/hooks"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

export default function SalesFunnel() {
  const t = useTranslations("crm")
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { data: output } = useSalesReportList()

  const tableData =
    output?.data &&
    output?.data?.map((report) => ({
      day: report.salesMonthName,
      sales: report.saleValue,
    }))
  return (
    <div className="mt-12 h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={tableData}
          margin={{
            left: -5,
            right: 5,
            bottom: 10,
          }}
          className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0 [&_.recharts-cartesian-axis-line]:stroke-gray-100 [&_.recharts-cartesian-axis-line]:dark:stroke-gray-700">
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={isDark ? 0.1 : 0.5} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tickMargin={20}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="sales"
            className="fill-[#007867] dark:[fill-opacity:0.9]"
            name={t("text-average-time")}
            barSize={29.4}
            radius={6}
            background={{
              fill: isDark ? "#28323d" : "#F1F1F2",
              radius: 6,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
