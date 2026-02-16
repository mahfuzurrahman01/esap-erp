import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Badge, Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { BankTransactionList } from "@/modules/fms/types/bank-transaction"

function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Reconciled":
      return "success"
    case "Unreconciled":
      return "warning"
    case "Cancelled":
      return "danger"
    default:
      return "default"
  }
}

const columnHelper = createColumnHelper<BankTransactionList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 250,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
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
            <Text className="ms-2 font-medium text-title">
              {row.original.bankTransactionCode}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("transactionDate", {
        id: "transactionDate",
        size: 200,
        header: tableT("table-text-transaction-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {dayjs(row.original.transactionDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("bankAccount.accountName", {
        id: "bankAccountName",
        size: 200,
        header: tableT("table-text-bank-account"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.bankAccount?.accountName}
          </Text>
        ),
      }),
      columnHelper.accessor("company.companyName", {
        id: "companyName",
        size: 200,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.company?.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("transactionType", {
        id: "transactionType",
        size: 200,
        header: tableT("table-text-transaction-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">{row.original.transactionType}</Text>
        ),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 150,
        header: tableT("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
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
            color={getBadgeColorByStatus(
              row.original.status || ""
            )}>
            {row.original.status}
          </Badge>
        ),
      }),
      columnHelper.accessor("action", {
        id: "action",
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
          <div className="flex items-center justify-end gap-3 pe-3">
            {/* <Tooltip
              size="sm"
              content={tableT("table-text-edit-bank-transaction")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.fms.editBankTransaction(row.original.id)}
                aria-label="Edit bank transaction">
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip> */}
            <Tooltip
              size="sm"
              content={tableT("table-text-view-bank-transaction")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.fms.viewBankTransaction(row.original.id)}
                aria-label="View bank transaction">
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20">
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <DeletePopover
              title="table-text-delete-bank-transaction"
              description={`${tableT("table-text-delete-confirm-bank-transaction")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ]
  }, [t, tableT])

  return columns
}
