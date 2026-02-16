import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { SalesInvoice } from "@/modules/crm/types/sales-invoice"

import CustomerCell from "../customers/customer-cell"
import PaymentsIcon from "@/components/icons/paymets"
import { formatDate } from "@/utils/format-date"
import { getApprovalStatusBadge } from "../approvals/status-badge"

const columnHelper = createColumnHelper<SalesInvoice>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const invoiceNo = tableT("table-text-invoice-no")
  const customer = tableT("table-text-customer")
  const status = tableT("table-text-status")
  const total = tableT("table-text-total")
  const orderNo = tableT("table-text-order-no")
  const invoiceDate = tableT("table-text-invoice-date")
  const dueDate = tableT("table-text-due-date")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 20,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        enableSorting: false,
      }),

      columnHelper.accessor("invoiceNo", {
        id: "invoiceNo",
        size: 150,
        header: invoiceNo,
        cell: ({ row }) => {
          return (
            <Link href={routes.crm.viewInvoice(row.original.id ?? "")}>
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {row.original?.invoiceNo}
              </Text>
            </Link>
          )
        },
      }),

      columnHelper.accessor("salesOrder", {
        id: "salesOrder",
        size: 100,
        header: orderNo,
        cell: ({ row }) => (
          <Link href={routes.crm.viewSalesOrder(row.original.salesOrder?.id ?? "")}>
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.salesOrder?.salesOrderNo}
            </Text>
          </Link>
        ),
      }),

      columnHelper.accessor("customer", {
        id: "customer",
        size: 150,
        header: customer,
        cell: ({ row }) => {
          return <Link
          href={routes.crm.viewCustomer(row.original.customerId ?? "")}><CustomerCell customerId={row.original.customerId} /></Link>
        },
        enableSorting: false,
      }),

      columnHelper.accessor("invoiceDate", {
        id: "invoiceDate",
        size: 100,
        header: invoiceDate,
        cell: ({ row }) => {
          const date = row.original.invoiceDate 
            ? new Date(row.original.invoiceDate) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("dueDate", {
        id: "dueDate",
        size: 100,
        header: dueDate,
        cell: ({ row }) => {
          const date = row.original.dueDate 
            ? new Date(row.original.dueDate) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("total", {
        id: "total",
        size: 80,
        header: total,
        cell: ({ row }) => {
          return <span className="font-medium text-gray-900 dark:text-gray-0">{row.original.total}</span>
        },
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 80,
        header: status,
        cell: (row) => row.renderValue() && getApprovalStatusBadge(row.renderValue()),
        enableSorting: false,
      }),
      columnHelper.accessor("action", {
        id: "actions",
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
          <div className="flex items-center justify-end gap-3 pe-3">
            <ListPopover>
              <Link
                href={routes.crm.editInvoice(row.original.id! ?? "")}
                aria-label="Edit account"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.crm.viewInvoice(row.original.id! ?? "")}
                aria-label="View Invoice"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              {/* <Link
                href={routes.crm.paymentRequest(row.original.id)}
                aria-label="Payment Request"
                className="flex w-full items-center gap-2 rounded-md px-1.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PaymentsIcon className="h-4 w-4 ml-1" />
                {tableT("table-text-payment-request")}
              </Link> */}
              <Link
                href={routes.crm.payInvoice(row.original.id!)}
                aria-label="Payment"
                className="flex w-full items-center gap-2 rounded-md px-1.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PaymentsIcon className="h-4 w-4 ml-1" />
                {tableT("table-text-payment-entry")}
              </Link>
              {/* <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button> */}
            </ListPopover>
          </div>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
