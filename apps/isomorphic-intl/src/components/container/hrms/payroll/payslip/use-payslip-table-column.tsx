import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PaymentsIcon from "@/components/icons/paymets"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import {
  ADMIN_MENU_ROLES,
  HR_MENU_ROLES,
} from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { Payslip } from "@/types/hrms/payroll/payslip.types"

import { getPayslipStatusBadge } from "./payslip-progress-options"

const columnHelper = createColumnHelper<Payslip>()

export const usePayslipTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
  const { hasAnyRole } = useCurrentRole()
  const isDeleteVisible = hasAnyRole([...ADMIN_MENU_ROLES])
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
        enablePinning: true,
      }),
      columnHelper.accessor("referenceId", {
        id: "referenceId",
        size: 180,
        header: t("table-text-reference-id"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.referenceId}
          </Text>
        ),
      }),
      columnHelper.accessor("employee", {
        id: "employeeId",
        size: 180,
        header: t("table-text-employee"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.employeeContract?.employee?.firstName}{" "}
            {row.original.employeeContract?.employee?.lastName}
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
      columnHelper.accessor("netPayableSalary", {
        id: "netPayableSalary",
        size: 220,
        header: t("table-text-net-salary"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.netPayableSalary}
          </Text>
        ),
      }),

      columnHelper.accessor("month", {
        id: "month",
        size: 160,
        header: t("table-text-month"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.month} {row.original.year}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 160,
        header: t("table-text-status"),
        cell: ({ row }) => getPayslipStatusBadge(row.original.status),
      }),

      columnHelper.accessor("id", {
        id: "actions",
        size: 60,
        header: "",
        enablePinning: true,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end">
            <ListPopover>
              <Link
                href={routes.hr.editPayslip(row.original.id as number)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {t("table-text-edit")}
              </Link>
              <Link
                href={routes.hr.viewPayslip(row.original.id as number)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {t("table-text-view")}
              </Link>
              <Link
                href={routes.hr.paymentEntry(row.original.id as number)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PaymentsIcon className="h-4 w-4" />
                {t("table-text-payment-entry")}
              </Link>

              {isDeleteVisible && (
                <Button
                  size="sm"
                  variant="text"
                  color="danger"
                  className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                  onClick={() => {
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }}>
                  <TrashIcon className="h-4 w-4" />
                  {t("table-text-delete")}
                </Button>
              )}
            </ListPopover>
          </div>
        ),
      }),
    ],
    [t, tForm]
  )
}

// <div className="flex items-center justify-end gap-3 pe-4">
//   <Tooltip
//     size="sm"
//     content={t("table-text-edit")}
//     placement="top"
//     rounded="lg"
//     className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
//     arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
//     color="invert">
//     <Link href={routes.hr.editPayslip(row.original.id as number)}>
//       <ActionIcon
//         as="span"
//         size="sm"
//         variant="outline"
//         rounded="lg"
//         className="h-6 w-7 cursor-pointer border-gray-500/20">
//         <PencilIcon className="h-4 w-4" />
//       </ActionIcon>
//     </Link>
//   </Tooltip>
//   <Tooltip
//     size="sm"
//     content={t("table-text-view")}
//     placement="top"
//     rounded="lg"
//     className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
//     arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
//     color="invert">
//     <Link href={routes.hr.viewPayslip(row.original.id as number)}>
//       <ActionIcon
//         as="span"
//         size="sm"
//         variant="outline"
//         rounded="lg"
//         className="h-6 w-7 cursor-pointer border-gray-500/20">
//         <EyeIcon className="h-4 w-4" />
//       </ActionIcon>
//     </Link>
//   </Tooltip>
//   <DeletePopover
//     title="table-text-delete-payslip"
//     description={`${t("table-text-delete-confirm-payslip")} #${row.original.id}`}
//     onDelete={() =>
//       meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
//     }
//   />
// </div>
