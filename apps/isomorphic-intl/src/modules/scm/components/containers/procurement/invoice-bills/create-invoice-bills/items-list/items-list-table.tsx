"use client"

import { usePathname } from "next/navigation"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"

import { useItemsListColumns } from "./items-list-column"

interface ItemsListTableProps {
  isFieldDisabled?: boolean
  data?: any[]
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  setValue?: any
}

export function ItemsListTable({
  isFieldDisabled = false,
  data = [],
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  setValue = () => {},
}: ItemsListTableProps) {
  const t = useTranslations("form")
  const pathname = usePathname()
  const isPrintView = pathname?.split("/").pop() === "print"

  const gridTemplateColumns = isPrintView
    ? "50px 1fr 1fr 1fr 1fr 1fr"
    : isFieldDisabled
      ? "50px 400px 300px 300px 210px 210px"
      : "50px 400px 300px 300px 210px 210px"

  const columns = useItemsListColumns({
    isFieldDisabled,
    onDelete: onRowDelete,
    setValue,
  })

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns as any}
        gridTemplateColumns={gridTemplateColumns}
        variant="modern"
        onRowChange={onRowChange}
      />

      {!isFieldDisabled ||
        true ||
        (!isFieldDisabled && (
          <Button variant="outline" onClick={onAddRow} className="mt-4">
            <PiPlusBold className="me-2 h-4 w-4" />
            {t("form-add-row")}
          </Button>
        ))}
    </div>
  )
}
