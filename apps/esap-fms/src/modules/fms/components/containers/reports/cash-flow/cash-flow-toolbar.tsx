"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiTrashDuotone } from "react-icons/pi"
import { useMedia } from "react-use"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { CompanyList } from "@/modules/fms/types"
import { CashFlowQueryOptions } from "@/modules/fms/types/cash-flow"

interface TableToolbarProps {
  params?: CashFlowQueryOptions
  updateParams?: (newParams: Partial<CashFlowQueryOptions>) => void
  onClear?: () => void
  filterValue?: string
  onFilterChange?: (value: string) => void
}

function FilterElements({ params, updateParams, onClear }: TableToolbarProps) {
  const t = useTranslations("table")
  const { data: companyList, isLoading: isCompanyLoading } = useCompanyList()

  const isFiltered = Boolean(params?.companyId)

  const companyOptions = useSelectOptions<CompanyList>(
    companyList?.data,
    "companyName"
  )

  const handleCompanyChange = (option: any) => {
    updateParams?.({
      companyId: option?.value || "",
    })
  }

  return (
    <>
      <Select
        labelClassName="text-title"
        options={companyOptions}
        value={
          companyOptions.find((option) => option.value === params?.companyId) ||
          null
        }
        onChange={handleCompanyChange}
        isLoading={isCompanyLoading}
        isDisabled={isCompanyLoading}
        placeholder={
          isCompanyLoading
            ? "Loading companies..."
            : t("table-text-select-company")
        }
        className="min-w-[242px]"
        menuPortalTarget={document.body}
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

export default function CashFlowTableToolbar({
  params,
  updateParams,
  onFilterChange,
}: TableToolbarProps) {
  const t = useTranslations("table")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)

  const handleClearAll = () => {
    onFilterChange?.("")
    if (updateParams) {
      updateParams({
        companyId: "",
      })
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        {!isMediumScreen && showFilters && (
          <>
            <FilterElements
              params={params}
              updateParams={updateParams}
              onClear={handleClearAll}
            />
          </>
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
              <FilterElements params={params} />
            </div>
          </FilterDrawerView>
        )}
      </div>
    </div>
  )
}
