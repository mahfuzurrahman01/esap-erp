"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Badge, Button, Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { PaymentRequestList } from "@/modules/fms/types"
import ListPopover from "@/components/base/list-popover"
import TrashIcon from "@/components/icons/trash"
import PaymentIcon from "@/components/icons/payment"
import { useUpdatePaymentRequestStatus } from "@/modules/fms/hooks/use-payments-request"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import PaymentsIcon from "@/components/icons/paymets"
import CancelIcon from "@/components/icons/cancel"

function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Draft":
      return "black"
    case "Submitted":
      return "info"
    case "Approved":
      return "success"
    case "Partially Paid":
      return "warning"
    case "Paid":
      return "primary"
    case "Failed":
      return "danger"
    case "Cancelled":
      return "danger"
    default:
      return "default"
  }
}

const columnHelper = createColumnHelper<PaymentRequestList>()

export const useColumn = (refetch: () => void) => {
  const tableT = useTranslations("table")
  const { mutate: updateStatus } = useUpdatePaymentRequestStatus()

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
            <Text className="ml-2 font-medium text-gray-900 dark:text-gray-500">
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
            <Text className="ml-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.paymentRequestNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("transactionDate", {
        id: "transactionDate",
        size: 240,
        header: tableT("table-text-posting-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.transactionDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("paymentRequestType", {
        id: "paymentRequestType",
        size: 240,
        header: tableT("table-text-payment-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.paymentRequestType}
          </Text>
        ),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 240,
        header: tableT("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.amount}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 150,
        header: tableT("table-text-status"),
        cell: ({ row }) => (
          <Badge
            variant="flat"
            rounded="lg"
            color={getBadgeColorByStatus(row.original.status || "")}>
            {row.original.status}
          </Badge>
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
                {row.original.status !== "Cancelled" && (
                  <Link
                    href={routes.fms.editPayment(row.original.id ?? 0)}
                    aria-label="Edit payment"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <PencilIcon className="h-4 w-4" />
                    {tableT("table-text-edit")}
                  </Link>
                )}
                <Link
                  href={routes.fms.viewPaymentRequest(row.original.id ?? 0)}
                  aria-label="View Payment"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Link>
                {row.original.status !== "Approved" && row.original.status !== "Cancelled" && (
                  <Button
                    size="sm"
                    variant="text"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-primary/20 hover:text-primary"
                    onClick={() => {
                      updateStatus(
                        { id: row.original.id ?? 0, status: "Approved" },
                        {
                          onSuccess: () => {
                            refetch()
                          },
                        }
                      )
                    }}>
                    <ApproveIcon className="h-4 w-4" />
                    {tableT("table-text-approve")}
                  </Button>
                )}

                {row.original.status === "Approved" && (
                  <Link
                    href={routes.fms.createPayment}
                    aria-label="Create Payment Entry"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <PaymentsIcon className="h-4 w-4" />
                    {tableT("table-text-create-payment-entry")}
                  </Link>
                )}

                {row.original.status !== "Cancelled" && (
                  <Button
                    size="sm"
                    variant="text"
                    color="danger"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                    onClick={() => {
                      updateStatus(
                        { id: row.original.id ?? 0, status: "Cancelled" },
                        {
                          onSuccess: () => {
                            refetch()
                          },
                        }
                      )
                    }}>
                    <CancelIcon className="h-4 w-4" />
                    {tableT("table-text-cancelled")}
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
  }, [tableT, updateStatus, refetch])

  return columns
}
