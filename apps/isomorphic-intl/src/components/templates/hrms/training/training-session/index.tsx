"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import TrainingSessionFormDrawerView from "@/components/container/hrms/training/training-session/training-session-form-drawer"
import TrainingSessionTable from "@/components/container/hrms/training/training-session/training-session-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-training-session",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.trainingSession,
      name: "text-training-session",
    },
    {
      name: "text-list",
    },
  ],
}

const TrainingSession = () => {
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
                view: <TrainingSessionFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <TrainingSessionTable />
    </div>
  )
}

export default TrainingSession
