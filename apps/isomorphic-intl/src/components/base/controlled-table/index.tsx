"use client"

import dynamic from "next/dynamic"
import React from "react"

import cn from "@core/utils/class-names"
import { i18nextLanguages } from "@core/utils/i18next-lang"
import isEmpty from "lodash/isEmpty"
import { useTranslations } from "next-intl"
import { Loader, Title } from "rizzui"

import type { TableFilterProps } from "@/components/base/controlled-table/table-filter"
import type { TablePaginationProps } from "@/components/base/controlled-table/table-pagination"

import Table, { TableProps } from "../table-shared-components"

const TableFilter = dynamic(
  () => import("@/components/base/controlled-table/table-filter"),
  {
    ssr: false,
  }
)
const TablePagination = dynamic(
  () => import("@/components/base/controlled-table/table-pagination"),
  {
    ssr: false,
  }
)

type ControlledTableProps = {
  isLoading?: boolean
  showLoadingText?: boolean
  filterElement?: React.ReactElement
  filterOptions?: TableFilterProps
  paginatorOptions?: TablePaginationProps
  tableFooter?: React.ReactNode
  className?: string
  paginatorClassName?: string
} & TableProps

export default function ControlledTable({
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  const t = useTranslations("common")
  if (isLoading) {
    const i18next = i18nextLanguages
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            {i18next ? t("text-loading") : "Loading..."}
          </Title>
        ) : null}
      </div>
    )
  }

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )}

      <div className="relative">
        <Table
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
          {...tableProps}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  )
}
