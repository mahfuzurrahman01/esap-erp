import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { CategoryList } from "@/modules/crm/types/category"

import { getApprovalStatusBadge } from "../approvals/status-badge"
import AssignedToCell from "../user/assigned-to-cell"
import UserByEmail from "../user/user-by-email"

const CategoryFormDrawerView = dynamic(
  () => import("./category-form-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<CategoryList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const name = tableT("table-text-name")
    const parentCategory = tableT("table-text-parent-category")
    const createdBy = tableT("table-text-created-by")
    const status = tableT("table-text-status")
    const id = tableT("table-text-id")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <span className="inline-block">
            <div className="flex items-center gap-12">
              <Checkbox
                aria-label="Select all rows"
                checked={table.getIsAllPageRowsSelected()}
                onChange={() => table.toggleAllPageRowsSelected()}
                inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
                iconClassName="w-[18px] h-[18px]"
              />
              <Text className="font-medium text-gray-600 dark:text-gray-500">
                {id}
              </Text>
            </div>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-12">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        size: 250,
        header: name,
        cell: ({ row }) => (
          <Text
            className="cursor-pointer font-medium text-gray-900 dark:text-gray-0"
            onClick={() => {
              openDrawer({
                view: (
                  <CategoryFormDrawerView id={row.original.id} view={true} />
                ),
                placement: "right",
                containerClassName: "max-w-[26.25rem] dropdown-gr",
              })
            }}>
            {row.original.name}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("parentCategory", {
        id: "parentCategory",
        size: 200,
        header: parentCategory,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.parentCategory?.name}
          </Text>
        ),
      }),
      columnHelper.accessor("createdBy", {
        id: "createdBy",
        size: 150,
        header: createdBy,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.createdBy}
          </Text>
        ),
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
                content={tableT("table-text-edit-category")}
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
                      view: <CategoryFormDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "max-w-[26.25rem] dropdown-gr",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view-category")}
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
                      view: (
                        <CategoryFormDrawerView
                          id={row.original.id}
                          view={true}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[26.25rem] dropdown-gr",
                    })
                  }}>
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-category"
                description={tableT("table-text-delete-confirm-category")}
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
