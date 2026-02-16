"use client";

import { useMemo } from "react";



import { formatDate } from "@core/utils/format-date";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ViewIconButton from "@/components/base/view-icon-button";
import { Contract } from "@/modules/scm/types/procurement/supplier/contract-types";



import { GetSupplierContractStatusBadge } from "./status-option";
import SupplierContractsDrawerView from "./supplier-contracts-drawer-view";





const columnHelper = createColumnHelper<Contract>()

export const useSupplierContractsTableColumns = () => {
  const t = useTranslations("table")
  const supplierName = t("table-text-supplier-name")
  const currencyName = t("table-text-currency-name")
  const contractName = t("table-text-contract-name")
  const contractValue = t("table-text-contract-value")
  const startDate = t("table-text-start-date")
  const endDate = t("table-text-end-date")
  const paymentTerms = t("table-text-payment-terms")
  const status = t("table-text-status")
  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {supplierName}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.supplierName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("currencyName", {
        id: "currencyName",
        size: 240,
        header: currencyName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.currencyName}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("contractName", {
        id: "contractName",
        size: 240,
        header: contractName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.contractName}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("contractValue", {
        id: "contractValue",
        size: 240,
        header: contractValue,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.contractValue}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("startDate", {
        id: "startDate",
        size: 240,
        header: startDate,
        cell: (info) => {
          const value = info.renderValue()
          const date = value ? new Date(value) : undefined
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        size: 240,
        header: endDate,
        cell: (info) => {
          const value = info.renderValue()
          const date = value ? new Date(value) : undefined
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("paymentTerms", {
        id: "paymentTerms",
        size: 240,
        header: paymentTerms,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.paymentTerms}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: status,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {GetSupplierContractStatusBadge({
              status: row.original.status ?? false,
            })}
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
            options: {},
          },
        }) => {
          return (
            <>
              <div className="flex items-center justify-end">
                <ViewIconButton
                  onClick={() => {
                    openDrawer({
                      view: (
                        <SupplierContractsDrawerView
                          initialData={row.original}
                        />
                      ),
                      containerClassName: "max-w-[500px] overflow-auto",
                      placement: "right",
                    })
                  }}
                />
                {/* <DeletePopover
                  translationObjectName="common"
                  title="text-delete-supplier-contract"
                  description={`${tText("text-delete-supplier-contract-prompt")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                /> */}
              </div>
            </>
          )
        },
      }),
    ],
    [
      t,
      supplierName,
      currencyName,
      contractName,
      contractValue,
      startDate,
      endDate,
      paymentTerms,
      status,
    ]
  )

  return columns
}