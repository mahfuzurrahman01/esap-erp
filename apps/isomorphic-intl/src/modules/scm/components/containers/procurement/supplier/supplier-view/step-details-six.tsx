"use client"

import React, { useMemo } from "react"

import { useDirection } from "@core/hooks/use-direction"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { Badge } from "@/components/ui"
import { AuditTrailTypes, AuditTrails } from "@/data/audit-trails"

export function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "non-compliant":
      return (
        <Badge color="success" variant="solid" size="md">
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="danger" variant="solid" size="md">
          {status}
        </Badge>
      )
  }
}

const columnHelper = createColumnHelper<AuditTrailTypes>()

const useAuditTrailColumn = () => {
  const t = useTranslations("common")
  const auditName = t("text-audit-name")
  const expectedPerformance = t("text-expected-performance")
  const actualPerformance = t("text-actual-performance")
  const status = t("text-status")
  const createdBy = t("text-created-by")
  const comments = t("text-comments")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("AuditID", {
        id: "AuditID",
        size: 60,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
            inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
            iconClassName="w-[18px] h-[18px]"
          />
        ),
        enableSorting: false,
        meta: {
          isColumnDraggable: false,
        },
      }),
      columnHelper.accessor("AuditName", {
        id: "AuditName",
        size: 240,
        header: auditName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("ExpectedPerformance", {
        id: "ExpectedPerformance",
        size: 240,
        header: expectedPerformance,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("ActualPerformance", {
        id: "ActualPerformance",
        size: 240,
        header: actualPerformance,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("Status", {
        id: "Status",
        size: 140,
        header: status,
        filterFn: "statusFilter" as any,
        cell: (info) => getStatusBadge(info.renderValue()!),
      }),
      columnHelper.accessor("CreatedBy", {
        id: "CreatedBy",
        size: 240,
        header: createdBy,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("Comments", {
        id: "Comments",
        size: 240,
        header: comments,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
    ]
  }, [t])

  return columns
}

function AuditDetailsListTable() {
  const columns = useAuditTrailColumn()
  const { direction } = useDirection()

  const { table, columnOrder } = useTanStackTable<AuditTrailTypes>({
    tableData: AuditTrails,
    columnConfig: columns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      columnResizeDirection: direction as any,
      columnResizeMode: "onChange",
    },
  })
  return (
    <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />
  )
}

export default function AuditTrail() {
  const t = useTranslations("common")
  return (
    <div className="p-6 @container">
      <Text className="my-2 text-base font-medium">
        {t("text-audit-information")}
      </Text>
      <AuditDetailsListTable />
    </div>
  )
}
