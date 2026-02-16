import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import OffDayFormDrawerView from "@/components/container/hrms/attendance-and-leave/off-day/off-day-form-drawer-view"
import PencilIcon from "@/components/icons/pencil"
import { OffDay } from "@/types/hrms/attendance-and-leave/off-day.types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<OffDay>()

export const useOffDayTableColumns = () => {
  const t = useTranslations("form")
  const tText = useTranslations("hrms")
  const tTable = useTranslations("table")
  const { openDrawer } = useDrawer()
  const pathname = usePathname()

  const name = t("form-name")
  const leaveType = t("form-leave-type")
  const dateFrom = t("form-date-from")
  const dateTo = t("form-date-to")
  const description = t("form-description")
  const totalDays = t("form-total-days")

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
      columnHelper.accessor("offDayName", {
        id: "offDayName",
        size: 200,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.offDayName}
          </Text>
        ),
      }),
      columnHelper.accessor("leaveType.leaveTypeName", {
        id: "leaveType",
        size: 200,
        header: leaveType,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.leaveType && row.original.leaveType.leaveTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("dateFrom", {
        id: "dateFrom",
        size: 200,
        header: dateFrom,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.dateFrom, "DD/MM/YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("dateTo", {
        id: "dateTo",
        size: 200,
        header: dateTo,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.dateTo, "DD/MM/YYYY")}
          </Text>
        ),
      }),

      columnHelper.accessor("dateFrom", {
        id: "totalDays",
        size: 160,
        header: totalDays,
        cell: ({ row }) => {
          const startDate = dayjs(row.original.dateFrom)
          const endDate = dayjs(row.original.dateTo)
          const totalDays = endDate.diff(startDate, "day") + 1
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {totalDays}
            </Text>
          )
        },
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 240,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 160,
        header: "",
        enablePinning: true,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          return (
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
                        <OffDayFormDrawerView
                          isEditForm
                          initialData={{
                            ...row.original,
                            leaveTypeId:
                              row.original.leaveType &&
                              row.original.leaveType.id,
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
                title="text-delete-off-day"
                description={`${tText("text-delete-off-day-prompt")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          )
        },
      }),
    ],
    [t, pathname]
  )

  return columns
}
