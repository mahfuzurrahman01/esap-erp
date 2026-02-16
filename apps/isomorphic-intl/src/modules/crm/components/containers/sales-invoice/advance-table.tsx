"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"

import TableGrid from "@/components/ui/table-grid"
import { useAdvanceColumns } from "./advanced-payments/advance-column"

interface TableProps {
  data?: any
}

export function AdvanceTable({
  data = [],
}: TableProps) {
  const t = useTranslations("form")
  const columns = useAdvanceColumns()
  return (
    <div className="print:non-scrollable space-y-4 pt-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="py-6 text-base font-medium text-title">
          {t("form-advance-payments")}
        </div>
      </div>
      <TableGrid
        data={data.invoiceAdvancePayments}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 170px 150px 160px 170px"
        )}
        variant="modern"
      />
    </div>
  )
}

