"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"

import { useItemsListColumns } from "./items-list-column"

interface ItemsListTableProps {
  isDisabled?: boolean
  data?: any[]
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  setValue?: any
}

export function ItemsListTable({
  isDisabled = false,
  data = [],
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  setValue = () => {},
}: ItemsListTableProps) {
  const t = useTranslations("form")

  const columns = useItemsListColumns({
    isDisabled,
    onDelete: onRowDelete,
    setValue,
  })

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns as any}
        gridTemplateColumns={cn(
          "50px 610px 220px 220px 220px 60px",
          isDisabled ? "5px" : "5px"
        )}
        variant="modern"
        onRowChange={onRowChange}
      />
      {!isDisabled || true || !isDisabled && (
        <Button variant="outline" onClick={onAddRow} className="mt-4">
          <PiPlusBold className="me-2 h-4 w-4" />
          {t("form-add-row")}
        </Button>
      )}
    </div>
  )
}
