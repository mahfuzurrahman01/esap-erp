import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { closestCenter } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { JournalDetail } from "@/modules/fms/types"

import { useJournalEntryTableColumn } from "./table-column"

export default function EntryTable({
  tableData,
  isLoading,
}: {
  tableData: JournalDetail[]
  isLoading: boolean
}) {
  const { direction } = useDirection()
  const columns = useJournalEntryTableColumn()

  const { table, columnOrder, sensors, handleDragEndColumn } =
    useTanStackTable<JournalDetail>({
      tableData: tableData ?? [],
      columnConfig: columns,
      options: {
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
        getRowId: (row) => row.id?.toString() ?? "",
        enableColumnResizing: true,
        enableRowSelection: false,
      },
    })

  return (
    <WidgetCard
      rounded="xl"
      className="flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant={"modern"}
          columnOrder={columnOrder}
          isLoading={isLoading}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
        />
      </DndContext>
    </WidgetCard>
  )
}
