"use client";

import Link from "next/link";
import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ViewIconButton from "@/components/base/view-icon-button";
import PencilIcon from "@/components/icons/pencil";
import { routes } from "@/config/routes";
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types";



import { getStockStatusBadge } from "./status-badge";
import StockViewDrawer from "./stock-view-drawer";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<Stock>()

export const useStockColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])


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
              {t("form-serial-number")}
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
              {row.original.serialNumber}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("sku", {
        id: "sku",
        size: 240,
        header: t("form-sku"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        size: 240,
        header: t("form-product-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("stockLocation", {
        id: "stockLocation",
        size: 240,
        header: t("form-stock-location"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("currentQuantity", {
        id: "currentQuantity",
        size: 240,
        header: t("form-current-quantity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("reorderLevel", {
        id: "reorderLevel",
        size: 240,
        header: t("form-reorder-level"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("reorderQuantity", {
        id: "reorderQuantity",
        size: 240,
        header: t("form-reorder-quantity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("stockValuationMethod", {
        id: "stockValuationMethod",
        size: 240,
        header: t("form-stock-valuation-method"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("entryType", {
        id: "entryType",
        size: 240,
        header: t("form-entry-type"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: t("form-status"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {getStockStatusBadge(info.renderValue() || "-")}
          </Text>
        ),
      }),
      columnHelper.accessor("unitStockValue", {
        id: "unitStockValue",
        size: 240,
        header: t("form-unit-stock-value"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("totalStockValue", {
        id: "totalStockValue",
        size: 240,
        header: t("form-total-stock-value"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
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
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={tableT("table-text-edit")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.scm.inventory.stock.editStockEntry(
                  Number(row.original.id)
                )}
                aria-label="go to stock edit">
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
            <ViewIconButton
              onClick={() => {
                openDrawer({
                  view: <StockViewDrawer initialData={row.original} />,
                  placement: "right",
                  containerClassName: "max-w-[500px] overflow-auto",
                })
              }}
            />
            {
              isAuthority && (
                <DeletePopover
              title="table-text-delete-stock"
              description={`Are you sure you want to delete this stock item #${row.original.id}?`}
              onDelete={() => {
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }}
            />
              )
            }
          </div>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}