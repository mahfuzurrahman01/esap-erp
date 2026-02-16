"use client"

import PageHeader from "@/components/base/page-header"
import YearlyOffDaysReportDashboard from "@/components/container/hrms/reports/yearly-off-days-report/yearly-off-days-report-dashboard"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-yearly-off-days-report",
  breadcrumb: [
    {
      href: routes.hr.dashboard,

      name: "text-dashboard",
    },
    {
      href: routes.hr.yearlyOffDaysReport,
      name: "text-yearly-off-days-report",
    },
    {
      name: "text-list",
    },
  ],
}

const YearlyOffDaysReport = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <YearlyOffDaysReportDashboard />
    </div>
  )
}

export default YearlyOffDaysReport
