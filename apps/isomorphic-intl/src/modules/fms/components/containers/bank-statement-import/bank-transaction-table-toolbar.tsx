"use client"

import { useEffect, useState } from "react"

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
import { ActionIcon, Popover, Title } from "rizzui"

import { FilterDrawerView } from "@/components/base/controlled-table/table-filter"
import FilterIcon from "@/components/icons/filter"
import { Button, Checkbox, Input, Select } from "@/components/ui"
import { useUniqueSelectOptions } from "@/hooks/use-unique-select-options"
import { useBankTransactionList, useBulkDeleteBankTransaction } from "@/modules/fms/hooks/use-bank-transaction"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { BankTransactionQueryOptions } from "@/modules/fms/types/bank-transaction"
import { BankStatementImportQueryOptions } from "@/modules/fms/types/bank-statement-import"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { useBulkDeleteBankStatementImport } from "@/modules/fms/hooks/use-bank-transaction-import"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  params?: BankStatementImportQueryOptions
  updateParams?: (newParams: Partial<BankStatementImportQueryOptions>) => void
  onClear?: () => void
}

function FilterElements<T extends Record<string, any>>({
  params,
  updateParams,
  onClear,
}: TableToolbarProps<T>) {
  const t = useTranslations("table")
  const { bankAccount, company, currency } = useSharedDataHooks(["bankAccount", "company", "currency"])
  const { bankAccountOptions, isBankAccountLoading } = bankAccount
  const { companyOptions, isCompanyLoading } = company
  const { currencyOptions, isCurrencyLoading } = currency
  const isFiltered = Boolean(
    params?.search ||
    params?.companyId ||
    params?.bankAccountId ||
    params?.currencyId
  )

  const handleBankAccountChange = (option: any) => {
    updateParams?.({
      bankAccountId: option?.value || "",
      pageIndex: 1,
    })
  }

  const handleCompanyChange = (option: any) => {
    updateParams?.({
      companyId: option?.value || "",
      pageIndex: 1,
    })
  }

  const handleCurrencyChange = (option: any) => {
    updateParams?.({
      currencyId: option?.value || "",
      pageIndex: 1,
    })
  }

  return (
    <>
      <Select
        labelClassName="text-title"
        options={bankAccountOptions || []}
        value={
          (bankAccountOptions || []).find(
            (option: any) => option.value === params?.bankAccountId
          ) || null
        }
        onChange={handleBankAccountChange}
        isLoading={isBankAccountLoading}
        isDisabled={isBankAccountLoading}
        placeholder={
          isBankAccountLoading
            ? "Loading bank account..."
            : t("table-text-select-bank-account")
        }
        className="min-w-[242px]"
        menuPortalTarget={document.body}
      />
      <Select
        labelClassName="text-title"
        options={companyOptions || []}
        value={
          (companyOptions || []).find((option: any) => option.value === params?.companyId) ||
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
      <Select
        labelClassName="text-title"
        options={currencyOptions || []}
        value={
          (currencyOptions || []).find(
            (option: any) => option.value === params?.currencyId
          ) || null
        }
        onChange={handleCurrencyChange}
        isLoading={isCurrencyLoading}
        isDisabled={isCurrencyLoading}
        placeholder={
          isCurrencyLoading
            ? "Loading currency..."
            : t("table-text-currency")
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

export default function BankStatementImportTableToolbar<TData extends Record<string, any>>({
  table,
  params,
  updateParams,
}: TableToolbarProps<TData>) {
  const t = useTranslations("table")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1
  const [searchTerm, setSearchTerm] = useState(params?.search || "")

  const {
    mutateAsync: bulkDeleteBankStatementImport,
    isSuccess: deleteSuccess,
    isPending: isDeletePending,
  } = useBulkDeleteBankStatementImport()

  const {
    options: { meta },
  } = table

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    if (updateParams) {
      updateParams({
        search: "",
        pageIndex: 1,
        bankAccountId: "",
        companyId: "",
        currencyId: "",
      })
    }
  }

  const handleClearAll = () => {
    setSearchTerm("")
    if (updateParams) {
      updateParams({
        search: "",
        companyId: "",
        bankAccountId: "",
        currencyId: "",
        pageIndex: 1,
      })
    }
  }

  const bulkDeleteHandle = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const selectedIds = selectedRows.map((row) => row.original.id)
    bulkDeleteBankStatementImport(selectedIds)
  }

  useEffect(() => {
    if (deleteSuccess) {
      table.resetRowSelection()
    }
  }, [deleteSuccess])

  // Debounce both client-side filtering and server-side search
  useDebounce(
    () => {
      // Update server-side search
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