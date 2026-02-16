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
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { BudgetList } from "@/modules/fms/types"

const columnHelper = createColumnHelper<BudgetList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { coa } = useSharedDataHooks(["coa"])
  const { coaOptions, isCOALoading } = coa

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
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-title")}
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
              {row.original.budgetName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("budgetAgainst.budgetAgainstName", {
        id: "budgetAgainst",
        size: 250,
        header: tableT("table-text-budget-against"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.budgetAgainst?.budgetAgainstName}
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
      columnHelper.accessor("fiscalYear.yearRange", {
        id: "fiscalYear",
        size: 150,
        header: tableT("table-text-fiscal-year"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.fiscalYear?.yearRange}
          </Text>
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
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-budget")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editBudget(row.original.id!)}
                  aria-label="Edit budget">
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
                content={tableT("table-text-view-budget")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewBudget(row.original.id!)}
                  aria-label="View budget">
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
                title="table-text-delete-budget"
                description={`${tableT("table-text-delete-confirm-budget")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [t, tableT, coaOptions, isCOALoading])

  return columns
}
