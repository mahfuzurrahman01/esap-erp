"use client";

import React from "react";



import WidgetCard from "@core/components/cards/widget-card";
import { useDirection } from "@core/hooks/use-direction";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";



import ApiTablePaginationScm from "@/components/base/api-table-pagination-scm";
import MainTable from "@/components/base/table/main-table";
import { DragAbleCellWrapper, DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components";
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table";
import useDebounce from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-query-params";
import { useBulkDeleteForecast, useDeleteForecast, useForecastList } from "@/modules/scm/hooks/demand-and-forecasting/forecast/use-forecast";
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete";
import { Forecast, ForecastQueryOptions } from "@/modules/scm/types/demand-and-forecasting/forecast/forecast-types";



import ForecastTableToolbar from "./forecast-table-toolbar";
import { useForecastColumn } from "./use-column";





export default function ForecastList() {
  const columns = useForecastColumn()
  const { direction } = useDirection()

  const deleteForecast = useDeleteForecast()
  const bulkDeleteForecast = useBulkDeleteForecast()

  const { params, updateParams } = useQueryParams<ForecastQueryOptions>({
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
        key: "productName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "sku",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "pastSalesData",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "forecastPeriod",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "forecastMethod",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "approvalStatus",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useForecastList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    sku: params.sku,
    pastSalesData: params.pastSalesData,
    forecastPeriod: params.forecastPeriod,
    forecastMethod: params.forecastMethod,
    approvalStatus: params.approvalStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Forecast>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Forecast>({
    deleteMutation: deleteForecast.mutate,
    bulkDeleteMutation: bulkDeleteForecast.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  // Update table options with delete handlers
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
        <ForecastTableToolbar
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
            isLoading={isLoading || deleteForecast.isPending || bulkDeleteForecast.isPending}
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePaginationScm
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}