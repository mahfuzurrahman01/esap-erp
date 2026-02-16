"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBankTransactionImportList,
  useBulkDeleteBankStatementImport,
  useDeleteBankStatementImport,
} from "@/modules/fms/hooks/use-bank-transaction-import"
import { BankStatementImport } from "@/modules/fms/types/bank-statement-import"
import { BankStatementImportQueryOptions } from "@/modules/fms/types/bank-statement-import"

import { useColumn } from "./use-column"
import BankStatementImportTableToolbar from "./bank-transaction-table-toolbar"
import { useEffect } from "react"

export default function BankStatementImportTable() {
  const columns = useColumn()
  const direction = useDirection()
  const deleteBankStatementImport = useDeleteBankStatementImport()
  const bulkDeleteBankStatementImport = useBulkDeleteBankStatementImport()

  const { params, updateParams } = useQueryParams<BankStatementImportQueryOptions>({
    params: [
      {
        key: "search",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "pageIndex",
        defaultValue: 1,
        parse: (value) => Number(value) || 1,
      },
      {
        key: "pageSize",
        defaultValue: 10,
        parse: (value) => Number(value) || 10,
      },
      {
        key: "bankAccountId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "currencyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading } = useBankTransactionImportList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc",
    bankAccountId: params.bankAccountId,
    companyId: params.companyId,
    currencyId: params.currencyId,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BankStatementImport>({
      tableData: data?.data || [],
      columnConfig: columns,
      options: {
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

    useEffect(() => {
      if (data?.data) {
        setData(data.data)
        table.resetRowSelection()
      }
    }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<BankStatementImport>({
      deleteMutation: deleteBankStatementImport.mutate,
      bulkDeleteMutation: bulkDeleteBankStatementImport.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <BankStatementImportTableToolbar
        table={table}
        params={params}
        updateParams={updateParams}
      />
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
      <ApiTablePagination
        table={table}
        params={params}
        count={data?.count || 0}
        updateParams={updateParams}
      />
    </WidgetCard>
  )
}