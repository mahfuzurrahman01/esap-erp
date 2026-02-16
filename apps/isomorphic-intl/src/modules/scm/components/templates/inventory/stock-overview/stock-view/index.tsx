"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockView from "@/modules/scm/components/containers/invenory/stock-overview/stock-view"
import { useStockById } from "@/modules/scm/hooks/inventory/stock/use-stock"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-stock-details",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-overview-list",
      href: routes.scm.inventory.stock.stockOverview,
    },
    {
      name: "text-stock-details",
    },
  ],
}

export default function StockDetailsPage() {
  const params = useParams()

  const { data, isLoading } = useStockById(Number(params?.id))

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StockView initialData={data as Stock} />
    </>
  )
}
