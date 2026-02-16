"use client"

import PageHeader from "@/components/base/page-header"
import SaudiEmployeeReportDashboard from "@/components/container/hrms/reports/saudi-employee-report/saudi-employee-report-dashboard"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-saudi-employee-monthly-report",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.saudiEmployeeMonthlyReport,
      name: "text-saudi-employee-monthly-report",
    },
    {
      name: "text-list",
    },
  ],
}

const SaudiEmployeeMonthlyReport = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SaudiEmployeeReportDashboard />
    </div>
  )
}

export default SaudiEmployeeMonthlyReport
