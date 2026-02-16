import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { SalaryStructureType } from "@/types/hrms/payroll-configuration/salary-structure-type.types"
import { formatDate } from "@/utils/format-date"

import SalaryStructureTypeFormDrawerView from "./salary-structure-type-form-drawer"

const columnHelper = createColumnHelper<SalaryStructureType>()

export const useSalaryStructureTypeColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const createdAt = tForm("form-created-at")
  const updatedAt = tForm("form-updated-at")
  const { openDrawer } = useDrawer()

  return useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 30,
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
          <div className="ps-1">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
          </div>
        ),
        enableSorting: false,
        enablePinning: true,
      }),
      columnHelper.accessor("salaryStructureTypeName", {
        id: "name",
        size: 300,
        header: tForm("form-name"),
        cell: ({ row }) => (
          <Text className="ps-1 font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryStructureTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("country", {
        id: "country",
        size: 220,
        header: tForm("form-country"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.country}
          </Text>
        ),
      }),
      columnHelper.accessor("createdDate", {
        id: "createdAt",
        size: 160,
        header: createdAt,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.createdDate && formatDate(row.original.createdDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("updatedDate", {
        id: "updatedDate",
        size: 160,
        header: updatedAt,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.updatedDate && formatDate(row.original.updatedDate)}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
        id: "actions",
        size: 140,
        header: "",
        enablePinning: true,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={t("table-text-edit")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <ActionIcon
                onClick={() =>
                  openDrawer({
                    view: (
                      <SalaryStructureTypeFormDrawerView
                        isEditForm
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[26.25rem]",
                  })
                }
                as="span"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 cursor-pointer border-gray-500/20">
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              size="sm"
              content={t("table-text-view")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <ActionIcon
                onClick={() =>
                  openDrawer({
                    view: (
                      <SalaryStructureTypeFormDrawerView
                        isEditForm
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[26.25rem]",
                  })
                }
                as="span"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 cursor-pointer border-gray-500/20">
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <DeletePopover
              title="table-text-delete-salary-structure-type"
              description={`${t("table-text-delete-confirm-salary-structure-type")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ],
    [t, tForm]
  )
}
