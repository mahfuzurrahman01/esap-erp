import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Badge, Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { TermsAndConditionsList } from "@/modules/fms/types"

const columnHelper = createColumnHelper<TermsAndConditionsList>()

function getStatus(isActive: boolean, tableT: (key: string) => string) {
  return isActive ? (
    <Badge variant="flat" rounded="lg">
      {tableT("table-text-active")}
    </Badge>
  ) : (
    <Badge color="success" variant="flat" rounded="lg">
      {tableT("table-text-inactive")}
    </Badge>
  )
}

export const useColumn = () => {
  const tableT = useTranslations("table")
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("termsAndConditionName", {
        id: "termsAndConditionName",
        size: 240,
        header: tableT("table-text-title"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.termsAndConditionName}
          </Text>
        ),
      }),
      columnHelper.accessor("isActive", {
        id: "isActive",
        size: 240,
        header: tableT("table-text-active"),
        cell: ({ row }) => getStatus(row.original.isActive!, tableT),
      }),
      columnHelper.accessor("isSelling", {
        id: "isSelling",
        size: 240,
        header: tableT("table-text-selling"),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.original.isSelling}
            iconClassName="w-[18px] h-[18px]"
            disabled={true}
          />
        ),
      }),
      columnHelper.accessor("isBuying", {
        id: "companyName",
        size: 240,
        header: tableT("table-text-buying"),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.original.isBuying}
            iconClassName="w-[18px] h-[18px]"
            disabled={true}
          />
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
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-terms-and-conditions")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editTermsAndConditions(row.original.id ?? 0)}
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
                content={tableT("table-text-view-terms-and-conditions")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewTermsAndConditions(row.original.id ?? 0)}
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
              <DeletePopover
                title="table-text-delete-terms-and-conditions"
                description={`${tableT("table-text-delete-confirm-terms-and-conditions")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
