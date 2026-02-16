"use client";

import Link from "next/link";
import React, { useMemo } from "react";



import EyeIcon from "@core/components/icons/eye";
import { useDirection } from "@core/hooks/use-direction";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { AiOutlineAudit } from "react-icons/ai";
import { Text } from "rizzui";



import ListPopover from "@/components/base/list-popover";
import MainTable from "@/components/base/table/main-table";
import { DragAbleCellWrapper, DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components";
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table";
import ContractIcon from "@/components/icons/scm/contract-icon";
import TrashIcon from "@/components/icons/trash";
import { Badge, Button } from "@/components/ui";
import { routes } from "@/config/routes";
import { useContractById, useDeleteContract } from "@/modules/scm/hooks/procurement/supplier/use-contract";
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete";
import { Contract } from "@/modules/scm/types/procurement/supplier/contract-types";
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types";





export function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "inactive":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Pending":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="black" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
  }
}

const columnHelper = createColumnHelper<Contract>()

const useContractColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const column = useMemo(() => {
    const contractName = t("form-contract-name")
    const startDate = t("form-start-date")
    const endDate = t("form-end-date")
    const currency = t("form-currency")
    const paymentTerms = t("form-payment-terms")
    const contractValue = t("form-contract-value")

    return [
      columnHelper.accessor("contractName", {
        id: "contractName",
        size: 240,
        header: contractName,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("startDate", {
        id: "startDate",
        size: 240,
        header: startDate,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        size: 240,
        header: endDate,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.split("T")[0] || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("currencyName", {
        id: "currencyName",
        size: 240,
        header: currency,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("paymentTerms", {
        id: "paymentTerms",
        size: 240,
        header: paymentTerms,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("contractValue", {
        id: "contractValue",
        size: 240,
        header: contractValue,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 60,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          const { data: contractData } = useContractById(
            Number(row.original.id)
          ) as {
            data: Contract
          }
          return (
            <>
              <div className="flex items-center justify-end gap-3">
                <ListPopover>
                  <Link
                    href={routes.scm.procurement.suppliers.contractDetails(
                      Number(row.original.id),
                      Number(contractData?.supplierId)
                    )}
                    aria-label="Edit Supplier"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <EyeIcon className="h-4 w-4" />
                    {tableT("table-text-view")}
                  </Link>
                  <Link
                    href={routes.scm.procurement.suppliers.contractRenewals(
                      Number(row.original.id),
                      Number(contractData?.supplierId)
                    )}
                    aria-label="Contract"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <ContractIcon className="h-4 w-4" />
                    {tableT("table-text-contract-renewals")}
                  </Link>
                  <Link
                    href={routes.scm.procurement.suppliers.slaMonitoring(
                      Number(row.original.id),
                      Number(contractData?.supplierId)
                    )}
                    aria-label="SLA Monitoring"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <AiOutlineAudit className="h-4 w-4" />
                    {tableT("table-text-sla-monitoring")}
                  </Link>
                  <Link
                    href={routes.scm.procurement.suppliers.slaMonitoringList(
                      Number(row.original.id),
                      Number(contractData?.supplierId)
                    )}
                    aria-label="SLA Monitoring List"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                    <AiOutlineAudit className="h-4 w-4" />
                    {tableT("table-text-sla-monitoring-list")}
                  </Link>
                  <Button
                    size="sm"
                    variant="text"
                    color="danger"
                    className="h-7 w-full justify-start gap-2 !px-2.5 font-semibold text-title hover:bg-red/20 hover:text-red"
                    onClick={() => {
                      meta?.handleDeleteRow &&
                        meta?.handleDeleteRow(row.original)
                    }}>
                    <TrashIcon className="h-4 w-4" />
                    {tableT("table-text-delete")}
                  </Button>
                </ListPopover>
              </div>
            </>
          )
        },
      }),
    ]
  }, [t, tableT])

  return column
}

function ContractDetailsListTable({
  supplierData,
}: {
  supplierData: Supplier
}) {
  const columns = useContractColumn()
  const { direction } = useDirection()
  const deleteContract = useDeleteContract()

  const { table, columnOrder, setData, handleDragEndColumn, sensors } =
    useTanStackTable<Contract>({
      tableData: supplierData?.supplierContracts || [],
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Contract>({
    // Fix: Pass the mutation function directly instead of returning a function
    deleteMutation: deleteContract.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  return (
    // <WidgetCard className="flex flex-col gap-4 border-none bg-gray-0 dark:bg-gray-800">

    // </WidgetCard>
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEndColumn}
      sensors={sensors}>
      <MainTable
        table={table}
        variant={"modern"}
        columnOrder={columnOrder}
        components={{
          headerCell: DragAbleHeadWrapper,
          bodyCell: DragAbleCellWrapper,
        }}
        isLoading={deleteContract.isPending}
      />
    </DndContext>
  )
}

export default function ContractInfo({
  supplierData,
}: {
  supplierData: Supplier
}) {
  const t = useTranslations("common")
  return (
    <div className="@container">
      <Text className="dark:text-title-dark my-4 ml-4 text-lg font-semibold text-title">
        {t("text-contract-information")}
      </Text>
      <ContractDetailsListTable supplierData={supplierData} />
    </div>
  )
}