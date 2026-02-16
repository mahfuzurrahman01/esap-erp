"use client"

import PageHeader from "@/components/base/page-header"
import DailyAttendanceReportDashboard from "@/components/container/hrms/reports/attendance-reports/daily-attendance-report-dashbaord"
import EmployeeMonthlyReportDashboard from "@/components/container/hrms/reports/employee-reports/employee-monthly-reports-dasbhoard"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-daily-attendance-report",
  breadcrumb: [
    {
      href: routes.hr.dashboard,

      name: "text-dashboard",
    },
    {
      href: routes.hr.employeeAttendanceReport,
      name: "text-daily-attendance-report",
    },
    {
      name: "text-list",
    },
  ],
}

const DailyAttendanceReport = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <DailyAttendanceReportDashboard />
    </div>
  )
}

export default DailyAttendanceReport
