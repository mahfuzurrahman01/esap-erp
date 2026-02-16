"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import TrainingAttendanceFormDrawerView from "@/components/container/hrms/training/training-attendance/training-attendance-form-drawer"
import TrainingAttendanceTable from "@/components/container/hrms/training/training-attendance/training-attendance-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-training-attendance",
  breadcrumb: [
    {
      href: routes.hr.trainingProgram,
      name: "text-training-program",
    },
    {
      href: routes.hr.attendance,
      name: "text-training-attendance",
    },
    {
      name: "text-list",
    },
  ],
}

const Attendance = () => {
  const t = useTranslations("form")
  const { openDrawer } = useDrawer()
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <TrainingAttendanceFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <TrainingAttendanceTable />
    </div>
  )
}

export default Attendance
