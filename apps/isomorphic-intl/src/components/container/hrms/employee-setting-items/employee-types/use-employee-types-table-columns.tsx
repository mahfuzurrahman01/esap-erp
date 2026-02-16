import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EmployeeTypesFormDrawerView from "@/components/container/hrms/employee-setting-items/employee-types/employee-types-form-drawer"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { EmployeeType } from "@/types/hrms/employee/employee-types.types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<EmployeeType>()

export const useEmployeeTypesTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("hrms")
  const name = t("table-text-name")
  const createdDate = t("table-text-created-date")
  const updatedDate = t("table-text-updated-date")
  const editEmployeeType = t("table-text-edit")
  const viewEmployeeType = t("table-text-view")
  const { openDrawer } = useDrawer()

  const { hasAnyRole } = useCurrentRole()

  const isDeleteVisible = hasAnyRole(["Admin", "HR Admin"])

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
      columnHelper.accessor("employeeTypeName", {
        id: "name",
        size: 180,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employeeTypeName}
          </Text>
        ),
      }),

      columnHelper.accessor("createdDate", {
        id: "createdAt",
        size: 160,
        header: createdDate,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.createdDate && formatDate(row.original.createdDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("updatedDate", {
        id: "updatedDate",
        size: 160,
        header: updatedDate,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.updatedDate && formatDate(row.original.updatedDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("employeeTypeName", {
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
        }) => {
          return (
            <>
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
                          <EmployeeTypesFormDrawerView
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
                {/* <DeletePopover
                  translationObjectName="hrms"
                  title="text-delete-employee-type"
                  description="text-delete-employee-type-prompt"
                  onDelete={() => handleDeleteEmployeeType(row.original.id)}
                /> */}
                {isDeleteVisible && (
                  <DeletePopover
                    translationObjectName="hrms"
                    title="text-delete-employee-type"
                    description={`${tText("text-delete-employee-type-prompt")} #${row.original.id}`}
                    onDelete={() =>
                      meta?.handleDeleteRow &&
                      meta?.handleDeleteRow(row.original)
                    }
                  />
                )}
              </div>
            </>
          )
        },
      }),
    ]
  }, [t, name, createdDate, editEmployeeType, viewEmployeeType])

  return columns
}
