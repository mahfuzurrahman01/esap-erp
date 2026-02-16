"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"
import { useTaxAndChargeColumns } from "./tax-and-charge-columns"

interface TaxAndChargeTableProps {
  isFieldDisabled?: boolean
  data?: any[]
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  setValue?: any
}

export function TaxAndChargeTable({
  isFieldDisabled = false,
  data = [],
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  setValue = () => {},
}: TaxAndChargeTableProps) {
  const t = useTranslations("form")

  const columns = useTaxAndChargeColumns({
    onDelete: onRowDelete,
    setValue,
  })

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns as any}
        gridTemplateColumns={cn(
          "50px 220px 430px 210px 210px 210px 80px",
          isFieldDisabled ? "5px" : "5px"
        )}
        variant="modern"
        onRowChange={onRowChange}
      />
      {!isFieldDisabled || true || !isFieldDisabled && (
        <Button variant="outline" onClick={onAddRow} className="mt-4">
          <PiPlusBold className="me-2 h-4 w-4" />
          {t("form-add-row")}
        </Button>
      )}
    </div>
  )
}
