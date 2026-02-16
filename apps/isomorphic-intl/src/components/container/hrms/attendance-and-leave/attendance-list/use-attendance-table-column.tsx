import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Button } from "@/components/ui"
import { DEFAULT_TIME_FORMAT } from "@/config/constants"
import { routes } from "@/config/routes"
import { Attendance } from "@/types/hrms/attendance-and-leave/attendance.types"
import { formatDate } from "@/utils/format-date"

import ReconciliationFormDrawerView from "../reconciliation/reconciliation-form-drawer-view"

const columnHelper = createColumnHelper<Attendance>()
export const useAttendancesTableColumns = (isEmployeeAttendance?: boolean) => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const fullname = t("table-text-fullname")
  const email = tForm("form-email")
  const department = tForm("form-department")
  const date = tForm("form-date")
  const checkIn = tForm("form-check-in")
  const checkOut = tForm("form-check-out")
  const viewAttendance = t("table-text-view")

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
      ...(isEmployeeAttendance
        ? []
        : [
            columnHelper.accessor("employeeId", {
              header: fullname,
              cell: ({ row }) => (
                <Text className="font-medium text-gray-900 dark:text-gray-0">{`${row.original.employee?.firstName} ${row.original.employee?.lastName}`}</Text>
              ),
            }),
          ]),
      columnHelper.accessor("createdDate", {
        header: date,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.checkIn ? formatDate(row.original.checkIn) : ""}
          </Text>
        ),
      }),
      columnHelper.accessor("checkIn", {
        header: checkIn,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.checkIn
              ? formatDate(row.original.checkIn, DEFAULT_TIME_FORMAT)
              : ""}
          </Text>
        ),
      }),
      columnHelper.accessor("checkOut", {
        header: checkOut,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.checkOut
              ? formatDate(row.original.checkOut, DEFAULT_TIME_FORMAT)
              : ""}
          </Text>
        ),
      }),

      columnHelper.accessor("employee.email", {
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employee?.email}
          </Text>
        ),
      }),
      columnHelper.accessor("employee.department", {
        header: department,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employee?.department?.departmentName}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
        id: "action",
        size: 160,
        header: "",
        enablePinning: true,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              {!isEmployeeAttendance ? (
                <Tooltip
                  size="sm"
                  content={viewAttendance}
                  placement="top"
                  rounded="lg"
                  color="invert"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
                  <Link
                    href={routes.hr.employeeAttendanceDetails(
                      Number(row.original.employee?.id)
                    )}>
                    <ActionIcon
                      as="span"
                      size="sm"
                      variant="outline"
                      rounded="lg"
                      className="h-6 w-7 border-gray-500/20">
                      <EyeIcon className="h-4 w-4" />
                    </ActionIcon>
                  </Link>
                </Tooltip>
              ) : (
                <Button
                  type="button"
                  color="black"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openDrawer({
                      view: (
                        <ReconciliationFormDrawerView
                          attendanceId={Number(row.original.id)}
                          checkout={String(row.original.checkOut)}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[32.25rem]",
                    })
                  }>
                  <PiPlusBold className="me-1.5 h-4 w-4" />
                  {tForm("form-reconciliation-request")}
                </Button>
              )}

              {/* <DeletePopover
                translationObjectName="hrms"
                title="text-delete-attendance"
                description="text-delete-attendance-prompt"
                onDelete={() => handleDeleteAttendance(Number(row.original.id))}
              /> */}
            </div>
          )
        },
      }),
    ],
    [t, tForm, isEmployeeAttendance]
  )
}
