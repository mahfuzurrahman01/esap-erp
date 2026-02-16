"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"

import { useItemsListColumns } from "./agreement-list-column"

interface AgreementListTableProps {
  isFieldDisabled?: boolean
  data?: any[]
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  setValue?: any

}

export function AgreementListTable({
  isFieldDisabled = false,
  data = [],
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  setValue = () => {},
}: AgreementListTableProps) {
  const t = useTranslations("form")


  const columns = useItemsListColumns({
    isFieldDisabled,
    onDelete: onRowDelete,
    setValue,
  })

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 1fr 1fr",
          isFieldDisabled ? "1px" : "80px"
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
