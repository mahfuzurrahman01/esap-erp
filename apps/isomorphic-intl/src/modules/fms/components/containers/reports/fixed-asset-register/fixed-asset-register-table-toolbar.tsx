"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiTrashDuotone } from "react-icons/pi"
import { useMedia } from "react-use"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { FixedAssetRegisterQueryOptions } from "@/modules/fms/types/fixed-asset-register"
import { DatePicker } from "@/components/base/date-picker"

interface TableToolbarProps {
  params?: FixedAssetRegisterQueryOptions
  updateParams?: (newParams: Partial<FixedAssetRegisterQueryOptions>) => void
  onClear?: () => void
  filterValue?: string
  onFilterChange?: (value: string) => void
}

function FilterElements({ params, updateParams, onClear }: TableToolbarProps) {
  const t = useTranslations("table")
  const { asset, assetCategory, assetLocation, company } = useSharedDataHooks([
    "asset",
    "assetCategory",
    "assetLocation",
    "company",
  ])
  const { assetOptions, isAssetLoading } = asset
  const { assetCategoryOptions, isAssetCategoryLoading } = assetCategory
  const { assetLocationOptions, isAssetLocationLoading } = assetLocation
  const { companyOptions, isCompanyLoading } = company

  const isFiltered = Boolean(
    params?.companyId ||
    params?.assetCategoryId ||
    params?.assetLocationId ||
    params?.startDate ||
    params?.endDate
  )

  const handleCompanyChange = (option: any) => {
    updateParams?.({
      companyId: option?.value || "",
      assetCategoryId: "",
      assetLocationId: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleAssetCategoryChange = (option: any) => {
    updateParams?.({
      assetCategoryId: option?.value || "",
      companyId: "",
      assetLocationId: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleAssetLocationChange = (option: any) => {
    updateParams?.({
      assetLocationId: option?.value || "",
      companyId: "",
      assetCategoryId: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleStartDateChange = (date: Date | [Date | null, Date | null] | null) => {
    if (date instanceof Date) {
      updateParams?.({
        startDate: date.toISOString(),
      })
    }
  }

  const handleEndDateChange = (date: Date | [Date | null, Date | null] | null) => {
    if (date instanceof Date) {
      updateParams?.({
        endDate: date.toISOString(),
      })
    }
  }

  return (
    <>
      <Select
        labelClassName="text-title"
        options={companyOptions}
        value={
          companyOptions.find(
            (option: any) => option.value === params?.companyId
          ) || null
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
      <Select
        labelClassName="text-title"
        options={assetCategoryOptions}
        value={
          assetCategoryOptions.find(
            (option: any) => option.value === params?.assetCategoryId
          ) || null
        }
        onChange={handleAssetCategoryChange}
        isLoading={isAssetCategoryLoading}
        isDisabled={isAssetCategoryLoading}
        placeholder={
          isAssetCategoryLoading
            ? "Loading asset categories..."
            : t("table-text-select-asset-category")
        }
        className="min-w-[242px]"
        menuPortalTarget={document.body}
      />

      <Select
        labelClassName="text-title"
        options={assetLocationOptions}
        value={
          assetLocationOptions.find(
            (option: any) => option.value === params?.assetLocationId
          ) || null
        }
        onChange={handleAssetLocationChange}
        isLoading={isAssetLocationLoading}
        isDisabled={isAssetLocationLoading}
        placeholder={
          isAssetLocationLoading
            ? "Loading asset locations..."
            : t("table-text-select-asset-location")
        }
        className="min-w-[242px]"
        menuPortalTarget={document.body}
      />

      <div>
        <DatePicker
          value={params?.startDate ? new Date(params.startDate) : null}
          onChange={handleStartDateChange}
          placeholderText={t("table-text-start-date")}
          className="min-w-[242px]"
        />
      </div>

      <div>
        <DatePicker
          value={params?.endDate ? new Date(params.endDate) : null}
          onChange={handleEndDateChange}
          placeholderText={t("table-text-end-date")}
          className="min-w-[242px]"
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

export default function FixedAssetRegisterTableToolbar({
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
        assetCategoryId: "",
        assetLocationId: "",
        startDate: "",
        endDate: "",
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
