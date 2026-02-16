import { useTranslations } from "next-intl"
import { SelectOption, Text } from "rizzui"

import { Badge, Input, Select } from "@/components/ui"
import { useAtom } from "jotai"
import { selectedTaxTypeAtom, TaxType } from "@/modules/fms/store/tax-type-atom"
import { taxTypeOptions } from "@/modules/fms/constants/shared-data-hook"

interface ColumnProps {
  chartOfAccountOptions: SelectOption[]
  isFieldDisabled: boolean
  isCOALoading: boolean
  onDelete: (index: number) => void
}

export const useTaxDetailsColumns = ({
  chartOfAccountOptions,
  isFieldDisabled,
  isCOALoading,
  onDelete
}: ColumnProps) => {
  const t = useTranslations("form")
  const [selectedTaxType, setSelectedTaxType] = useAtom(selectedTaxTypeAtom)

  const baseColumns = [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      width: "50px",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]

  const viewColumns = [
    {
      id: "taxTypeName",
      header: t("form-tax-type"),
      accessorKey: "taxTypeName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxTypeName}
        </Text>
      ),
    },
    {
      id: "chartOfAccountName",
      header: t("form-chart-of-account-name"),
      accessorKey: "chartOfAccountName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.chartOfAccountName}
        </Text>
      ),
    },
    {
      id: "taxRate",
      header: t("form-tax-rate"),
      accessorKey: "taxRate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxRate}
        </Text>
      ),
    },
    {
      id: "taxAmount",
      header: t("form-tax-amount"),
      accessorKey: "taxAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxAmount}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "taxType",
      header: t("form-tax-type"),
      accessorKey: "taxType",
      cell: (props: any) => (
        <Select
          options={taxTypeOptions}
          menuPortalTarget={document.body}
          value={
            taxTypeOptions.find(
              (option) => option.value == props.row.original.taxType
            ) || null
          }
          onChange={async (option: any) => {
            const selectedType = option?.value
            setSelectedTaxType((prev:any) => ({
              ...prev,
              [props.row.index]: selectedType,
            }))

            props.table.options.meta?.updateData(
              props.row.index,
              "taxType",
              selectedType
            )
          }}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "chartOfAccountId",
      header: t("form-accounts-head"),
      accessorKey: "chartOfAccountId",
      cell: (props: any) => {
        const currentValue = props.row.original.chartOfAccountId
        return (
          <Select
            labelClassName="text-title"
            options={chartOfAccountOptions}
            value={
              chartOfAccountOptions.find(
                (option) => option.value === currentValue
              ) || null
            }
            onChange={(option: any) =>
              props.table.options.meta?.updateData(
                props.row.index,
                "chartOfAccountId",
                option?.value
              )
            }
            menuPortalTarget={document.body}
            isDisabled={isCOALoading || isFieldDisabled}
          />
        )
      },
    },
    {
      id: "taxRate",
      header: t("form-tax-rate"),
      accessorKey: "taxRate",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxRate",
              Number(e.target.value)
            )
          }
          placeholder="0.00"
          min={0}
          disabled={
            selectedTaxType[props.row.index] === "Actual" || isFieldDisabled
          }
        />
      ),
    },
    {
      id: "taxAmount",
      header: t("form-tax-amount"),
      accessorKey: "taxAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) =>
            props.table.options.meta?.updateData(
              props.row.index,
              "taxAmount",
              Number(e.target.value)
            )
          }
          placeholder="0.00"
          min={0}
          disabled={
            selectedTaxType[props.row.index] === "On net total" ||
            isFieldDisabled
          }
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
          onClick={() =>
            onDelete(props.row.index)
          }>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}
