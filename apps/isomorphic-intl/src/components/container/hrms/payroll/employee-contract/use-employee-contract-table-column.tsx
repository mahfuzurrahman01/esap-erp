import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { EmployeeContract } from "@/types/hrms/payroll/employee-contract.types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<EmployeeContract>()

export const useEmployeeContractTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")

  return useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 50,
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
        enablePinning: true,
      }),
      columnHelper.accessor("employeeContractName", {
        id: "name",
        size: 180,
        header: tForm("form-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employeeContractName}
          </Text>
        ),
      }),
      columnHelper.accessor("employee", {
        id: "employee",
        size: 180,
        header: t("table-text-employee"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employee?.firstName} {row.original.employee?.lastName}
          </Text>
        ),
      }),
      columnHelper.accessor("salaryStructure.salaryStructureName", {
        id: "salaryStructure",
        size: 220,
        header: t("table-text-salary-structure"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryStructure?.salaryStructureName}
          </Text>
        ),
      }),
      columnHelper.accessor("baseSalary", {
        id: "baseSalary",
        size: 220,
        header: t("table-text-basic-salary"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.baseSalary}
          </Text>
        ),
      }),
      columnHelper.accessor("grossSalary", {
        id: "grossSalary",
        size: 220,
        header: t("table-text-gross-salary"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.grossSalary}
          </Text>
        ),
      }),
      columnHelper.accessor("startDate", {
        id: "startDate",
        size: 180,
        header: t("table-text-start-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.startDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        size: 180,
        header: t("table-text-end-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {formatDate(row.original.endDate)}
          </Text>
        ),
      }),
      columnHelper.accessor("employmentType.employmentTypeName", {
        id: "employmentType",
        size: 240,
        header: t("table-text-employment-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employmentType?.employmentTypeName}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "actions",
        size: 120,
        header: "",
        enablePinning: true,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Tooltip
              size="sm"
              content={t("table-text-edit")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.hr.editContract(
                  row.original.employee?.id as number
                )}>
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 cursor-pointer border-gray-500/20">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip
              size="sm"
              content={t("table-text-view")}
              placement="top"
              rounded="lg"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.hr.viewContract(
                  row.original.employee?.id as number
                )}>
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 cursor-pointer border-gray-500/20">
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <DeletePopover
              title="table-text-delete-employee-contract"
              description={`${t("table-text-delete-confirm-employee-contract")} #${row.original.id}`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        ),
      }),
    ],
    [t, tForm]
  )
}
