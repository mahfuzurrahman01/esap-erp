"use client"

import { useState } from "react"

import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { PiMagnifyingGlassBold, PiTextColumns, PiTrash } from "react-icons/pi"
import { useDebounce } from "react-use"
import { ActionIcon, Checkbox, Popover, Title } from "rizzui"

import { Button, Input } from "@/components/ui"
import { PurchasedOrderApprovalQueryOptions } from "@/modules/scm/types/procurement/purchased-order/purchased-order-approval-types"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: PurchasedOrderApprovalQueryOptions
  updateParams?: (
    newParams: Partial<PurchasedOrderApprovalQueryOptions>
  ) => void
  onClear?: () => void
}

export default function PurchasedOrderApprovalTableToolbar<
  TData extends Record<string, any>,
>({ table, params, updateParams }: TableToolbarProps<TData>) {
  const t = useTranslations("table")
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1
  const [searchTerm, setSearchTerm] = useState(params?.search ?? "")

  const {
    options: { meta },
  } = table

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

  useDebounce(
    () => {
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
    <div className="flex items-center justify-between px-5">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          type="search"
          className="min-w-[242px]"
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
            onClick={() => {
              meta?.handleMultipleDelete &&
                meta.handleMultipleDelete(
                  table.getSelectedRowModel().rows.map((r) => {
                    return r.original
                  })
                )
            }}>
            <PiTrash size={18} />
            {t("table-text-delete")}
          </Button>
        ) : null}

        {table && (
          <Popover shadow="sm" placement="bottom-end">
            <Popover.Trigger>
              <ActionIcon
                variant="outline"
                title={"Toggle Columns"}
                className="h-auto w-auto rounded-lg border-gray-500/20 p-1 px-3 text-title dark:text-gray-0">
                <PiTextColumns strokeWidth={3} className="size-6" />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="card-shadow relative overflow-hidden rounded-lg border-transparent bg-paper before:absolute before:-end-4 before:-top-4 before:size-[80px] before:rounded-full before:bg-blue/50 before:blur-[80px] after:absolute after:-bottom-4 after:-start-4 after:size-[80px] after:rounded-full after:bg-red/50 after:blur-[80px] dark:bg-paper dark:text-title">
              <div className="p-2 text-left rtl:text-right">
                <Title as="h6" className="mb-6 px-0.5 text-sm font-semibold">
                  {t("table-text-toggle-columns")}
                </Title>
                <div className="grid grid-cols-2 gap-6">
                  {table.getAllLeafColumns().map((column) => {
                    return (
                      typeof column.columnDef.header === "string" &&
                      column.columnDef.header.length > 0 && (
                        <Checkbox
                          key={column.id}
                          label={<>{column.columnDef.header}</>}
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          inputClassName="h-5 w-5"
                          iconClassName="h-5 w-5"
                          className="z-30"
                        />
                      )
                    )
                  })}
                </div>
              </div>
            </Popover.Content>
          </Popover>
        )}
      </div>
    </div>
  )
}
