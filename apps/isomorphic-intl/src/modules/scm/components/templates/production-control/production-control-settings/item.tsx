"use client"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import ItemTable from "@/modules/scm/components/containers/production-control/production-control-settings/item/item-table"
import ItemFormDrawerView from "../../../containers/production-control/production-control-settings/item/item-drawer-form"
import { PiPlusBold } from "react-icons/pi"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useTranslations } from "next-intl"
import { messages } from "@/config/messages"

const pageHeader = {
  title: "text-item",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.productionControl.settings.item,
      name: "text-item",
    },
  ],
}

const Item = () => {
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
                view: <ItemFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <ItemTable />
    </div>
  )
}

export default Item
