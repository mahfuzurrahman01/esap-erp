"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import PurchasedOrderTable from "@/modules/scm/components/containers/procurement/purchased-order/purchased-order-list"
import Link from "next/link"
import { routes } from "@/config/routes"
import { Button } from "@/components/ui"
import { PiPlusBold } from "react-icons/pi"
import { useTranslations } from "next-intl"

const pageHeader = {
  title: "text-purchased-order-list",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchased-order-list",
    },
  ],
}

export default function PurchasedOrderList() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.procurement.purchaseOrders.createPurchaseOrder}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <PurchasedOrderTable />
    </>
  )
}
