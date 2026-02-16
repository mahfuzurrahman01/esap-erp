"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import WarehouseCreateEdit from "@/modules/scm/components/containers/invenory/warehouse/warehouse-create"

const pageHeader = {
  title: "text-warehouse-create",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-warehouse-list",
      href: routes.scm.inventory.warehouse.warehouse,
    },
    {
      name: "text-warehouse-create",
    },
  ],
}

export default function WarehouseCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <WarehouseCreateEdit isEditForm={false} />
    </>
  )
}
