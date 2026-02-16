import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Select, SelectOption, Text } from "rizzui"

import CaretDoubleLeftIcon from "@/components/icons/caret-double-left"
import CaretDoubleRightIcon from "@/components/icons/caret-double-right"
import CaretLeftIcon from "@/components/icons/caret-left"
import CaretRightIcon from "@/components/icons/caret-right"

export default function TablePagination<TData extends Record<string, any>>({
  table,
  onPageChange,
  onPageSizeChange,
  pageIndex,
  totalPages,
}: {
  table: ReactTableType<TData>
  onPageChange: (newPageIndex: number) => void
  onPageSizeChange: (newPageSize: number) => void
  handleDelete: any
  checkedItems: []
  pageIndex: number
  totalPages: number
  pageSize: number
  totalEntries: number
}) {
  const t = useTranslations("table")
  // const startEntry = pageIndex * pageSize + 1
  // const endEntry = Math.min((pageIndex + 1) * pageSize, totalEntries)

  const options = [
    { value: 5, label: t("table-text-rows-per-page-5") },
    { value: 10, label: t("table-text-rows-per-page-10") },
    { value: 15, label: t("table-text-rows-per-page-15") },
    { value: 20, label: t("table-text-rows-per-page-20") },
  ]

  const getOptionLabel = (value: number) => {
    return (
      options.find((option) => option.value === value)?.label ||
      value.toString()
    )
  }

  return (
    <div className="flex w-full items-center justify-between px-5 @container">
      <div>
        <Text className="dark:text-gray-0">
          {table.getFilteredSelectedRowModel().rows.length} {t("table-text-of")}{" "}
          {table.getFilteredRowModel().rows.length}{" "}
          {t("table-text-row-selected")}
        </Text>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Text className="hidden font-medium text-gray-900 @md:block dark:text-gray-0">
            {t("table-text-rows-per-page")}
          </Text>
          <Select
            options={options}
            className="w-[70px]"
            value={table.getState().pagination.pageSize}
            onChange={(v: SelectOption) => {
              table.setPageSize(Number(v.value))
              onPageSizeChange(Number(v.value))
            }}
            displayValue={getOptionLabel}
            selectClassName="border-gray-500/20 rounded-lg font-semibold text-sm text-title ring-0 shadow-sm h-9"
            dropdownClassName="font-medium [&_li]:justify-center [&_li]:text-sm dropdown-gr border-none dark:bg-paper"
            optionClassName="data-[focus]:bg-gray-500/10"
          />
        </div>
        <div className="ml-4 flex w-full items-center justify-between gap-6 @2xl:w-auto @2xl:gap-12">
          <Text className="hidden font-medium text-gray-900 @3xl:block dark:text-gray-0">
            {t("table-text-page")} {pageIndex} {t("table-text-of")} {totalPages}
          </Text>
          <div className="grid grid-cols-4 gap-2">
            <ActionIcon
              rounded="lg"
              variant="outline"
              aria-label="Go to first page"
              onClick={() => onPageChange(1)}
              disabled={pageIndex === 1}
              className="border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
              <CaretDoubleLeftIcon className="size-5" />
            </ActionIcon>
            <ActionIcon
              rounded="lg"
              variant="outline"
              aria-label="Go to previous page"
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 1}
              className="dark:disabled:text-gray border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
              <CaretLeftIcon className="size-5" />
            </ActionIcon>
            <ActionIcon
              rounded="lg"
              variant="outline"
              aria-label="Go to next page"
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex === totalPages}
              className="dark:disabled:text-gray border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
              <CaretRightIcon className="size-5" />
            </ActionIcon>
            <ActionIcon
              rounded="lg"
              variant="outline"
              aria-label="Go to last page"
              onClick={() => onPageChange(totalPages)}
              disabled={pageIndex === totalPages}
              className="dark:disabled:text-gray border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
              <CaretDoubleRightIcon className="size-5" />
            </ActionIcon>
          </div>
        </div>
      </div>
    </div>
  )
}
