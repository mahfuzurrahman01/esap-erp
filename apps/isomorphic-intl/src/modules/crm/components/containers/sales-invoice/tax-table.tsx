"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"

import TableGrid from "@/components/ui/table-grid"
import { useTaxColumns } from "../sales-orders/tax-column"

interface TableProps {
  data?: any
}

export function TaxTable({
  data = [],
}: TableProps) {
  const t = useTranslations("form")
  const columns = useTaxColumns()
  return (
    <div className="print:non-scrollable space-y-4 pt-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="py-6 text-base font-medium text-title">
          {t("form-taxes-charges")}
        </div>
      </div>
      <TableGrid
        data={data.invoiceVatTaxDetailsDTOs}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 190px 300px 100px 100px"
        )}
        variant="modern"
      />
    </div>
  )
}

