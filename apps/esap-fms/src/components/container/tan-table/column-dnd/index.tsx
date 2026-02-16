"use client"

import React from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Person, defaultData } from "@/data/tan-table-data"

import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "../custom-table-components"
import { defaultColumns } from "./column"

export default function TableColumnDnd() {
  const { table, setData, handleDragEndColumn, sensors, columnOrder } =
    useTanStackTable<Person>({
      tableData: defaultData,
      columnConfig: defaultColumns,
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 7,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setData((prev) => prev.filter((r) => r.id !== row.id))
          },
        },
        enableColumnResizing: false,
      },
    })

  return (
    <>
      <WidgetCard title={"Column DnD"} className="flex flex-col gap-4">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEndColumn}
          sensors={sensors}>
          <MainTable
            table={table}
            variant={"modern"}
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
