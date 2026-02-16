import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { SalaryRule } from "@/types/hrms/payroll-configuration/salary-rules.types"

import SalaryRuleFormDrawerView from "./salary-rules-form-drawer"

const columnHelper = createColumnHelper<SalaryRule>()

export const useSalaryRulesTableColumns = () => {
  const t = useTranslations("table")
  const tForm = useTranslations("form")
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
      columnHelper.accessor("salaryRuleName", {
        id: "name",
        size: 220,
        header: tForm("form-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryRuleName}
          </Text>
        ),
      }),
      columnHelper.accessor("salaryCategory.salaryCategoryName", {
        id: "category",
        size: 200,
        header: t("table-text-category"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salaryCategory?.salaryCategoryName}
          </Text>
        ),
      }),
      columnHelper.accessor("sequence", {
        id: "sequence",
        size: 160,
        header: t("table-text-sequence"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.sequence}
          </Text>
        ),
      }),
      columnHelper.accessor("computationType", {
        id: "computationType",
        size: 220,
        header: t("table-text-computation-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.computationType}
          </Text>
        ),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 160,
        header: t("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.amount || row.original.formula}
          </Text>
        ),
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        size: 160,
        header: t("table-text-quantity"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.quantity}
          </Text>
        ),
      }),
      columnHelper.accessor("isActive", {
        id: "status",
        size: 160,
        header: t("table-text-status"),
        cell: ({ row }) => (
          <Badge
            variant="flat"
            color={row.original.isActive ? "success" : "danger"}
            className="w-fit">
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 200,
        header: t("table-text-description"),
        cell: ({ row }) => (
          <Text className="line-clamp-2 font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
        id: "actions",
        size: 140,
        header: "",
        enablePinning: true,
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
                onClick={() =>
                  openDrawer({
                    view: (
                      <SalaryRuleFormDrawerView
                        isEditForm
                        initialData={{
                          ...row.original,
                          salaryCategoryId:
                            row.original.salaryCategory?.id || null,
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
              title="table-text-delete-salary-rule"
              description={`${t("table-text-delete-confirm-salary-rule")} #${row.original.id}`}
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
