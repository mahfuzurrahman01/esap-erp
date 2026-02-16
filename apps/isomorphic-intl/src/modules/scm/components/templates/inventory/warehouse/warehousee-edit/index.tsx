"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import WarehouseCreateEdit from "@/modules/scm/components/containers/invenory/warehouse/warehouse-create"
import { useWarehouseById } from "@/modules/scm/hooks/inventory/warehouse/use-warehouse"
import { Warehouse } from "@/modules/scm/types/inventory/warehouse/warehouse-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-warehouse-edit",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-warehouse-list",
      href: routes.scm.inventory.warehouse.warehouse,
    },
    {
      name: "text-warehouse-edit",
    },
  ],
}

export default function WarehouseEditPage() {
  const params = useParams()
  const { data, isLoading } = useWarehouseById(Number(params?.id))

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <WarehouseCreateEdit initialData={data as Warehouse} isEditForm={true} />
    </>
  )
}
