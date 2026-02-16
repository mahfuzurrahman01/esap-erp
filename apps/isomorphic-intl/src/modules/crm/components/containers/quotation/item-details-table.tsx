"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"

import TableGrid from "@/components/ui/table-grid"
import { useItemDetailsColumns } from "./item-details-columns"

interface TableProps {
  data?: any
}

export function ItemDetailsTable({
  data = [],
}: TableProps) {
  const t = useTranslations("form")
  const columns = useItemDetailsColumns()
  return (
    <div className="print:non-scrollable space-y-4 pt-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="py-6 text-base font-medium text-title">
          {t("form-items")}
        </div>
      </div>
      <TableGrid
        data={data.quotationDetails}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 300px 1fr 150px 150px"
        )}
        variant="modern"
      />
    </div>
  )
}
