"use client"

import { useParams } from "next/navigation"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import AttendanceTable from "@/components/container/hrms/attendance-and-leave/attendance-list/attendance-table"
import EmployeeAttendanceDetailsCard from "@/components/container/hrms/attendance-and-leave/employee-attendance-details-card"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useEmployeeById } from "@/hooks/hrms/employee/use-employee"

const pageHeader = {
  title: "text-employee-attendance-details",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.attendances,
      name: "text-attendances",
    },
    {
      name: "text-attendance-details",
    },
  ],
}

const EmployeeAttendanceDetails = () => {
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = Number(params.employeeId)

  const { data: employeeData, isLoading } = useEmployeeById(employeeId)

  return (
    <div className="max-md:pt-10">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Button type="button" color="black">
            {t("form-back-to-list")}
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-5">
        <EmployeeAttendanceDetailsCard
          employeeData={employeeData}
          isLoading={isLoading}
        />

        <AttendanceTable employeeId={employeeId} />
      </div>
    </div>
  )
}

export default EmployeeAttendanceDetails
