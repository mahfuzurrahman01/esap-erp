"use client"

import { useParams } from "next/dist/client/components/navigation"
import React, { useMemo } from "react"

import PageHeader from "@/components/base/page-header"
import { useRequisitionById } from "@/modules/scm/hooks/procurement/requisition/use-requisition"
import CreateEditPurchasedOrder from "@/modules/scm/components/containers/procurement/purchased-order/create-purchased-order"
import { routes } from "@/config/routes"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-create-purchased-order",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchased-order-list",
      href: routes.scm.procurement.purchaseOrders.purchaseOrders,
    },
    {
      name: "text-create-purchased-order",
    },
  ],
}

export default function CreatePurchasedOrderPage() {
  const { id } = useParams()
  const { data: requisitionData, isLoading: isRequisitionLoading } =
    useRequisitionById(Number(id))

  const loader = useMemo(
    () => (
      <div className="flex justify-center">
        <PageLoading />
      </div>
    ),
    []
  )

  if (isRequisitionLoading) {
    return loader
  }

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateEditPurchasedOrder
        isEditForm={false}
        initialData={requisitionData}
      />
    </>
  )
}
