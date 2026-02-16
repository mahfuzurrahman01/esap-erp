"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Badge, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"

export function BudgetTableGridColumn(isFieldDisabled: boolean = false) {
  const t = useTranslations("form")
  const { coa } = useSharedDataHooks(["coa"])
  const { coaOptions, isCOALoading } = coa

  const columns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: "50px",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
    ...(isFieldDisabled
      ? [
        {
          id: "chartOfAccountName",
          header: t("form-chart-of-account-name"),
          accessorKey: "chartOfAccountName",
          cell: (props: any) => (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {props.row.original.chartOfAccount?.accountName}
            </Text>
          ),
        },
        {
          id: "budgetAmount",
          header: t("form-budget-amount"),
          accessorKey: "budgetAmount",
          width: "150px",
          cell: (props: any) => (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {props.row.original.budgetAmount}
            </Text>
          ),
        },
      ]
      : [
        {
          id: "chartOfAccountId",
          header: () => (
            <Text className="relative text-body after:content-['*'] after:ml-1 after:text-orange-500">
              {t("form-accounts-head")}
            </Text>
          ),
          accessorKey: "chartOfAccountId",
          width: "300px",
          cell: (props: any) => {
            const currentValue = props.row.original.chartOfAccountId

            return (
              <Select
                labelClassName="text-title"
                options={coaOptions}
                value={
                  currentValue && coaOptions
                    ? coaOptions.find(
                      (option: any) => option.value === currentValue
                    )
                    : null
                }
                onChange={(option: any) =>
                  props.table.options.meta?.updateData(
                    props.row.index,
                    "chartOfAccountId",
                    option?.value
                  )
                }
                menuPortalTarget={document.body}
                isRequired
                isDisabled={isCOALoading || isFieldDisabled}
              />
            )
          },
        },
        {
          id: "budgetAmount",
          header: () => (
            <Text className="relative text-body after:content-['*'] after:ml-1 after:text-orange-500">
              {t("form-budget-amount")}
            </Text>
          ),
          accessorKey: "budgetAmount",
          width: "150px",
          cell: (props: any) => (
            <Input
              type="number"
              value={props.value || ""}
              onChange={(e) => props.onChange(e.target.value)}
              placeholder="0.00"
              min={0}
              disabled={isFieldDisabled}
              isRequired
            />
          ),
        },
        {
          id: "actions",
          header: "",
          accessorKey: "actions",
          width: "80px",
          cell: (props: any) => (
            <Badge
              variant="flat"
              color="danger"
              rounded="lg"
              className="cursor-pointer"
              onClick={() => props.onDelete()}>
              {t("form-delete")}
            </Badge>
          ),
        },
      ]),
  ]

  return columns
}
