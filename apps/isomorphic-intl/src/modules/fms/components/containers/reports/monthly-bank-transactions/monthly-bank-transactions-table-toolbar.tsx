"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import {
  PiTextColumns,
  PiTrashDuotone,
} from "react-icons/pi"
import { useDebounce } from "react-use"
import { useMedia } from "react-use"
import { ActionIcon, Checkbox, Input, Popover, Title } from "rizzui"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button } from "@/components/ui"
import { DatePicker } from "@/components/base/date-picker"
import dayjs from "dayjs"
import { MonthlyBankTransactionsQueryOptions } from "@/modules/fms/types/monthly-bank-transactions"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: MonthlyBankTransactionsQueryOptions
  updateParams?: (newParams: Partial<MonthlyBankTransactionsQueryOptions>) => void
  onClear?: () => void
}

function FilterElements<T extends Record<string, any>>({
  params,
  updateParams,
  onClear,
}: TableToolbarProps<T>) {
  const t = useTranslations("table")
  const isFiltered = Boolean(
    params?.search || params?.StartDate || params?.EndDate
  )

  const handleStartDate = (date: any) => {
    updateParams?.({
      StartDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    })
  }

  const handleEndDate = (date: any) => {
    updateParams?.({
      EndDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    })
  }

  return (
    <>
      <div className="flex gap-4">
        <DatePicker
          dateFormat="dd-MM-yyyy"
          className="w-full"
          placeholderText={t("table-text-start-date")}
          onChange={(dates: any) =>
            handleStartDate(dates as [Date | null, Date | null])
          }
          value={params?.StartDate ? new Date(params.StartDate) : null}
          maxDate={new Date()}
          portal
        />
        <DatePicker
          dateFormat="dd-MM-yyyy"
          className="w-full"
          placeholderText={t("table-text-end-date")}
          onChange={(dates: any) =>
            handleEndDate(dates as [Date | null, Date | null])
          }
          value={params?.EndDate ? new Date(params.EndDate) : null}
          maxDate={new Date()}
          portal
        />
      </div>

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

export default function MonthlyBankAccountTableToolbar<
  TData extends Record<string, any>,
>({ table, params, updateParams }: TableToolbarProps<TData>) {
  const t = useTranslations("table")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)
  const [searchTerm, setSearchTerm] = useState(params?.search || "")

  const {
    options: { meta },
  } = table

  const handleClearAll = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        StartDate: "",
        EndDate: "",
        pageIndex: 1,
      })
    }
  }

  useDebounce(
    () => {
      table.setGlobalFilter(searchTerm)

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
              <FilterElements table={table} />
            </div>
          </FilterDrawerView>
        )}

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