"use client"

import { useMemo } from "react"
import WidgetCard from "@core/components/cards/widget-card"
import { CustomTooltip } from "@core/components/charts/custom-tooltip"
import { CustomYAxisTick } from "@core/components/charts/custom-yaxis-tick"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge, Title, cn } from "rizzui"

import Spinner from "@/components/base/spinner"
import TableGrid, { Column } from "@/components/ui/table-grid"
import { useEmployeeMonthlyTimeOffReport } from "@/hooks/hrms/employee/use-employee-report"
import { useQueryParams } from "@/hooks/use-query-params"
import { formatDate } from "@/utils/format-date"

import EmployeeReportToolbar from "../employee-reports/employee-report-toolbar"
import ExportLeaveRequestReport from "../export-data/leave-request-report-export"

export default function LeaveRequestReportsDashboard() {
  const t = useTranslations("common")

  // Get current month's first day and today's date
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const formattedFirstDay = firstDayOfMonth.toISOString().split("T")[0]
  const formattedToday = today.toISOString().split("T")[0]

  const reportColumns = [
    {
      id: "badgeId",
      header: t("text-id"),
      accessorKey: "badgeId",
      cell: ({ row }: { row: any }) => row.index + 1,
    },
    {
      id: "employeeName",
      header: t("text-employee-name"),
      accessorKey: "employeeName",
      cell: ({ row }: { row: any }) =>
        `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      id: "department",
      header: t("text-department"),
      accessorKey: "department",
    },
    {
      id: "leaveType",
      header: t("text-leave-type"),
      accessorKey: "leaveType",
    },
    {
      id: "duration",
      header: t("text-duration"),
      accessorKey: "duration",
      cell: ({ row }: { row: any }) => `${row.original.duration} days`,
    },
    {
      id: "startDate",
      header: t("text-start-date"),
      accessorKey: "startDate",
      cell: ({ row }: { row: any }) => formatDate(row.original.startDate),
    },
    {
      id: "endDate",
      header: t("text-end-date"),
      accessorKey: "endDate",
      cell: ({ row }: { row: any }) => formatDate(row.original.endDate),
    },
    {
      id: "status",
      header: t("text-status"),
      accessorKey: "status",
      cell: ({ row }: { row: any }) => (
        <Badge
          variant="flat"
          className={cn(
            row.original.status === "approved" && "bg-green-100 text-green-600",
            row.original.status === "pending" &&
              "bg-yellow-100 text-yellow-600",
            row.original.status === "rejected" && "bg-red-100 text-red-600"
          )}>
          {row.original.status}
        </Badge>
      ),
    },
  ]

  const { params, updateParams } = useQueryParams({
    params: [
      {
        key: "startDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "endDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useEmployeeMonthlyTimeOffReport({
    startDate: params.startDate,
    endDate: params.endDate,
  })

  const isTablet = useMedia("(max-width: 820px)", false)

  // Memoize chart data to prevent Recharts update loop
  const leaveTypeData = useMemo(
    () =>
      Array.isArray(data)
        ? data.reduce((acc: any[], curr) => {
            const existingType = acc.find((item) => item.leaveType === curr.leaveType)
            if (existingType) {
              existingType.count++
              existingType.days += curr.duration
            } else {
              acc.push({
                leaveType: curr.leaveType,
                count: 1,
                days: curr.duration,
              })
            }
            return acc
          }, [])
        : [],
    [data]
  )

  const statusData = useMemo(
    () =>
      Array.isArray(data)
        ? data.reduce((acc: any[], curr) => {
            const existingStatus = acc.find((item) => item.status === curr.status)
            if (existingStatus) {
              existingStatus.count++
            } else {
              acc.push({
                status: curr.status,
                count: 1,
              })
            }
            return acc
          }, [])
        : [],
    [data]
  )

  const COLORS = [
    "#00C9FF",
    "#92FE9D",
    "#FF9A9E",
    "#A18CD1",
    "#FFD26F",
    "#4FACFE",
  ]

  if (isLoading) {
    return (
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper p-2 dark:bg-paper">
        <EmployeeReportToolbar params={params} updateParams={updateParams} />
        <div className="flex h-[400px] items-center justify-center">
          <Spinner />
        </div>
      </WidgetCard>
    )
  }

  const hasData = Array.isArray(data) && data.length > 0

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper p-2 dark:bg-paper">
      <EmployeeReportToolbar params={params} updateParams={updateParams} />

      {hasData ? (
        <>
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
            {/* Leave Status Distribution - Pie Chart */}
            <WidgetCard
              title={t("text-leave-status-distribution")}
              className="min-h-[28rem] border-0">
              <div className="flex h-[350px] items-center justify-between">
                <ResponsiveContainer width="100%" height="100%" debounce={50}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        index,
                      }) => {
                        const RADIAN = Math.PI / 180
                        const radius = outerRadius + 25
                        const x = cx + radius * Math.cos(-midAngle * RADIAN)
                        const y = cy + radius * Math.sin(-midAngle * RADIAN)
                        const lineStart = {
                          x:
                            cx +
                            (outerRadius + 5) * Math.cos(-midAngle * RADIAN),
                          y:
                            cy +
                            (outerRadius + 5) * Math.sin(-midAngle * RADIAN),
                        }

                        return (
                          <g>
                            <path
                              d={`M ${lineStart.x},${lineStart.y} L ${x},${y}`}
                              stroke={COLORS[index % COLORS.length]}
                              fill="none"
                              strokeWidth={1}
                            />
                            <text
                              x={x}
                              y={y}
                              fill={COLORS[index % COLORS.length]}
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              style={{ fontSize: "12px", fontWeight: "500" }}
                              dx={x > cx ? 5 : -5}>
                              {statusData?.[index]?.status} ({value})
                            </text>
                          </g>
                        )
                      }}>
                      {statusData?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </WidgetCard>

            {/* Leave Type Distribution - Bar Chart */}
            <WidgetCard
              title={t("text-leave-type-distribution")}
              className="min-h-[28rem] border-0">
              <div className="flex h-full flex-col">
                <SimpleBar className="flex-grow">
                  <div className="h-[20rem] w-full pt-6 @lg:pt-8">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      debounce={50}
                      {...(isTablet && { minWidth: "1100px" })}>
                      <ComposedChart
                        data={leaveTypeData}
                        margin={{
                          left: -25,
                        }}
                        className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12">
                        <CartesianGrid
                          vertical={false}
                          strokeOpacity={0.435}
                          strokeDasharray="8 10"
                        />
                        <XAxis
                          dataKey="leaveType"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={<CustomYAxisTick />}
                        />
                        <Tooltip content={<CustomTooltip formattedNumber />} />

                        <defs>
                          <linearGradient
                            id="requestsGradient"
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
                            id="daysGradient"
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
                          dataKey="count"
                          name={t("text-requests")}
                          fill="url(#requestsGradient)"
                          stroke="#00A76F"
                          barSize={28}
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          type="natural"
                          dataKey="days"
                          name={t("text-days")}
                          fill="url(#daysGradient)"
                          stroke="#FFAB00"
                          barSize={28}
                          radius={[4, 4, 0, 0]}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </SimpleBar>

                {/* Legend at bottom */}
                <div className="mt-4 flex justify-center">
                  <Legend />
                </div>
              </div>
            </WidgetCard>
          </div>

          {/* Table Grid Section */}
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <Title
                as="h3"
                className={cn("text-base font-semibold sm:text-lg")}>
                {t("text-leave-request-details")}
              </Title>
              <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                <ExportLeaveRequestReport data={data} />
              </div>
            </div>
            <TableGrid
              data={data}
              columns={reportColumns as Column[]}
              gridTemplateColumns="50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
              className="rounded-lg border"
            />
          </div>
        </>
      ) : (
        <div className="flex h-[400px] items-center justify-center text-gray-500">
          {t("text-no-data-available-for-the-selected-period")}
        </div>
      )}
    </WidgetCard>
  )
}

function Legend() {
  const t = useTranslations("common")
  const COLORS = ["#00A76F", "#FFAB00"]
  const items = [{ name: t("text-requests") }, { name: t("text-days") }]

  return (
    <div className="flex flex-wrap items-start gap-3 lg:gap-4">
      {items.map((item, index) => (
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
