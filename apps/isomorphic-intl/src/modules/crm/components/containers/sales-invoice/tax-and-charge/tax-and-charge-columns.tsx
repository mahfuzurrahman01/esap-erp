"use client"

import { useTranslations } from "next-intl"
import { Badge, Input, Select } from "@/components/ui"
import { taxTypeOptions } from "@/modules/fms/constants/shared-data-hook"
import { Text } from "rizzui"
import { useSOTemplate } from "../../sales-orders/so-template"

interface ColumnProps {
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

export const useTaxAndChargeColumns = ({
  onDelete,
}: ColumnProps) => {
  const t = useTranslations("form")
  const { chartOfAccountOptions, isCOALoading } = useSOTemplate()
  return [
    {
      id: "sn",
      header: "sl",
      accessorKey: "sn",
      width: "70px",
      cell: ({ row }: { row: any }) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {row.index + 1}
        </Text>
      ),
    },
    {
      id: "taxTypeId",
      header: t("form-tax-type"),
      accessorKey: "taxTypeId",
      cell: (props: any) => (
        <Select
          options={taxTypeOptions}
          menuPortalTarget={document.body}
          value={taxTypeOptions.find(
            (option: any) =>
              option.value == props.row.original.taxTypeId
          )}
          onChange={(option: any) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxTypeId",
              option?.value
            )
          }
          placeholder={t("form-select")}
        />
      ),
    },
    {
      id: "chartOfAccountId",
      header: t("form-chart-of-account"),
      accessorKey: "chartOfAccountId",
      cell: (props: any) => (
        <Select
          menuPortalTarget={document.body}
          options={chartOfAccountOptions}
          value={chartOfAccountOptions.find(
            (option: any) =>
              option.id == props.row.original.chartOfAccountId || props.value
          )}
          onChange={(option: any) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "chartOfAccountId",
              option?.value
            )
          }
          isLoading={isCOALoading}
          isDisabled={isCOALoading}
          placeholder={t("form-select")}
        />
      ),
    },
    {
      id: "taxRate",
      header: t("form-tax-rate"),
      accessorKey: "taxRate",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          disabled={props.row.original.taxTypeId == "On net total"}
          onChange={(e) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxRate",
              Number(e.target.value)
            )
          }
          placeholder="0.00"
        />
      ),
    },
    {
      id: "taxAmount",
      header: t("form-amount"),
      accessorKey: "taxAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          disabled={props.row.original.taxTypeId == "Actual"}
          onChange={async (e: any) => {
            const newValue = parseFloat(e.target.value) || 0
            props.row.original.taxAmount = newValue
            await props.table.options.meta?.updateData(
              props.row.index,
              "total",
              newValue
            )
          }}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "total",
      header: t("form-total"),
      accessorKey: "total",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.total || "0.00"}
          disabled={true}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => (
        <center>
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => {
            onDelete(props.row.index)
          }}>
          {t("form-delete")}
          </Badge>
          </center>
        ),
    },
  ]

}