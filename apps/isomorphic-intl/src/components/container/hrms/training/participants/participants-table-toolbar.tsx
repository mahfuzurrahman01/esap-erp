"use client"

import { useEffect, useState } from "react"

import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import {
  PiMagnifyingGlassBold,
  PiTextColumns,
  PiTrash,
  PiTrashDuotone,
} from "react-icons/pi"
import { useDebounce, useMedia } from "react-use"
import { ActionIcon, Checkbox, Input, Popover, Title, cn } from "rizzui"

import FilterIcon from "@/components/icons/filter"
import { Button, Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import {
  useEmployeeList,
  useEmployeeOptions,
} from "@/hooks/hrms/employee/use-employee"
import { useBulkDeleteParticipants } from "@/hooks/hrms/training/participants/use-participants"
import { useProgramList } from "@/hooks/hrms/training/program/use-program"
import { useSelectOptions } from "@/hooks/use-select-options"
import { EmployeeShortInfo } from "@/types/hrms/common.types"
import { ParticipantQueryOptions } from "@/types/hrms/training/participants-type"
import { TrainingProgram } from "@/types/hrms/training/training-program-type"

interface ParticipantsTableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: ParticipantQueryOptions
  onClear?: () => void
  updateParams?: (newParams: Partial<ParticipantQueryOptions>) => void
}

function FilterElements<T extends Record<string, any>>({
  params,
  updateParams,
  onClear,
}: ParticipantsTableToolbarProps<T>) {
  const t = useTranslations("table")
  const { data: employees, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })
  const { data: programs, isLoading: isProgramLoading } = useProgramList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  const { employeeOptions, isLoading: isEmployeeListLoading } =
    useEmployeeOptions()

  const programOptions = useSelectOptions<TrainingProgram>(
    programs?.data,
    "trainingProgramName"
  )

  const isFiltered = Boolean(
    params?.search || params?.programId || params?.employeeId
  )

  return (
    <>
      <Select
        placeholder={t("table-text-select-program")}
        options={programOptions}
        value={programOptions.find(
          (option) => option.value === params?.programId
        )}
        onChange={(option: any) => {
          updateParams?.({
            programId: option?.value || "",
            pageIndex: 1,
          })
        }}
        isClearable={true}
        isLoading={isProgramLoading}
        className="w-[180px]"
      />
      <Select
        placeholder={t("table-text-select-participant")}
        options={employeeOptions}
        value={employeeOptions.find(
          (option) => option.value === params?.employeeId
        )}
        onChange={(option: any) => {
          updateParams?.({
            employeeId: option?.value || "",
            pageIndex: 1,
          })
        }}
        isClearable={true}
        isLoading={isEmployeeListLoading}
        className="w-[180px]"
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

export default function ParticipantsTableToolbar<
  TData extends Record<string, any>,
>({ table, params, updateParams }: ParticipantsTableToolbarProps<TData>) {
  const t = useTranslations("table")
  const [searchTerm, setSearchTerm] = useState(params?.search ?? "")
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)
  const {
    mutateAsync: bulkDeleteParticipants,
    isSuccess: deleteSuccess,
    isPending: isDeletePending,
  } = useBulkDeleteParticipants()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleClearAll = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        pageIndex: 1,
        programId: "",
        employeeId: "",
      })
    }
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        pageIndex: 1,
      })
    }
  }

  const bulkDeleteHandle = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const selectedIds = selectedRows.map((row) => row.original.id)
    bulkDeleteParticipants(selectedIds)
  }

  useEffect(() => {
    if (deleteSuccess) {
      table.resetRowSelection()
    }
  }, [deleteSuccess])

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
        <Input
          type="search"
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
      <div className="flex items-center gap-4">
        {isMultipleSelected ? (
          <Button
            size="sm"
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            isLoading={isDeletePending}
            onClick={bulkDeleteHandle}>
            <PiTrash size={18} />
            {t("table-text-delete")}
          </Button>
        ) : null}

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
