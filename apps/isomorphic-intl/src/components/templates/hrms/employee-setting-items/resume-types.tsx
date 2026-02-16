"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import ResumeTypesFormDrawerView from "@/components/container/hrms/employee-setting-items/resume-types/resume-types-form-drawer-view"
import ResumeTypesTable from "@/components/container/hrms/employee-setting-items/resume-types/resume-types-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-resume-types",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.resumeTypeSettings,
      name: "text-resume-types",
    },
    {
      name: "text-list",
    },
  ],
}

const ResumeTypes = () => {
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
                view: <ResumeTypesFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <ResumeTypesTable />
    </div>
  )
}

export default ResumeTypes
