"use client"

import { useParams } from "next/navigation"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import AttendanceFormDrawerView from "@/components/container/hrms/attendance-and-leave/attendance-list/attendance-form-drawer-view"
import AttendanceTable from "@/components/container/hrms/attendance-and-leave/attendance-list/attendance-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-attendances",
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
      name: "text-list",
    },
  ],
}

const Attendances = () => {
  const t = useTranslations("form")
  const param = useParams()
  const { openDrawer } = useDrawer()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {!param.employeeId && (
            <Button
              type="button"
              color="black"
              onClick={() =>
                openDrawer({
                  view: <AttendanceFormDrawerView />,
                  placement: "right",
                  containerClassName: "max-w-[32.25rem]",
                })
              }>
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-add-checkIn/checkout")}
            </Button>
          )}
        </div>
      </PageHeader>

      <AttendanceTable />
    </>
  )
}

export default Attendances
