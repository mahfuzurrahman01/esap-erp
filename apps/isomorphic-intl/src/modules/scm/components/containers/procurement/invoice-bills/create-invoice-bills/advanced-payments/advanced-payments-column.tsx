"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";



import { Badge, Input } from "@/components/ui";
import { advanceAmount, allocatedAmount, referenceName, remarks } from "@/modules/scm/store/global-store-state";

import { Text } from "rizzui/typography";
import { advancedPaymentsAtom, advancePaymentSyncAtom } from "@/modules/scm/store/purchase-invoice";





interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

export const useAdvancedPaymentsColumns = ({
  isFieldDisabled,
  onDelete,
  setValue,
}: ColumnProps) => {
  const t = useTranslations("form")
  const [advancedPayments, setAdvancedPayments] = useAtom(advancedPaymentsAtom)
  const [, syncTax] = useAtom(advancePaymentSyncAtom)
  const [, setSelectedReferenceName] = useAtom(referenceName)
  const [, setSelectedRemarks] = useAtom(remarks)
  const [, setSelectedAdvanceAmount] = useAtom(advanceAmount)
  const [, setSelectedAllocatedAmount] =
    useAtom(allocatedAmount)

  const recalculateAllocatedAmounts = (rows: any[], tableUpdate: any) => {
    rows.forEach((_, index) => {
      const allocatedAmount = rows.reduce((sum, row, i) => {
        if (i > index) return sum
        return sum + (Number(row.advanceAmount) || 0)
      }, 0)

      tableUpdate(index, "allocatedAmount", allocatedAmount.toFixed(2))
    })
    return rows
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
        id: "referenceName",
        header: t("form-reference-name"),
        accessorKey: "referenceName",
        cell: (props: any) => (

          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {props.row.original.referenceName}
          </Text>

        ),
      },
      {
        id: "remarks",
        header: t("form-remarks"),
        accessorKey: "remarks",
        cell: (props: any) => (

          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {props.row.original.remarks}
          </Text>

        ),
      },
      {
        id: "advanceAmount",
        header: t("form-advance-amount"),
        accessorKey: "advanceAmount",

        cell: (props: any) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {props.row.original.advanceAmount || 0}
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


  const columns = [
    {
      id: "referenceName",
      header: t("form-reference-name"),
      accessorKey: "referenceName",
      cell: (props: any) => (
        <Input
          type="text"
          value={props.row.original.referenceName || ""}
          onChange={(e) => {
            setSelectedReferenceName(e.target.value)
            props.onChange(e.target.value)
            setValue(`${props.row.index}.referenceName`, e.target.value)
            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              advanceAmount: props.row.original.advanceAmount || 0,
              allocatedAmount: props.row.original.allocatedAmount || 0,
            })
            props.table.options.meta?.updateData(
              props.row.index,
              "referenceName",
              e.target.value
            )
          }}
          placeholder={t("form-enter-reference-name")}
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "remarks",
      header: t("form-remarks"),
      accessorKey: "remarks",
      cell: (props: any) => (
        <Input
          type="text"
          value={props.row.original.remarks || ""}
          onChange={(e) => {
            setSelectedRemarks(e.target.value)
            props.onChange(e.target.value)

            props.table.options.meta?.updateData(
              props.row.index,
              "remarks",
              e.target.value
            )
          }}
          placeholder={t("form-enter-remarks")}
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "advanceAmount",
      header: t("form-advance-amount"),
      accessorKey: "advanceAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.advanceAmount || ""}
          onChange={(e) => {
            const newValue = Number(e.target.value) || 0
            setSelectedAdvanceAmount(newValue)
            props.onChange(e.target.value)
            syncTax({
              updateData: props.table.options.meta?.updateData,
              index: props.row.index,
              advanceAmount: newValue,
              allocatedAmount: props.row.original.allocatedAmount,
            })
            props.table.options.meta?.updateData(
              props.row.index,
              "advanceAmount",
              e.target.value
            )

            // Update the allocated amount for all rows
            advancedPayments.forEach((_, index) => {
              const allocatedAmount = advancedPayments.reduce((sum, row, i) => {
                if (i > index) return sum
                // Use the new value for the current row being edited
                const amount =
                  i === props.row.index
                    ? newValue
                    : Number(row.advanceAmount) || 0
                return sum + amount
              }, 0)
              setSelectedAllocatedAmount(allocatedAmount)

              props.table.options.meta?.updateData(
                index,
                "allocatedAmount",
                allocatedAmount.toFixed(2)
              )
            })
          }}
          placeholder="0.00"
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "allocatedAmount",
      header: t("form-allocated-amount"),
      accessorKey: "allocatedAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.allocatedAmount || ""}
          onChange={(e) => {
            props.onChange(e.target.value)
          }}
          placeholder="0.00"
          disabled={isFieldDisabled}
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
            setAdvancedPayments((prev) => {
              const newRows = [...prev]
              newRows.splice(props.row.index, 1)

              // Recalculate allocated amounts for remaining rows
              recalculateAllocatedAmounts(
                newRows,
                props.table.options.meta?.updateData
              )
              // Update the total allocated amount
              const newTotalAllocated = advancedPayments
                .filter((_, i) => i !== props.row.index)
                .reduce((sum, row) => sum + (Number(row.advanceAmount) || 0), 0)
              setSelectedAllocatedAmount(newTotalAllocated)
              return newRows
            })
          }}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : columns)]
}