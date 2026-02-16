"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import PageLoading from "@/modules/scm/components/base/page-loading"
import CreateEditPurchasedOrder from "@/modules/scm/components/containers/procurement/purchased-order/create-purchased-order/index"
import { usePurchasedOrderById } from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order"
import { PurchasedOrder } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"

const pageHeader = {
  title: "text-purchased-order-edit",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchased-order-list",
      href: routes.scm.procurement.purchaseOrders.purchaseOrders,
    },
    {
      name: "text-purchased-order-edit",
    },
  ],
}

export default function EditPurchasedOrderPage() {
  const { id } = useParams()

  const { data: purchasedOrderData, isLoading: isPurchasedOrderLoading } =
    usePurchasedOrderById(Number(id))

  if (isPurchasedOrderLoading) {
    return <PageLoading />
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditPurchasedOrder
        isEditForm={true}
        initialData={purchasedOrderData as PurchasedOrder}
      />
    </>
  )
}
