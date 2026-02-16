"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import WorkingScheduleFormDrawerView from "@/components/container/hrms/employee-setting-items/working-schedule/working-schedule-form-drawer"
import WorkingScheduleTable from "@/components/container/hrms/employee-setting-items/working-schedule/working-schedule-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-work-schedules",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.workingSchedule,
      name: "text-work-schedules",
    },
    {
      name: "text-list",
    },
  ],
}

const WorkingSchedule = () => {
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
                view: <WorkingScheduleFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-4xl",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <WorkingScheduleTable />
    </div>
  )
}

export default WorkingSchedule
