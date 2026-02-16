import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { JobPosition } from "@/types/hrms/employee/job-positions.types"
import { formatDate } from "@/utils/format-date"

import JobPositionsFormDrawerView from "./job-positions-form-drawer-view"

const columnHelper = createColumnHelper<JobPosition>()

export const useJobPositionTableColumns = () => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  const tText = useTranslations("hrms")
  const tTable = useTranslations("table")
  const name = t("form-name")
  const description = t("form-description")
  const createdAt = t("form-created-at")
  const updatedAt = t("form-updated-at")
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
      columnHelper.accessor("jobPositionName", {
        id: "name",
        size: 200,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.jobPositionName}
          </Text>
        ),
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 200,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
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
                          <JobPositionsFormDrawerView
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

                {isDeleteVisible && (
                  <DeletePopover
                    translationObjectName="hrms"
                    title="text-delete-job-position"
                    description={`${tText("text-delete-job-position-prompt")} #${row.original.id}`}
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
    [t, name, description, createdAt, updatedAt]
  )

  return columns
}
