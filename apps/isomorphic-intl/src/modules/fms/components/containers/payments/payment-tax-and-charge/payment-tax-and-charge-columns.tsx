"use client"

import { useEffect } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Badge, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  TaxRow,
  paymentAmountAtom,
  taxRowsAtom,
  taxSyncAtom,
  totalTaxAtom,
} from "@/modules/fms/store/payment-allocation"
import { TaxType, selectedTaxTypeAtom } from "@/modules/fms/store/tax-type-atom"

interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

type TaxTypeOption = {
  value: TaxType
  label: string
}

const taxTypeOptions: TaxTypeOption[] = [
  { value: "Actual", label: "Actual" },
  { value: "On net total", label: "On net total" },
]

export const usePaymentTaxAndChargeColumns = ({
  isFieldDisabled,
  onDelete,
  setValue,
}: ColumnProps) => {
  const t = useTranslations("form")
  const { coa } = useSharedDataHooks(["coa"])
  const { coaOptions, isCOALoading } = coa

  const [selectedTaxType, setSelectedTaxType] = useAtom(selectedTaxTypeAtom)
  const [paymentAmount] = useAtom(paymentAmountAtom)
  const [taxRows, setTaxRows] = useAtom(taxRowsAtom)
  const [totalTax] = useAtom(totalTaxAtom)
  const [, syncTax] = useAtom(taxSyncAtom)

  useEffect(() => {
    setValue("totalTax", totalTax || 0)
  }, [totalTax, setValue])

  const calculateTotal = (props: any) => {
    const taxRate = props.row.original.taxRate || 0
    const amount = props.row.original.amount || 0
    let currentRowTax = 0

    if (selectedTaxType[props.row.index] === "Actual") {
      currentRowTax = amount
    } else if (selectedTaxType[props.row.index] === "On net total") {
      currentRowTax = (paymentAmount * taxRate) / 100
    }

    const previousTax = taxRows.reduce(
      (sum: number, row: TaxRow, i: number) => {
        if (i >= props.row.index) return sum
        if (!row) return sum
        if (row.taxType === "Actual") {
          return sum + (row.amount || 0)
        } else if (row.taxType === "On net total") {
          return sum + (paymentAmount * (row.taxRate || 0)) / 100
        }
        return sum
      },
      0
    )

    return paymentAmount + currentRowTax + previousTax
  }

  const baseColumns = [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]

  const viewColumns = [
    {
      id: "taxType",
      header: t("form-tax-type"),
      accessorKey: "taxType",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.taxType}
        </Text>
      ),
    },
    {
      id: "account",
      header: t("form-chart-of-account"),
      accessorKey: "account",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.account.accountName}
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
      id: "amount",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.amount}
        </Text>
      ),
    },
    {
      id: "total",
      header: t("form-total"),
      accessorKey: "total",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.total}
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
            props.row.original.taxType
              ? taxTypeOptions.find(
                (option: any) => option.value === props.row.original.taxType
              )
              : null
          }
          onChange={(option: any) => {
            const taxTypeName = option?.value as TaxType

            setSelectedTaxType((prev) => {
              const newState = { ...prev }
              newState[props.row.index] = taxTypeName
              return newState
            })

            let newRate = props.row.original.rate || 0
            let newAmount = props.row.original.amount || 0

            if (taxTypeName === "Actual") {
              newRate = 0
            } else if (taxTypeName === "On net total") {
              newAmount = 0
            }

            const total = calculateTotal({
              row: {
                index: props.row.index,
                original: { taxRate: newRate, amount: newAmount },
              },
            })

            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              taxRate: newRate,
              amount: newAmount,
              total,
              taxType: taxTypeName,
            })

            props.table.options.meta?.updateData(
              props.row.index,
              "taxType",
              taxTypeName
            )
          }}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "accountId",
      header: t("form-chart-of-account"),
      accessorKey: "accountId",
      cell: (props: any) => (
        <Select
          options={coaOptions}
          menuPortalTarget={document.body}
          value={
            props.row.original.accountId
              ? coaOptions.find(
                (option: any) =>
                  option.value === props.row.original.accountId
              )
              : null
          }
          onChange={(option: any) => {
            props.table.options.meta?.updateData(
              props.row.index,
              "accountId",
              option?.value
            )
          }}
          isLoading={isCOALoading}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
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
          value={props.row.original.taxRate || ""}
          onChange={(e) => {
            const newValue = Number(e.target.value) || 0
            const total = calculateTotal({
              row: {
                index: props.row.index,
                original: {
                  ...props.row.original,
                  taxRate: newValue,
                },
              },
            })

            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              taxRate: newValue,
              amount: props.row.original.amount || 0,
              total,
              taxType: selectedTaxType[props.row.index],
            })
          }}
          placeholder="0.00"
          min={0}
          disabled={
            selectedTaxType[props.row.index] === "Actual" || isFieldDisabled
          }
        />
      ),
    },
    {
      id: "amount",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.amount || ""}
          onChange={(e) => {
            const newValue = Number(e.target.value) || 0
            const total = calculateTotal({
              row: {
                index: props.row.index,
                original: {
                  ...props.row.original,
                  amount: newValue,
                },
              },
            })

            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              taxRate: props.row.original.taxRate || 0,
              amount: newValue,
              total,
              taxType: selectedTaxType[props.row.index],
            })
          }}
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
        <Badge
          variant="flat"
          color="danger"
          rounded="lg"
          className="cursor-pointer"
          onClick={() => {
            onDelete(props.row.index)
            setSelectedTaxType((prev) => {
              const newState = { ...prev }
              delete newState[props.row.index]
              return newState
            })
            setTaxRows((prev) => {
              const newRows = [...prev]
              newRows.splice(props.row.index, 1)
              return newRows
            })
          }}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}
