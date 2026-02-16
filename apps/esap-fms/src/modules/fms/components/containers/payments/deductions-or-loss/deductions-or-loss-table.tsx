"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"

import { useDeductionsOrLossColumns } from "./deductions-or-loss-columns"

interface DeductionsOrLossTableProps {
  isFieldDisabled?: boolean
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  data?: any[]
}

export function DeductionsOrLossTable({
  isFieldDisabled = false,
  onRowChange,
  onRowDelete = () => { },
  onAddRow,
  data = [],
}: DeductionsOrLossTableProps) {
  const t = useTranslations("form")
  const columns = useDeductionsOrLossColumns({
    isFieldDisabled,
    onDelete: onRowDelete,
  })

  return (
    <div className="space-y-4">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns={cn("50px 1fr 1fr 150px", isFieldDisabled ? "" : "80px")}
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
