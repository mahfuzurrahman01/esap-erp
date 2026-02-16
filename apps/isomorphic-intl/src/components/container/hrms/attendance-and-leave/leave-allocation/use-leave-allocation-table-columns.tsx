"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { LeaveAllocation } from "@/types/hrms/attendance-and-leave/leave-allocation.types"
import { formatDate } from "@/utils/format-date"

import LeaveAllocationFormDrawerView from "./leave-allocation-form-drawer-view"

const columnHelper = createColumnHelper<LeaveAllocation>()

export const useLeaveAllocationTableColumns = () => {
  const t = useTranslations("form")
  const tTable = useTranslations("table")
  const employeeName = t("form-employee-name")
  const leaveTypeName = t("form-leave-type-name")
  const manager = t("form-manager")

  const validFrom = t("form-valid-from")
  const validTo = t("form-valid-to")
  const totalDays = t("form-total-days")
  const remainingDays = t("form-remaining-days")

  const { openDrawer } = useDrawer()

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

      columnHelper.accessor("leaveType.leaveTypeName", {
        id: "leaveTypeName",
        size: 200,
        header: leaveTypeName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.leaveType?.leaveTypeName}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("employee.id", {
        id: "employeeName",
        size: 200,
        header: employeeName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">{`${row.original?.employee?.firstName} ${row.original?.employee?.lastName}`}</Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("employee.manager", {
        id: "manager",
        size: 200,
        header: manager,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {`${row.original?.employee?.manager?.firstName && row.original?.employee?.manager?.firstName} ${row.original?.employee?.manager?.lastName && row.original?.employee?.manager?.lastName}`}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("validFrom", {
        id: "validFrom",
        header: validFrom,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.validFrom)}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("validTo", {
        id: "validTo",
        header: validTo,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.validTo)}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("totalDays", {
        id: "totalDays",
        header: totalDays,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.totalDays}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("remainingDays", {
        id: "remainingDays",
        size: 200,
        header: remainingDays,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.remainingDays}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("id", {
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
                          <LeaveAllocationFormDrawerView
                            isEditForm
                            initialData={{
                              ...row.original,
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

                <DeletePopover
                  translationObjectName="hrms"
                  title="text-delete-leave-allocation"
                  description={`${tTable("text-delete-leave-allocation-prompt")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
              </div>
            </>
          )
        },
      }),
    ],
    [t]
  )

  return columns
}
