import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Select, SelectOption, Text } from "rizzui"

import CaretDoubleLeftIcon from "@/components/icons/caret-double-left"
import CaretDoubleRightIcon from "@/components/icons/caret-double-right"
import CaretLeftIcon from "@/components/icons/caret-left"
import CaretRightIcon from "@/components/icons/caret-right"
import { DEFAULT_PAGE_INDEX, DEFAULT_QUERY_PARAMS } from "@/config/constants"
import { EmployeeQueryOptions } from "@/types/hrms/employee/employee.types"

export default function EmployeeCardPagination<
  TData extends Record<string, any>,
>({
  table,
  params,
  count,
  updateParams,
}: {
  table: ReactTableType<TData>
  params: EmployeeQueryOptions
  count: number
  updateParams: (params: Partial<EmployeeQueryOptions>) => void
}) {
  const t = useTranslations("hrms")
  const tTable = useTranslations("table")

  const options = [
    { value: 6, label: "6" },
    { value: 9, label: "9" },
    { value: 12, label: "12" },
    { value: 15, label: "15" },
  ]
  const getOptionLabel = (value: number) => {
    return (
      options.find((option) => option.value === value)?.label ||
      value.toString()
    )
  }

  const mergedParams = { ...DEFAULT_QUERY_PARAMS, ...params }

  const isPreviousPagesDisabled = mergedParams.pageIndex === 1
  const totalPages = Math.ceil(count / mergedParams.pageSize)
  const isNextPagesDisabled =
    mergedParams.pageIndex === totalPages || totalPages === 0

  const handlePageSizeChange = (value: any) => {
    updateParams({
      pageSize: Number(value.value),
      pageIndex: DEFAULT_PAGE_INDEX,
    })
  }

  const handleFirstPage = () => {
    updateParams({ pageIndex: 1 })
  }

  const handlePreviousPage = () => {
    updateParams({ pageIndex: params.pageIndex! - 1 })
  }

  const handleNextPage = () => {
    updateParams({ pageIndex: params.pageIndex! + 1 })
  }

  const handleLastPage = () => {
    updateParams({ pageIndex: totalPages })
  }

  const showCount = table.getRowCount()

  return (
    <div className="flex w-full items-center justify-between px-5 @container">
      <div className="hidden @2xl:block">
        <Text className="dark:text-title">
          {showCount} of {count} {t("text-employees")}
        </Text>
      </div>
      <div className="flex w-full items-center justify-between gap-6 @2xl:w-auto @2xl:gap-12">
        <div className="flex items-center gap-4">
          <Text className="hidden font-medium text-title @md:block dark:text-gray-0">
            {t("text-employees-per-page")}
          </Text>
          <Select
            options={options}
            className="w-[70px]"
            value={mergedParams.pageSize}
            onChange={(v: SelectOption) => {
              table.setPageSize(Number(v.value))
              handlePageSizeChange(v)
            }}
            displayValue={getOptionLabel}
            selectClassName="border-gray-500/20 rounded-lg font-semibold text-sm text-title ring-0 shadow-sm h-9"
            dropdownClassName="font-medium [&_li]:justify-center [&_li]:text-sm dropdown-gr border-none dark:bg-paper"
            optionClassName="data-[focus]:bg-gray-500/10"
          />
        </div>
        <Text className="hidden font-medium text-gray-900 @3xl:block dark:text-title">
          {tTable("table-text-page")} {mergedParams.pageIndex}{" "}
          {tTable("table-text-of")} {totalPages}
        </Text>
        <div className="grid grid-cols-4 gap-2">
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            onClick={handleFirstPage}
            disabled={isPreviousPagesDisabled}
            className="border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
            <CaretDoubleLeftIcon className="size-5" />
          </ActionIcon>

          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={handlePreviousPage}
            disabled={isPreviousPagesDisabled}
            className="dark:disabled:text-gray border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
            <CaretLeftIcon className="size-5" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={handleNextPage}
            disabled={isNextPagesDisabled}
            className="dark:disabled:text-gray border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
            <CaretRightIcon className="size-5" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={handleLastPage}
            disabled={isNextPagesDisabled}
            className="dark:disabled:text-gray border-transparent text-title hover:border-transparent hover:bg-gray-500/10 hover:text-title disabled:border-transparent disabled:bg-transparent disabled:text-gray-500/80 dark:text-title dark:hover:bg-gray-500/10 dark:hover:text-title dark:disabled:text-gray-500/80 dark:disabled:hover:bg-transparent">
            <CaretDoubleRightIcon className="size-5" />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}
