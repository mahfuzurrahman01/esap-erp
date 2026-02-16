import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { LeaveRequest } from "@/types/hrms/attendance-and-leave/leave-request.types"
import { formatDate } from "@/utils/format-date"

import { getListApprovalStatusBadge } from "../reconciliation/approval-status-option"
import ApprovalLeaveRequestDrawerView from "./approval-leave-request-drawer"

const columnHelper = createColumnHelper<LeaveRequest>()

export const useLeaveRequestTableColumn = () => {
  const t = useTranslations("form")
  const tText = useTranslations("hrms")
  const tTable = useTranslations("table")
  const { openDrawer } = useDrawer()

  const leaveType = t("form-leave-type")
  const dateFrom = t("form-date-from")
  const dateTo = t("form-date-to")
  const description = t("form-description")
  const totalDays = t("form-total-days")
  const fullname = tTable("table-text-fullname")
  const department = t("form-department")
  const status = t("form-status")
  const columns = useMemo(
    () => [
      columnHelper.accessor("employee.firstName", {
        id: "employeeId",
        size: 180,
        header: fullname,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">{`${row.original.employee?.firstName} ${row.original.employee?.lastName}`}</Text>
        ),
      }),
      columnHelper.accessor("employee.department", {
        id: "employee.department",
        size: 200,
        header: department,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employee?.department?.departmentName}
          </Text>
        ),
      }),
      columnHelper.accessor("leaveType.leaveTypeName", {
        id: "leaveType",
        size: 180,
        header: leaveType,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.leaveType && row.original.leaveType.leaveTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("startDate", {
        id: "dateFrom",
        size: 150,
        header: dateFrom,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.startDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("endDate", {
        id: "dateTo",
        size: 150,
        header: dateTo,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.endDate)}
          </Text>
        ),
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
      columnHelper.accessor("status", {
        id: "status",
        size: 180,
        header: status,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getListApprovalStatusBadge(row.original.status)}
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
                        <ApprovalLeaveRequestDrawerView
                          initialData={{
                            ...row.original,
                            status: row.original?.status?.toLocaleLowerCase(),
                            id: row.original.id,
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
      columnHelper.accessor("startDate", {
        id: "totalDays",
        size: 160,
        header: totalDays,
        cell: ({ row }) => {
          const startDate = dayjs(row.original.startDate)
          const endDate = dayjs(row.original.endDate)
          const totalDays = endDate.diff(startDate, "day") + 1
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {totalDays}
            </Text>
          )
        },
      }),
    ],
    [t]
  )

  return columns
}
