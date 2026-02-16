"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditPurchasedOrder from "@/modules/scm/components/containers/procurement/purchased-order/create-purchased-order"
import { usePurchasedOrderById } from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order"
import { PurchasedOrder } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

export const pageHeader = {
  title: "text-purchased-order-details",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchased-order-list",
      href: routes.scm.procurement.purchaseOrders.purchaseOrders,
    },
    {
      name: "text-purchased-order-details",
    },
  ],
}

export default function PurchasedOrderDetailsPage() {
  const t = useTranslations("common")
  const params = useParams()
  const router = useRouter()
  const { data: purchasedOrderData, isLoading } = usePurchasedOrderById(
    Number(params.id) as number
  )
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <TranslatableButton
            href={routes.fms.printPayment(id)}
            icon={<PrintIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          /> */}
          <TranslatableButton
            href={routes.scm.procurement.purchaseOrders.editPurchaseOrders(
              Number(params.id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button
            onClick={() => {
              router.back()
            }}>
            {t("text-back")}
          </Button>
        </div>
      </PageHeader>
      <CreateEditPurchasedOrder
        initialData={purchasedOrderData as PurchasedOrder}
        isViewForm={true}
        isEditForm={false}
      />
    </>
  )
}
