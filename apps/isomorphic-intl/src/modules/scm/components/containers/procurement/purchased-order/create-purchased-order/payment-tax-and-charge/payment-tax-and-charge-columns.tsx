"use client";

import { useEffect } from "react";



import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Text } from "rizzui";



import { Badge, Input, Select } from "@/components/ui";
import { taxTypeOptions, useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook";
import { TaxType, selectedTaxTypeAtom } from "@/modules/fms/store/tax-type-atom";
import { paymentAmountAtom, selectChartOfAccountId, selectChartOfAccountName, selectTaxAmount, selectTaxRate, selectTaxTypeId, selectTaxTypeName, selectTotalAmount, totalTaxAmountAtom } from "@/modules/scm/store/global-store-state";
import { TaxRow, taxRowsAtom, taxSyncAtom, totalTaxAtom } from "@/modules/scm/store/purchase-order";





interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

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
  const [, setTotalTaxAmount] = useAtom(totalTaxAmountAtom)
  const [, syncTax] = useAtom(taxSyncAtom)
  const [, setSelectedTaxTypeId] = useAtom(selectTaxTypeId)
  const [, setSelectedTaxTypeName] = useAtom(selectTaxTypeName)
  const [, setSelectedChartOfAccountId] = useAtom(selectChartOfAccountId)
  const [, setSelectedChartOfAccountName] = useAtom(selectChartOfAccountName)
  const [, setSelectedTaxRate] = useAtom(selectTaxRate)
  const [, setSelectedTaxAmount] = useAtom(selectTaxAmount)
  const [, setSelectedTotalAmount] = useAtom(selectTotalAmount)

  useEffect(() => {
    if (isFieldDisabled) return
    setValue("totalTax", totalTax || 0)
    setTotalTaxAmount(Number(totalTax || 0))
  }, [totalTax, setValue])

  const calculateTotal = (props: any) => {
    const rate = props.row.original.rate || 0
    const amount = props.row.original.amount || 0
    let currentRowTax = 0



    if (selectedTaxType[props.row.index] === "Actual") {
      currentRowTax = amount
    } else if (selectedTaxType[props.row.index] === "On net total") {
      currentRowTax = (paymentAmount * rate) / 100
    }

    const previousTax = taxRows.reduce(
      (sum: number, row: TaxRow, i: number) => {
        if (i >= props.row.index) return sum
        if (!row) return sum
        if (row.taxType === "Actual") {
          return sum + (row.amount || 0)
        } else if (row.taxType === "On net total") {
          return sum + (paymentAmount * (row.rate || 0)) / 100
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
      header: t("form-chart-of-account"),
      accessorKey: "chartOfAccountName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.chartOfAccountName}
        </Text>
      ),
    },
    {
      id: "rate",
      header: t("form-tax-rate"),
      accessorKey: "rate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.rate || 0}
        </Text>

      ),
    },
    {
      id: "amount",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.amount || 0}
        </Text>
      ),

    },
    {
      id: "total",
      header: t("form-total"),
      accessorKey: "total",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.total || 0}
        </Text>
      ),

    },
  ]

  const editColumns = !isFieldDisabled ? [
    {
      id: "taxTypeId",
      header: t("form-tax-type"),
      accessorKey: "taxTypeId",
      cell: (props: any) => (
        <Select
          options={taxTypeOptions}
          menuPortalTarget={document.body}
          value={
            props.row.original.taxTypeId
              ? taxTypeOptions.find(
                  (option: any) => option.value === props.row.original.taxTypeId
                )
              : null
          }
          onChange={(option: any) => {
            setSelectedTaxTypeId(option?.value)
            setSelectedTaxTypeName(option?.label)
            const taxTypeName = option?.value as TaxType

            setSelectedTaxType((prev) => ({
              ...prev,
              [props.row.index]: taxTypeName,
            }))

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
                original: { rate: newRate, amount: newAmount },
              },
            })

            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              rate: newRate,
              amount: newAmount,
              total,
              taxType: taxTypeName,
            })

            props.table.options.meta?.updateData(
              props.row.index,
              "taxTypeId",
              option?.value
            )
          }}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "chartOfAccountId",
      header: t("form-chart-of-account"),
      accessorKey: "chartOfAccountId",
      cell: (props: any) => (
        <Select
          options={coaOptions}
          menuPortalTarget={document.body}
          value={
            props.row.original.chartOfAccountId
              ? coaOptions.find(
                  (option: any) =>
                    option.value === props.row.original.chartOfAccountId
                )
              : null
          }
          onChange={(option: any) => {
            setSelectedChartOfAccountId(option?.value)
            setSelectedChartOfAccountName(option?.label)
            props.table.options.meta?.updateData(
              props.row.index,
              "chartOfAccountId",
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
      id: "rate",
      header: t("form-tax-rate"),
      accessorKey: "rate",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.rate || ""}
          onChange={(e) => {
            const newValue = Number(e.target.value) || 0
            const total = calculateTotal({

              row: {
                index: props.row.index,
                original: {
                  ...props.row.original,
                  rate: newValue,
                },
              },
            })

            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              rate: newValue,
              amount: props.row.original.amount || 0,
              total,
              taxType: selectedTaxType[props.row.index],

            })
            setSelectedTaxRate(newValue)
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
          value={
            props.row.original.amount || ""
          }

          onChange={(e) => {
            const newValue = Number(e.target.value) || 0
            setSelectedTaxAmount(newValue)
            const total = calculateTotal({
              row: {
                index: props.row.index,
                original: {
                  ...props.row.original,
                  amount: newValue,
                },
              },
            })
            setSelectedTotalAmount(total)
            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              rate: props.row.original.rate || 0,
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
          value={
            props.row.original.total || "0.00"
          }
          disabled={true}
          placeholder="0.00"

        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => {
       return (
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
       )
      },
    },
  ] : []

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}