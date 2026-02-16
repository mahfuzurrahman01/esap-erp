"use client"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import MachineTable from "@/modules/scm/components/containers/production-control/production-control-settings/machine/machine-table"
import MachineFormDrawerView from "../../../containers/production-control/production-control-settings/machine/machine-drawer-form"
import { PiPlusBold } from "react-icons/pi"
import { messages } from "@/config/messages"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useTranslations } from "next-intl"

const pageHeader = {
  title: "text-machine",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.productionControl.settings.machine,
      name: "text-machine",
    },
  ],
}

const Machine = () => {
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
                view: <MachineFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <MachineTable />
    </div>
  )
}

export default Machine
