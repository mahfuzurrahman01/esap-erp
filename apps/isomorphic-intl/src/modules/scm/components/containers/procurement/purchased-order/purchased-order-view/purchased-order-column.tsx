"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { PurchasedOrderItemDtos } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"

const columnHelper = createColumnHelper<PurchasedOrderItemDtos>()

export const usePurchasedOrderItemsColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const ItemName = t("form-items-name")

    const Quantity = t("form-items-quantity")
    const Unit = t("form-items-unit")
    const UnitPrice = t("form-items-unit-price")
    const Total = t("form-items-total")

    return [
      columnHelper.accessor((row) => `${row?.productName}`, {
        id: "name",
        size: 240,
        header: ItemName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        size: 240,
        header: Quantity,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("itemUnitName", {
        id: "itemUnitName",
        size: 240,
        header: Unit,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("unitPrice", {
        id: "unitPrice",
        size: 240,
        header: UnitPrice,
        enableSorting: false,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            ${row.original?.unitPrice}
          </Text>
        ),
      }),
      columnHelper.accessor("totalPrice", {
        id: "totalPrice",
        size: 240,
        header: Total,
        enableSorting: false,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            ${row.original?.totalPrice}
          </Text>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
