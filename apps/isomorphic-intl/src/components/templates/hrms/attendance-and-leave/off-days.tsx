"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import OffDayFormDrawerView from "@/components/container/hrms/attendance-and-leave/off-day/off-day-form-drawer-view"
import OffDayTable from "@/components/container/hrms/attendance-and-leave/off-day/off-day-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-off-days",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.offDays,
      name: "text-off-days",
    },
    {
      name: "text-list",
    },
  ],
}

const OffDays = () => {
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
                view: <OffDayFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-add-new")}
          </Button>
        </div>
      </PageHeader>

      <OffDayTable />
    </>
  )
}

export default OffDays
