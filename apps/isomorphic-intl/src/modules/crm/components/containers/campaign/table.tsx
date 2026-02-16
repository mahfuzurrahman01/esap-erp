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
  useBulkDeleteCampaign,
  useCampaignList,
  useDeleteCampaign,
} from "@/modules/crm/hooks/use-campaign"
import {
  CampaignList,
  CampaignQueryOptions,
} from "@/modules/crm/types/campaign"

import CampaignTableToolbar from "./campaign-table-toolbar"
import { useColumn } from "./column"

export default function CampaignTable() {
  const { direction } = useDirection()
  const deleteCampaign = useDeleteCampaign()
  const deleteItemBulk = useBulkDeleteCampaign()
  const columns = useColumn()
  const { params, updateParams } = useQueryParams<CampaignQueryOptions>({
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
        key: "deadLine",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "company",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "service",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "source",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "type",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "status",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending } = useCampaignList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    subject: params.subject,
    deadLine: params.deadLine,
    company: params.company,
    service: params.service,
    source: params.source,
    type: params.type,
    status: params.status,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<CampaignList>({
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<CampaignList>({
      deleteMutation: deleteCampaign.mutate,
      bulkDeleteMutation: deleteItemBulk.mutate,
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
        <CampaignTableToolbar
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
      </WidgetCard>
    </>
  )
}
