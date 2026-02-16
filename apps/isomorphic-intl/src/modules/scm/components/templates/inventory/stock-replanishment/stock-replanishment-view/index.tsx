"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockReplenishmentView from "@/modules/scm/components/containers/invenory/stock-replenishment/stock-replenishment-view"
import { useStockReplenishmentById } from "@/modules/scm/hooks/inventory/stock-replanishment/use-stock-replanishment"
import { StockReplenishment } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-stock-replenishment-list",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-replenishment-list",
      href: routes.scm.inventory.stockReplenishment.stockReplenishment,
    },
    {
      name: "text-stock-replenishment-list",
    },
  ],
}

export default function StockReplenishmentViewPage() {
  const params = useParams()
  const { data: initialData, isLoading } = useStockReplenishmentById(
    Number(params.id)
  )

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockReplenishmentView initialData={initialData as StockReplenishment} />
    </>
  )
}
