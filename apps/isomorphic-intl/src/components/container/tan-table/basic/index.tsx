"use client"

import React from "react"

import WidgetCard from "@core/components/cards/widget-card"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Person, defaultData } from "@/data/tan-table-data"

import { defaultColumns } from "./column"

export default function TableBasic() {
  const { table } = useTanStackTable<Person>({
    tableData: defaultData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      enableColumnResizing: false,
    },
  })

  return (
    <div className="grid grid-cols-1 gap-6">
      <WidgetCard title={"Classic Table"} className="flex flex-col gap-4">
        <MainTable
          table={table}
          variant={"classic"}
          classNames={{
            container: "border-x border-muted/70",
          }}
        />
      </WidgetCard>
      <WidgetCard title={"Modern Table"} className="flex flex-col gap-4">
        <MainTable table={table} variant={"modern"} />
      </WidgetCard>
      <WidgetCard title={"Minimal Table"} className="flex flex-col gap-4">
        <MainTable table={table} variant={"minimal"} />
      </WidgetCard>
      <WidgetCard title={"Elegant Table"} className="flex flex-col gap-4">
        <MainTable table={table} variant={"elegant"} />
      </WidgetCard>
      <WidgetCard title={"Retro Table"} className="flex flex-col gap-4">
        <MainTable table={table} variant={"retro"} />
      </WidgetCard>
    </div>
  )
}
