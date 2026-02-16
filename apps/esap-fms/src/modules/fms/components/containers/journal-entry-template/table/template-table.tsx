import { useDirection } from "@core/hooks/use-direction"
import { closestCenter } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { JournalTemplateView } from "@/modules/fms/types"

import { useTemplateTableColumn } from "./table-column"

export default function TemplateTable({
  tableData,
  isLoading,
}: {
  tableData: JournalTemplateView[]
  isLoading: boolean
}) {
  const { direction } = useDirection()
  const columns = useTemplateTableColumn()

  const { table, columnOrder, sensors, handleDragEndColumn } =
    useTanStackTable<JournalTemplateView>({
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
      },
    })

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant={"modern"}
          columnOrder={columnOrder}
          classNames={{
            container: "overflow-y-hidden",
          }}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
        />
      </DndContext>
    </>
  )
}
