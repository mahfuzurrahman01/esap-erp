import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { closestCenter } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { BudgetTemplateDetail } from "@/modules/fms/types"

import { useBudgetTemplateTableColumn } from "./budget-template-column"

export default function ViewBudgetTemplateTable({
  tableData,
}: {
  tableData: BudgetTemplateDetail[]
  isLoading: boolean
}) {
  const { direction } = useDirection()
  const columns = useBudgetTemplateTableColumn()

  const { table, columnOrder, sensors, handleDragEndColumn } =
    useTanStackTable<BudgetTemplateDetail>({
      tableData: tableData ?? [],
      columnConfig: columns,
      options: {
        manualPagination: true,
        initialState: {
          pagination: {
            pageIndex: 1,
            pageSize: 12,
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

  table.options.meta = {
    ...table.options.meta,
  }

  return (
    <>
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
            variant="modern"
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
      </WidgetCard>
    </>
  )
}
