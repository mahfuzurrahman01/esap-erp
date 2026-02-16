"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"
import CarriersFormDrawerView from "@/modules/scm/components/containers/logistic-and-transport/logistic-and-transport-settings/carries/carrier-drawer-form"
import CarriersTable from "@/modules/scm/components/containers/logistic-and-transport/logistic-and-transport-settings/carries/carrier-table"

const pageHeader = {
  title: "text-carriers",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.logisticsAndTransport.settings.carriers,
      name: "text-carriers",
    },
  ],
}

const Carriers = () => {
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
                view: <CarriersFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <CarriersTable />
    </div>
  )
}

export default Carriers
