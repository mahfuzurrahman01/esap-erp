"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useTranslations } from "next-intl"
import {
  PiCheckCircle,
  PiClockClockwise,
  PiClockCountdown,
  PiUsers,
} from "react-icons/pi"
import { Badge, Title, cn } from "rizzui"

import Spinner from "@/components/base/spinner"
import TableGrid, { Column } from "@/components/ui/table-grid"
import { useEmployeeDailyAttendanceReport } from "@/hooks/hrms/employee/use-employee-report"
import { useQueryParams } from "@/hooks/use-query-params"
import { EmployeeMonthlyReportQueryOptions } from "@/types/hrms/employee/employee-report.types"

import EmployeeReportToolbar from "../employee-reports/employee-report-toolbar"
import ExportAttendanceReport from "../export-data/attendance-report-export"
import AttendanceStatsCard, {
  AttendanceStatsType,
} from "./attendance-stats-card"

export default function DailyAttendanceReportDashboard() {
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
      id: "checkIn",
      header: t("text-check-in"),
      accessorKey: "checkIn",
      cell: ({ row }: { row: any }) =>
        new Date(row.original.checkIn).toLocaleTimeString(),
    },
    {
      id: "checkOut",
      header: t("text-check-out"),
      accessorKey: "checkOut",
      cell: ({ row }: { row: any }) =>
        row.original.checkOut
          ? new Date(row.original.checkOut).toLocaleTimeString()
          : "-",
    },
    {
      id: "workedHours",
      header: t("text-worked-hours"),
      accessorKey: "workedHours",
      cell: ({ row }: { row: any }) => `${row.original.workedHours}h`,
    },
    {
      id: "checkInMode",
      header: t("text-check-in-mode"),
      accessorKey: "checkInMode",
      cell: ({ row }: { row: any }) =>
        row?.original?.checkInMode != null ? (
          <Badge>{row.original.checkInMode}</Badge>
        ) : (
          "-"
        ),
    },
    {
      id: "checkOutMode",
      header: t("text-check-out-mode"),
      accessorKey: "checkOutMode",
      cell: ({ row }: { row: any }) =>
        row?.original?.checkOutMode != null ? (
          <Badge
            className={cn(
              row.original.checkOutMode === "OnTime"
                ? "bg-green-500"
                : row.original.checkOutMode === "Early"
            )}>
            {row.original.checkOutMode}
          </Badge>
        ) : (
          "-"
        ),
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

  const { data, isLoading } = useEmployeeDailyAttendanceReport({
    startDate: params.startDate,
    endDate: params.endDate,
  })

  // Calculate statistics and prepare chart data
  const stats = data?.reduce(
    (acc: any, curr) => {
      // Track total and average hours
      acc.totalWorkedHours += curr.workedHours || 0

      // Track employees by work duration
      const hours = curr.workedHours || 0
      if (hours < 4) acc.lessThan4Hours++
      else if (hours < 6) acc.between4And6Hours++
      else if (hours < 8) acc.between6And8Hours++
      else acc.moreThan8Hours++

      // Track check-in times for timeline
      const checkInHour = new Date(curr.checkIn || "").getHours()
      acc.checkInTimeline[checkInHour] =
        (acc.checkInTimeline[checkInHour] || 0) + 1

      // Track employee performance
      acc.employeePerformance.push({
        name: `${curr.firstName} ${curr.lastName}`,
        hours: curr.workedHours || 0,
        checkIn: new Date(curr.checkIn || "").toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),

        checkOut: curr.checkOut
          ? new Date(curr.checkOut).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "-",
      })

      return acc
    },
    {
      totalWorkedHours: 0,
      lessThan4Hours: 0,
      between4And6Hours: 0,
      between6And8Hours: 0,
      moreThan8Hours: 0,
      checkInTimeline: {},
      employeePerformance: [],
    }
  ) || {
    totalWorkedHours: 0,
    lessThan4Hours: 0,
    between4And6Hours: 0,
    between6And8Hours: 0,
    moreThan8Hours: 0,
    checkInTimeline: {},
    employeePerformance: [],
  }

  const totalEmployees = data?.length || 0
  const avgWorkedHours = totalEmployees
    ? (stats.totalWorkedHours / totalEmployees).toFixed(1)
    : 0

  // Sort employees by worked hours for the performance chart
  const performanceData = stats.employeePerformance
    .sort((a: any, b: any) => b.hours - a.hours)
    .slice(0, 10) // Top 10 employees

  // Prepare timeline data
  const timelineData = Object.entries(stats.checkInTimeline)
    .map(([hour, count]) => ({
      hour: `${hour.padStart(2, "0")}:00`,
      count,
    }))
    .sort((a, b) => parseInt(a.hour) - parseInt(b.hour))

  console.log(stats.moreThan8Hours, totalEmployees)
  // Prepare stats cards data
  const statsCards: AttendanceStatsType[] = [
    {
      icon: PiUsers,
      title: t("text-total-employees"),
      value: totalEmployees,
      valueColor: "#00C9FF",
      iconClassName: "bg-[#00C9FF]/10 text-[#00C9FF]",
      subtitle: t("text-present-today"),
    },
    {
      icon: PiClockCountdown,
      title: t("text-avg-worked-hours"),
      value: `${avgWorkedHours}h`,
      valueColor: "#10B981",
      iconClassName: "bg-[#10B981]/10 text-[#10B981]",
      subtitle: `${stats.moreThan8Hours} ${t("text-employees-full-day")}`,
    },
    {
      icon: PiCheckCircle,
      title: t("text-on-time-employees"),
      value: stats.moreThan8Hours,
      valueColor: "#8B5CF6",
      iconClassName: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
      subtitle: `${
        stats?.moreThan8Hours != 0 && totalEmployees != 0
          ? ((stats.moreThan8Hours / totalEmployees) * 100).toFixed(0)
          : 0
      }% ${t("text-of-total")}`,
    },

    {
      icon: PiClockClockwise,
      title: t("text-partial-day-employees"),
      value:
        stats.lessThan4Hours +
        stats.between4And6Hours +
        stats.between6And8Hours,
      valueColor: "#F59E0B",
      iconClassName: "bg-[#F59E0B]/10 text-[#F59E0B]",
      subtitle: `< 8 ${t("text-hours")}`,
    },
  ]

  if (isLoading)
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper p-2 dark:bg-paper">
      <EmployeeReportToolbar params={params} updateParams={updateParams} />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stats, index) => (
          <AttendanceStatsCard key={`stats-card-${index}`} stats={stats} />
        ))}
      </div>

      {/* Table Section */}
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <Title as="h3" className={cn("text-base font-semibold sm:text-lg")}>
            {t("text-attendance-details")}
          </Title>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportAttendanceReport data={data} />
          </div>
        </div>

        {data && data.length > 0 ? (
          <TableGrid
            data={data}
            columns={reportColumns as Column[]}
            gridTemplateColumns="50px 1fr 1fr 1fr 1fr 1fr 1fr"
            className="rounded-lg border"
          />
        ) : (
          <div className="flex h-[200px] items-center justify-center text-gray-500">
            {t("text-no-data-available-for-the-selected-period")}
          </div>
        )}
      </div>
    </WidgetCard>
  )
}
