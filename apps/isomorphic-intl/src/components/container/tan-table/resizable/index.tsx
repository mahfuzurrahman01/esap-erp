"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Person, defaultData } from "@/data/tan-table-data"

import { defaultColumns } from "./column"

export default function TableResizable() {
  const { direction } = useDirection()
  const { table, setData } = useTanStackTable<Person>({
    tableData: defaultData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 6,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id))
        },
      },
      columnResizeDirection: direction as any,
      columnResizeMode: "onChange",
    },
  })

  return (
    <>
      <WidgetCard title={"Resizable Table"} className="flex flex-col gap-4">
        <MainTable table={table} variant={"modern"} />
      </WidgetCard>
    </>
  )
}
