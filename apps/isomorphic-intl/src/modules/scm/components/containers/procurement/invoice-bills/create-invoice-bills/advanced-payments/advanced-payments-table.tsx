"use client"

import { usePathname } from "next/navigation"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"

import { useAdvancedPaymentsColumns } from "./advanced-payments-column"

interface AdvancedPaymentsTableProps {
  isFieldDisabled?: boolean
  data?: any[]
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  setValue?: any
}

export function AdvancedPaymentsTable({
  isFieldDisabled = false,
  data = [],
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  setValue = () => {},
}: AdvancedPaymentsTableProps) {
  const t = useTranslations("form")
  const pathname = usePathname()
  const isPrintView = pathname?.split("/").pop() === "print"

  const columns = useAdvancedPaymentsColumns({
    isFieldDisabled,
    onDelete: onRowDelete,
    setValue,
  })

  const gridTemplateColumns = isPrintView
    ? "50px 1fr 1fr 1fr 1fr"
    : isFieldDisabled
      ? "50px 1fr 1fr 200px 200px 200px"
      : "50px 1fr 1fr 200px 200px 80px"

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns={gridTemplateColumns}
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
