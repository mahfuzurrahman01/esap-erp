"use client"

import Link from "next/link"
import React from "react"

import { useDirection } from "@core/hooks/use-direction"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Button, Input } from "@/components/ui"
import { routes } from "@/config/routes"
import {
  PurchasedOrder,
  PurchasedOrderItemDtos,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"

import { usePurchasedOrderItemsColumn } from "./purchased-order-column"

export default function PurchasedOrderItemsTable({
  purchasedOrderData,
}: {
  purchasedOrderData?: PurchasedOrder
}) {
  const { direction } = useDirection()

  const columns = usePurchasedOrderItemsColumn()

  const { table, columnOrder } = useTanStackTable<PurchasedOrderItemDtos>({
    tableData: (purchasedOrderData?.purchaseOrderItemDtos ?? []).map(
      (item) => ({
        ...item,
        quantity: item.quantity ?? 0,
        unitPrice: item.unitPrice ?? 0,
        totalPrice: item.totalPrice ?? 0,
      })
    ),
    columnConfig: columns,
    options: {
      columnResizeDirection: direction as any,
      columnResizeMode: "onChange",
    },
  })
  const tCommon = useTranslations("common")
  return (
    <div className="mx-4 rounded-lg py-4 @container">
      <Text className="my-2 ml-4 text-base font-medium text-gray-900 dark:text-gray-0">
        {tCommon("text-product-items")}
      </Text>
      <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />
      <div className="mt-4 flex items-end justify-end">
        <div className="block"></div>
        <div className="mr-4 mt-4 flex flex-col justify-end gap-4">
          <div className="flex items-center justify-between gap-5">
            <Text className="text-title">{tCommon("text-total-amount")}</Text>
            <Input value={purchasedOrderData?.orderAmount} disabled />
          </div>
          <div className="flex items-end justify-end">
            <Button className="!w-fit">
              <Link href={routes.scm.procurement.purchaseOrders.purchaseOrders}>
                {tCommon("text-common-back")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
