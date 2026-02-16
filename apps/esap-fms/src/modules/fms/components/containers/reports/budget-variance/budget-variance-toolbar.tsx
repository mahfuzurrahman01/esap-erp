"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiTrashDuotone } from "react-icons/pi"
import { useMedia } from "react-use"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button, Select } from "@/components/ui"
import { BudgetVarianceQueryOptions } from "@/modules/fms/types/budget-variance"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { useFiscalYearList } from "@/modules/fms/hooks/use-fiscal-year"
import { FiscalYearList } from "@/modules/fms/types/fiscal-year"
import { useSelectOptions } from "@/hooks/use-select-options"

interface TableToolbarProps {
  params?: BudgetVarianceQueryOptions
  updateParams?: (newParams: Partial<BudgetVarianceQueryOptions>) => void
  onClear?: () => void
  filterValue?: string
  onFilterChange?: (value: string) => void
}

const reportTypeOptions = [
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
]

function FilterElements({ params, updateParams, onClear }: TableToolbarProps) {
  const t = useTranslations("table")
  const { costCenter, budgetAgainst } = useSharedDataHooks(["fiscalYear", "costCenter", "budgetAgainst"])
  const { costCenterOptions, isCostCenterLoading } = costCenter
  const { budgetAgainstOptions, isBudgetAgainstLoading } = budgetAgainst

  const { data: fiscalYear, isLoading: isFiscalYearLoading } = useFiscalYearList()

  const fiscalYearOptions = useSelectOptions<FiscalYearList>(
    fiscalYear?.data,
    "yearRange"
  )

  const isFiltered = Boolean(
    params?.fromDate || params?.costCenterId || params?.budgetAgainstId || params?.reportType
  )

  const handleFiscalYearChange = (option: any) => {
    const selectedFiscalYear = fiscalYearOptions.find(
      (fy: any) => fy.value === option?.value
    )

    updateParams?.({
      fromDate: selectedFiscalYear?.startDate || "",
      toDate: selectedFiscalYear?.endDate || "",
    })
  }

  const handleCostCenterChange = (option: any) => {
    updateParams?.({
      costCenterId: option?.value || "",
    })
  }

  const handleBudgetAgainstChange = (option: any) => {
    updateParams?.({
      budgetAgainstId: option?.value || "",
    })
  }

  const handleReportTypeChange = (option: any) => {
    updateParams?.({
      reportType: option?.value || "",
    })
  }

  return (
    <>
      <Select
        labelClassName="text-title"
        options={fiscalYearOptions}
        value={
          fiscalYearOptions.find(
            (option: any) => option.startDate === params?.fromDate && option.endDate === params?.toDate
          ) || null
        }
        onChange={handleFiscalYearChange}
        isLoading={isFiscalYearLoading}
        isDisabled={isFiscalYearLoading}
        placeholder={
          isFiscalYearLoading
            ? "Loading fiscal years..."
            : t("table-text-select-fiscal-year")
        }
        className="min-w-[242px]"
        menuPortalTarget={document.body}
      />
      <Select
        labelClassName="text-title"
        options={reportTypeOptions}
        value={
          reportTypeOptions.find(
            (option: any) => option.value === params?.reportType
          ) || null
        }
        onChange={handleReportTypeChange}
        placeholder={t("table-text-select-report-type")}
        className="min-w-[242px]"
        menuPortalTarget={document.body}
      />

      <Select
        labelClassName="text-title"
        options={costCenterOptions}
        value={
          costCenterOptions.find(
            (option: any) => option.value === params?.costCenterId
          ) || null
        }
        onChange={handleCostCenterChange}
        isLoading={isCostCenterLoading}
        isDisabled={isCostCenterLoading}
        placeholder={
          isCostCenterLoading
            ? "Loading cost centers..."
            : t("table-text-select-cost-center")
        }
        className="min-w-[242px]"
        menuPortalTarget={document.body}
      />

      <Select
        labelClassName="text-title"
        options={budgetAgainstOptions}
        value={
          budgetAgainstOptions.find(
            (option: any) => option.value === params?.budgetAgainstId
          ) || null
        }
        onChange={handleBudgetAgainstChange}
        isLoading={isBudgetAgainstLoading}
        isDisabled={isBudgetAgainstLoading}
        placeholder={
          isBudgetAgainstLoading
            ? "Loading budget against..."
            : t("table-text-select-budget-against")
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
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" />
          {t("table-text-clear")}
        </Button>
      )}
    </>
  )
}

export default function BudgetVarianceTableToolbar({
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
        costCenterId: "",
        budgetAgainstId: "",
        reportType: "",
        fromDate: "",
        toDate: "",
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
