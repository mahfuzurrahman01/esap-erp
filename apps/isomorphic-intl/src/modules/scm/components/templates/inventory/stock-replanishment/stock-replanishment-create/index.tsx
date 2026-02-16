"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockReplenishmentEntry from "@/modules/scm/components/containers/invenory/stock-replenishment/stock-replenishment-entry"

const pageHeader = {
  title: "text-stock-replenishment-create",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-replenishment-list",
      href: routes.scm.inventory.stockReplenishment.stockReplenishment,
    },
    {
      name: "text-stock-replenishment-create",
    },
  ],
}

export default function StockReplenishmentCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockReplenishmentEntry />
    </>
  )
}
