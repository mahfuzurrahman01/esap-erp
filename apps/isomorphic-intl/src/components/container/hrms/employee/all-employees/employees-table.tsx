"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { Empty } from "rizzui"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import { useEmployeesTableColumns } from "@/components/container/hrms/employee/all-employees/use-employees-table-column"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  useDeleteEmployee,
  useEmployeeList,
} from "@/hooks/hrms/employee/use-employee"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  Employee,
  EmployeeQueryOptions,
} from "@/types/hrms/employee/employee.types"

import EmployeeCard from "./employee-card"
import EmployeeCardPagination from "./employee-card-pagination"
import EmployeesTableToolbars from "./employees-table-toolbar"

export default function EmployeesTable() {
  const { direction } = useDirection()
  const columns = useEmployeesTableColumns()
  const deleteEmployee = useDeleteEmployee()
  const [isShowingCard, setIsShowingCard] = useState(true)
  const { params, updateParams } = useQueryParams<EmployeeQueryOptions>({
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
        key: "departmentId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "managerId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "country",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading, isError } = useEmployeeList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    departmentId: params.departmentId,
    managerId: params.managerId,
    country: params.country,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Employee>({
      tableData: isError ? [] : (data?.data ?? []),
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["actions"],
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

  const { handleDeleteRow } = useTableDelete<Employee>({
    deleteMutation: deleteEmployee.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
  }

  return (
    <WidgetCard
      rounded="xl"
      className={`${
        isShowingCard
          ? "flex flex-col gap-4 border-none bg-transparent dark:bg-transparent"
          : "card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper"
      }`}>
      <EmployeesTableToolbars
        isShowingCard={isShowingCard}
        setIsShowingCard={setIsShowingCard}
        table={table}
        params={params}
        updateParams={updateParams}
      />
      {!isShowingCard && (
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
      )}
      {isShowingCard && (
        <div
          className={`${isShowingCard ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {data?.data?.map((item) => (
            <EmployeeCard key={item.id} data={item} />
          ))}
        </div>
      )}
      {data?.data?.length === 0 && isShowingCard && <Empty />}
      {!isShowingCard ? (
        <ApiTablePagination
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      ) : (
        <EmployeeCardPagination
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      )}
    </WidgetCard>
  )
}
