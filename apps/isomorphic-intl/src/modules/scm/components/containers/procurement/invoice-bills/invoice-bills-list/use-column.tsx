"use client"

import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import PaymentIcon from "@/components/icons/payment"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { getBillingStatusBadge } from "@/modules/scm/components/base/billing-status-badge"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import { formatDate } from "@/utils/format-date"
import { useCurrentRole } from "@/hooks/use-current-role"

const columnHelper = createColumnHelper<Invoice>()

export const useInvoiceColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])


  const columns = useMemo(() => {
    const supplierName = t("form-supplier-name")
    const poID = t("form-po-no")
    const invoiceDate = t("form-invoice-date")
    const dueDate = t("form-due-date")
    const status = t("form-status")
    const totalAmount = t("form-total-amount")
    const invoiceBillNo = t("form-invoice-bill-no")
    const paymentTerms = t("form-payment-terms")
    const requisitionNo = t("form-requisition-no")
    const expectedDeliveryDate = t("form-expected-delivery-date")
    const paymentStatus = t("form-payment-status")

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
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {invoiceBillNo}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.invoiceBillNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("supplierName", {
        id: "supplierName",
        size: 240,
        header: supplierName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("paymentTerms", {
        id: "paymentTerms",
        size: 240,
        header: paymentTerms,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("invoiceDate", {
        id: "invoiceDate",
        size: 240,
        header: invoiceDate,
        cell: ({ row }) => {
          const date = row.original.invoiceDate
            ? new Date(row.original.invoiceDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("dueDate", {
        id: "dueDate",
        size: 240,
        header: dueDate,
        cell: ({ row }) => {
          const date = row.original.dueDate
            ? new Date(row.original.dueDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("expectedDeliveryDate", {
        id: "expectedDeliveryDate",
        size: 240,
        header: expectedDeliveryDate,
        cell: ({ row }) => {
          const date = row.original.expectedDeliveryDate
            ? new Date(row.original.expectedDeliveryDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("billingStatus", {
        id: "billingStatus",
        size: 240,
        header: status,
        filterFn: "statusFilter" as any,
        cell: (info) => getBillingStatusBadge(info.renderValue()!),
      }),
      columnHelper.accessor("paymentStatus", {
        id: "paymentStatus",
        size: 240,
        header: paymentStatus,
        filterFn: "statusFilter" as any,
        cell: (info) => {
          // Check if the paymentStatus is '1' and display 'Paid'
          const statusValue = info.renderValue()
          return statusValue === 1
            ?  getBillingStatusBadge("paid")
            : "-"
        },
      }),
      columnHelper.accessor("billAmount", {
        id: "billAmount",
        size: 240,
        header: totalAmount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.billAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("requisitionNo", {
        id: "requisitionNo",
        size: 240,
        header: requisitionNo,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("purchaseOrderNo", {
        id: "purchaseOrderNo",
        size: 240,
        header: poID,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 60,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end">
            <ListPopover>
              {/* <Link
                href={routes.scm.procurement.invoiceBills.editInvoiceBills(
                  row.original.id!
                )}
                aria-label="edit invoice bill"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link> */}
              <Link
                href={routes.scm.procurement.invoiceBills.invoiceBillsDetails(
                  row.original.id!
                )}
                aria-label="view invoice bill"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              <Link
                href={routes.scm.procurement.invoiceBills.paymentEntry(
                  row.original.id!
                )}
                aria-label="make payment entry"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PaymentIcon className="h-4 w-4" />
                {tableT("table-text-payment-entry")}
              </Link>
              {/* <Link
                href={routes.scm.procurement.invoiceBills.paymentRequest(
                  row.original.id!
                )}
                aria-label="make payment request"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PaymentIcon className="h-4 w-4" />
                {tableT("table-text-payment-request")}
              </Link> */}
              {
                isAuthority && (
                 <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 !px-2.5 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button>
                )
              }
            </ListPopover>
          </div>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
