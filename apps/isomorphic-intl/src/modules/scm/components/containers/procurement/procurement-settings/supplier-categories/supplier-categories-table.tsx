"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteSupplierCategory,
  useDeleteSupplierCategory,
  useSupplierCategoryList,
} from "@/modules/scm/hooks/procurement/supplier/use-supplier-category"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  SupplierCategory,
  SupplierCategoryQueryOptions,
} from "@/modules/scm/types/procurement/supplier/supplier-category-types"

import SupplierCategoriesTableToolbar from "./supplier-categories-table-toolbar"
import { useSupplierCategoriesTableColumns } from "./use-supplier-categories-column"

export default function SupplierCategoriesTable() {
  const { direction } = useDirection()
  const deleteSupplierCategory = useDeleteSupplierCategory()
  const deleteSupplierCategoryBulk = useBulkDeleteSupplierCategory()
  const columns = useSupplierCategoriesTableColumns()

  const { params, updateParams } = useQueryParams<SupplierCategoryQueryOptions>(
    {
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
      ],
    }
  )

  const { data, isLoading } = useSupplierCategoryList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<SupplierCategory>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<SupplierCategory>({
      deleteMutation: deleteSupplierCategory.mutate,
      bulkDeleteMutation: deleteSupplierCategoryBulk.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
        <SupplierCategoriesTableToolbar
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
            variant={"modern"}
            columnOrder={columnOrder}
            isLoading={
              isLoading ||
              deleteSupplierCategory.isPending ||
              deleteSupplierCategoryBulk.isPending
            }
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePagination
          table={table}
          params={params}
          count={data?.count ?? 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
