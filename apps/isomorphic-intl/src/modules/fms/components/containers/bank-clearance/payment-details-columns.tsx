import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import { BankClearance } from "@/modules/fms/types/bank-clearance"

interface PaymentDetailsColumnsProps {
  onDateChange?: (id: number, date: string) => void
}

export const usePaymentDetailsColumns = ({ onDateChange }: PaymentDetailsColumnsProps = {}) => {
  const t = useTranslations("form")

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

  const editColumns = [
    {
      id: "paymentNo",
      header: t("form-payment-entry"),
      accessorKey: "paymentNo",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.paymentNo}
        </Text>
      ),
    },
    {
      id: "partyName",
      header: t("form-against-account"),
      accessorKey: "partyName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.partyName}
        </Text>
      ),
    },
    {
      id: "paymentAmount",
      header: t("form-amount"),
      accessorKey: "paymentAmount",
      cell: (props: any) => {
        const amount = props.row.original.paymentAmount || 0
        return (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            ${amount}
          </Text>
        )
      },
    },
    {
      id: "referenceNumber",
      header: t("form-cheque-number"),
      accessorKey: "referenceNumber",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.referenceNumber}
        </Text>
      ),
    },
    {
      id: "bankClearenceDate",
      header: t("form-clearance-date"),
      accessorKey: "bankClearenceDate",
      cell: (props: any) => {
        const currentDate = props.row.original.bankClearenceDate
          ? new Date(props.row.original.bankClearenceDate)
          : null

        return (
          <DatePicker
            popperPlacement="bottom-end"
            placeholderText={t("form-clearance-date")}
            value={currentDate}
            onChange={(date: any) => {
              if (date && onDateChange) {
                const isoDate = date.toISOString()
                onDateChange(props.row.original.id, isoDate)
              }
            }}
            portal
            portalTarget={document.body}
          />
        )
      },
    },
  ]

  return [...baseColumns, ...editColumns]
}
