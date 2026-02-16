import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { WorkingSchedule } from "@/types/hrms/employee/working-schedule.types"
import { formatDate } from "@/utils/format-date"

import WorkingScheduleFormDrawerView from "./working-schedule-form-drawer"

const columnHelper = createColumnHelper<WorkingSchedule>()

export const useWorkingScheduleTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("hrms")
  const tForm = useTranslations("form")
  const workingScheduleName = tForm("form-name")
  const averageHourPerDay = tForm("form-average-hour-per-day")
  const timezone = tForm("form-timezone")
  const createdDate = t("table-text-created-date")
  const updatedDate = t("table-text-updated-date")
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
      columnHelper.accessor("workingScheduleName", {
        id: "workingScheduleName",
        size: 200,
        header: workingScheduleName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.workingScheduleName}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("averageHourPerDay", {
        id: "averageHourPerDay",
        size: 220,
        header: averageHourPerDay,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.averageHourPerDay}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("timezone", {
        id: "timezone",
        size: 200,
        header: timezone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.timezone}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("workingScheduleName", {
        id: "action",
        size: isDeleteVisible ? 160 : 120,
        header: "",
        enablePinning: true,
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
                          <WorkingScheduleFormDrawerView
                            initialData={row.original}
                            isEditForm
                          />
                        ),
                        placement: "right",
                        containerClassName: "max-w-4xl",
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
                    title="text-delete-working-schedule"
                    description={`${tText("text-delete-working-schedule-prompt")} #${row.original.id}`}
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
    [t, tForm]
  )

  return columns
}
