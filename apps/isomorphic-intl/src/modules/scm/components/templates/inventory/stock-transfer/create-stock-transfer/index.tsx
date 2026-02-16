"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockTransferCreate from "@/modules/scm/components/containers/invenory/stock-transfer/stock-transfer-create"

const pageHeader = {
  title: "text-stock-transfer-create",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-transfer-list",
      href: routes.scm.inventory.stockTransfer.stockTransfer,
    },
    {
      name: "text-stock-transfer-create",
    },
  ],
}

export default function StockTransferCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockTransferCreate />
    </>
  )
}
