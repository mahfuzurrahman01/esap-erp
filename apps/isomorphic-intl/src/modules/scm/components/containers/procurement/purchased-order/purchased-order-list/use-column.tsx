"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import ApproveIcon from "@/components/icons/scm/approve-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { PurchasedOrder } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import { formatDate } from "@/utils/format-date"

import PurchasedOrderApprovalForm from "../purchased-order-approval"
import { getApprovalStatusBadge } from "./status-badge"
import { getBillingStatusBadge } from "@/modules/scm/components/base/billing-status-badge"
import { useCurrentRole } from "@/hooks/use-current-role"

const columnHelper = createColumnHelper<PurchasedOrder>()

export const usePurchasedOrderColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])

  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const supplierName = t("form-supplier-name")
    const PoDate = t("form-po-date")
    const expectedDeliveryDate = t("form-expected-delivery-date")
    const fiscalPosition = t("form-fiscal-position")
    const status = t("form-status")
    const paymentTerms = t("form-payment-terms")
    const purchaseOrderNo = t("form-purchase-order-no")
    const total = t("form-total-amount")
    const approvalDate = t("form-approval-date")
    const approvalStatus = t("form-approval-status")

    return [
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
              {purchaseOrderNo}
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
              {row.original.purchaseOrderNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor((row) => `${row?.supplierName}`, {
        id: "supplierName",
        size: 240,
        header: supplierName,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("paymentTerms", {
        id: "paymentTerms",
        size: 240,
        header: paymentTerms,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor("fiscalPosition", {
        id: "fiscalPosition",
        size: 240,
        header: fiscalPosition,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("poDate", {
        id: "poDate",
        size: 240,
        header: PoDate,
        cell: ({ row }) => {
          const date = row.original.poDate
            ? new Date(row.original.poDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("approvalDate", {
        id: "approvalDate",
        size: 240,
        header: approvalDate,
        cell: ({ row }) => {
          const date = row.original.approvalDate
            ? new Date(row.original.approvalDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("expectedDeliveryDate", {
        id: "expectedDeliveryDate",
        size: 300,
        header: expectedDeliveryDate,
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
        enableSorting: true,
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 240,
        header: approvalStatus,
        filterFn: "statusFilter" as any,
        cell: (info) => getApprovalStatusBadge(info.renderValue() || "pending"),
        enableSorting: true,
      }),
      columnHelper.accessor("billingStatus", {
        id: "billingStatus",
        size: 240,
        header: status,
        filterFn: "statusFilter" as any,
        cell: (info) => getBillingStatusBadge(info.renderValue()!),
      }),
      columnHelper.accessor("orderAmount", {
        id: "orderAmount",
        size: 240,
        header: total,
        enableSorting: true,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original?.orderAmount || "-"}
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
        }) => (
          <>
            <div className="flex items-center justify-end">
              <ListPopover>
                <Link
                  href={routes.scm.procurement.purchaseOrders.editPurchaseOrders(
                    row.original.id ?? 0
                  )}
                  aria-label="Edit Requisition"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Link
                  href={routes.scm.procurement.purchaseOrders.PurchaseOrdersDetails(
                    row.original.id ?? 0
                  )}
                  aria-label="View Requisition"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Link>
                {isAuthority && row.original.approvalStatus === null && (
                  <Button
                    as="span"
                    className="dark:text-title-dark dark:bg-paper-dark h-7 w-full cursor-pointer justify-start gap-2 bg-transparent !px-2.5 font-semibold text-title transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-600/10"
                    onClick={() =>
                      openDrawer({
                        view: (
                          <PurchasedOrderApprovalForm
                            purchasedOrderId={row.original.id ?? 0}
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
                {
                  isAuthority && (
                <Button
                  size="sm"
                  variant="text"
                  color="danger"
                  className="h-7 w-full justify-start gap-2 !px-2.5 font-semibold text-title hover:bg-red/20 hover:text-red"
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
          </>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
