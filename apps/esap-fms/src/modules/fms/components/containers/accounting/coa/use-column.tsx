"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { COAList } from "@/modules/fms/types"

const columnHelper = createColumnHelper<COAList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { hasAnyRole } = useCurrentRole()
  const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("accountName", {
        id: "id",
        size: 340,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-name")}
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
              {row.original.accountNameWithAbbr || ""}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("accountingType", {
        id: "accountingType",
        size: 240,
        header: tableT("table-text-accounting-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.accountingType?.accountingTypeName || ""}
          </Text>
        ),
      }),
      columnHelper.accessor("company.companyName", {
        id: "company",
        size: 240,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.company?.companyName || ""}
          </Text>
        ),
      }),
      columnHelper.accessor("currency.currencyName", {
        id: "currency",
        size: 240,
        header: tableT("table-text-currency"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.currency?.currencyName || ""}
          </Text>
        ),
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        size: isDeleteVisible ? 160 : 120,
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
                content={tableT("table-text-edit-account")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editCOA(row.original.id ?? 0)}
                  aria-label="Edit account">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view-account")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewCOA(row.original.id ?? 0)}
                  aria-label="View account">
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
              {isDeleteVisible && (
                <DeletePopover
                  title="table-text-delete-account"
                  description={`${tableT("table-text-delete-confirm-account")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
              )}
              {/* <ListPopover>
                <Link
                  href={routes.fms.editCOA(row.original.id ?? 0)}
                  aria-label="Edit account"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Link
                  href={routes.fms.viewCOA(row.original.id ?? 0)}
                  aria-label="View account"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Link>
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
              </ListPopover> */}
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
