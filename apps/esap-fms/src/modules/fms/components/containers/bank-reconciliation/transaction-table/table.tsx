import { useDirection } from "@core/hooks/use-direction"
import { closestCenter } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query"

import MainTable from "@/components/base/table/main-table"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { BankTransaction } from "@/modules/fms/types/bank-reconciliation"
import { BankReconciliation } from "@/modules/fms/types/bank-reconciliation"

import { useColumn } from "./use-column"

interface BankUnreconciliationTransactionProps {
  data: BankTransaction[]
  isLoading: boolean
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<BankReconciliation, Error>>
}

export default function BankUnreconciliationTransactionTable({
  data,
  isLoading,
  refetch,
}: BankUnreconciliationTransactionProps) {
  const columns = useColumn({ refetch })
  const direction = useDirection()

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BankTransaction>({
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
