"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { useEffect } from "react"

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
  useBankAccountList,
  useBulkDeleteBankAccount,
  useDeleteBankAccount,
} from "@/modules/fms/hooks/use-bank-account"
import { BankAccountList, BankAccountQueryOptions } from "@/modules/fms/types"

import BankAccountTableToolbar from "./bank-account-table-toolbar"
import { useColumn } from "./use-column"

export default function BankAccountTable() {
  const { direction } = useDirection()
  const columns = useColumn()
  const deleteBankAccount = useDeleteBankAccount()
  const bulkDeleteBankAccount = useBulkDeleteBankAccount()

  const { params, updateParams } = useQueryParams<BankAccountQueryOptions>({
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
        key: "companyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "bankAccountTypeId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading } = useBankAccountList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    companyId: params.companyId,
    bankAccountTypeId: params.bankAccountTypeId,
    sort: "desc"
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BankAccountList>({
      tableData: data?.data ?? [],
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
    }
  }, [data?.data, setData])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<BankAccountList>({
      deleteMutation: deleteBankAccount.mutate,
      bulkDeleteMutation: bulkDeleteBankAccount.mutate,
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
      <BankAccountTableToolbar
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
