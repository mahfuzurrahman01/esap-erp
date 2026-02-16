"use client"

import PageHeader from "@/components/base/page-header"
import EmployeeLeaveCalendarView from "@/components/container/hrms/attendance-and-leave/leaves/employee-leave-calendar-view"
import LeaveStatistics from "@/components/container/hrms/attendance-and-leave/leaves/leave-statistics"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-employee-leave-calendar",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.leaveCalendar,
      name: "text-leave-calendar",
    },
    {
      name: "text-employee-leave-calendar",
    },
  ],
}

const EmployeeLeaveCalendar = () => {
  return (
    <div className="@container">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <LeaveStatistics />
      <div className="h-10 md:h-16" />
      <EmployeeLeaveCalendarView />
    </div>
  )
}

export default EmployeeLeaveCalendar
