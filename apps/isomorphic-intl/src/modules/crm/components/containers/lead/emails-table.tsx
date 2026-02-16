"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import TableGrid from "@/components/ui/table-grid"
import { useEmailsColumn } from "./emails-column"

interface PaymentReferenceTableProps {
  data?: any
}

export function EmailsTable({
  data = [],
}: PaymentReferenceTableProps) {
  const t = useTranslations("form")
  const columns = useEmailsColumn()
  return (
    <div className="print:non-scrollable space-y-4 pt-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="py-6 text-base font-medium text-title">
          {t("form-email-history")}
        </div>
      </div>
      <TableGrid
        data={data.emailTrackings}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 300px 200px 200px"
        )}
        variant="modern"
      />
    </div>
  )
}
