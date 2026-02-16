"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import LeaveAllocationFormDrawerView from "@/components/container/hrms/attendance-and-leave/leave-allocation/leave-allocation-form-drawer-view"
import LeaveAllocationTable from "@/components/container/hrms/attendance-and-leave/leave-allocation/leave-allocation-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-leave-allocations",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.leaveAllocations,
      name: "text-leave-allocations",
    },
    {
      name: "text-list",
    },
  ],
}

const LeaveAllocation = () => {
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
                view: <LeaveAllocationFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-add-new")}
          </Button>
        </div>
      </PageHeader>
      <LeaveAllocationTable />
    </div>
  )
}

export default LeaveAllocation
