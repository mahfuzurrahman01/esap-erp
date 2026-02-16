"use client"

import PageHeader from "@/components/base/page-header"
import ExpatriatesReportDashboard from "@/components/container/hrms/reports/expatriates-reports/expatriates-report-dashboard"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-expatriates-monthly-report",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.expatriatesMonthlyReport,
      name: "text-expatriates-monthly-report",
    },
    {
      name: "text-list",
    },
  ],
}

const ExpatriatesMonthlyReport = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ExpatriatesReportDashboard />
    </div>
  )
}

export default ExpatriatesMonthlyReport
