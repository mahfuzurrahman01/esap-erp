"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PaymentIcon from "@/components/icons/payment"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Badge, Button, Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCreateStripePayment } from "@/modules/fms/hooks/use-stripe-payment"
import { PaymentList } from "@/modules/fms/types"

function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Submitted":
      return "info"
    case "Internal Transfer":
      return "purple"
    case "Paid":
      return "emerald"
    case "Cleared":
      return "primary"
    case "Cancelled":
      return "error"
    default:
      return "gray"
  }
}

export const columnHelper = createColumnHelper<PaymentList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { mutate: createStripePayment } = useCreateStripePayment()
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ml-2 font-medium text-gray-900 dark:text-gray-0">
              {tableT("table-text-id")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
            />
            <Link
              href={routes.fms.viewPayment(row.original.id ?? 0)}
              className="ml-2 font-medium text-title transition-all hover:text-primary hover:underline">
              {row.original.paymentNo}
            </Link>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("postingDate", {
        id: "postingDate",
        size: 240,
        header: tableT("table-text-posting-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {dayjs(row.original.postingDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("paymentStatus", {
        id: "status",
        size: 200,
        header: tableT("table-text-status"),
        cell: ({ row }) => (
          <Badge
            variant="flat"
            rounded="lg"
            color={getBadgeColorByStatus(row.original.paymentStatus || "")}>
            {row.original.paymentStatus}
          </Badge>
        ),
      }),
      columnHelper.accessor("paymentAmount", {
        id: "paymentAmount",
        size: 240,
        header: tableT("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.paymentAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("transactionType", {
        id: "transactionType",
        size: 240,
        header: tableT("table-text-payment-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.transactionType}
          </Text>
        ),
      }),
      columnHelper.accessor("company", {
        id: "company",
        size: 240,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.company?.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("modeOfPayment", {
        id: "modeOfPayment",
        size: 240,
        header: tableT("table-text-mode-of-payment"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.modeOfPayment?.modeOfPaymentName}
          </Text>
        ),
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        size: 160,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <ListPopover>
                {row.original.paymentStatus !== "Paid" && row.original.paymentStatus !== "Cleared" && row.original.paymentStatus !== "Internal Transfer" && (
                  <Link
                    href={routes.fms.editPayment(row.original.id ?? 0)}
                    aria-label="Edit payment"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <PencilIcon className="h-4 w-4" />
                    {tableT("table-text-edit")}
                  </Link>
                )}
                <Link
                  href={routes.fms.viewPayment(row.original.id ?? 0)}
                  aria-label="View Payment"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Link>
                {row.original.paymentStatus !== "Paid" && row.original.paymentStatus !== "Cleared" && row.original.paymentStatus !== "Internal Transfer" && (
                  <Button
                    size="sm"
                    variant="text"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-primary/20 hover:text-primary"
                    onClick={() => {
                      createStripePayment({
                        id: row.original.id ?? 0,
                        amount: row.original.paymentAmount ?? 0,
                        successURL: `${window.location.origin}${routes.fms.paymentSuccess(row.original.id ?? 0)}`,
                        cancelURL: `${window.location.origin}${routes.fms.paymentCancel(row.original.id ?? 0)}`,
                      })
                    }}>
                    <PaymentIcon className="h-4 w-4" />
                    {tableT("table-text-make-payment")}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="text"
                  color="danger"
                  className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                  onClick={() => {
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }}>
                  <TrashIcon className="h-4 w-4" />
                  {tableT("table-text-delete")}
                </Button>
              </ListPopover>
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
