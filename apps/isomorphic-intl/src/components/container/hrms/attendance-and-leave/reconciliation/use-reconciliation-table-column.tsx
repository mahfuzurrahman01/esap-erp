import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { DEFAULT_TIME_FORMAT } from "@/config/constants"
import { ReconciliationRequest } from "@/types/hrms/attendance-and-leave/reconciliation.types"
import { formatDate } from "@/utils/format-date"

import ApprovalReconciliationDrawer from "./approval-reconciliation-drawer"
import { getListApprovalStatusBadge } from "./approval-status-option"

const columnHelper = createColumnHelper<ReconciliationRequest>()

export const useReconciliationTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")

  const fullname = t("table-text-fullname")
  const email = tForm("form-email")
  const department = tForm("form-department")
  const status = tForm("form-status")
  const date = tForm("form-date")
  const checkIn = tForm("form-check-in")
  const checkOut = tForm("form-check-out")
  const requestedDate = tForm("form-requested-date")
  const requestedCheckOut = tForm("form-requested-check-out")

  const { openDrawer } = useDrawer()

  return useMemo(
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

      columnHelper.accessor("attendance.employee", {
        id: "fullname",
        size: 200,
        header: fullname,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">{`${row.original.attendance?.employee?.firstName} ${row.original.attendance?.employee?.lastName}`}</Text>
        ),
      }),
      columnHelper.accessor("attendance.checkIn", {
        id: "date",
        size: 160,
        header: requestedDate,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.requestedCheckOut
              ? formatDate(row.original.requestedCheckOut)
              : ""}
          </Text>
        ),
      }),

      columnHelper.accessor("requestedCheckOut", {
        id: "checkout-time",
        size: 160,
        header: requestedCheckOut,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.requestedCheckOut
              ? formatDate(row.original.requestedCheckOut, DEFAULT_TIME_FORMAT)
              : ""}
          </Text>
        ),
      }),

      // columnHelper.accessor("attendance", {
      //   id: "checkin-mode",
      //   size: 180,
      //   header: checkInMode,
      //   cell: ({ row }) => (
      //     <span className="dark:text-gray-0">
      //       {row.original.attendance?.mode}
      //     </Text>
      //   ),
      // }),

      // columnHelper.accessor("attendance", {
      //   id: "checkout-mode",
      //   size: 180,
      //   header: checkoutMode,
      //   cell: ({ row }) => (
      //     <span className="dark:text-gray-0">
      //       {row.original.attendance?.mode}
      //     </Text>
      //   ),
      // }),

      columnHelper.accessor("attendance.employee.email", {
        id: "email",
        size: 200,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.attendance?.employee?.email}
          </Text>
        ),
      }),

      columnHelper.accessor("attendance.employee.department", {
        id: "department",
        size: 200,
        header: department,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.attendance?.employee?.department?.departmentName}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 160,
        header: status,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getListApprovalStatusBadge(row.original.status as string)}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 100,
        header: "",
        enablePinning: true,
        cell: ({ row }) => {
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
                          <ApprovalReconciliationDrawer
                            initialData={{
                              ...row.original,
                              status: row.original?.status?.toLocaleLowerCase(),
                              requestId: row.original.id,
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
              </div>
            </>
          )
        },
      }),
    ],
    [t, tForm]
  )
}
