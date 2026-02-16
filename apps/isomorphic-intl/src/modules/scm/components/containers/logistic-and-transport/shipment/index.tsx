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
import { useQueryParams } from "@/hooks/use-query-params";
import { useBulkDeleteShipment, useDeleteShipment, useShipmentList } from "@/modules/scm/hooks/logistic-and-transport/shipment/use-shipment";
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete";
import { Shipment, ShipmentQueryOptions } from "@/modules/scm/types/logistics-and-transport/shipment/shipment-types";



import ShipmentTableToolbar from "./shipment-table-toolbar";
import { useShipmentColumn } from "./use-column";





export default function ShipmentList() {
  const columns = useShipmentColumn()
  const { direction } = useDirection()

  const deleteShipment = useDeleteShipment()
  const bulkDeleteShipment = useBulkDeleteShipment()

  const { params, updateParams } = useQueryParams<ShipmentQueryOptions>({
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
        key: "carrierName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "shipmentId",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const { data, isLoading } = useShipmentList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    carrierName: params.carrierName,
    shipmentId: params.shipmentId,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Shipment>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Shipment>({
    deleteMutation: deleteShipment.mutate,
    bulkDeleteMutation: bulkDeleteShipment.mutate,
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
        <ShipmentTableToolbar
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
            isLoading={
              isLoading ||
              deleteShipment.isPending ||
              bulkDeleteShipment.isPending
            }
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