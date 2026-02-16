"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import LeaveRequestFormDrawer from "@/components/container/hrms/attendance-and-leave/leaves/leave-request-form-drawer"
import LeaveRequestTable from "@/components/container/hrms/attendance-and-leave/leaves/leave-request-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-leave-request",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.leaveRequest,
      name: "text-leave-request",
    },
    {
      name: "text-list",
    },
  ],
}

const LeaveRequestView = () => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <LeaveRequestFormDrawer />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-add-new")}
          </Button>
        </div>
      </PageHeader>

      <LeaveRequestTable />
    </>
  )
}

export default LeaveRequestView
