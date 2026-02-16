import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Goal } from "@/types/hrms/appraisal/goals.types"
import { formatDate } from "@/utils/format-date"

import GoalFormDrawerView from "./goal-form-drawer"
import { getProgressStatusBadge } from "./progess-status-options"

const columnHelper = createColumnHelper<Goal>()

export const useGoalsTableColumn = () => {
  const t = useTranslations("table")
  const tText = useTranslations("hrms")
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
      columnHelper.accessor("employee", {
        id: "employee",
        size: 200,
        header: t("table-text-employee"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employee?.firstName} {row.original.employee?.lastName}
          </Text>
        ),
      }),

      columnHelper.accessor("goalName", {
        id: "goalName",
        size: 300,
        header: t("table-text-goal-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.goalName}
          </Text>
        ),
      }),

      columnHelper.accessor("employee.department", {
        id: "department",
        size: 200,
        header: t("table-text-department"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employee?.department?.departmentName}
          </Text>
        ),
      }),

      columnHelper.accessor("deadline", {
        id: "deadline",
        size: 200,
        header: t("table-text-deadline"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.deadline, "DD/MM/YYYY")}
          </Text>
        ),
      }),

      columnHelper.accessor("progress", {
        id: "progress",
        size: 200,
        header: t("table-text-progress"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getProgressStatusBadge(`${row.original.progress}%`)}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
        id: "action",
        size: 120,
        header: "",
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
                as="span"
                size="sm"
                variant="outline"
                rounded="lg"
                className="h-6 w-7 cursor-pointer border-gray-500/20"
                onClick={() =>
                  openDrawer({
                    view: (
                      <GoalFormDrawerView
                        isEditForm={true}
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[26.25rem]",
                  })
                }>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>

            <DeletePopover
              translationObjectName="hrms"
              title="text-delete-goal"
              description={`${tText("text-delete-goal-message")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ],
    [t, tText]
  )

  return columns
}
