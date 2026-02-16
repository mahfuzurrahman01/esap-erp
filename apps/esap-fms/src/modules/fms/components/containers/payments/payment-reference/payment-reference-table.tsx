"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"

import { usePaymentReferenceColumns } from "./payment-reference-columns"

interface PaymentReferenceTableProps {
  isFieldDisabled?: boolean
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  data?: any[]
}

export function PaymentReferenceTable({
  isFieldDisabled = false,
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  data = [],
}: PaymentReferenceTableProps) {
  const t = useTranslations("form")
  const columns = usePaymentReferenceColumns({
    isFieldDisabled,
    onDelete: onRowDelete,
  })

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 1fr 1fr 200px 250px 250px",
          isFieldDisabled ? "" : "80px"
        )}
        variant="modern"
        onRowChange={onRowChange}
      />
      {!isFieldDisabled && (
        <Button variant="outline" onClick={onAddRow} className="mt-4">
          <PiPlusBold className="me-2 h-4 w-4" />
          {t("form-add-row")}
        </Button>
      )}
    </div>
  )
}
