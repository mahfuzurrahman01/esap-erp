"use client"

import PageHeader from "@/components/base/page-header"
import EmployeeMonthlyReportDashboard from "@/components/container/hrms/reports/employee-reports/employee-monthly-reports-dasbhoard"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-employee-monthly-report",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.employeeMonthlyReport,
      name: "text-employee-monthly-report",
    },
    {
      name: "text-list",
    },
  ],
}

const EmployeeMonthlyReport = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <EmployeeMonthlyReportDashboard />
    </div>
  )
}

export default EmployeeMonthlyReport
