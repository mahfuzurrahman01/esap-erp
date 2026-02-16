"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useMedia } from "react-use"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import { DatePicker } from "@/components/base/date-picker"
import FilterIcon from "@/components/icons/filter"
import { Button, Select } from "@/components/ui"
import { EmployeeMonthlyReportQueryOptions } from "@/types/hrms/employee/employee-report.types"

interface ReportToolbarProps {
  params?: EmployeeMonthlyReportQueryOptions
  updateParams?: (newParams: Partial<EmployeeMonthlyReportQueryOptions>) => void
  onClear?: () => void
}

const PERIOD_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
]

function FilterElements({ params, updateParams, onClear }: ReportToolbarProps) {
  const tForm = useTranslations("form")
  const t = useTranslations("table")
  const isFiltered = Boolean(params?.startDate || params?.endDate)
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null)

  const handlePeriodChange = (value: string) => {
    const today = dayjs()
    let startDate: string
    let endDate: string

    switch (value) {
      case "today":
        startDate = today.format("YYYY-MM-DD")
        endDate = today.format("YYYY-MM-DD")
        break
      case "week":
        startDate = today.startOf("week").format("YYYY-MM-DD")
        endDate = today.endOf("week").format("YYYY-MM-DD")
        break
      case "month":
        startDate = today.startOf("month").format("YYYY-MM-DD")
        endDate = today.endOf("month").format("YYYY-MM-DD")
        break
      case "year":
        startDate = today.startOf("year").format("YYYY-MM-DD")
        endDate = today.endOf("year").format("YYYY-MM-DD")
        break
      default:
        return
    }

    updateParams?.({
      startDate,
      endDate,
    })
  }

  const handleStartDate = (date: any) => {
    updateParams?.({
      startDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    })
  }

  const handleEndDate = (date: any) => {
    updateParams?.({
      endDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    })
  }

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        placeholderText={tForm("form-start-date")}
        selected={params?.startDate ? new Date(params.startDate) : null}
        onChange={handleStartDate}
        maxDate={params?.endDate ? new Date(params.endDate) : undefined}
      />

      <DatePicker
        placeholderText={tForm("form-end-date")}
        selected={params?.endDate ? new Date(params.endDate) : null}
        onChange={handleEndDate}
        minDate={params?.startDate ? new Date(params.startDate) : undefined}
      />

      <Select
        options={PERIOD_OPTIONS}
        onChange={(option: any) => {
          setSelectedPeriod(option)
          handlePeriodChange(option?.value)
        }}
        value={selectedPeriod}
        placeholder="Select Period"
        className="w-[100%]"
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            setSelectedPeriod(null)
            onClear?.()
          }}
          color="danger"
          variant="flat"
          className="h-10 bg-red/15 text-red-dark hover:bg-red-dark hover:text-gray-0">
          {t("table-text-clear")}
        </Button>
      )}
    </div>
  )
}

export default function EmployeeReportToolbar({
  params,
  updateParams,
}: ReportToolbarProps) {
  const t = useTranslations("table")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)

  const handleClearAll = () => {
    if (updateParams) {
      updateParams({
        startDate: "",
        endDate: "",
      })
    }
  }

  return (
    <div className="flex items-center justify-between px-5 py-3">
      {/* Left side - Date filters */}
      {!isMediumScreen && showFilters && (
        <FilterElements
          params={params}
          updateParams={updateParams}
          onClear={handleClearAll}
        />
      )}

      {/* Right side - Hide/Show filters button */}
      <div className="ml-auto">
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
      </div>

      {/* Mobile drawer */}
      {isMediumScreen && (
        <FilterDrawerView isOpen={openDrawer} setOpenDrawer={setOpenDrawer}>
          <div className="grid grid-cols-1 gap-6">
            <FilterElements
              params={params}
              updateParams={updateParams}
              onClear={handleClearAll}
            />
          </div>
        </FilterDrawerView>
      )}
    </div>
  )
}
