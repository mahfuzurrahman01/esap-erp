"use client"

import { useEffect, useMemo } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { useQueryClient } from "@tanstack/react-query"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import AttendanceTableToolbar from "@/components/container/hrms/attendance-and-leave/attendance-list/attendance-table-toolbar"
import { useAttendancesTableColumns } from "@/components/container/hrms/attendance-and-leave/attendance-list/use-attendance-table-column"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  useAttendanceById,
  useAttendanceList,
  useDeleteAttendance,
} from "@/hooks/hrms/attendance-and-leave/use-attendance-list"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  Attendance,
  AttendanceQueryOptions,
} from "@/types/hrms/attendance-and-leave/attendance.types"

type Props = {
  employeeId?: number
}

export default function AttendanceTable({ employeeId }: Props) {
  const direction = useDirection()
  const columns = useAttendancesTableColumns(!!employeeId)
  const deleteAttendance = useDeleteAttendance()
  const queryClient = useQueryClient()

  // Only use query params for the main attendance list
  const { params, updateParams } = useQueryParams<AttendanceQueryOptions>({
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
    ],
  })

  // Fetch data based on whether we're showing employee-specific or all attendances
  const {
    data: allAttendanceData,
    isLoading: isAllAttendanceLoading,
    isPending,
  } = useAttendanceList({
    enabled: !employeeId,
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    departmentId: params.departmentId,
  })

  const {
    data: employeeAttendance,
    isLoading: isEmployeeAttendanceLoading,
    refetch: refetchEmployeeAttendance,
  } = useAttendanceById(Number(employeeId))

  // Listen for reconciliation approval updates
  useEffect(() => {
    // Subscribe to reconciliation approval events
    const handleReconciliationApproved = () => {
      // Refetch both data sets
      if (employeeId) {
        refetchEmployeeAttendance()
      }
      queryClient.invalidateQueries({ queryKey: ["attendanceList"] })
    }

    // You might want to use your event system here
    window.addEventListener(
      "reconciliation-approved",
      handleReconciliationApproved
    )

    return () => {
      window.removeEventListener(
        "reconciliation-approved",
        handleReconciliationApproved
      )
    }
  }, [employeeId, refetchEmployeeAttendance, queryClient])

  // Modify the tableData assignment to ensure we always have an array
  const tableData = useMemo(() => {
    if (employeeId) {
      // If employeeAttendance is an array, use it directly
      if (Array.isArray(employeeAttendance)) {
        return employeeAttendance
      }
      // If employeeAttendance is a single object, wrap it in an array
      return employeeAttendance ? [employeeAttendance] : []
    }
    // For all attendances, use the data array or empty array as fallback
    return allAttendanceData?.data ?? []
  }, [employeeId, employeeAttendance, allAttendanceData?.data])

  const isLoading = employeeId
    ? isEmployeeAttendanceLoading
    : isAllAttendanceLoading

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Attendance>({
      tableData: tableData as Attendance[],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["action"],
          },
        },
        enableRowSelection: !employeeId,
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Attendance>({
    deleteMutation: deleteAttendance.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  // Update table data when employeeAttendance changes
  useEffect(() => {
    if (employeeId && employeeAttendance) {
      // Ensure we're passing an array to setData
      const attendanceArray = Array.isArray(employeeAttendance)
        ? employeeAttendance
        : [employeeAttendance]
      setData(attendanceArray as Attendance[])
    }
  }, [employeeId, employeeAttendance])

  return (
    <WidgetCard className="card-shadow flex flex-col gap-4 border-none bg-gray-0 dark:bg-gray-800">
      {!employeeId && (
        <AttendanceTableToolbar
          table={table}
          params={params}
          updateParams={updateParams}
        />
      )}
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant="modern"
          columnOrder={columnOrder}
          isLoading={isLoading || isPending}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
        />
      </DndContext>
      {!employeeId && (
        <ApiTablePagination
          table={table}
          params={params}
          count={allAttendanceData?.count || 0}
          updateParams={updateParams}
        />
      )}
    </WidgetCard>
  )
}
