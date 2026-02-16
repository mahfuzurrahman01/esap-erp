"use client"

import Link from "next/link"
import React, { useMemo } from "react"

import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Badge } from "@/components/ui"
import { routes } from "@/config/routes"
import { useDeleteInvoice } from "@/modules/scm/hooks/procurement/invoice/use-invoice"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

export function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "paid":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "unpaid":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
  }
}

const columnHelper = createColumnHelper<Invoice>()

const useInvoiceColumn = () => {
  const t = useTranslations("common")
  const tableT = useTranslations("table")

  const purchaseOrderNo = t("text-purchase-order-no")
  const requisitionNo = t("text-requisition-no")
  const invoiceNo = t("text-invoice-no")
  const invoiceDate = t("text-invoice-date")
  const dueDate = t("text-due-date")
  const billingStatus = t("text-billing-status")
  const totalAmount = t("text-total-amount")
  const column = useMemo(() => {
    return [
      columnHelper.accessor("invoiceBillNo", {
        id: "invoiceBillNo",
        size: 240,
        header: invoiceNo,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("purchaseOrderNo", {
        id: "purchaseOrderNo",
        size: 240,
        header: purchaseOrderNo,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("requisitionNo", {
        id: "requisitionNo",
        size: 240,
        header: requisitionNo,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("invoiceDate", {
        id: "invoiceDate",
        size: 240,
        header: invoiceDate,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("dueDate", {
        id: "dueDate",
        size: 240,
        header: dueDate,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("billingStatus", {
        id: "billingStatus",
        size: 240,
        header: billingStatus,
        filterFn: "statusFilter" as any,
        enableSorting: false,
        cell: (info) => getStatusBadge(info.renderValue()!),
      }),
      columnHelper.accessor("billAmount", {
        id: "billAmount",
        size: 240,
        header: totalAmount,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            $ {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 100,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: {},
          },
        }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.scm.procurement.invoiceBills.editInvoiceBills(
                    Number(row.original.id)
                  )}
                  aria-label="go to invoice edit">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.scm.procurement.invoiceBills.invoiceBillsDetails(
                    Number(row.original.id)
                  )}
                  aria-label="go to invoice details">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
            </div>
          </>
        ),
      }),
    ]
  }, [t, tableT])

  return column
}

function InvoiceDetailsListTable({ supplierData }: { supplierData: Supplier }) {
  const columns = useInvoiceColumn()
  const { direction } = useDirection()
  const deleteInvoice = useDeleteInvoice()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Invoice>({
      tableData: supplierData?.supplierInvoices || [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            right: ["action"],
          },
        },
        enableRowSelection: true,
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
      },
    })

  const { handleDeleteRow } = useTableDelete<Invoice>({
    deleteMutation: deleteInvoice.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  // Update table options with delete handlers
  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEndColumn}
      sensors={sensors}>
      <MainTable
        table={table}
        variant={"modern"}
        isLoading={deleteInvoice.isPending}
        columnOrder={columnOrder}
        components={{
          headerCell: DragAbleHeadWrapper,
          bodyCell: DragAbleCellWrapper,
        }}
      />
    </DndContext>
  )
}

export default function SupplierInvoice({
  supplierData,
}: {
  supplierData: Supplier
}) {
  const t = useTranslations("common")
  return (
    <div className="@container">
      <Text className="dark:text-title-dark my-4 ml-4 text-lg font-semibold text-title">
        {t("text-invoice-information")}
      </Text>
      <InvoiceDetailsListTable supplierData={supplierData} />
    </div>
  )
}
