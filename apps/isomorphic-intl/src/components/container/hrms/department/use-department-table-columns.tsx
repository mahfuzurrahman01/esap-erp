import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import DepartmentFormDrawerView from "@/components/container/hrms/department/department-form-drawer-view"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Department } from "@/types/hrms/employee/department.types"

const columnHelper = createColumnHelper<Department>()

export const useDepartmentTableColumns = () => {
  const t = useTranslations("form")
  const tTable = useTranslations("table")
  const name = t("form-name")
  const manager = t("form-manager")
  const color = t("form-color")
  const editDepartment = t("form-edit-department")
  const viewDepartment = t("form-view-department")
  const thrms = useTranslations("hrms")
  const { openDrawer } = useDrawer()

  const { hasAnyRole } = useCurrentRole()

  const isDeleteVisible = hasAnyRole(["Admin", "HR Admin"])

  const columns = useMemo(
    () => [
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
      columnHelper.accessor("departmentName", {
        id: "name",
        size: 350,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.departmentName}
          </Text>
        ),
      }),
      columnHelper.accessor("manager.firstName", {
        id: "manager",
        size: 350,
        header: manager,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.manager?.firstName} {row.original.manager?.lastName}
          </Text>
        ),
      }),
      columnHelper.accessor("color", {
        id: "color",
        size: 350,
        header: color,
        cell: ({ row }) => (
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: row.original.color || "transparent" }}
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("departmentName", {
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
                  content={tTable("table-text-edit")}
                  placement="top"
                  rounded="lg"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                  color="invert">
                  <ActionIcon
                    onClick={() =>
                      openDrawer({
                        view: (
                          <DepartmentFormDrawerView
                            isEditForm
                            initialData={{
                              ...row.original,
                              color: row.original.color ?? undefined,
                              managerId: row.original.manager?.id,
                            }}
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

                {isDeleteVisible && (
                  <DeletePopover
                    translationObjectName="hrms"
                    title="text-delete-department"
                    description={`${thrms("text-delete-department-prompt")} #${row.original.id}`}
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
    ],
    [t, name, manager, color, editDepartment, viewDepartment]
  )

  return columns
}
