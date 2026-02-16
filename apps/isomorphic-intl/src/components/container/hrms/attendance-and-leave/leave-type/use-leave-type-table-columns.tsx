import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import LeaveTypeFormDrawerView from "@/components/container/hrms/attendance-and-leave/leave-type/leave-type-form-drawer-view"
import PencilIcon from "@/components/icons/pencil"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"

const columnHelper = createColumnHelper<LeaveType>()

export const useLeaveTypeTableColumns = () => {
  const t = useTranslations("form")
  const tTable = useTranslations("table")
  const tText = useTranslations("hrms")
  const name = t("form-name")
  const description = t("form-description")
  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 40,
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
      columnHelper.accessor("leaveTypeName", {
        id: "leaveTypeName",
        size: 200,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.leaveTypeName}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 400,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("leaveTypeName", {
        id: "action",
        size: 100,
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
                          <LeaveTypeFormDrawerView
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
                  title="text-delete-leave-type"
                  description={`${tText("text-delete-leave-type-prompt")} #${row.original.id}`}
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
