"use client"

import { getDateRangeStateValues } from "@core/utils/get-formatted-date"
import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import {
  PiMagnifyingGlassBold,
  PiPlusBold,
  PiTextColumns,
  PiTrash,
  PiTrashDuotone,
} from "react-icons/pi"
import { useMedia } from "react-use"
import { ActionIcon, Checkbox, Popover, Title } from "rizzui"

import DateFiled from "@/components/base/controlled-table/date-field"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Button, Input } from "@/components/ui"

import PlanFormDrawerView from "./plan-form-drawer-view"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
}

export default function PlanTableToolbar<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const isMediumScreen = useMedia("(max-width: 1860px)", false)
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1
  const t = useTranslations("hrms")
  const tForm = useTranslations("form")
  const { openDrawer } = useDrawer()
  const {
    options: { meta },
  } = table

  return (
    <div className="flex items-center justify-between px-5">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          type="search"
          placeholder={t("table-text-search-by-name")}
          value={table.getState().globalFilter ?? ""}
          onClear={() => table.setGlobalFilter("")}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        {!isMediumScreen && <FilterElements table={table} />}
      </div>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          color="primary"
          className="h-9"
          onClick={() =>
            openDrawer({
              view: <PlanFormDrawerView />,
              containerClassName: "max-w-4xl",
              placement: "right",
            })
          }>
          <PiPlusBold className="me-1.5 h-4 w-4" />
          {tForm("form-add-new")}
        </Button>

        {/* {isMediumScreen && (
          <FilterDrawerView isOpen={openDrawer} setOpenDrawer={setOpenDrawer}>
            <div className="grid grid-cols-1 gap-6">
              <FilterElements table={table} />
            </div>
          </FilterDrawerView>
        )} */}

        {isMultipleSelected ? (
          <Button
            size="sm"
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            onClick={() =>
              meta?.handleMultipleDelete &&
              meta.handleMultipleDelete(
                table.getSelectedRowModel().rows.map((r) => r.original.id)
              )
            }>
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
                className="h-auto w-auto p-1">
                <PiTextColumns strokeWidth={3} className="size-6" />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="z-0">
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

function FilterElements<T extends Record<string, any>>({
  table,
}: TableToolbarProps<T>) {
  const createdDate =
    table.getColumn("createdDate")?.getFilterValue() ?? ([null, null] as any)
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0

  const t = useTranslations("table")
  const tCommon = useTranslations("common")
  return (
    <>
      <DateFiled
        selectsRange
        dateFormat={"dd-MMM-yyyy"}
        className="w-full"
        placeholderText={t("table-text-select-created-date")}
        endDate={getDateRangeStateValues(createdDate[1])!}
        selected={getDateRangeStateValues(createdDate[0])}
        startDate={getDateRangeStateValues(createdDate[0])!}
        onChange={(date) =>
          table.getColumn("createdDate")?.setFilterValue(date)
        }
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            table.resetGlobalFilter()
            table.resetColumnFilters()
          }}
          variant="flat"
          className="h-9 bg-gray-200/70">
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" />{" "}
          {tCommon("text-clear")}
        </Button>
      )}
    </>
  )
}
