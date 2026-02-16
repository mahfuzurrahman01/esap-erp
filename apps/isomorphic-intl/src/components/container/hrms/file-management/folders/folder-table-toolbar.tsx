"use client"

import { useState } from "react"

import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { PiMagnifyingGlassBold, PiTrash } from "react-icons/pi"
import { useDebounce } from "react-use"
import { Input } from "rizzui"

import { Button } from "@/components/ui"
import { useBulkDeleteFolders } from "@/hooks/hrms/file-management/folders/use-folders"
import { folderQueryOptions } from "@/types/hrms/file-management/folders.types"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: folderQueryOptions
  updateParams?: (newParams: Partial<folderQueryOptions>) => void
}

export default function FolderTableToolbar<TData extends Record<string, any>>({
  table,
  params,
  updateParams,
}: TableToolbarProps<TData>) {
  const t = useTranslations("table")
  const [searchTerm, setSearchTerm] = useState(params?.search ?? "")
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1

  const { mutateAsync: bulkDeleteFolders, isPending: isDeletePending } =
    useBulkDeleteFolders()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        pageIndex: 1,
      })
    }
  }

  const bulkDeleteHandle = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const selectedIds = selectedRows.map((row) => row.original.id)
    bulkDeleteFolders(selectedIds)
  }

  // Debounce both client-side filtering and server-side search
  useDebounce(
    () => {
      // Update client-side filter
      table.setGlobalFilter(searchTerm)

      // Update server-side search
      if (updateParams) {
        updateParams({
          search: searchTerm,
          pageIndex: 1,
        })
      }
    },
    500,
    [searchTerm]
  )

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          type="search"
          placeholder={t("table-text-search-placeholder")}
          value={searchTerm}
          onClear={handleClearSearch}
          onChange={(e) => handleSearch(e.target.value)}
          inputClassName="h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
      </div>
      <div className="flex items-center gap-4">
        {isMultipleSelected ? (
          <Button
            size="sm"
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            isLoading={isDeletePending}
            onClick={bulkDeleteHandle}>
            <PiTrash size={18} />
            {t("table-text-delete")}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
