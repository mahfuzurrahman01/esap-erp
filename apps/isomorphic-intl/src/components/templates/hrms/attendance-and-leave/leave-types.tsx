"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import LeaveTypeFormDrawerView from "@/components/container/hrms/attendance-and-leave/leave-type/leave-type-form-drawer-view"
import LeaveTypeTable from "@/components/container/hrms/attendance-and-leave/leave-type/leave-type-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-leave-types",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.leaveType,
      name: "text-leave-types",
    },
    {
      name: "text-list",
    },
  ],
}

const LeaveTypes = () => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <LeaveTypeFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-add-new")}
          </Button>
        </div>
      </PageHeader>
      <LeaveTypeTable />
    </div>
  )
}

export default LeaveTypes
