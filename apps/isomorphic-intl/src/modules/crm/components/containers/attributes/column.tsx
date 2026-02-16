"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { AttributeList } from "@/modules/crm/types/attribute"

import AssignedToCell from "../user/assigned-to-cell"
import { formatDate } from "@/utils/format-date"
import UserByEmail from "../user/user-by-email"

const AttributeFormDrawerView = dynamic(
  () => import("./attribute-form-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<AttributeList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const id = tableT("table-text-id")
    const name = tableT("table-text-name")
    const values = tableT("table-text-values")
    const createdBy = tableT("table-text-created-by")
    const createdAt = tableT("table-text-created-at")

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
        size: 240,
        header: name,
        cell: ({ row }) => (
          <Text
            className="cursor-pointer font-medium text-gray-900 dark:text-gray-0"
            onClick={() => {
              openDrawer({
                view: (
                  <AttributeFormDrawerView id={row.original.id} view={true} />
                ),
                placement: "right",
                containerClassName: "max-w-[26.25rem] dropdown-gr",
              })
            }}>
            {row.original.name}
          </Text>
        ),
      }),
      columnHelper.accessor("attributeValues", {
        id: "values",
        size: 240,
        header: values,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.attributeValues
              ?.map((attribute: any) => attribute.value)
              .join(", ")}
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
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        size: 100,
        header: createdAt,
        cell: ({ row }) => {
          const date = row.original.createdAt 
            ? new Date(row.original.createdAt) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
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
            <Tooltip
              size="sm"
              content={tableT("table-text-edit-attribute")}
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
                    view: <AttributeFormDrawerView id={row.original.id} />,
                    placement: "right",
                    containerClassName: "max-w-[26.25rem] dropdown-gr",
                  })
                }}>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              size="sm"
              content={tableT("table-text-view-attribute")}
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
                      <AttributeFormDrawerView
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
              title="table-text-delete-attribute"
              description={tableT("table-text-delete-confirm-attribute")}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ]
  }, [tableT, openDrawer])

  return columns
}
