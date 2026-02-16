import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi"
import { ActionIcon, Select, SelectOption, Text } from "rizzui"

interface TablePaginationProps<TData extends Record<string, any>> {
  table: ReactTableType<TData>
  totalCount?: number
}

export default function TablePagination<TData extends Record<string, any>>({
  table,
  totalCount,
}: TablePaginationProps<TData>) {
  const t = useTranslations("table")
  const {
    getState,
    setPageSize,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
  } = table

  const { pageSize, pageIndex } = getState().pagination
  const pageCount = Math.ceil(totalCount! / pageSize)

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
      <div className="hidden @2xl:block">
        <Text className="dark:text-gray-500">
          {table.getFilteredSelectedRowModel().rows.length} {t("table-text-of")}{" "}
          {totalCount} {t("table-text-row-selected")}.
        </Text>
      </div>
      <div className="flex w-full items-center justify-between gap-6 @2xl:w-auto @2xl:gap-12">
        <div className="flex items-center gap-4">
          <Text className="hidden font-medium text-gray-900 @md:block dark:text-gray-500">
            {t("table-text-rows-per-page")}
          </Text>
          <Select
            options={options}
            className="w-[70px]"
            value={pageSize}
            onChange={(v: SelectOption) => {
              setPageSize(Number(v.value))
            }}
            displayValue={getOptionLabel}
            selectClassName="font-semibold text-sm ring-0 shadow-sm h-9"
            dropdownClassName="font-medium [&_li]:justify-center [&_li]:text-sm"
          />
        </div>
        <Text className="hidden font-medium text-gray-900 @3xl:block dark:text-gray-500">
          {t("table-text-page")} {pageIndex + 1} {t("table-text-of")}{" "}
          {pageCount}
        </Text>
        <div className="grid grid-cols-4 gap-2">
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            onClick={firstPage}
            disabled={!getCanPreviousPage()}
            className="border-gray-500/20 text-gray-900 shadow-sm disabled:border-gray-400 disabled:bg-gray-400 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-muted dark:disabled:bg-muted">
            <PiCaretDoubleLeftBold className="size-4" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={previousPage}
            disabled={!getCanPreviousPage()}
            className="border-gray-500/20 text-gray-900 shadow-sm disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:text-gray-500 dark:disabled:border-muted dark:disabled:bg-muted">
            <PiCaretLeftBold className="size-4" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={nextPage}
            disabled={!getCanNextPage()}
            className="border-gray-500/20 text-gray-900 shadow-sm disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:text-gray-500 dark:disabled:border-muted dark:disabled:bg-muted">
            <PiCaretRightBold className="size-4" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={lastPage}
            disabled={!getCanNextPage()}
            className="border-gray-500/20 text-gray-900 shadow-sm disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:text-gray-500 dark:disabled:border-muted dark:disabled:bg-muted">
            <PiCaretDoubleRightBold className="size-4" />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}
