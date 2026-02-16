import { useDirection } from "@core/hooks/use-direction"
import { closestCenter } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { useEffect } from "react"

import MainTable from "@/components/base/table/main-table"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { VoucherMatchItem } from "@/modules/fms/store/voucher-match-store"

import { useColumn } from "./use-column"

interface VouchersMatchTableProps {
  data: VoucherMatchItem[]
  isLoading: boolean
  onSelectionChange?: (selectedRows: VoucherMatchItem[]) => void
}

export default function VouchersMatchTable({
  data,
  isLoading,
  onSelectionChange,
}: VouchersMatchTableProps) {
  const columns = useColumn()
  const direction = useDirection()

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<VoucherMatchItem>({
      tableData: data || [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            right: ["action"],
          },
        },
        enableRowSelection: true,
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
      },
    })

  // Handle row selection changes
  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
    onSelectionChange?.(selectedRows)
  }, [table.getSelectedRowModel().rows, onSelectionChange])

  //console.log("Table Data:", data) // Debug log

  if (!data.length) {
    return null // The parent component will handle the empty state message
  }

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant="modern"
          columnOrder={columnOrder}
          isLoading={isLoading}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
        />
      </DndContext>
    </>
  )
}
