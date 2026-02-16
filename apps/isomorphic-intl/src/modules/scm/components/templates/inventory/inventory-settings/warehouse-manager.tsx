"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"
import WarehouseManagerTable from "@/modules/scm/components/containers/invenory/inventory-settings/warehouse-manager/warehouse-manager-table"

import WarehouseManagerFormDrawerView from "@/modules/scm/components/containers/invenory/inventory-settings/warehouse-manager/warehouse-manager-drawer-form"
import { useCurrentRole } from "@/hooks/use-current-role"

const pageHeader = {
  title: "text-warehouse-manager-list",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.inventory.settings.warehouseManager,
      name: "text-warehouse-manager-list",
    },
  ],
}

const WarehouseManager = () => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          {
            isAuthority && (
                        <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <WarehouseManagerFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
            )
          }
        </div>
      </PageHeader>
      <WarehouseManagerTable />
    </div>
  )
}

export default WarehouseManager
