"use client"

import PageHeader from "@/components/base/page-header"
import EmployeesTable from "@/components/container/hrms/employee/all-employees/employees-table"
import SaudizationStats from "@/components/container/hrms/saudization/saudization-stats"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-saudization",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      name: "text-saudization",
    },
  ],
}

const SaudizationDashboard = () => {
  return (
    <div className="max-md:pt-10">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>

      <div className="flex flex-col gap-5">
        <SaudizationStats />
        <EmployeesTable />
      </div>
    </div>
  )
}

export default SaudizationDashboard
