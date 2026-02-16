"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"
import WorkCenterFormDrawerView from "@/modules/scm/components/containers/production-control/production-control-settings/work-center/work-center-drawer-form"
import WorkCenterTable from "@/modules/scm/components/containers/production-control/production-control-settings/work-center/work-center-table"

const pageHeader = {
  title: "text-work-center",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.productionControl.settings.workCenter,
      name: "text-work-center",
    },
  ],
}

const WorkCenter = () => {
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
                view: <WorkCenterFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <WorkCenterTable />
    </div>
  )
}

export default WorkCenter
