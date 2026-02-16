"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBulkDeleteMeeting,
  useDeleteMeeting,
  useMeetingList,
} from "@/modules/crm/hooks/use-meeting"
import { MeetingList, MeetingQueryOptions } from "@/modules/crm/types/meeting"

import { useColumn } from "./column"
import MeetingTableToolbar from "./meeting-table-toolbar"
import { useState } from "react"
import EventCalendarView from "./calendar"

export default function MeetingTable() {
  const { direction } = useDirection()
  const deleteMeeting = useDeleteMeeting()
  const deleteItemBulk = useBulkDeleteMeeting()
  const columns = useColumn()
  const [isShowingCard, setIsShowingCard] = useState(false)
  const { params, updateParams } = useQueryParams<MeetingQueryOptions>({
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
        key: "title",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "meetingDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "location",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending } = useMeetingList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    title: params.title,
    meetingDate: params.meetingDate,
    location: params.location,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<MeetingList>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<MeetingList>(
    {
      deleteMutation: deleteMeeting.mutate,
      bulkDeleteMutation: deleteItemBulk.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    }
  )

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
        className={`${
          isShowingCard
            ? "flex flex-col gap-4 border-none bg-transparent"
            : "card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper"
        }`}>
        <MeetingTableToolbar
          table={table}
          params={params}
          updateParams={updateParams}
          isShowingCard={isShowingCard}
          setIsShowingCard={setIsShowingCard}
        />
        {!isShowingCard ? 
          (<>
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={handleDragEndColumn}
              sensors={sensors}>
              <MainTable
                table={table}
                columnOrder={columnOrder}
                isLoading={isLoading || isPending}
                variant={"modern"}
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
          </>) : (
            <EventCalendarView />
          )
        }
      </WidgetCard>
    </>
  )
}
