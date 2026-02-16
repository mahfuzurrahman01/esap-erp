"use client"

import { useMemo } from "react"
import WidgetCard from "@core/components/cards/widget-card"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
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
import { useExpatriateEmployeeMonthlyReport } from "@/hooks/hrms/employee/use-employee-report"
import { useQueryParams } from "@/hooks/use-query-params"
import { EmployeeMonthlyReportQueryOptions } from "@/types/hrms/employee/employee-report.types"

import EmployeeReportToolbar from "../employee-reports/employee-report-toolbar"
import ExportEmployeeReport from "../export-data/employee-reports-export"

export default function ExpatriatesReportDashboard() {
  const t = useTranslations("common")

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
      id: "email",
      header: t("text-email"),
      accessorKey: "email",
      cell: ({ row }: { row: any }) => row.original.email,
    },
    {
      id: "department",
      header: t("text-department"),
      accessorKey: "department",
      cell: ({ row }: { row: any }) => row.original.department,
    },
    {
      id: "jobPosition",
      header: t("text-job-position"),
      accessorKey: "jobPosition",
      cell: ({ row }: { row: any }) => row.original.jobPosition,
    },
    {
      id: "manager",
      header: t("text-manager"),
      accessorKey: "manager",
      cell: ({ row }: { row: any }) => row.original.manager,
    },
    {
      id: "coach",
      header: t("text-coach"),
      accessorKey: "coach",
      cell: ({ row }: { row: any }) => row.original.coach,
    },
    {
      id: "country",
      header: t("text-country"),
      accessorKey: "country",
      cell: ({ row }: { row: any }) => row.original.country,
    },
  ]

  const { params, updateParams } =
    useQueryParams<EmployeeMonthlyReportQueryOptions>({
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

  const { data, isLoading } = useExpatriateEmployeeMonthlyReport({
    startDate: params.startDate,
    endDate: params.endDate,
  })

  const isTablet = useMedia("(max-width: 820px)", false)

  // Memoize chart data to prevent Recharts update loop
  const departmentData = useMemo(
    () =>
      data?.reduce((acc: any[], curr) => {
        const existingDept = acc.find((item) => item.department === curr.department)
        if (existingDept) {
          existingDept.count++
        } else {
          acc.push({ department: curr.department, count: 1 })
        }
        return acc
      }, []) ?? [],
    [data]
  )

  const jobPositionData = useMemo(
    () =>
      data?.reduce((acc: any[], curr) => {
        const existingPos = acc.find((item) => item.position === curr.jobPosition)
        if (existingPos) {
          existingPos.count++
        } else {
          acc.push({ position: curr.jobPosition, count: 1 })
        }
        return acc
      }, []) ?? [],
    [data]
  )

  const COLORS = [
    "#00C9FF", // vibrant cyan
    "#92FE9D", // mint green
    "#FF9A9E", // coral pink
    "#A18CD1", // dusty purple
    "#FFD26F", // golden yellow
    "#4FACFE", // bright blue
    "#00F2FE", // aqua
    "#F093FB", // pink
    "#43E97B", // emerald
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
            {/* Department Distribution - Pie Chart */}
            <WidgetCard
              title={t("text-department-distribution")}
              className="min-h-[400px] border-0">
              <ResponsiveContainer width="100%" height={350} debounce={50}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    dataKey="count"
                    nameKey="department"
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
                      department,
                    }) => {
                      const RADIAN = Math.PI / 180
                      const radius = outerRadius + 25
                      const x = cx + radius * Math.cos(-midAngle * RADIAN)
                      const y = cy + radius * Math.sin(-midAngle * RADIAN)

                      // Calculate the point where the line should start (at the outer edge of pie)
                      const lineStart = {
                        x:
                          cx + (outerRadius + 5) * Math.cos(-midAngle * RADIAN),
                        y:
                          cy + (outerRadius + 5) * Math.sin(-midAngle * RADIAN),
                      }

                      return (
                        <g>
                          {/* Connecting line */}
                          <path
                            d={`M ${lineStart.x},${lineStart.y} L ${x},${y}`}
                            stroke={COLORS[index % COLORS.length]}
                            fill="none"
                            strokeWidth={1}
                          />
                          {/* Label text */}
                          <text
                            x={x}
                            y={y}
                            fill={COLORS[index % COLORS.length]}
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            style={{ fontSize: "12px", fontWeight: "500" }}
                            dx={x > cx ? 5 : -5}>
                            {departmentData &&
                              departmentData[index]?.department}
                          </text>
                        </g>
                      )
                    }}>
                    {departmentData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  {/* Center text showing total */}
                  <text
                    x="50%"
                    y="42%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-900 dark:fill-gray-100"
                    style={{ fontSize: "28px", fontWeight: "bold" }}>
                    {departmentData?.reduce((sum, item) => sum + item.count, 0)}
                  </text>
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-500"
                    style={{ fontSize: "14px" }}>
                    {t("text-total-employees")}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </WidgetCard>

            {/* Job Position Trend - Area Chart */}
            <WidgetCard
              title={t("text-job-position-trend")}
              description={
                <>
                  <Badge renderAsDot className="ms-1 bg-[#00C9FF]" />{" "}
                  {t("text-job-position")}
                  <Badge renderAsDot className="me-1 ms-4 bg-[#92FE9D]" />{" "}
                  {t("text-growth")}
                </>
              }
              descriptionClassName="text-gray-500 mt-1.5"
              className="min-h-[400px] border-transparent">
              <SimpleBar>
                <div className="h-[350px] w-full pt-9">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    debounce={50}
                    {...(isTablet && { minWidth: "700px" })}>
                    <AreaChart
                      data={jobPositionData}
                      margin={{
                        left: -16,
                      }}
                      className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0">
                      <defs>
                        <linearGradient
                          id="colorCount"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1">
                          <stop
                            offset="5%"
                            stopColor="#00C9FF"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00C9FF"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPrev"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1">
                          <stop
                            offset="5%"
                            stopColor="#92FE9D"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#92FE9D"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="8 10"
                        strokeOpacity={0.435}
                      />
                      <XAxis
                        dataKey="position"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#00C9FF"
                        strokeWidth={2.3}
                        fillOpacity={1}
                        fill="url(#colorCount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </SimpleBar>
            </WidgetCard>
          </div>

          {/* Table Grid Section */}
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <Title
                as="h3"
                className={cn("text-base font-semibold sm:text-lg")}>
                {t("text-employee-details")}
              </Title>
              <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                <ExportEmployeeReport data={data} />
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
