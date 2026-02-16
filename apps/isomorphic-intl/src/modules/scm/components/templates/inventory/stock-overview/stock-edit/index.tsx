"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockEntry from "@/modules/scm/components/containers/invenory/stock-overview/stock-entry"
import { useStockById } from "@/modules/scm/hooks/inventory/stock/use-stock"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-stock-edit",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-overview-list",
      href: routes.scm.inventory.stock.stockOverview,
    },
    {
      name: "text-stock-edit",
    },
  ],
}

export default function StockEditPage() {
  const params = useParams()
  const { data, isLoading } = useStockById(Number(params?.id))

  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockEntry initialData={data as Stock} isEditForm={true} />
    </>
  )
}
