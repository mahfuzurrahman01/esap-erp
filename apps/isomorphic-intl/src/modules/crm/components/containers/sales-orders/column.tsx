import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { SalesOrderList } from "@/modules/crm/types/sales-order"

import { getApprovalStatusBadge } from "../approvals/status-badge"
import CustomerCell from "../customers/customer-cell"
import { formatDate } from "@/utils/format-date"
import { LuFileText } from "react-icons/lu"

const columnHelper = createColumnHelper<SalesOrderList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const salesOrderNo = tableT("table-text-sales-order-no")
  const quotationNo = tableT("table-text-quotation-no")
  const customer = tableT("table-text-customer")
  const type = tableT("table-text-type")
  const total = tableT("table-text-total")
  const title = tableT("table-text-title")
  const stage = tableT("table-text-stage")
  const deliveryDate = tableT("table-text-delivery-date")

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
      
      columnHelper.accessor("salesOrderNo", {
        id: "salesOrderNo",
        size: 200,
        header: salesOrderNo,
        cell: ({ row }) => {
          return (
            <Link href={routes.crm.viewSalesOrder(row.original.id ?? "")}>
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {row.original?.salesOrderNo}
              </Text>
            </Link>
          )
        },
      }),
      
      columnHelper.accessor("quotation", {
        id: "quotation",
        size: 150,
        header: quotationNo,
        cell: ({ row }) => {
          return (
            <Link
              href={routes.crm.viewQuotation(row.original?.quotation?.id ?? "")}>
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {row.original?.quotation?.quotationNo}
              </Text>
            </Link>
          )
        },
      }),

      columnHelper.accessor("title", {
        id: "title",
        size: 150,
        header: title,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.title}>
            {row.original.title}
          </span>
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

      columnHelper.accessor("type", {
        id: "type",
        size: 150,
        header: type,
        cell: ({ row }) => {
          return <span className="font-medium text-gray-900 dark:text-gray-0">{row.original.type}</span>
        },
      }),

      columnHelper.accessor("delivaryDate", {
        id: "delivaryDate",
        size: 150,
        header: deliveryDate,
        cell: ({ row }) => {
          const date = row.original.delivaryDate 
            ? new Date(row.original.delivaryDate) 
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
        size: 150,
        header: total,
        cell: ({ row }) => {
          return <span className="font-medium text-gray-900 dark:text-gray-0">{row.original.total}</span>
        },
      }),
      columnHelper.accessor("stages", {
        id: "stages",
        size: 150,
        header: stage,
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
                href={routes.crm.editSalesOrder(row.original.id ?? "")}
                aria-label="Edit account"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.crm.viewSalesOrder(row.original.id ?? "")}
                aria-label="View Sales Order"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              <Link
                href={`/crm/sales-invoice/create?salesOrderId=${row.original.id}`}
                aria-label="Invoice create"
                className="flex w-full items-center gap-2 rounded-md px-3 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <LuFileText className="h-4 w-4" />
                {tableT("table-text-generate-invoice")}
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
