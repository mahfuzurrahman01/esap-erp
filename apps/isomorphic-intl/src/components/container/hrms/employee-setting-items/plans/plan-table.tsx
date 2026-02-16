"use client"

import WidgetCard from "@core/components/cards/widget-card"

import MainTable from "@/components/base/table/main-table"
import TablePagination from "@/components/base/table/table-pagination"
import PlanTableToolbar from "@/components/container/hrms/employee-setting-items/plans/plan-table-toolbar"
import { usePlanTableColumns } from "@/components/container/hrms/employee-setting-items/plans/use-plan-table-columns"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Plan } from "@/types/hrms/employee/plan.types"

const data: Plan[] = [
  {
    id: 1,
    planName: "Onboarding",
    departmentId: 2,
    departmentName: "Software Department",
    activities: [
      {
        id: 1,
        activityName: "To-Do",
        summary: "Test Summary",
        assignment: "Test-Assignment",
        assignedTo: 1,
        createdDate: new Date("2024-10-14T10:44:07.6543631"),
        updatedDate: new Date("2024-10-14T10:44:07.6543632"),
      },
    ],
    createdDate: new Date("2024-10-14T10:44:07.6540319"),
    updatedDate: new Date("2024-10-14T10:44:07.6540326"),
  },
]

const PlanTable = () => {
  const columns = usePlanTableColumns()

  const { table, setData } = useTanStackTable<Plan>({
    tableData: data,
    columnConfig: columns,
    options: {
      initialState: {
        columnPinning: {
          left: ["id"],
          right: ["action"],
        },
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id))
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r.id)))
          table.resetRowSelection()
        },
      },
      enableColumnResizing: false,
    },
  })

  return (
    <>
      <WidgetCard className="card-shadow flex flex-col gap-4 border-none bg-gray-0 dark:bg-gray-800">
        <PlanTableToolbar table={table} />
        <MainTable table={table} variant={"modern"} />
        <TablePagination table={table} />
      </WidgetCard>
    </>
  )
}

export default PlanTable
