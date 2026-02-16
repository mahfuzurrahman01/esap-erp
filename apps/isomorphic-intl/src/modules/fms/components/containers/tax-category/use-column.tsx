import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { Badge, Checkbox } from "@/components/ui"
import { TaxCategoryList } from "@/modules/fms/types/tax-category"

const TaxCategoryFormDrawerView = dynamic(
  () => import("./tax-category-form-drawer-view"),
  {
    ssr: false,
  }
)

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

const columnHelper = createColumnHelper<TaxCategoryList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 280,
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
              {row.original.taxCategoryName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("zatcaCategory", {
        id: "zatcaCategory",
        size: 240,
        header: tableT("table-text-zatca-category"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.zatcaCategory?.zatcaCategoryName}
          </Text>
        ),
      }),
      columnHelper.accessor("isActive", {
        id: "isActive",
        size: 140,
        header: tableT("table-text-status"),
        cell: ({ row }) => getStatus(row.original.isActive!, tableT),
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        size: 160,
        header: "",
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
                content={tableT("table-text-edit-tax-category")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20"
                  onClick={() => {
                    openDrawer({
                      view: <TaxCategoryFormDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-tax-category"
                description={`${tableT("table-text-delete-confirm-tax-category")} #${row.original.id}`}
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
