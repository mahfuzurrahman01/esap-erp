"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockTransferCreate from "@/modules/scm/components/containers/invenory/stock-transfer/stock-transfer-create"

const pageHeader = {
  title: "text-stock-transfer-edit",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-transfer-list",
      href: routes.scm.inventory.stockTransfer.stockTransfer,
    },
    {
      name: "text-stock-transfer-edit",
    },
  ],
}

export default function StockTransferEditPage() {
  const params = useParams()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockTransferCreate
        id={Number(params?.id)}
        mode="edit"
      />

    </>
  )
}
