"use client";

import Link from "next/link";
import { useMemo } from "react";



import EyeIcon from "@core/components/icons/eye";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ListPopover from "@/components/base/list-popover";
import PencilIcon from "@/components/icons/pencil";
import ApproveIcon from "@/components/icons/scm/approve-icon";
import TransferredIcon from "@/components/icons/scm/transferred-icon";
import TrashIcon from "@/components/icons/trash";
import { Button } from "@/components/ui";
import { routes } from "@/config/routes";
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types";



import ShipmentCreateEditFormDrawer from "./shipment-create-edit-form-drawer";
import { getApprovalStatusBadge, getStockTransferStatusBadge } from "./status-badge";
import StockTransferApprovalForm from "./stock-transfer-approval-form";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<StockTransfer>()

export const useStockTransferColumn = () => {
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
              {t("form-stock-transfer-no")}
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
              {row.original.stockTransferNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("transferToWarehouse", {
        id: "transferTo",
        size: 240,
        header: t("form-transfer-to"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("transferFromWarehouse", {
        id: "transferFrom",
        size: 240,
        header: t("form-transfer-from"),
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
        filterFn: "statusFilter" as any,
        cell: (info) => getStockTransferStatusBadge(info.renderValue()!),
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        header: t("form-approval-status"),
        filterFn: "statusFilter" as any,
        cell: (info) => {
          const value = info.renderValue() ?? "pending"
          return getApprovalStatusBadge(value)
        },
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
                href={routes.scm.inventory.stockTransfer.editAllStockTransfer(
                  Number(row.original.id)
                )}
                aria-label="Edit Stock Transfer"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.scm.inventory.stockTransfer.allStockTransferDetails(
                  Number(row.original.id)
                )}
                aria-label="View Stock Transfer"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              {row.original.approvalStatus === null && (
                <Button
                  className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-paper !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                onClick={() =>
                  openDrawer({
                    view: (
                      <StockTransferApprovalForm
                        stockTransferId={row.original.id!}
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
              { isAuthority && row.original.approvalStatus === "approved" && (
                <Button
                  className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-paper !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                  onClick={() =>
                    openDrawer({
                      view: (
                        <ShipmentCreateEditFormDrawer
                          initialData={row.original}
                          isEditForm={false}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[25.25rem]",
                    })
                  }>
                  <TransferredIcon className="h-4 w-4" />
                  {tableT("table-text-transfer-to-shipment")}
                </Button>
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