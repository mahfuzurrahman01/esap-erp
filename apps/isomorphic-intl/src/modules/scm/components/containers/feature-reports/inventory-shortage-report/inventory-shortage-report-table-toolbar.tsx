"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { type Table as ReactTableType } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import {
  PiMagnifyingGlassBold,
  PiTextColumns,
  PiTrash,
  PiTrashDuotone,
} from "react-icons/pi"
import { useDebounce, useMedia } from "react-use"
import { ActionIcon, Popover, Title } from "rizzui"

import DateFiled from "@/components/base/controlled-table/date-field"
import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Checkbox, Input } from "@/components/ui"
import { Button, Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { InventoryShortageStorageQueryOptions } from "@/modules/scm/types/feature-reports/inventory-shortage-storage"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: InventoryShortageStorageQueryOptions
  updateParams?: (
    newParams: Partial<InventoryShortageStorageQueryOptions>
  ) => void
  onClear?: () => void
}

function FilterElements<T extends Record<string, any>>({
  params,
  updateParams,
  onClear,
}: TableToolbarProps<T>) {
  const t = useTranslations("table")
  const { product, warehouse } = useSCMSharedDataHook(["product", "warehouse"])

  const { productOptions, isProductsLoading } = product
  const { warehouseOptions, isWarehouseLoading } = warehouse

  const isFiltered = Boolean(
    params?.search ||
      params?.warehouse ||
      params?.productName ||
      params?.fromDate ||
      params?.toDate
  )

  const handleProductNameChange = (option: any) => {
    updateParams?.({
      productName: option?.label || "",
      pageIndex: 1,
    })
  }

  const handleWarehouseChange = (option: any) => {
    updateParams?.({
      warehouse: option?.label || "",
      pageIndex: 1,
    })
  }

  return (
    <>
      <Select
        labelClassName="text-title"
        options={productOptions}
        value={
          productOptions.find(
            (option: any) => option.label === params?.productName
          ) || null
        }
        onChange={handleProductNameChange}
        isLoading={isProductsLoading}
        isDisabled={isProductsLoading}
        placeholder={
          isProductsLoading
            ? "Loading product names..."
            : t("table-text-select-product-name")
        }
        className="min-w-[242px]"
      />
      <Select
        labelClassName="text-title"
        options={warehouseOptions}
        value={
          warehouseOptions.find(
            (option: any) => option.label === params?.warehouse
          ) || null
        }
        onChange={handleWarehouseChange}
        isLoading={isWarehouseLoading}
        isDisabled={isWarehouseLoading}
        placeholder={
          isWarehouseLoading
            ? "Loading warehouse..."
            : t("table-text-select-warehouse")
        }
        className="min-w-[242px]"
      />

      <DateFiled
        dateFormat="dd-MMM-yyyy"
        id="fromDate"
        placeholderText={t("table-text-from-date")}
        value={params?.fromDate ? dayjs(params.fromDate).toDate() : null}
        onChange={(e: any) => updateParams?.({ fromDate: e?.toISOString() })}
        onClear={() => updateParams?.({ fromDate: "" })}
        className="w-auto"
      />

      <DateFiled
        dateFormat="dd-MMM-yyyy"
        id="toDate"
        placeholderText={t("table-text-to-date")}
        value={params?.toDate ? dayjs(params.toDate).toDate() : null}
        onChange={(e: any) => updateParams?.({ toDate: e?.toISOString() })}
        onClear={() => updateParams?.({ toDate: "" })}
        className="w-auto"
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={onClear}
          color="danger"
          variant="flat"
          className="h-10 bg-red/15 text-red-dark hover:bg-red-dark hover:text-gray-0">
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" />{" "}
          {t("table-text-clear")}
        </Button>
      )}
    </>
  )
}

export default function InventoryShortageReportTableToolbar<
  TData extends Record<string, any>,
>({ table, params, updateParams }: TableToolbarProps<TData>) {
  const t = useTranslations("table")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)
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
        warehouse: "",
        productName: "",
        fromDate: "",
        toDate: "",
      })
    }
  }

  const handleClearAll = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        warehouse: "",
        productName: "",
        fromDate: "",
        toDate: "",
        pageIndex: 1,
      })
    }
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
          warehouse: "",
          productName: "",
          fromDate: "",
          toDate: "",
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
          placeholder={t("table-text-search-placeholder")}
          value={searchTerm}
          onClear={handleClearSearch}
          onChange={(e) => handleSearch(e.target.value)}
          inputClassName="h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        {!isMediumScreen && showFilters && (
          <FilterElements
            table={table}
            params={params}
            updateParams={updateParams}
            onClear={handleClearAll}
          />
        )}
      </div>
      <div className="flex shrink-0 grow-0 basis-auto items-center gap-4">
        <Button
          {...(isMediumScreen
            ? {
                onClick: () => {
                  setOpenDrawer(() => !openDrawer)
                },
              }
            : { onClick: () => setShowFilters(() => !showFilters) })}
          variant={"outline"}
          className={cn(
            "h-[36px] rounded-lg border-gray-500/20 pe-3 ps-2.5 text-title dark:text-gray-0",
            !isMediumScreen && showFilters && "border-gray-500/20"
          )}>
          <FilterIcon className="me-1.5 h-[18px] w-[18px]" />
          {!isMediumScreen && showFilters
            ? t("table-text-hide-filters")
            : t("table-text-show-filters")}
        </Button>

        {isMediumScreen && (
          <FilterDrawerView isOpen={openDrawer} setOpenDrawer={setOpenDrawer}>
            <div className="grid grid-cols-1 gap-6">
              <FilterElements
                table={table}
                params={params}
                updateParams={updateParams}
                onClear={handleClearAll}
              />
            </div>
          </FilterDrawerView>
        )}

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
            <Popover.Content className="card-shadow relative z-0 overflow-hidden rounded-lg border-transparent bg-paper before:absolute before:-end-4 before:-top-4 before:size-[80px] before:rounded-full before:bg-blue/50 before:blur-[80px] after:absolute after:-bottom-4 after:-start-4 after:size-[80px] after:rounded-full after:bg-red/50 after:blur-[80px] dark:bg-paper dark:text-title">
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
