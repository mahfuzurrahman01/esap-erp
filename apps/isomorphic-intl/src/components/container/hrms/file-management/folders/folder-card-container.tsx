"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { PiPlusBold } from "react-icons/pi"
import { Empty, Loader, Text } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Button } from "@/components/ui"
import { useFolderList } from "@/hooks/hrms/file-management/folders/use-folders"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  Folder,
  folderQueryOptions,
} from "@/types/hrms/file-management/folders.types"

import FolderCard from "./folder-card"
import FolderPagination from "./folder-pagination"
import FolderTableToolbar from "./folder-table-toolbar"
import FolderFormModalView from "./folders-create-form-view"

export default function FolderCardContainer() {
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null)

  const { params, updateParams } = useQueryParams<folderQueryOptions>({
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
        key: "parentFolderId",
        defaultValue: null,
        parse: (value) => (value === null ? null : Number(value)),
      },
    ],
  })

  const { data, isLoading } = useFolderList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    parentFolderId: currentFolderId === null ? null : currentFolderId,
  })

  const { table } = useTanStackTable<Folder>({
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

  const { openModal } = useModal()

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
      className="flex flex-col gap-4 border-none bg-paper dark:bg-transparent">
      <FolderTableToolbar
        table={table}
        params={params}
        updateParams={updateParams}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-5">
        {data?.data?.map((item) => (
          <div key={item.id}>
            <FolderCard folder={item} />
          </div>
        ))}
        <div
          onClick={() => {
            openModal({
              view: <FolderFormModalView isOpen={true} onClose={() => {}} />,
            })
          }}
          className="flex h-[160px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300">
          <Button variant="text">
            <PiPlusBold className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div>
        {data?.data?.length === 0 && (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        )}
      </div>

      {data?.data && data?.data?.length > 0 && (
        <FolderPagination
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      )}
    </WidgetCard>
  )
}
