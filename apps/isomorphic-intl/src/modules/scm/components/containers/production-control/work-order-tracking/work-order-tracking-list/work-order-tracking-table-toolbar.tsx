"use client"

import { useState } from "react"

import cn from "@core/utils/class-names"
import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import {
  PiMagnifyingGlassBold,
  PiTextColumns,
  PiTrash,
  PiTrashDuotone,
} from "react-icons/pi"
import { useDebounce, useMedia } from "react-use"
import { ActionIcon, Checkbox, Popover, Title } from "rizzui"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button, Input, Select } from "@/components/ui"
import { useEmployeeList } from "@/hooks/hrms/employee/use-employee"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useWorkCentersList } from "@/modules/scm/hooks/production-control/work-order-tracking/use-work-center"
import { useWorkOrderTrackingList } from "@/modules/scm/hooks/production-control/work-order-tracking/use-work-order"
import { WorkCenter } from "@/modules/scm/types/production-control/work-order-tracking/work-center-types"
import {
  WorkOrder,
  WorkOrderQueryOptions,
} from "@/modules/scm/types/production-control/work-order-tracking/work-order-types"
import { Employee } from "@/types/hrms/employee/employee.types"

import { workOrderTrackingStatusOptions } from "./status-option"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: WorkOrderQueryOptions
  updateParams?: (newParams: Partial<WorkOrderQueryOptions>) => void
  onClear?: () => void
}

function FilterElements<T extends Record<string, any>>({
  params,
  updateParams,
  onClear,
}: TableToolbarProps<T>) {
  const t = useTranslations("table")
  const { data: workCenterList, isLoading: isWorkCenterLoading } =
    useWorkCentersList({
      pageSize: 1000,
    })
  const { data: employeeList, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: 1000,
  })
  const { data: workOrderList, isLoading: isWorkOrderLoading } =
    useWorkOrderTrackingList({
      pageSize: 1000,
    })
  const isFiltered = Boolean(
    params?.search ||
      params?.workOrder ||
      params?.workCenter ||
      params?.progressStatus ||
      params?.assignedTo
  )


  const workCenterOptions = useSelectOptions<WorkCenter>(
    workCenterList?.data,
    "workCenterName"
  )

  const employeeOptions = useSelectOptions<Employee>(
    employeeList?.data,
    "firstName"
  )

  const workOrderOptions = useSelectOptions<WorkOrder>(
    workOrderList?.data,
    "workOrderName"
  )


  const handleWorkCenterChange = (option: any) => {
    updateParams?.({
      workCenter: option?.label || "",
      pageIndex: 1,
    })
  }

  const handleEmployeeChange = (option: any) => {
    updateParams?.({
      assignedTo: option?.label || "",
      pageIndex: 1,
    })
  }

  const handleWorkOrderChange = (option: any) => {
    updateParams?.({
      workOrder: option?.label || "",
      pageIndex: 1,
    })
  }

  const handleProgressStatusChange = (option: any) => {
    updateParams?.({
      progressStatus: option?.value || "",
      pageIndex: 1,
    })
  }

  return (
    <>
      <Select
        labelClassName="text-title"
        options={workOrderOptions}
        value={
          workOrderOptions.find(
            (option) => option.label === params?.workOrder
          ) || null
        }
        onChange={handleWorkOrderChange}
        isLoading={isWorkOrderLoading}
        isDisabled={isWorkOrderLoading}
        placeholder={
          isWorkOrderLoading
            ? "Loading work order names..."
            : t("table-text-select-work-order")
        }
        className="min-w-[242px]"
      />
      <Select
        labelClassName="text-title"
        options={workCenterOptions}
        value={
          workCenterOptions.find(
            (option) => option.label === params?.workCenter
          ) || null
        }
        onChange={handleWorkCenterChange}
        isLoading={isWorkCenterLoading}
        isDisabled={isWorkCenterLoading}
        placeholder={
          isWorkCenterLoading
            ? "Loading work center names..."
            : t("table-text-select-work-center")
        }
        className="min-w-[242px]"
      />
      <Select
        labelClassName="text-title"
        options={employeeOptions}
        value={
          employeeOptions.find(
            (option) => option.label === params?.assignedTo
          ) || null
        }
        onChange={handleEmployeeChange}
        isLoading={isEmployeeLoading}
        isDisabled={isEmployeeLoading}
        placeholder={
          isEmployeeLoading
            ? "Loading employee names..."
            : t("table-text-select-employee")
        }
        className="min-w-[242px]"
      />

      <Select
        labelClassName="text-title"
        options={workOrderTrackingStatusOptions}
        value={
          workOrderTrackingStatusOptions.find(
            (option) => option.value === params?.progressStatus
          ) || null
        }
        onChange={handleProgressStatusChange}
        isLoading={false}
        isDisabled={false}
        placeholder={t("table-text-select-progress-status")}
        className="min-w-[242px]"
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

export default function WorkOrderTrackingTableToolbar<
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
        progressStatus: "",
        workOrder: "",
        workCenter: "",
        assignedTo: "",
      })
    }
  }

  const handleClearAll = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        progressStatus: "",
        workOrder: "",
        workCenter: "",
        assignedTo: "",
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
          progressStatus: "",
          workOrder: "",
          workCenter: "",
          assignedTo: "",
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
          className="min-w-[242px]"
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
            <Popover.Content className="card-shadow relative overflow-hidden rounded-lg border-transparent bg-paper before:absolute before:-end-4 before:-top-4 before:size-[80px] before:rounded-full before:bg-blue/50 before:blur-[80px] after:absolute after:-bottom-4 after:-start-4 after:size-[80px] after:rounded-full after:bg-red/50 after:blur-[80px] dark:bg-paper dark:text-title">
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
