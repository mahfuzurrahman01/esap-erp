import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ResumeTypesFormDrawerView from "@/components/container/hrms/employee-setting-items/resume-types/resume-types-form-drawer-view"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ResumeType } from "@/types/hrms/employee/resume-types.types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<ResumeType>()

export const useResumeTypesTableColumns = () => {
  const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const t = useTranslations("table")
  const thrms = useTranslations("hrms")
  const name = t("table-text-name")
  const createdDate = t("table-text-created-date")
  const updatedDate = t("table-text-updated-date")

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
      columnHelper.accessor("resumeTypeName", {
        id: "resumeTypeName",
        size: 200,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.resumeTypeName}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("createdDate", {
        id: "createdDate",
        header: createdDate,
        size: 160,
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
      columnHelper.accessor("id", {
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
                          <ResumeTypesFormDrawerView
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
                    title="text-delete-resume-type"
                    description={`${thrms("text-delete-resume-type-prompt")} #${row.original.id}`}
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
    [t, name]
  )

  return columns
}
