"use client"

import { useEffect, useState } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Badge, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { allocatedAmountAtom } from "@/modules/fms/store/payment-allocation"
import { useSalesInvoiceList } from "@/modules/crm/hooks"
import { useSelectOptions } from "@/hooks/use-select-options"
import { SalesInvoice } from "@/modules/crm/types/sales-invoice"

interface TransactionPaymentTypeOption {
  value: string
  label: string
}

const transactionPaymentTypeOptions: TransactionPaymentTypeOption[] = [
  { value: "Sales Invoice", label: "Sales Invoice" },
  { value: "Purchase Invoice", label: "Purchase Invoice" },
  { value: "Journal Entry", label: "Journal Entry" },
  { value: "Bank Transaction", label: "Bank Transaction" },
]

interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  data?: any[]
}

interface ReferenceOption {
  value: string | number
  label: string
  grandTotal?: number
  outstandingAmount?: number
}

export const usePaymentReferenceColumns = ({
  isFieldDisabled,
  onDelete,
  data,
}: ColumnProps) => {
  const t = useTranslations("form")
  const { journalEntry, bankTransaction } =
    useSharedDataHooks([
      "journalEntry",
      "bankTransaction",
    ])

  const { journalEntryOptions, isJournalEntryLoading } = journalEntry
  const { bankTransactionOptions, isBankTransactionLoading } = bankTransaction
  const { data: salesInvoiceData, isLoading: isSalesInvoiceLoading } = useSalesInvoiceList({ pageSize: 100 })

  const salesInvoiceOptions = useSelectOptions<SalesInvoice>(
    salesInvoiceData?.data,
    "invoiceNo"
  )

  const [, setAllocatedAmount] = useAtom(allocatedAmountAtom)

  // Add this state to track all rows
  const [rows, setRows] = useState<any[]>([])

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
      id: "paymentType",
      header: t("form-payment-type"),
      accessorKey: "paymentType",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.paymentType || ""}
        </Text>
      ),
    },
    {
      id: "paymentCode",
      header: t("form-payment-code"),
      accessorKey: "paymentCode",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.paymentCode || ""}
        </Text>
      ),
    },
    {
      id: "grandTotal",
      header: t("form-grand-total"),
      accessorKey: "grandTotal",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.grandTotal || 0}
        </Text>
      ),
    },
    {
      id: "outstandingAmount",
      header: t("form-outstanding-amount"),
      accessorKey: "outstandingAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.outstandingAmount || 0}
        </Text>
      ),
    },
    {
      id: "allocatedAmount",
      header: t("form-allocated-amount"),
      accessorKey: "allocatedAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.allocatedAmount || 0}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "paymentType",
      header: t("form-payment-type"),
      accessorKey: "paymentType",
      cell: (props: any) => (
        <Select
          options={transactionPaymentTypeOptions}
          menuPortalTarget={document.body}
          value={
            props.row.original.paymentType
              ? transactionPaymentTypeOptions.find(
                (option: any) => option.value === props.row.original.paymentType
              )
              : null
          }
          onChange={(option: any) => {
            props.table.options.meta?.updateData(
              props.row.index,
              "paymentType",
              option?.value
            )
          }}
          placeholder={t("form-select")}
          isDisabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "paymentCode",
      header: t("form-payment-code"),
      accessorKey: "paymentCode",
      cell: (props: any) => {
        let options: ReferenceOption[] = []
        let isLoading = false
        let value = null
        const rowPaymentType = props.row.original.paymentType

        if (rowPaymentType === "Journal Entry") {
          options = journalEntryOptions
          isLoading = isJournalEntryLoading
          value = journalEntryOptions.find(
            (option: any) => option.value === props.row.original.paymentCode
          )
        } else if (rowPaymentType === "Bank Transaction") {
          options = bankTransactionOptions
          isLoading = isBankTransactionLoading
          value = bankTransactionOptions.find(
            (option: any) => option.value === props.row.original.paymentCode
          )
        } else if (rowPaymentType === "Sales Invoice") {
          options = salesInvoiceOptions
          isLoading = isSalesInvoiceLoading
          value = salesInvoiceOptions.find(
            (option: any) => option.value === props.row.original.paymentCode
          )
        }

        return (
          <Select
            options={options}
            value={value}
            onChange={(option: any) => {
              props.table.options.meta?.updateData(
                props.row.index,
                "paymentCode",
                option?.value
              )

              // Update grandTotal and outstandingAmount when Sales Invoice is selected
              if (rowPaymentType === "Sales Invoice" && option) {
                const selectedInvoice = salesInvoiceData?.data?.find(
                  (invoice: any) => invoice.invoiceNo === option.label
                )

                if (selectedInvoice) {
                  props.table.options.meta?.updateData(
                    props.row.index,
                    "grandTotal",
                    selectedInvoice.grandTotal
                  )
                  props.table.options.meta?.updateData(
                    props.row.index,
                    "outstandingAmount",
                    selectedInvoice.outstandingAmount
                  )
                }
              }
            }}
            isLoading={isLoading}
            placeholder={t("form-select")}
            menuPortalTarget={document.body}
            isDisabled={!rowPaymentType || isFieldDisabled}
          />
        )
      },
    },
    {
      id: "grandTotal",
      header: t("form-grand-total"),
      accessorKey: "grandTotal",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.grandTotal || ""}
          disabled={true}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "outstandingAmount",
      header: t("form-outstanding-amount"),
      accessorKey: "outstandingAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.outstandingAmount || ""}
          disabled={true}
          placeholder="0.00"
        />
      ),
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

              const newRows = [...rows]
              newRows[props.row.index] = {
                ...newRows[props.row.index],
                allocatedAmount: newValue,
              }
              setRows(newRows)

              props.table.options.meta?.updateData(
                props.row.index,
                "allocatedAmount",
                newValue
              )

              const totalAllocated = newRows.reduce((sum: number, row: any) => {
                return sum + (Number(row?.allocatedAmount) || 0)
              }, 0)

              setAllocatedAmount(totalAllocated)
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
          onClick={() => {
            onDelete(props.row.index)
            // Clean up rows and recalculate allocated amount
            setRows((prev) => {
              const newRows = [...prev]
              newRows.splice(props.row.index, 1)
              // Reindex remaining rows
              const updatedRows = newRows.map((row, i) => ({
                ...row,
                id: i + 1,
              }))

              // Recalculate total allocated amount
              const totalAllocated = updatedRows.reduce(
                (sum: number, row: any) => {
                  return sum + (Number(row.allocatedAmount) || 0)
                },
                0
              )
              setAllocatedAmount(totalAllocated)

              return updatedRows
            })
          }}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  useEffect(() => {
    if (data) {
      setRows(data)
    }
  }, [data])

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}
