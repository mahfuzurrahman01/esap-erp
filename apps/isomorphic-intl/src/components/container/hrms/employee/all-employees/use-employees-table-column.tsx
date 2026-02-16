import Link from "next/link"
import { useMemo } from "react"

import EyeIcon from "@core/components/icons/eye"
import PencilIcon from "@core/components/icons/pencil"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { routes } from "@/config/routes"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Employee } from "@/types/hrms/employee/employee.types"

const columnHelper = createColumnHelper<Employee>()

export const useEmployeesTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const fullname = t("table-text-fullname")
  const email = tForm("form-email")
  const jobPosition = tForm("form-job-position")
  const department = tForm("form-department")
  const phone = tForm("form-phone")
  const emergencyPhone = tForm("form-emergency-phone")
  const country = tForm("form-country")
  const manager = tForm("form-manager")
  const coach = tForm("form-coach")
  const badgeId = tForm("form-badge-id")

  const editEmployee = t("table-text-edit")
  const viewEmployee = t("table-text-view")

  const { roles, hasRole, hasAnyRole } = useCurrentRole()

  const isDeleteVisible = hasAnyRole(["Admin", "HR Admin"])

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
      columnHelper.accessor("firstName", {
        id: "firstName",
        size: 180,
        header: fullname,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">{`${row.original.firstName} ${row.original?.lastName}`}</Text>
        ),
      }),
      columnHelper.accessor("badgeId", {
        id: "badgeId",
        size: 180,
        header: badgeId,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">{`${row.original.badgeId}`}</Text>
        ),
      }),
      columnHelper.accessor("country", {
        id: "country",
        size: 140,
        header: country,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.country}
          </Text>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 180,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.email}
          </Text>
        ),
      }),
      columnHelper.accessor("jobPosition", {
        id: "jobPosition",
        size: 180,
        header: jobPosition,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.jobPosition?.jobPositionName}
          </Text>
        ),
      }),
      columnHelper.accessor("department", {
        id: "department",
        size: 180,
        header: department,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.department?.departmentName}
          </Text>
        ),
      }),
      columnHelper.accessor("phone", {
        id: "phone",
        size: 140,
        header: phone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phone}
          </Text>
        ),
      }),
      columnHelper.accessor("emergencyPhone", {
        id: "emergencyPhone",
        size: 240,
        header: emergencyPhone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.emergencyPhone}
          </Text>
        ),
      }),

      columnHelper.accessor("manager", {
        id: "manager",
        size: 160,
        header: manager,
        cell: ({ row }) => {
          const managerData = row.original.manager ?? ""
          if (managerData) {
            return (
              <Text className="font-medium text-gray-900 dark:text-gray-0">{`${managerData.firstName} ${managerData.lastName}`}</Text>
            )
          } else return ""
        },
      }),
      columnHelper.accessor("coach", {
        id: "coach",
        size: 160,
        header: coach,
        cell: ({ row }) => {
          const coachData = row.original.coach ?? ""
          if (coachData) {
            return (
              <Text className="font-medium text-gray-900 dark:text-gray-0">{`${coachData.firstName} ${coachData.lastName}`}</Text>
            )
          } else return ""
        },
      }),
      // columnHelper.accessor("createdDate", {
      //   id: "createdDate",
      //   size: 200,
      //   header: createdDate,
      //   cell: ({ row }) => (
      //     <Text className="font-medium text-gray-900 dark:text-gray-0">
      //       {formatDate(row.original.createdDate)}
      //     </Text>
      //   ),
      // }),
      // columnHelper.accessor("updatedDate", {
      //   id: "updatedDate",
      //   size: 200,
      //   header: updatedDate,
      //   cell: ({ row }) => (
      //     <Text className="font-medium text-gray-900 dark:text-gray-0">
      //       {formatDate(row.original.updatedDate)}
      //     </Text>
      //   ),
      // }),
      columnHelper.accessor("id", {
        id: "actions",
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
                  content={editEmployee}
                  placement="top"
                  rounded="lg"
                  color="invert"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
                  <Link href={routes.hr.editEmployee(row.original.id!)}>
                    <ActionIcon
                      as="span"
                      size="sm"
                      variant="outline"
                      rounded="lg"
                      className="h-6 w-7 border-gray-500/20">
                      <PencilIcon className="h-4 w-4" />
                    </ActionIcon>
                  </Link>
                </Tooltip>
                <Tooltip
                  size="sm"
                  content={viewEmployee}
                  placement="top"
                  rounded="lg"
                  color="invert"
                  className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                  arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
                  <Link href={routes.hr.employeeDetails(row.original.id!)}>
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
                {isDeleteVisible && (
                  <DeletePopover
                    title="table-text-delete-employee"
                    description={`${t("table-text-delete-confirm-employee")} #${row.original.id}`}
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
}
