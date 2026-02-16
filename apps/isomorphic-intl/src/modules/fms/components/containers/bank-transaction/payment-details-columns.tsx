"use client"

import { useEffect, useState } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Badge, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  TransactionPaymentType,
  selectedTransactionPaymentTypeAtom,
} from "@/modules/fms/store/transaction-payment-type-atom"

import { totalAllocatedAmountAtom } from "./amount-allocation"

const transactionPaymentTypeOptions = [
  { value: "Journal Entry", label: "Journal Entry" },
  { value: "Bank Transaction", label: "Bank Transaction" },
]

interface ColumnProps {
  isFieldDisabled: boolean
  data?: any[]
}

export const usePaymentDetailsColumns = ({
  isFieldDisabled,
  data,
}: ColumnProps) => {
  const t = useTranslations("form")
  const {
    journalEntry,
    bankTransaction,
  } = useSharedDataHooks([
    "paymentType",
    "journalEntry",
    "bankTransaction",
  ])


  const { journalEntryOptions, isJournalEntryLoading } = journalEntry
  const { bankTransactionOptions, isBankTransactionLoading } = bankTransaction

  const [selectedTransactionPaymentType, setSelectedTransactionPaymentType] =
    useAtom(selectedTransactionPaymentTypeAtom)

  const [, setTotalAllocatedAmount] = useAtom(totalAllocatedAmountAtom)

  // Add this state to track all rows
  const [rows, setRows] = useState<any[]>([])

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
      id: "paymentType",
      header: t("form-payment-type"),
      accessorKey: "paymentType",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.paymentType}
        </Text>
      ),
    },
    {
      id: "paymentCode",
      header: t("form-payment-code"),
      accessorKey: "paymentCode",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.paymentCode}
        </Text>
      ),
    },
    {
      id: "allocatedAmount",
      header: t("form-allocated-amount"),
      accessorKey: "allocatedAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.allocatedAmount}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "paymentType",
      header: t("form-payment-type"),
      accessorKey: "paymentType",
      cell: (props: any) => {
        const currentValue = props.row.original.paymentType
        const selectedOption = transactionPaymentTypeOptions.find(
          (option) => option.value === currentValue
        )

        return (
          <Select
            options={transactionPaymentTypeOptions}
            menuPortalTarget={document.body}
            value={selectedOption}
            onChange={(option: any) => {
              if (option?.value) {
                // Update the payment type in the table
                props.table.options.meta?.updateData(
                  props.row.index,
                  "paymentType",
                  option.value
                )
                // Update the selected payment type state
                setSelectedTransactionPaymentType((prev) => ({
                  ...prev,
                  [props.row.index]: option.value as TransactionPaymentType,
                }))
                // Clear payment code when payment type changes
                props.table.options.meta?.updateData(
                  props.row.index,
                  "paymentCode",
                  null
                )
              } else {
                // If no option selected, set both to null
                props.table.options.meta?.updateData(
                  props.row.index,
                  "paymentType",
                  null
                )
                props.table.options.meta?.updateData(
                  props.row.index,
                  "paymentCode",
                  null
                )
              }
            }}
            placeholder={t("form-select")}
            isDisabled={isFieldDisabled}
          />
        )
      },
    },
    {
      id: "paymentCode",
      header: t("form-payment-code"),
      accessorKey: "paymentCode",
      cell: (props: any) => {
        let options: any[] = []
        let isLoading = false

        let value = null
        const rowPaymentType = selectedTransactionPaymentType[props.row.index]

        if (rowPaymentType === "Journal Entry") {
          options = journalEntryOptions
          isLoading = isJournalEntryLoading
          value = journalEntryOptions.find(
            (option: any) => option.label === props.row.original.paymentCode
          )
        } else if (rowPaymentType === "Bank Transaction") {
          options = bankTransactionOptions
          isLoading = isBankTransactionLoading
          value = bankTransactionOptions.find(
            (option: any) => option.label === props.row.original.paymentCode
          )
        }

        return (
          <Select
            options={options}
            menuPortalTarget={document.body}
            value={value}
            onChange={(option: any) => {
              if (option?.label) {
                props.table.options.meta?.updateData(
                  props.row.index,
                  "paymentCode",
                  option.label
                )
              } else {
                props.table.options.meta?.updateData(
                  props.row.index,
                  "paymentCode",
                  null
                )
              }
            }}
            isLoading={isLoading}
            placeholder={t("form-select")}
            isDisabled={isFieldDisabled || !rowPaymentType}
          />
        )
      },
    },
    {
      id: "allocatedAmount",
      header: t("form-allocated-amount"),
      accessorKey: "allocatedAmount",
      cell: (props: any) => (
        <div>
          <Input
            type="number"
            value={props.row.original.allocatedAmount || ""}
            onChange={(e) => {
              const newValue = Number(e.target.value) || 0

              // Update rows state with new value
              const newRows = [...rows]
              newRows[props.row.index] = {
                ...newRows[props.row.index],
                allocatedAmount: newValue,
              }
              setRows(newRows)

              // Calculate total from updated rows
              const totalAllocated = newRows.reduce((sum: number, row: any) => {
                return sum + (Number(row.allocatedAmount) || 0)
              }, 0)

              // Store the total in global state
              setTotalAllocatedAmount(totalAllocated)

              // Update the row in the table
              props.table.options.meta?.updateData(
                props.row.index,
                "allocatedAmount",
                newValue
              )
            }}
            placeholder="0.00"
            min={0}
            disabled={isFieldDisabled}
          />
        </div>
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
          onClick={() => props.onDelete()}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  // Update rows when data changes
  useEffect(() => {
    if (data) {
      setRows(data)
    }
  }, [data])

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}
