"use client"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"

import { Badge, Input } from "@/components/ui"
import {
  advanceAmount,
  allocatedAmount,
  paymentTerms,
  remarks,
} from "@/modules/crm/store/global-store-state"
import { DatePicker } from "@/components/base/date-picker"
import { advancedPaymentsAtom } from "@/modules/scm/store/purchase-order"

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

  const [, setAdvancedPayments] = useAtom(advancedPaymentsAtom)
  const [, setSelectedpaymentTerms] = useAtom(paymentTerms)
  const [, setSelectedRemarks] = useAtom(remarks)
  const [, setSelectedAdvanceAmount] = useAtom(advanceAmount)
  const [, setSelectedAllocatedAmount] = useAtom(allocatedAmount)

  

  const columns = [
    {
      id: "id",
      header: t("form-no"),
      accessorKey: "id",
      cell: (props: any) => <span>{props.row.index + 1}</span>,
    },
    {
      id: "paymentTerms",
      header: t("form-payment-terms"),
      accessorKey: "paymentTerms",
      cell: (props: any) => (
        <Input
          type="text"
          value={props.value}
          onChange={(e) => {
            setSelectedpaymentTerms(e.target.value)
            props.onChange(e.target.value)
            setValue(`${props.row.index}.paymentTerms`, e.target.value)
          }}
          placeholder={t("form-enter-terms-name")}
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
          value={props.value}
          onChange={(e) => {
            setSelectedRemarks(e.target.value)
            props.onChange(e.target.value)
          }}
          placeholder={t("form-enter-remarks")}
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "dueDate",
      header: t("form-due-date"),
      accessorKey: "dueDate",
      cell: (props: any) => (
        <DatePicker
          autoComplete="off"
          selected={props.value ? new Date(props.value) : null}
          onChange={(date: any) =>
            props.onChange(date ? date.toISOString() : "")
          }
          placeholderText={t("form-select-date")}
          className="w-full"
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "advanceAmount",
      header: t("form-invoice-portion"),
      accessorKey: "advanceAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value || ""}
          onChange={(e) => {
            setSelectedAdvanceAmount(Number(e.target.value))
            setSelectedAllocatedAmount(Number(e.target.value))
            props.onChange(e.target.value)
          }}
          placeholder="0.00"
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "allocatedAmount",
      header: t("form-payment-amount"),
      accessorKey: "allocatedAmount",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
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
              return newRows
            })
          }}>
          {t("form-delete")}
        </Badge>
      ),
    },
  ]

  return columns
}
