"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockEntry from "@/modules/scm/components/containers/invenory/stock-overview/stock-entry"

const pageHeader = {
  title: "text-stock-entry",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-overview-list",
      href: routes.scm.inventory.stock.stockOverview,
    },
    {
      name: "text-stock-entry",
    },
  ],
}

export default function StockEntryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockEntry />
    </>
  )
}
