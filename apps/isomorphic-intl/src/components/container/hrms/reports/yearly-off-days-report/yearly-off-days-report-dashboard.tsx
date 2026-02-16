"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useTranslations } from "next-intl"
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarTimes,
  FaCalendarWeek,
} from "react-icons/fa"
import { Title, cn } from "rizzui"

import Spinner from "@/components/base/spinner"
import TableGrid, { Column } from "@/components/ui/table-grid"
import { useYearlyOffdayReport } from "@/hooks/hrms/employee/use-employee-report"
import { useQueryParams } from "@/hooks/use-query-params"
import { formatDate } from "@/utils/format-date"

import EmployeeReportToolbar from "../employee-reports/employee-report-toolbar"
import OffDaysStatsCard from "./off-days-stats-card"
import ExportYearlyOffDaysReports from "./yearly-off-days-report-export"

export default function YearlyOffDaysReportDashboard() {
  const t = useTranslations("common")

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

  const { data, isLoading } = useYearlyOffdayReport({
    startDate: params.startDate,
    endDate: params.endDate,
  })

  const totalOffDays = Array.isArray(data)
    ? data.reduce((sum, item) => sum + (item.totalDays || 0), 0)
    : 0

  const uniqueOffDays = Array.isArray(data)
    ? new Set(data.map((item) => item.offDayName)).size
    : 0

  const upcomingOffDays = Array.isArray(data)
    ? data
        .filter((item) => new Date(item.dateFrom || "") > new Date())
        .reduce((sum, item) => sum + (item.totalDays || 0), 0)
    : 0

  const currentMonthOffDays = Array.isArray(data)
    ? data
        .filter((item) => {
          const offDayDate = new Date(item.dateFrom || "")
          const currentDate = new Date()
          return (
            offDayDate.getMonth() === currentDate.getMonth() &&
            offDayDate.getFullYear() === currentDate.getFullYear()
          )
        })
        .reduce((sum, item) => sum + (item.totalDays || 0), 0)
    : 0

  const statsCards = [
    {
      icon: FaCalendarAlt,
      title: t("text-total-off-days"),
      value: totalOffDays,
      subtitle: t("text-total-days-in-selected-period"),
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      icon: FaCalendarCheck,
      title: t("text-unique-off-days"),
      value: uniqueOffDays,
      subtitle: t("text-distinct-holidays"),
      iconClassName: "bg-green-100 text-green-600",
    },
    {
      icon: FaCalendarTimes,
      title: t("text-upcoming-off-days"),
      value: upcomingOffDays,
      subtitle: t("text-future-holidays"),
      iconClassName: "bg-orange-100 text-orange-600",
    },
    {
      icon: FaCalendarWeek,
      title: t("text-current-month-off-days"),
      value: currentMonthOffDays,
      subtitle: t("text-this-month"),
      iconClassName: "bg-purple-100 text-purple-600",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper p-2 dark:bg-paper">
      <EmployeeReportToolbar params={params} updateParams={updateParams} />

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 md:grid-cols-4">
        {statsCards.map((stats, index) => (
          <OffDaysStatsCard key={index} stats={stats} />
        ))}
      </div>
      {/* Table Grid Section */}
      <TableSection data={data || []} />
    </WidgetCard>
  )
}

function TableSection({ data }: { data: any[] }) {
  const t = useTranslations("common")

  const columns = [
    {
      id: "id",
      header: t("text-id"),
      accessorKey: "id",
      cell: ({ row }: { row: any }) => row.index + 1,
    },
    {
      id: "offDayName",
      header: t("text-off-day-name"),
      accessorKey: "offDayName",
    },
    {
      id: "totalDays",
      header: t("text-total-days"),
      accessorKey: "totalDays",
    },
    {
      id: "leaveType",
      header: t("text-leave-type"),
      accessorKey: "leaveType",
    },
    {
      id: "dateFrom",
      header: t("text-date-from"),
      accessorKey: "dateFrom",
      cell: ({ row }: { row: any }) => formatDate(row.original.dateFrom),
    },
    {
      id: "dateTo",
      header: t("text-date-to"),
      accessorKey: "dateTo",
      cell: ({ row }: { row: any }) => formatDate(row.original.dateTo),
    },
    {
      id: "description",
      header: t("text-description"),
      accessorKey: "description",
    },
  ]

  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <Title as="h3" className={cn("text-base font-semibold sm:text-lg")}>
          {t("text-employee-details")}
        </Title>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportYearlyOffDaysReports data={data} />
        </div>
      </div>
      {data && data.length > 0 ? (
        <TableGrid
          data={data}
          columns={columns as Column[]}
          gridTemplateColumns="50px 1fr 1fr 1fr 1fr 1fr 1fr"
          className="rounded-lg border"
        />
      ) : (
        <div className="flex h-[200px] items-center justify-center text-gray-500">
          {t("text-no-data-available")}
        </div>
      )}
    </div>
  )
}
