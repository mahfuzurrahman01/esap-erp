"use client"

import PageHeader from "@/components/base/page-header"
import LeaveRequestReportsDashboard from "@/components/container/hrms/reports/leave-request-reports/leave-request-reports-dashborad"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-leave-request-report",
  breadcrumb: [
    {
      href: routes.hr.dashboard,

      name: "text-dashboard",
    },
    {
      href: routes.hr.employeeLeaveRequestReport,
      name: "text-leave-request-report",
    },

    {
      name: "text-list",
    },
  ],
}

const LeaveRequestReport = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <LeaveRequestReportsDashboard />
    </div>
  )
}

export default LeaveRequestReport
