"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { Empty, Loader, Text } from "rizzui"

import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useRecruitmentList } from "@/hooks/hrms/recruitment/use-recruitment"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  Recruitment,
  RecruitmentQueryOptions,
} from "@/types/hrms/recruitment/recruitment-type"

import RecruitmentCard from "./recruitment-card"
import RecruitmentPagination from "./recruitment-pagination"
import RecruitmentTableToolbar from "./recruitment-table-toolbar"

export default function RecruitmentCardContainer() {
  const { params, updateParams } = useQueryParams<RecruitmentQueryOptions>({
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
    ],
  })

  const { data, isLoading } = useRecruitmentList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table } = useTanStackTable<Recruitment>({
    tableData: data?.data ?? [],
    columnConfig: [],
    options: {
      initialState: {
        columnPinning: {
          left: ["id"],
          right: ["actions"],
        },
      },

      columnResizeMode: "onChange",
      enableColumnResizing: true,
      onStateChange: (updater) => {
        if ("data" in updater) {
          table.resetRowSelection()
        }
      },
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[128px] flex-col items-center justify-center">
        <Loader variant="spinner" size="xl" />
      </div>
    )
  }

  return (
    <WidgetCard
      rounded="xl"
      className="flex flex-col gap-4 border-none bg-paper bg-transparent p-5 dark:bg-transparent">
      <RecruitmentTableToolbar
        table={table}
        params={params}
        updateParams={updateParams}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((item) => (
            <RecruitmentCard key={item.id} data={item} />
          ))}
      </div>
      <div>
        {data?.data?.length === 0 && (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        )}
      </div>

      {data?.data && data?.data?.length > 0 && (
        <RecruitmentPagination
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      )}
    </WidgetCard>
  )
}
