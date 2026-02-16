"use client";

import Link from "next/link";
import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { LuFileText } from "react-icons/lu";
import { Checkbox, Text } from "rizzui";



import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ListPopover from "@/components/base/list-popover";
import EyeIcon from "@/components/icons/eye";
import PencilIcon from "@/components/icons/pencil";
import ApproveIcon from "@/components/icons/scm/approve-icon";
import TrashIcon from "@/components/icons/trash";
import { Button } from "@/components/ui";
import { routes } from "@/config/routes";
import { StockReplenishment } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types";
import { formatDate } from "@/utils/format-date";



import { getApprovalStatusBadge, getStockReplenishmentStatusBadge } from "./status-badge";
import StockReplenishmentApprovalForm from "./stock-replanishment-approval-form";
import StockReplenishmentViewDrawer from "./stock-replanishment-view-drawer";
import { GeneratePoIcon } from "@/components/icons/scm/generate-po-icon";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<StockReplenishment>()

export const useStockReplenishmentColumn = () => {
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
              {t("form-product-name")}
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
              {row.original.productName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("supplierName", {
        id: "supplierName",
        size: 240,
        header: t("form-supplier-name"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("sku", {
        id: "sku",
        size: 240,
        header: t("form-sku"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("replenishmentQty", {
        id: "replenishmentQty",
        size: 300,
        header: t("form-replenishment-quantity"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("expectedDeliveryDate", {
        id: "expectedDeliveryDate",
        size: 300,
        header: t("form-expected-delivery-date"),
        cell: ({ row }) => {
          const date = row.original.expectedDeliveryDate
            ? new Date(row.original.expectedDeliveryDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: t("form-status"),
        filterFn: "statusFilter" as any,
        cell: (info) =>
          getStockReplenishmentStatusBadge(info.renderValue() || "pending"),
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        header: t("form-approval-status"),
        filterFn: "statusFilter" as any,
        cell: (info) => getApprovalStatusBadge(info.renderValue() || "pending"),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 60,
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end">
            <ListPopover>
              <Link
                href={routes.scm.inventory.stockReplenishment.editStockReplenishment(
                  Number(row.original.id)
                )}
                aria-label="Edit Stock Replenishment"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Button
                as="span"
                className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <StockReplenishmentViewDrawer
                        initialData={row.original}
                      />
                    ),
                    placement: "right",
                    containerClassName: "max-w-[25.25rem]",
                  })
                }>
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Button>
              { isAuthority && row.original.approvalStatus === null && (
                <Button
                  as="span"
                  className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                  onClick={() =>
                    openDrawer({
                      view: (
                        <StockReplenishmentApprovalForm
                          stockReplenishmentId={row.original.id!}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[25.25rem]",
                    })
                  }>
                  <ApproveIcon className="h-4 w-4" />
                  {tableT("table-text-approval")}
                </Button>
              )}

              {row.original.approvalStatus === "approved" && (
                <Link
                  href={routes.scm.inventory.stockReplenishment.createRequisition(
                    row.original.id!
                  )}
                  aria-label="Generate PO"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <GeneratePoIcon className="h-4 w-4" />
                  {tableT("table-text-create-requisition")}
                </Link>
              )}
              {
                isAuthority && (
                  <Button
                size="sm"
                variant="text"
                color="danger"
                className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                {tableT("table-text-delete")}
              </Button>
                )
              }
            </ListPopover>
          </div>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}