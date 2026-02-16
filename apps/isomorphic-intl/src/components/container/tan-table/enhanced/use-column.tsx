import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Button, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { routes } from "@/config/routes"
import { COAList } from "@/modules/fms/types"

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "pending":
      return (
        <Button
          size="sm"
          className="hover:bg-orange/12 h-6 bg-orange/15 font-bold text-orange-dark dark:text-orange-light">
          {status}
        </Button>
      )
    case "paid":
      return (
        <Button
          size="sm"
          className="hover:bg-blue/12 h-6 bg-blue/15 font-bold text-blue-dark dark:text-blue-light">
          {status}
        </Button>
      )
    case "overdue":
      return (
        <Button
          size="sm"
          className="hover:bg-red/12 h-6 bg-red/15 font-bold text-red-dark dark:text-red-light">
          {status}
        </Button>
      )
    default:
      return (
        <Button
          size="sm"
          className="hover:bg-primary/12 h-6 bg-primary/15 font-bold text-primary-dark dark:text-primary-light">
          {status}
        </Button>
      )
  }
}

const columnHelper = createColumnHelper<COAList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const accounting = t("form-accounting")
    const accountingType = t("form-accounting-type")
    const accountingNumber = t("form-accounting-number")
    const parentsAccount = t("form-parents-account")
    const status = t("form-status")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("accountName", {
        id: "accountName",
        size: 240,
        header: accounting,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.accountName}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("accountingType", {
        id: "accountingType",
        size: 240,
        header: accountingType,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.accountingType?.accountingTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("accountNumber", {
        id: "accountNumber",
        size: 240,
        header: accountingNumber,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.accountNumber}
          </Text>
        ),
      }),
      columnHelper.accessor("actions", {
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
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-invoice")}
                placement="top"
                className="dark:bg-gray-0 dark:text-gray-800"
                arrowClassName="dark:fill-gray-0"
                color="invert">
                <Link
                  href={routes.fms.editCOA(row.original.id ?? 0)}
                  aria-label="go to invoice edit">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    className="border-gray-500/20">
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view-invoice")}
                placement="top"
                className="dark:bg-gray-0 dark:text-gray-800"
                arrowClassName="dark:fill-gray-0"
                color="invert">
                <Link
                  href={routes.fms.viewCOA(row.original.id ?? 0)}
                  aria-label="go to invoice details">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    className="border-gray-500/20">
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-invoice"
                description={`table-text-delete-confirm-invoice #${row.id} table-text-invoice?`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [t, tableT])

  return columns
}
