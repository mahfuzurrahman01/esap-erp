"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import TrainingFeedbackFormDrawerView from "@/components/container/hrms/training/training-feedbacks/training-feedback-form-drawer-view"
import TrainingFeedbackTable from "@/components/container/hrms/training/training-feedbacks/training-feedbacks-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-training-feedbacks",
  breadcrumb: [
    {
      href: routes.hr.trainingProgram,
      name: "text-training-program",
    },
    {
      href: routes.hr.trainingFeedbacks,
      name: "text-training-feedbacks",
    },
    {
      name: "text-list",
    },
  ],
}

const TrainingFeedbacks = () => {
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
                view: <TrainingFeedbackFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <TrainingFeedbackTable />
    </div>
  )
}

export default TrainingFeedbacks
