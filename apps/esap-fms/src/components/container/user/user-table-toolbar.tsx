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
import { useDebounce } from "react-use"
import { useMedia } from "react-use"
import { ActionIcon, Checkbox, Input, Popover, Title } from "rizzui"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useRoleList } from "@/modules/crm/hooks/use-roles"
import { UserQueryOptions } from "@/types/auth"
import { RoleList } from "@/modules/crm/types/role"
import { dropdownStyles } from "../meeting/meeting-css"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: UserQueryOptions
  updateParams?: (newParams: Partial<UserQueryOptions>) => void
  onClear?: () => void
}

function FilterElements<T extends Record<string, any>>({
  params,
  updateParams,
  onClear,
}: TableToolbarProps<T>) {
  const t = useTranslations("table")
  const isFiltered = Boolean(
    params?.search ||
      params?.name ||
      params?.email ||
      params?.role ||
      params?.phoneNumber ||
      params?.country ||
      params?.status
  )
  const { data: roles, isLoading: isRoleLoading } = useRoleList()
  const roleOptions = useSelectOptions<RoleList>(roles?.data, "roleName")

  const handleRoleChange = (option: any) => {
    updateParams?.({
      role: option?.label || "",
      pageIndex: 1,
    })
  }

  return (
    <>
      <Input
        type="text"
        placeholder={t("table-text-name")}
        value={params?.name}
        onClear={() => updateParams?.({ name: "" })}
        onChange={(e) =>
          updateParams?.({ name: e.target.value || "", pageIndex: 1 })
        }
        inputClassName="h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
        clearable={true}
        className="min-w-[242px]"
      />

      <Input
        type="text"
        placeholder={t("table-text-email")}
        value={params?.email}
        onClear={() => updateParams?.({ email: "" })}
        onChange={(e) =>
          updateParams?.({ email: e.target.value || "", pageIndex: 1 })
        }
        inputClassName="h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
        clearable={true}
        className="min-w-[242px]"
      />

      <Input
        type="number"
        placeholder={t("table-text-phone")}
        value={params?.phoneNumber}
        onClear={() => updateParams?.({ phoneNumber: "" })}
        onChange={(e) =>
          updateParams?.({ phoneNumber: e.target.value || "", pageIndex: 1 })
        }
        inputClassName="h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
        clearable={true}
        className="min-w-[242px]"
      />

      <Select
        labelClassName="text-title"
        options={roleOptions}
        value={
          roleOptions.find((option) => option.label === params?.role) || null
        }
        onChange={handleRoleChange}
        isLoading={isRoleLoading}
        isDisabled={isRoleLoading}
        placeholder={
          isRoleLoading ? "Loading role..." : t("table-text-select-role")
        }
        className="min-w-[242px]"
        styles={dropdownStyles}
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

export default function UserTableToolbar<TData extends Record<string, any>>({
  table,
  params,
  updateParams,
}: TableToolbarProps<TData>) {
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
        name: "",
        email: "",
        status: "",
        role: "",
        country: "",
        phoneNumber: "",
      })
    }
  }

  const handleClearAll = () => {
    setSearchTerm("")
    table.setGlobalFilter("")
    if (updateParams) {
      updateParams({
        search: "",
        name: "",
        email: "",
        status: "",
        role: "",
        country: "",
        phoneNumber: "",
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
          name: "",
          email: "",
          status: "",
          role: "",
          country: "",
          phoneNumber: "",
        })
      }
    },
    500,
    [searchTerm]
  )

  return (
    <div className="flex items-start justify-between px-5">
      <div className="flex flex-wrap items-center gap-4 mr-4">
        <Input
          type="search"
          placeholder={t("table-text-search-placeholder")}
          value={searchTerm}
          onClear={handleClearSearch}
          onChange={(e) => handleSearch(e.target.value)}
          inputClassName="h-9 md:h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
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
              <FilterElements table={table} />
            </div>
          </FilterDrawerView>
        )}

        {/* {isMultipleSelected ? (
          <Button
            size="sm"
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            onClick={() =>
              meta?.handleMultipleDelete &&
              meta.handleMultipleDelete(
                table.getSelectedRowModel().rows.map((r) => r.original)
              )
            }>
            <PiTrash size={18} />
            {t("table-text-delete")}
          </Button>
        ) : null} */}

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
