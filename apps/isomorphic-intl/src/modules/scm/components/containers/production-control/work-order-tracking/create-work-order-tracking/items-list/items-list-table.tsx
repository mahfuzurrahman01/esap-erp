"use client"

import cn from "@core/utils/class-names"
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
          "50px 1fr 1fr 1fr 1fr 1fr 1fr"
        )}
        variant="modern"
        onRowChange={onRowChange}

      />
    </div>
  )
}
