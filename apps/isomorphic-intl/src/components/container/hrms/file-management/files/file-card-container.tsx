"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { PiPlusBold } from "react-icons/pi"
import { Empty, Loader, Text } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import FileUploadIcon from "@/components/icons/file-upload-icon"
import { Button } from "@/components/ui"
import { useFilesByFolderId } from "@/hooks/hrms/file-management/folders/use-folders"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  UploadedFile,
  folderQueryOptions,
} from "@/types/hrms/file-management/folders.types"

import FileCard from "./file-card"
import FileUploadModal from "./file-upload-modal"
import FileTableToolbar from "./files-table-toolbar"

export default function FileCardContainer() {
  const { folderId } = useParams()
  const [currentFiles, setCurrentFiles] = useState<UploadedFile[]>([])
  const [selectedFileIds, setSelectedFileIds] = useState<number[]>([])

  const { params } = useQueryParams<folderQueryOptions>({
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

  const { data: files, isLoading: isFilesLoading } = useFilesByFolderId(
    Number(folderId)
  )

  useEffect(() => {
    if (files) {
      setCurrentFiles(files)
    }
  }, [files])

  const { table } = useTanStackTable<UploadedFile>({
    tableData: currentFiles ?? [],
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

  const handleFileSelect = (fileId: number) => {
    setSelectedFileIds((prev) => {
      if (prev.includes(fileId)) {
        return prev.filter((id) => id !== fileId)
      }
      return [...prev, fileId]
    })
  }

  if (isFilesLoading) {
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
      <div className="flex items-center justify-between">
        {currentFiles?.length > 0 && (
          <Text className="text-lg font-semibold">
            {currentFiles[0].folder?.folderName} Files
          </Text>
        )}
      </div>

      <FileTableToolbar
        table={table}
        params={params}
        selectedFileIds={selectedFileIds}
        setSelectedFileIds={setSelectedFileIds}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-5">
        {currentFiles?.map((file) => (
          <div key={file.id}>
            <FileCard
              file={file}
              isSelected={selectedFileIds.includes(file.id)}
              onSelect={handleFileSelect}
            />
          </div>
        ))}
        <div
          onClick={() => {
            openModal({
              view: (
                <FileUploadModal
                  isOpen={true}
                  onClose={() => {}}
                  folderId={Number(folderId)}
                />
              ),
              customSize: "480px",
            })
          }}
          className="flex h-[160px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300">
          <Button variant="text">
            <FileUploadIcon className="h-9 w-9" />
          </Button>
        </div>
      </div>

      <div>
        {currentFiles?.length === 0 && (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Files</Text>
          </div>
        )}
      </div>
    </WidgetCard>
  )
}
